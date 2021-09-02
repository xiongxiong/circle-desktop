import { ITodo, ITodoHasIdComment, ITodoHasIdContent, ITodoUpdateIsDelete } from "@/interface/Todo";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { MouseEvent } from "react"
import styled, { ThemeContext } from "styled-components"
import { IClassName } from "~/interfaces/Component";
import { IconButton } from "../IconButton";

export interface ITodoDetailProps extends IClassName {
    todo: ITodo,
    closePanel: (e: MouseEvent<HTMLDivElement>) => void,
    updateTodoCotent: (todo: ITodoHasIdContent) => void,
    updateTodoComment: (todo: ITodoHasIdComment) => void,
    updateTodoIsDelete: (e: MouseEvent<HTMLDivElement>, todo: ITodoUpdateIsDelete) => void,
    moveTodo: (todo: ITodoHasIdContent) => void,
    copyTodo: (todo: ITodoHasIdContent) => void,
}

export const TodoDetail = (props: ITodoDetailProps) => {

    const { todo, todo: { id, content: initContent, comment: initComment, updatedAt }, closePanel, updateTodoIsDelete, updateTodoCotent, updateTodoComment, moveTodo, copyTodo, className } = props;

    const [content, setContent] = useState(initContent);
    const [comment, setComment] = useState(initComment);

    useEffect(() => setContent(initContent), [initContent]);
    useEffect(() => setComment(initComment), [initComment]);

    const theme = useContext(ThemeContext);

    const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }

    const onContentFinish = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        if (content !== initContent) {
            updateTodoCotent({id, content});
        }
    }

    const onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    }

    const onCommentFinish = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        if (comment !== initComment) {
            updateTodoComment({id, comment});
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
                <Content value={content} onChange={event => onContentChange(event)} onBlur={event => onContentFinish(event)} />
                <Content value={comment} onChange={event => onCommentChange(event)} onBlur={event => onCommentFinish(event)} />
            </Body>
            <Footer>
                {updatedAt}
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
    justify-content: center;
    align-items: center;
    padding: 8px;
    font-size: 10px;
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