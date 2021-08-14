import { List, ListProps, Input, InputProps } from 'antd';
import React from 'react';
import styled, { StyledComponent, ThemeContext } from 'styled-components';
import { ITodoInsert, ITodo, ITodoBasic, ITodoUpdateIsFinish } from '@/interface/Todo';
import { MsgTodoSelectList, MsgTodoInsert, MsgTodoDelete, MsgTodoUpdateIsFinish } from '@/interface/BridgeMsg';
import { TodoItem } from '~/components/TodoItem';
import { ListItemProps } from 'antd/lib/list';
import { useState } from 'react';
import { useEffect } from 'react';
import IconFangzi from '~/components/@iconfont/IconFangzi';
import { TodoNav } from '~/components/TodoNav';
import IconZengjia from '~/components/@iconfont/IconZengjia';
import { useContext } from 'react';
import { Empty } from '~/components/Empty';
import { FlexBox, IFlexBoxRef } from '~/components/FlexBox';
import IconJinrujiantou from '~/components/@iconfont/IconJinrujiantou';
import IconShanchu from '~/components/@iconfont/IconShanchu';
import { createRef } from 'react';

export interface ITodosProps {

}

export const Todos = (props: ITodosProps) => {

    const [navNodes, setNavNodes] = useState([nodeHome] as ITodoBasic[]);
    const [todos, setTodos] = useState([] as ITodo[]);
    const [currentNode, setCurrentNode] = useState(nodeHome as ITodoBasic);
    const [currentTodo, setCurrentTodo] = useState(undefined as (ITodo | undefined));
    const [newTodo, setNewTodo] = useState(todoBlank);

    /**
     * 查询待办列表
     * @param clearBeforeRequest 是否在查询发起前清空当前待办列表
     */
    const selectTodoList = (clearBeforeRequest: boolean = false) => {
        clearBeforeRequest && setTodos([]);

        const {id} = currentNode || {};
        window.Main.invoke(new MsgTodoSelectList({parentId: id})).then((todos) => {
            console.log("todos : ", todos);
            setTodos(todos);
        });
    }

    useEffect(() => selectTodoList(true), [currentNode]);

    useEffect(() => {
        currentTodo ? openDetailBox() : closeDetailBox();
    }, [currentTodo]);

    const theme = useContext(ThemeContext);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewTodo({ content: event.target.value });

    const insertTodo = () => {
        const {id} = currentNode || {};
        if (newTodo.content.trim().length > 0) {
            window.Main.invoke(new MsgTodoInsert({ ...newTodo, parentId: id })).then((ok) => {
                if (ok) {
                    setNewTodo(todoBlank);
                    selectTodoList();
                }
            });
        }
    }

    const updateTodoIsFinish = (todo: ITodoUpdateIsFinish) => {
        window.Main.invoke(new MsgTodoUpdateIsFinish(todo)).then(ok => ok && selectTodoList());
    }

    const deleteTodo = (todo?: ITodo) => {
        if (todo) {
            window.Main.invoke(new MsgTodoDelete(todo)).then(ok => {
                if (ok) {
                    clearSelect();
                    selectTodoList();
                }
            });
        }
    }

    const selectTodo = (event: React.MouseEvent, todo: ITodo) => {
        event.stopPropagation();
        setCurrentTodo(todo);
    }

    const clearSelect = () => setCurrentTodo(undefined);

    const toNextLev = (todo: ITodoBasic) => {
        setNavNodes(navNodes.concat([todo]));
        setCurrentNode(todo);
        clearSelect();
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

    const detailRef: React.ForwardedRef<IFlexBoxRef> = createRef();

    const openDetailBox = () => detailRef.current?.stairTo(1);

    const closeDetailBox = () => detailRef.current?.stairTo(0);

    const todoDetailBox = () => (
        <DetailContainer>
            <DetailContent>

            </DetailContent>
            <DetailFooter>
                <IconJinrujiantou onClick={closeDetailBox}/>
                <IconShanchu onClick={() => deleteTodo(currentTodo)}/>
            </DetailFooter>
        </DetailContainer>
    );

    const listItemRender = (item: ITodo) => (
        <TodoListItem key={item.id} onClick={(event) => selectTodo(event, item)}>
            <TodoItem todo={item} isSelected={item === currentTodo} toFolder={toNextLev} toFinish={updateTodoIsFinish} />
        </TodoListItem>
    )

    return (
        <FlexBox ref={detailRef} direction='row-reverse' boxRender={todoDetailBox} stairs={['30%']}>
            <Container onClick={clearSelect}>
                {navNodes.length <= 1 ? undefined : (<TodoNav renderItem={navNodeRender} nodes={navNodes} />)}
                {todos.length === 0 ? (
                    <Empty width="30%" />
                ) : (
                    <TodoList dataSource={todos} renderItem={listItemRender} />
                )}
                <InputContainer>
                    <IconZengjia color={theme._1} />
                    <TodoInput size='large' placeholder='Add a Task' value={newTodo.content} onFocus={clearSelect} onChange={onChange} onPressEnter={insertTodo} />
                </InputContainer>
            </Container>
        </FlexBox>
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

const DetailContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const DetailContent = styled.div`
    flex: 1;
`

const DetailFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
`

const isHomeNode = (todo: ITodoBasic) => todo.id === 0;

const nodeHome: ITodoBasic = { id: 0, content: 'Home' };

const todoBlank: ITodoInsert = { content: '' };

