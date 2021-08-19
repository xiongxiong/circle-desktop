import { MsgTodoUpdate } from '@/interface/BridgeMsg';
import { ITodo, ITodoBasic, ITodoUpdateIsFinish } from '@/interface/Todo';
import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { IClassName } from '~/interfaces/Component';
import { IconButton } from '../IconButton';

export interface ITodoItem extends IClassName {
    todo: ITodo,
    isSelected?: boolean,
    isClickedFirstTime?: boolean, // 是否Container区域内第一次点击，Container区域内IconGroup区域外第一次点击默认行为为选中条目，控件仅可以对之后的点击作出响应，IconGroup区域内的控件不受限制
    toFolder: (todo: ITodoBasic) => void,
    toFinish: (todo: ITodoUpdateIsFinish) => void,
    onClick: (event: React.MouseEvent, todo: ITodo) => void,
}

export const TodoItem = (props: ITodoItem) => {

    const { todo, todo: { content: initContent, isFinish, childrenCount }, isSelected = false, isClickedFirstTime = false, toFolder = (todo: ITodo) => { }, toFinish = (todo: ITodoUpdateIsFinish) => { }, onClick = () => {}, className } = props;

    const [priorityMode, setPriorityMode] = useState(false);
    const [content, setContent] = useState(initContent);

    const theme = useContext(ThemeContext);

    const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!isSelected) event.target.blur();
    }

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (content !== initContent) {
            window.Main.invoke(new MsgTodoUpdate({ ...todo, content }));
        }
    }

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            (event.target as HTMLInputElement).blur();
        }
    };

    const finishTodo = () => {
        const { id } = todo;
        toFinish({ id, isFinish: true });
    };

    const unFinishTodo = () => {
        const { id } = todo;
        toFinish({ id, isFinish: false });
    };

    const onContainerClick = (event: React.MouseEvent) => {
        onClick(event, todo);
        event.stopPropagation();
    }

    const switchPriorityMode = () => {
        if (isSelected) {
            setPriorityMode(!priorityMode);
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

    return (
        <Container className={className} isSelected={isSelected} onClick={onContainerClick}>
            <PriorityButton onClick={switchPriorityMode} />
            {isSelected && priorityMode ? (
                <PriorityContainer>

                </PriorityContainer>
            ) : (
                <ContentContainer>
                    <Content value={content} onChange={onChange} onFocus={onFocus} onBlur={onBlur} onKeyPress={onKeyPress} />
                    <IconGroup>
                        {childrenCount === 0 ? (
                            isFinish ? (
                                <IconButton name="duigouzhong" size={theme.iconSize0} onClick={unFinishTodo} />
                            ) : (
                                <IconButton name="duigouweigouxuan" size={theme.iconSize0} onClick={finishTodo} />
                            )
                        ) : (
                            isFinish ? (
                                <IconButton name="duigouzhong" size={theme.iconSize0} disabled={true} />
                            ) : (
                                <IconButton name="duigouweigouxuan" size={theme.iconSize0} disabled={true} />
                            )
                        )}
                        {childrenCount > 0 ? (
                            <IconButton name="liebiao" size={theme.iconSize0} onClick={() => toFolder(todo)} />
                        ) : (
                            <IconButton name="zengjia" size={theme.iconSize0} onClick={() => toFolder(todo)} />
                        )}
                    </IconGroup>
                </ContentContainer>
            )}
        </Container>
    );
}

const Container = styled.div.attrs({} as { isSelected: boolean })`
    height: 41px;
    display: flex;
    align-items: stretch;
    margin: 1px;
    border-radius: 4px;
    overflow: hidden;
    background-color: ${props => props.isSelected ? props.theme.color3 : props.theme.color1};
`

const PriorityButton = styled.div`
    width: 16px;
    background-color: orange;
`

const PriorityContainer = styled.div`
    flex: 1;
`

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    padding: 8px 8px;
`

const Content = styled.input`
    flex: 1;
    padding: 4px 8px;
    background-color: transparent;
    border: none;
    font-size: 12px;
    font-family: inherit;

    &:focus {
        background-color: ${props => props.theme.color1};
        outline: none;
        border: none;
        border-radius: 4px;
    }
`

const IconGroup = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 4px 0px 8px;

    & > * {
        padding: 2px;
        margin: 0px 2px;
        border-radius: 2px;
    }
`

