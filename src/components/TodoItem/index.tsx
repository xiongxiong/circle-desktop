import { MsgTodoUpdate } from '@/interface/BridgeMsg';
import { ITodo, ITodoBasic, ITodoUpdateIsFinish } from '@/interface/Todo';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IClassName } from '~/interfaces/Component';
import IconDuigouWeigouxuan from '../@iconfont/IconDuigouWeigouxuan';
import IconDuigouzhong from '../@iconfont/IconDuigouzhong';
import IconLiebiao from '../@iconfont/IconLiebiao';
import IconZengjia from '../@iconfont/IconZengjia';

export interface ITodoItem extends IClassName {
  todo: ITodo,
  isSelected?: boolean,
  toFolder: (todo: ITodoBasic) => void,
  toFinish: (todo: ITodoUpdateIsFinish) => void
}

export const TodoItem = (props: ITodoItem) => {

  const { todo, todo: {content: initContent, isFinish, childrenCount}, isSelected = false, toFolder = (todo: ITodo) => {}, toFinish = (todo: ITodoUpdateIsFinish) => {}, className } = props;

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

  const finishTodo = () => {
    const {id} = todo;
    toFinish({id, isFinish: true});
  };

  const unFinishTodo = () => {
    const {id} = todo;
    toFinish({id, isFinish: false});
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

  const iconSize = 24;

  return (
    <Container className={className} isSelected={isSelected}>
      <Content value={content} onChange={onChange} onFocus={onFocus} onBlur={onBlur} onKeyPress={onKeyPress} />
      <IconGroup onClick={(e) => e.stopPropagation()}>
        {childrenCount === 0 ? (
          isFinish ? (
            <IconDuigouzhong size={iconSize} onClick={unFinishTodo} />
          ) : (
            <IconDuigouWeigouxuan size={iconSize} onClick={finishTodo} />
          )
        ) : undefined}
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

