import { ITodo, ITodoBasic, ITodoUpdateIsDelete } from "@/interface/Todo";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { MouseEvent } from "react"
import styled, { ThemeContext } from "styled-components"
import { IClassName } from "~/interfaces/Component";
import { IconButton } from "../IconButton";

export interface ITodoDetailProps extends IClassName {
    todo: ITodo,
    closePanel: (e: MouseEvent<HTMLDivElement>) => void,
    updateTodoCotent: (todo: ITodoBasic) => void,
    updateTodoIsDelete: (e: MouseEvent<HTMLDivElement>, todo: ITodoUpdateIsDelete) => void,
    moveTodo: (todo: ITodoBasic) => void,
    copyTodo: (todo: ITodoBasic) => void,
}

export const TodoDetail = (props: ITodoDetailProps) => {

    const { todo, todo: { id, content: initContent }, closePanel, updateTodoIsDelete, updateTodoCotent, moveTodo, copyTodo, className } = props;

    const [content, setContent] = useState(initContent);

    useEffect(() => setContent(initContent), [initContent]);

    const theme = useContext(ThemeContext);

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }

    const onBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        if (content !== initContent) {
            updateTodoCotent({id, content});
        }
    }

    return (
        <Container className={className}>
            <Header>
                <Icon name="jinrujiantou" size={theme.iconSize0} onClick={closePanel} />
                <Icon name="daohang" size={theme.iconSize0} onClick={() => moveTodo(todo)} />
                <Icon name="dingdanjihe" size={theme.iconSize0} onClick={() => copyTodo(todo)} />
                <Icon name="shanchu" size={theme.iconSize0} onClick={(e) => updateTodoIsDelete(e, { id, isDelete: true })} />
            </Header>
            <Body>
                <Content value={content} onChange={event => onChange(event)} onBlur={event => onBlur(event)} />
            </Body>
            <Footer>
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
    display: flex;
    justify-content: space-between;
    padding: 8px;
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

    &:focus{
        outline: none;
    }
`

const Icon = styled(IconButton)`
    padding: 2px;
    border-radius: 2px;
`