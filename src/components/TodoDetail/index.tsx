import { ITodo, ITodoUpdate, ITodoHasIdContent } from "@/interface/Data";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { MouseEvent } from "react"
import styled, { ThemeContext } from "styled-components"
import { IClassName } from "~/interfaces/Component";
import IconDaohang from "../@iconfont/IconDaohang";
import IconDingdanjihe from "../@iconfont/IconDingdanjihe";
import IconJinrujiantou from "../@iconfont/IconJinrujiantou";
import IconShanchu from "../@iconfont/IconShanchu";
import IconWeizhidifang from "../@iconfont/IconWeizhidifang";

export interface ITodoDetailProps extends IClassName {
    todo: ITodo,
    closePanel: (e: MouseEvent<SVGElement>) => void,
    updateTodoCotent: (todo: ITodoHasIdContent) => void,
    updateTodoComment: (todo: ITodoUpdate) => void,
    updateTodoIsDelete: (e: MouseEvent<SVGElement>, todo: ITodoUpdate) => void,
    moveTodo?: (todo: ITodoHasIdContent) => void,
    copyTodo?: (todo: ITodoHasIdContent) => void,
}

export const TodoDetail = (props: ITodoDetailProps) => {

    const { todo, todo: { id, content: initContent, comment: initComment, updatedAt, isDelete }, closePanel, updateTodoIsDelete, updateTodoCotent, updateTodoComment, moveTodo, copyTodo, className } = props;

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

    const IconDeletion = isDelete ? IconWeizhidifang : IconShanchu;
    
    return (
        <Container className={className}>
            <Header>
                <IconJinrujiantou size={theme.iconSize1} onClick={closePanel} />
                {moveTodo && <IconDaohang size={theme.iconSize1} onClick={() => moveTodo(todo)} />}
                {copyTodo && <IconDingdanjihe size={theme.iconSize1} onClick={() => copyTodo(todo)} />}
                <IconDeletion size={theme.iconSize1} onClick={(e) => updateTodoIsDelete(e, { id, isDelete: !isDelete })} />
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
    height: 30%;
    resize: none;
    padding: 4px;
    border: 1px solid lightgray;
    border-radius: 4px;
    font-family: inherit;

    &:focus{
        outline: none;
    }
`