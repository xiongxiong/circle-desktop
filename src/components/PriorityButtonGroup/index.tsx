import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { IClassName } from "~/interfaces/Component";

export interface IPriorityButtonGroupProps extends IClassName {
    setPriority: (priority: number) => void
}

export const PriorityButtonGroup = (props: IPriorityButtonGroupProps) => {

    const {setPriority = () => {}, className} = props;
    const theme = useContext(ThemeContext);

    return (
        <Container className={className}>

        </Container>
    );
}

const Container = styled.div`

`