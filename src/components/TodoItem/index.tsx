import { ITodo } from '@/interface/Todo';
import React, { useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import IconLiebiao from '../iconfont/IconLiebiao';

export const TodoItem = (props: ITodo) => {
  const { content } = props;

  return (
    <Container>
      {content}
      <IconBtn>
        <IconLiebiao />
      </IconBtn>
    </Container>
  );
}

const Container = styled.div`
  background-color: #ccc;
  padding: 12px 20px;
  margin: 1px;
  border-radius: 4px;
`

const IconBtn = styled.button`
  width: 20px;
  height: 20px;
`