import { ITodoHasIdContent } from "@/interface/Data";
import styled from "styled-components";


export interface ITodoNavProps {
    nodes: ITodoHasIdContent[]
    renderItem: (node: ITodoHasIdContent, index: number, nodes: ITodoHasIdContent[]) => JSX.Element
    separator?: () => JSX.Element
}

export const TodoNav = (props: ITodoNavProps) => {

    const defaultSeparator = () => (
        <DefaultSeparatorBox>
            {'>'}
        </DefaultSeparatorBox>
    );

    const renderItemWrapper = (renderItem: (node: ITodoHasIdContent, index: number, nodes: ITodoHasIdContent[]) => JSX.Element, separator: () => JSX.Element) => {
        return (node: ITodoHasIdContent, index: number, nodes: ITodoHasIdContent[]) => {
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

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
    padding: 10px 10px;
    color: ${props => props.theme.color1};
`

const NodeContainer = styled.div`
    display: flex;
    align-items: center;
    height: 26px;
    font-size: 12px;
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