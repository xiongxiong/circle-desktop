import { ITodo } from "@/interface/Data";
import styled, { css } from "styled-components";
import { IClassName } from "~/interfaces/Component";


export interface ITodoNaviProps extends IClassName {
    nodes: ITodo[],
    toLevPrev: (node: ITodo) => void
}

const NaviNode = (node: ITodo, isTail: boolean, toLevPrev: (node: ITodo) => void = () => { }) => {
    const { id, content } = node;
    return (
        <ItemContainer key={id}>
            <ItemContent clickable={!isTail} onClick={isTail ? undefined : () => toLevPrev(node)}>
                {content}
            </ItemContent>
            {isTail ? undefined : <Arrow />}
        </ItemContainer>
    );
};

export const TodoNavi = (props: ITodoNaviProps) => {

    const { nodes, toLevPrev, className } = props;

    return (
        <Container className={className}>
            {nodes.map((item, index) => NaviNode(item, index === nodes.length - 1, toLevPrev))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: auto;
`

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
`

const ItemContent = styled.a.attrs({} as { clickable: boolean })`
    padding: 4px 4px;
    border-radius: 4px;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${props => props.clickable && css`
        &:hover {
            cursor: default;
            color: ${props => props.theme.color1};
            background-color: ${props => props.theme.color7};
        }
    `}
`

const ArrowBox = styled.div`
    padding: 0px 4px;
`

const arrowBtn = (sign: string, onClick?: () => void) => (
    <ArrowBox onClick={onClick}>
        {sign}
    </ArrowBox>
);

const Arrow = () => arrowBtn('>'); 
