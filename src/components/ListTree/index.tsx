import { IListBasic } from "@/interface/Data";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css, ThemeContext } from "styled-components"
import { IClassName } from "~/interfaces/Component";
import { useAppSelector } from "~/store/hooks";
import { selectCurList, setCurList } from "~/store/slice/curListSlice";
import IconHangcheng from "../@iconfont/IconHangcheng";
import IconJinrujiantou from "../@iconfont/IconJinrujiantou";
import IconMulu from "../@iconfont/IconMulu";
import IconXialajiantouxiao from "../@iconfont/IconXialajiantouxiao";
import { IconButton } from "../IconButton";

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

export const ListTree = (props: IListTreeProps) => {

    const {nodes: rawNodes, className} = props;

    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const curList = useAppSelector(selectCurList);

    const map = new Map<number, INodeItem>();
    initMap(map, rawNodes, curList);

    const [nodes, setNodes] = useState([] as INodeItem[]);

    useEffect(() => {
        const sawNodes = getSawNodes(map);
        setNodes(sawNodes);
    }, [rawNodes, curList]);

    const toggleExpand = (event: React.MouseEvent<HTMLDivElement>, node: INodeItem) => {
        event.stopPropagation();
        
        const {id, expanded} = node;
        map.get(id)!.expanded = !expanded;
        const sawNodes = getSawNodes(map);
        setNodes(sawNodes);
    }

    const onListSelect = (node: INodeItem) => {
        dispatch(setCurList(node));
    }

    const nodeRender = (node: INodeItem) => {
        const {id, parentId, title, isGroup, level, selected, expanded} = node;

        const IconHead = isGroup ? IconHangcheng : IconMulu;
        const IconTail = isGroup ? IconButton(expanded ? IconXialajiantouxiao : IconJinrujiantou) : undefined;

        return (
            <NodeContainer key={id} selected={selected} onClick={() => onListSelect(node)}>
                <NodePadding level={level} />
                <IconHead size={theme.iconSize1} />
                <NodeText>{title}</NodeText>
                {IconTail && <IconTail size={theme.iconSize1} padding={"0px"} onClick={(event) => toggleExpand(event, node)} />}
            </NodeContainer>
        );
    }

    return (
        <Container className={className}>
            {nodes.map(node => nodeRender(node))}
        </Container>
    );
}

const initMap = (map: Map<number, INodeItem>, rawNodes: INodeData[], curList: IListBasic | undefined) => {
    let rootId;
    rawNodes.forEach(node => {
        const {id, parentId, isGroup} = node;
        let children = map.get(id)?.children || [];
        const newNode = {...node, children, level: -1, selectable: !isGroup, selected: curList ? curList.id === id : false, expanded: false};
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
    node.children.forEach(item => updateNodeLevel(node.level, item));
}

const getSawNodes = (map: Map<number, INodeItem>) => {
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
        sawNodes = appendSawNodes(sawNodes, root.children);
    }
    return sawNodes;
}

const appendSawNodes = (sawNodes: INodeItem[], nodes: INodeItem[]) => {
    nodes.sort(({isGroup: a}, {isGroup: b}) => {
        if (a && !b) {
            return -1;
        } else if (!a && b) {
            return 1;
        } else {
            return 0;
        }
    }).forEach(item => {
        sawNodes.push(item);
        const {isGroup, expanded} = item;
        if (isGroup && expanded) {
            sawNodes = sawNodes.concat(appendSawNodes([], item.children));
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
        background-color: ${props => props.theme.color0};
    `}
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


