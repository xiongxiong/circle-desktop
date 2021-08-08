import { ITodoNavNode } from "@/interface/Todo";
import styled from "styled-components";


export interface ITodoNavProps {
    nodes: ITodoNavNode[]
    renderItem: (node: ITodoNavNode, index: number, nodes: ITodoNavNode[]) => JSX.Element
    separator?: () => JSX.Element
}

export const TodoNav = (props: ITodoNavProps) => {

    const defaultSeparator = () => (
        <DefaultSeparatorBox>
            {'>'}
        </DefaultSeparatorBox>
    );

    const renderItemWrapper = (renderItem: (node: ITodoNavNode, index: number, nodes: ITodoNavNode[]) => JSX.Element, separator: () => JSX.Element) => {
        return (node: ITodoNavNode, index: number, nodes: ITodoNavNode[]) => {
            const {id} = node;
            const isLast = index === nodes.length - 1;
            return (
                <NodeContainer key={id}>
                    <ItemContainer>
                        {renderItem(node, index, nodes)}
                    </ItemContainer>
                    {isLast ? undefined : separator()}
                </NodeContainer>
            );
        }
    }

    const { nodes, renderItem, separator = defaultSeparator } = props;

    const elems = nodes.map((node, index) => renderItemWrapper(renderItem, separator)(node, index, nodes));

    return (
        <Container>
            {elems}
        </Container>
    );
}

const NodeContainer = styled.div`
    display: flex;
    align-items: center;
`

const Container = styled(NodeContainer)`
    flex-wrap: wrap;
`

const ItemContainer = styled.div`
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const DefaultSeparatorBox = styled.div`
    padding: 0px 8px;
`