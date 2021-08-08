import { MsgTodoUpdate } from '@/interface/BridgeMsg';
import { ITodo } from '@/interface/Todo';
import React, { useContext, useState } from 'react';
import styled, { StyledComponent, ThemeContext, ThemedStyledProps } from 'styled-components';
import IconLiebiao from '../@iconfont/IconLiebiao';
import IconZengjia from '../@iconfont/IconZengjia';

export interface ITodoItem {
  todo: ITodo,
  isSelected?: boolean,
  toSubList: (todo: ITodo) => void
}

export const TodoItem = (props: ITodoItem) => {

  const { todo, todo: {content: initContent}, isSelected = false, toSubList } = props;

  const [content, setContent] = useState(initContent);

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isSelected) event.target.blur();
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (content !== initContent) {
      window.Main.invoke(new MsgTodoUpdate({...todo, content}));
    }
  }

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      (event.target as HTMLInputElement).blur();
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

  return (
    <Container isSelected={isSelected}>
      <Content value={content} onChange={onChange} onFocus={onFocus} onBlur={onBlur} onKeyPress={onKeyPress} />
      <Icon size={20} onClick={() => toSubList(todo)} />
    </Container>
  );
}

const ContainerBase = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 1px;
  border-radius: 4px;
`

const ContainerBox = (props: {isSelected: boolean, className?: string, children?: React.ReactNode}) => (<ContainerBase className={props.className}>{props.children}</ContainerBase>);

const Container = styled(ContainerBox)`
  background-color: ${props => props.isSelected ? props.theme._3 : props.theme._1};
`

const Content = styled.input`
  flex: 1;
  padding: 8px 8px;
  background-color: transparent;
  border: none;
`

const Icon = styled(IconLiebiao)`
  padding: 4px;
  margin: 0px 8px;
`