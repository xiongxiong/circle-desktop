import { ITodo, ITodoUpdateIsDelete } from "@/interface/Todo";
import { useContext } from "react";
import { MouseEvent } from "react"
import styled, { ThemeContext } from "styled-components"
import { IClassName } from "~/interfaces/Component";
import { IconButton } from "../IconButton";

export interface ITodoDetailProps extends IClassName {
    todo?: ITodo,
    closePanel: (e: MouseEvent<HTMLDivElement>) => void,
    updateTodoIsDelete: (e: MouseEvent<HTMLDivElement>, todo: ITodoUpdateIsDelete) => void,
}

export const TodoDetail = (props: ITodoDetailProps) => {

    const {todo, closePanel, updateTodoIsDelete, className} = props;
    const {id, content} = todo || {id: 0};

    const theme = useContext(ThemeContext);

    return (
        <Container className={className}>
            <Header>

            </Header>
            <Body>
                <Content value={content} />
            </Body>
            <Footer>
                <Icon name="jinrujiantou" size={theme.iconSize0} onClick={closePanel}/>
                <Icon name="shanchu" size={theme.iconSize0} onClick={(e) => updateTodoIsDelete(e, {id, isDelete: true})}/>
            </Footer>
        </Container>
    )
}

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    
`

const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;
    padding: 8px;
`

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
`

const Content = styled.textarea`
    resize: none;
    padding: 4px;
    border: 1px solid lightgray;
    border-radius: 4px;
    font-family: inherit;
`

const Icon = styled(IconButton)`
    padding: 2px;
    border-radius: 2px;
`