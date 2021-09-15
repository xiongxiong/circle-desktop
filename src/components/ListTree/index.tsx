import { IListBasic } from "@/interface/Data";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css, ThemeContext } from "styled-components"
import { IClassName } from "~/interfaces/Component";
import { useAppSelector } from "~/store/hooks";
import { addListExpanded, delListExpanded, expandedList, selectedList, setListSelected } from "~/store/slice/ListStateSlice";
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

export interface IListTreeProps extends IClassName {
    nodes: INodeData[]
}

const map = new Map<number, INodeItem>();

export const ListTree = (props: IListTreeProps) => {

    const {nodes: rawNodes, className} = props;

    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const listSelected = useAppSelector(selectedList);
    const listExpanded = useAppSelector(expandedList);

    const [nodes, setNodes] = useState([] as INodeItem[]);

    useEffect(() => {
        initMap(map, rawNodes, listSelected);
        const sawNodes = getSawNodes(map, listSelected, listExpanded);
        setNodes(sawNodes);
    }, [rawNodes, listSelected, listExpanded]);

    const toggleExpand = (node: INodeItem) => {
        const {id, expanded, isGroup} = node;
        isGroup && dispatch(expanded ? delListExpanded(id) : addListExpanded(id));
    }

    const onToggleExpand = (event: React.MouseEvent<HTMLDivElement>, node: INodeItem) => {
        event.stopPropagation();
        toggleExpand(node);
    }

    const onListSelect = (node: INodeItem) => {
        dispatch(setListSelected(node));
        toggleExpand(node);
    }

    const nodeRender = (node: INodeItem) => {
        const {id, parentId, title, isGroup, level, selected, expanded} = node;

        const IconHead = isGroup ? IconHangcheng : IconMulu;
        const IconTail = isGroup ? expanded ? IconUp : IconDown : undefined;

        return (
            <NodeContainer key={id} selected={selected} onClick={() => onListSelect(node)}>
                <NodePadding level={level} />
                <IconHead size={theme.iconSize1} />
                <NodeText>{title}</NodeText>
                {IconTail && <IconTail size={theme.iconSize1} />}
            </NodeContainer>
        );
    }

    return (
        <Container className={className}>
            {nodes.map(node => nodeRender(node))}
        </Container>
    );
}

const initMap = (map: Map<number, INodeItem>, rawNodes: INodeData[], listSelected: IListBasic | undefined) => {
    map.clear();

    let rootId;
    rawNodes.forEach(node => {
        const {id, parentId, isGroup} = node;
        let children = map.get(id)?.children || [];
        const newNode = {...node, children, level: -1, selectable: !isGroup, selected: listSelected ? listSelected.id === id : false, expanded: false};
        map.set(id, newNode)
        const parent = map.get(parentId);
        if (parent) {
            parent.children = parent.children.concat([newNode]);
        } else {
            parentId >= 0 && map.set(parentId, {id: parentId, parentId: -2, title: '', isGroup: true, children: [newNode], level: 0, selectable: false, selected: false, expanded: false});
        }

        if (parentId === -1) {
            rootId = id;
        }
    });

    if (rootId !== undefined) {
        const root = map.get(rootId)!;
        updateNodeLevel(-2, root);
    }
}

const updateNodeLevel = (parentLevel: number, node: INodeItem) => {
    node.level = parentLevel + 1;
    node.children.sort(({isGroup: a}, {isGroup: b}) => {
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
    let rootId;

    map.forEach(item => {
        const {id, parentId} = item;
        if (parentId === -1) {
            rootId = id;
        }
    });
    
    if (rootId !== undefined) {
        const root = map.get(rootId)!;
        sawNodes = appendSawNodes(sawNodes, root.children, listSelected, listExpanded);
    }
    return sawNodes;
}

const appendSawNodes = (sawNodes: INodeItem[], nodes: INodeItem[], listSelected: IListBasic | undefined, listExpanded: Array<number>) => {
    nodes.forEach(item => {
        const {id} = item;
        let selected = false;
        let expanded = false;
        if (listSelected) {
            const {id: curId} = listSelected;
            if (curId === id) {
                selected = true;
            }
        }
        if (listExpanded.includes(id)) {
            expanded = true;
        }
        sawNodes.push({...item, selected, expanded});
        const {isGroup} = item;
        if (isGroup && expanded) {
            sawNodes = sawNodes.concat(appendSawNodes([], item.children, listSelected, listExpanded));
        }
    });
    return sawNodes;
}

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow-y: auto;
    font-size: ${props => props.theme.fontSize2};
`

const NodeContainer = styled.div.attrs({} as {selected: boolean})`
    padding: 4px 8px;
    display: flex;
    align-items: center;
    cursor: default;
    ${props => props.selected && css`
        color: ${props => props.theme.color1};
        background-color: ${props => props.theme.color6};
    `}

    &:hover {
        ${props => !props.selected && css`
            color: ${props => props.theme.color1};
            background-color: ${props => props.theme.color3};
        `}
    }
`

const NodePadding = styled.div.attrs({} as {level: number})`
    width: ${props => props.level * 16}px;
`

const NodeText = styled.span`
    flex: 1;
    margin: 0px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`


