import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { IClassName } from "~/interfaces/Component";

export interface IPriorityButtonGroupProps extends IClassName {
    colors: string[],
    setPriority: (priority: number) => void
}

export const PriorityButtonGroup = (props: IPriorityButtonGroupProps) => {

    const { colors = [], setPriority = () => { }, className } = props;
    const theme = useContext(ThemeContext);

    const colorBtns = colors.map((color, index) => {
        const idx = index + 1;
        return (
            <Brick key={index} color={color} onClick={() => setPriority(idx)} />
        );
    }).reverse();

    return (
        <Container className={className}>
            <BrickContainer>
                {colorBtns}
            </BrickContainer>
        </Container>
    );
}

const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0px 32px;
`

const BrickContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: stretch;
    height: 20px;
    border-radius: 4px;
    overflow: hidden;
`

const Brick = styled.div.attrs({} as { color: string })`
    flex: 1;
    height: 20px;
    background-color: ${props => props.color};

    &:hover {
        cursor: pointer;
    }
`