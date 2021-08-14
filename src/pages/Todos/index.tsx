import { List, ListProps, Input, InputProps } from 'antd';
import React from 'react';
import styled, { StyledComponent, ThemeContext } from 'styled-components';
import { ITodoInsert, ITodo, ITodoBasic } from '@/interface/Todo';
import { MsgTodoSelectList, MsgTodoInsert, MsgTodoDelete } from '@/interface/BridgeMsg';
import { TodoItem } from '~/components/TodoItem';
import { ListItemProps } from 'antd/lib/list';
import { useState } from 'react';
import { useEffect } from 'react';
import IconFangzi from '~/components/@iconfont/IconFangzi';
import { TodoNav } from '~/components/TodoNav';
import IconZengjia from '~/components/@iconfont/IconZengjia';
import { useContext } from 'react';
import { Empty } from '~/components/Empty';

export interface ITodosProps {

}

export const Todos = (props: ITodosProps) => {

    const [navNodes, setNavNodes] = useState([nodeHome] as ITodoBasic[]);
    const [todos, setTodos] = useState([] as ITodo[]);
    const [currentNode, setCurrentNode] = useState(nodeHome as ITodoBasic);
    const [currentTodo, setCurrentTodo] = useState(undefined as (ITodo | undefined));
    const [newTodo, setNewTodo] = useState(todoBlank);

    const theme = useContext(ThemeContext);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewTodo({ content: event.target.value });

    const selectTodoList = () => {
        const {id} = currentNode || {};
        window.Main.invoke(new MsgTodoSelectList({parentId: id})).then((todos) => {
            console.log("todos : ", todos);
            setTodos(todos);
        });
    }

    useEffect(selectTodoList, [currentNode]);

    const insertTodo = () => {
        const {id} = currentNode || {};
        if (newTodo.content.trim().length > 0) {
            window.Main.invoke(new MsgTodoInsert({ ...newTodo, parentId: id })).then(() => setNewTodo(todoBlank)).then(selectTodoList);
        }
    }

    const deleteTodo = (todo: ITodo) => {
        window.Main.invoke(new MsgTodoDelete(todo)).then(selectTodoList);
    }

    const toNextLev = (todo: ITodo) => {
        setNavNodes(navNodes.concat([todo]));
        setCurrentNode(todo);
    }

    const toPrevLev = (todo: ITodoBasic) => {
        setNavNodes(navNodes.slice(0, navNodes.indexOf(todo) + 1));
        setCurrentNode(isHomeNode(todo) ? nodeHome : todo as ITodo);
    }

    const navNodeRender = (node: ITodoBasic, index: number, nodes: ITodoBasic[]) => {
        const isHead = index === 0;
        const isTail = index === nodes.length - 1;
        return isTail ? (
            <span>{node.content}</span>
        ) : (
            <TodoNode onClick={() => toPrevLev(node)}>{node.content}</TodoNode>
        );
    }

    const listItemRender = (item: ITodo) => (
        <TodoListItem key={item.id} onClick={() => setCurrentTodo(item)}>
            <TodoItem {...{ todo: item, isSelected: item === currentTodo, toFolder: toNextLev, toDelete: deleteTodo }} />
        </TodoListItem>
    )

    return (
        <Container>
            {navNodes.length <= 1 ? undefined : (<TodoNav renderItem={navNodeRender} nodes={navNodes} />)}
            {todos.length === 0 ? (
                <Empty width="30%" />
            ) : (
                <TodoList dataSource={todos} renderItem={listItemRender} />
            )}
            <InputContainer>
                <IconZengjia color={theme._1} />
                <TodoInput size='large' placeholder='Add a Task' value={newTodo.content} onChange={onChange} onPressEnter={insertTodo} />
            </InputContainer>
        </Container>
    );
}

const Container = styled.div`
    flex: 1;
	height: 100vh;
	padding: 25px;
	display: flex;
	flex-direction: column;
	justify-content: center;
    background-color: ${props => props.theme._0};
`

const TodoList: StyledComponent<React.ComponentType<ListProps<ITodo>>, any> = styled(List)`
    flex: 1;
    padding: 10px 0px;
`

const TodoListItem: StyledComponent<React.ComponentType<ListItemProps>, any> = styled(List.Item)`
    list-style-type: none;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 8px;
    background-color: ${props => props.theme._2};
    border-radius: 4px;
`

const TodoInput: StyledComponent<React.ComponentType<InputProps>, any> = styled(Input)`
    flex: 1;
    border: none;
    padding: 8px 8px 6px;
    color: ${props => props.theme._1};
    background-color: transparent;
    font-family: inherit;

    &:focus {
        outline: none;
        border: none;
    }

    &::placeholder {
        color: ${props => props.theme._3};
    }
`

const TodoNode = styled.a`

    &:hover {
        cursor: pointer;
        color: ${props => props.theme._6};
    }
`

const HomeNodeBox = styled.div`
    display: flex;
    align-items: center;
`

const isHomeNode = (todo: ITodoBasic) => todo.id === 0;

const nodeHome: ITodoBasic = { id: 0, content: 'Home' };

const todoBlank: ITodoInsert = { content: '' };

