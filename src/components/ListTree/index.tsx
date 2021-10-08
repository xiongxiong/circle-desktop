import { IDialogButtonProps, MsgDialogMessageBox, MsgListInsert, MsgListTreeSelect, MsgListUpdate } from "@/interface/BridgeMsg";
import { IListBasic, IListUpdate } from "@/interface/Data";
import { ContextMenu } from "primereact/contextmenu";
import { createRef, useContext, MouseEvent, KeyboardEvent, useState, useEffect, ForwardedRef, forwardRef, useImperativeHandle, ChangeEvent, FocusEvent } from "react";
import { useDispatch } from "react-redux";
import styled, { css, ThemeContext } from "styled-components"
import { off, on } from "~/events";
import { Events } from "~/events/Events";
import { IClassName } from "~/interfaces/Component";
import { useAppSelector } from "~/store/hooks";
import { addListExpanded, delListExpanded, expandedList, selectedList, setListSelected } from "~/store/slice/AppSlice";
import { ITheme } from "~/styles/Themes";
import IconDown from "../@iconfont/IconDown";
import IconHangcheng from "../@iconfont/IconHangcheng";
import IconMulu from "../@iconfont/IconMulu";
import IconUp from "../@iconfont/IconUp";

export interface INodeData {
    id: number,
    parentId: number,
    title: string,
    isGroup: boolean,
}

interface INodeItem extends INodeData {
    children: INodeItem[],
    level: number,
    selectable: boolean,
    selected: boolean,
    expanded: boolean,
}

export interface IListTreeRef {
}

export interface IListTreeProps extends IClassName {

}

const map = new Map<number, INodeItem>();

let rootNode: INodeData;

export const ListNode = (id: number) => map.get(id);

const ListTreeBase = (props: IListTreeProps, ref: ForwardedRef<IListTreeRef>) => {

    const { className } = props;

    const theme: ITheme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const contextMenuRef = createRef<ContextMenu>();
    const listSelected = useAppSelector(selectedList);
    const listExpanded = useAppSelector(expandedList);

    const [rawNodes, setRawNodes] = useState([] as INodeData[]);
    const [nodes, setNodes] = useState([] as INodeItem[]);
    const [contextNode, setContextNode] = useState(undefined as INodeData | undefined);
    const [inputNode, setInputNode] = useState(undefined as INodeData | undefined);

    useEffect(() => {
        selectTreeNodes();
        on(Events.LIST_TREE_REFRESH, selectTreeNodes);
        return () => off(Events.LIST_TREE_REFRESH, selectTreeNodes);
    }, []);

    useEffect(() => {
        refreshTree();
    }, [rawNodes, inputNode, listSelected, listExpanded]);

    useImperativeHandle(ref, () => ({

    }));

    const selectTreeNodes = () => {
        window.Main.invoke(new MsgListTreeSelect()).then(nodes => setRawNodes(nodes));
    }

    const refreshSawNodes = () => {
        setNodes(getSawNodes(map, listSelected, listExpanded));
    }

    const refreshTree = () => {
        initMap(map, inputNode?.id === -2 ? rawNodes.concat([inputNode]) : rawNodes, listSelected);
        refreshSawNodes();
    }

    const toggleExpand = (node: INodeItem) => {
        const { id, expanded, isGroup } = node;
        isGroup && dispatch(expanded ? delListExpanded(id) : addListExpanded(id));
    }

    const onListSelect = (node: INodeItem) => {
        const { isGroup } = node;
        isGroup || (node.id === listSelected?.id) || dispatch(setListSelected(node));
        toggleExpand(node);
    }

    const updateListIsDelete = (list: IListUpdate) => {
        const updateFunc = (list: IListUpdate) => {
            window.Main.invoke(new MsgListUpdate(list)).then(ok => ok && selectTreeNodes());
        }
        const buttons: IDialogButtonProps[] = [
            {
                label: '取消',
                func: () => { }
            },
            {
                label: '确定',
                func: () => list && updateFunc(list)
            }
        ]

        window.Main.invoke(new MsgDialogMessageBox({
            type: 'warning',
            title: '「清单」删除',
            message: '清单内所有待办将一并删除，确定删除？',
            buttons: buttons.map(({ label }) => label),
            defaultId: 1,
            cancelId: 0,
            noLink: true
        })).then(res => {
            const { response = 0 } = res || {};
            buttons[response] && buttons[response].func();
        });
    }

    const insertNode = (isGroup: boolean) => {
        setInputNode({
            id: -2,
            parentId: contextNode?.id || rootNode.id,
            title: '',
            isGroup,
        });
        contextNode?.isGroup && !listExpanded.includes(contextNode.id) && dispatch(addListExpanded(contextNode.id));
    }

    const onNodeInputClick = (e: MouseEvent<HTMLInputElement>) => {
        e.stopPropagation(); 
    }

    const onNodeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        inputNode && setInputNode({...inputNode, title: e.currentTarget.value});
    }

    const onNodeInputBlur = (e: FocusEvent<HTMLInputElement>) => {
        setInputNode(undefined);
        if (inputNode && inputNode.title) {
            if (inputNode.id === -2) {
                window.Main.invoke(new MsgListInsert(inputNode)).then(ok => ok && selectTreeNodes());
            } else {
                window.Main.invoke(new MsgListUpdate({id: inputNode.id, title: inputNode.title})).then(ok => ok && selectTreeNodes());
            }
        }
    }

    const onNodeInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    }

    const menuItems = () => {
        const separator = { separator: true };
        const actionNewGroup = {
            label: '新建群组',
            icon: 'pi pi-fw pi-link',
            command: () => insertNode(true),
        };

        const actionNewList = {
            label: '新建清单',
            icon: 'pi pi-fw pi-trash',
            command: () => insertNode(false),
        };

        const actionRenameNode = {
            label: '重命名',
            icon: 'pi pi-fw pi-link',
            command: () => setInputNode(contextNode),
        };

        const actionDeleteNode = {
            label: '删除',
            icon: 'pi pi-fw pi-trash',
            command: () => contextNode && updateListIsDelete({ id: contextNode.id, isDelete: true }),
        };

        if (contextNode) {
            const { isGroup } = contextNode;
            if (isGroup) {
                return [actionNewGroup, actionNewList, separator, actionRenameNode, separator, actionDeleteNode];
            } else {
                return [actionRenameNode, separator, actionDeleteNode];
            }
        } else {
            return [actionNewGroup, actionNewList];
        }
    }

    const onContextMenu = (e: MouseEvent<HTMLDivElement>, node?: INodeData) => {
        contextMenuRef.current?.show(e);
        setContextNode(node);
    }

    const nodeRender = (node: INodeItem) => {
        const { id, title, isGroup, level, selected, expanded } = node;

        const IconHead = isGroup ? IconHangcheng : IconMulu;
        const IconTail = isGroup ? expanded ? IconUp : IconDown : undefined;

        return (
            <NodeContainer key={id} selected={selected} onClick={() => onListSelect(node)} onContextMenu={e => onContextMenu(e, node)}>
                <NodePadding level={level} />
                <IconHead size={theme.icon_size.xs} />
                {id === inputNode?.id ? <NodeInput autoFocus value={inputNode?.title} onClick={e => onNodeInputClick(e)} onChange={e => onNodeInputChange(e)} onBlur={e => onNodeInputBlur(e)} onKeyPress={e => onNodeInputKeyPress(e)}/> : <NodeText>{title}</NodeText> }
                {IconTail && <IconTail size={theme.icon_size.xs} />}
            </NodeContainer>
        );
    }

    return (
        <OuterBox>
            <NodeContextMenu model={menuItems()} ref={contextMenuRef} />
            <Container className={className} onContextMenu={e => onContextMenu(e, undefined)}>
                {nodes.map(node => nodeRender(node))}
            </Container>
        </OuterBox>
    );
}

