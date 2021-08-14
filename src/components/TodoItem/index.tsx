import { MsgTodoUpdate } from '@/interface/BridgeMsg';
import { ITodo } from '@/interface/Todo';
import React, { useContext, useState } from 'react';
import styled, { StyledComponent, ThemeContext, ThemedStyledProps } from 'styled-components';
import { IClassName } from '~/interfaces/Component';
import IconLiebiao from '../@iconfont/IconLiebiao';
import IconShanchu from '../@iconfont/IconShanchu';
import IconZengjia from '../@iconfont/IconZengjia';

export interface ITodoItem extends IClassName {
  todo: ITodo,
  isSelected?: boolean,
  toFolder: (todo: ITodo) => void,
  toDelete: (todo: ITodo) => void
}

export const TodoItem = (props: ITodoItem) => {

  const { todo, todo: {content: initContent, childrenCount}, isSelected = false, toFolder, toDelete, className } = props;

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

  const iconSize = 20;

  return (
    <Container className={className} isSelected={isSelected}>
      <Content value={content} onChange={onChange} onFocus={onFocus} onBlur={onBlur} onKeyPress={onKeyPress} />
      <IconGroup>
        {/* <IconShanchu size={iconSize} onClick={() => toDelete(todo)} /> */}
        {childrenCount > 0 ? (
          <IconLiebiao size={iconSize} onClick={() => toFolder(todo)} />
        ) : (
          <IconZengjia size={iconSize} onClick={() => toFolder(todo)} />
        )}
      </IconGroup>
    </Container>
  );
}

const Container = styled.div.attrs({} as {isSelected: boolean})`
  display: flex;
  align-items: center;
  padding: 8px 8px;
  margin: 1px;
  border-radius: 4px;
  background-color: ${props => props.isSelected ? props.theme._3 : props.theme._1};
`

const Content = styled.input`
  flex: 1;
  padding: 4px 8px;
  background-color: transparent;
  border: none;
  font-size: 12px;
  font-family: inherit;

  &:focus {
    background-color: ${props => props.theme._1};
    outline: none;
    border: none;
    border-radius: 4px;
  }
`

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 8px;

  & > * {
    padding: 4px;
    border-radius: 2px;
  }

  & > *:hover {
    cursor: pointer;
  }
`