export const ListTree = forwardRef(ListTreeBase);

const initMap = (map: Map<number, INodeItem>, rawNodes: INodeData[], listSelected: IListBasic | undefined) => {
    map.clear();
    
    rawNodes.forEach(node => {
        const { id, parentId, isGroup } = node;
        let children = map.get(id)?.children || [];
        const newNode = { ...node, children, level: -1, selectable: !isGroup, selected: listSelected ? listSelected.id === id : false, expanded: false };
        map.set(id, newNode)
        const parent = map.get(parentId);
        if (parent) {
            parent.children = parent.children.concat([newNode]);
        } else {
            parentId >= 0 && map.set(parentId, { id: parentId, parentId: -2, title: '', isGroup: true, children: [newNode], level: 0, selectable: false, selected: false, expanded: false });
        }

        if (parentId === -1) {
            rootNode = node;
        }
    });

    if (rootNode !== undefined) {
        const root = map.get(rootNode.id)!;
        updateNodeLevel(-2, root);
    }
}

const updateNodeLevel = (parentLevel: number, node: INodeItem) => {
    node.level = parentLevel + 1;
    node.children.sort(({ isGroup: a }, { isGroup: b }) => {
        if (a && !b) {
            return -1;
        } else if (!a && b) {
            return 1;
        } else {
            return 0;
        }
    }).forEach(item => updateNodeLevel(node.level, item));
}

const getSawNodes = (map: Map<number, INodeItem>, listSelected: IListBasic | undefined, listExpanded: Array<number>) => {
    let sawNodes: INodeItem[] = [];

    if (rootNode !== undefined) {
        const root = map.get(rootNode.id)!;
        sawNodes = appendSawNodes(sawNodes, root.children, listSelected, listExpanded);
    }
    return sawNodes;
}

const appendSawNodes = (sawNodes: INodeItem[], nodes: INodeItem[], listSelected: IListBasic | undefined, listExpanded: Array<number>) => {
    nodes.forEach(item => {
        const { id } = item;
        let selected = false;
        let expanded = false;
        if (listSelected) {
            const { id: curId } = listSelected;
            if (curId === id) {
                selected = true;
            }
        }
        if (listExpanded.includes(id)) {
            expanded = true;
        }
        sawNodes.push({ ...item, selected, expanded });
        const { isGroup } = item;
        if (isGroup && expanded) {
            sawNodes = sawNodes.concat(appendSawNodes([], item.children, listSelected, listExpanded));
        }
    });
    return sawNodes;
}

const OuterBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: ${props => props.theme.font_size.s};
`

const NodeContextMenu = styled(ContextMenu)`
    font-size: ${props => props.theme.font_size.xs};
    width: 120px;

    & .p-menuitem-link {
        padding: 0.5em 1em;
    }
`

const NodeContainer = styled.div.attrs({} as { selected: boolean })`
    padding: 0px 8px;
    height: 30px;
    display: flex;
    align-items: center;
    cursor: default;
    ${props => props.selected && css`
        color: ${props => props.theme.color.white};
        background-color: ${props => props.theme.color.carolina_blue};
    `}

    &:hover {
        ${props => !props.selected && css`
            color: ${props => props.theme.color.white};
            background-color: ${props => props.theme.color.periwinkle};
        `}
    }
`

const NodePadding = styled.div.attrs({} as { level: number })`
    width: ${props => props.level * 16}px;
`

const NodeInput = styled.input`
    flex: 1; 
    margin: 0px 8px;
    font-family: inherit;
    font-size: inherit;

    &:focus {
        outline: none;
    }
`

const NodeText = styled.span`
    flex: 1;
    margin: 0px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`


