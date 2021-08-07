import { List, ListProps, Breadcrumb, Input, InputProps } from 'antd';
import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import { ITodoNew, ITodo } from '@/interface/Todo';
import { MsgTodoList, MsgTodoNew } from '@/interface/BridgeMsg';
import { TodoItem } from '~/components/TodoItem';
import { ListItemProps } from 'antd/lib/list';

export class Todos extends React.Component<ITodosProps, ITodosState> {

    constructor(props: ITodosProps) {
        super(props)
        this.state = {
            parentTodos: [],
            todos: [],
            currentTodo: undefined,
            newTodo: newTodo
        }
    }

    componentDidMount = () => this.selectTodoList();

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ newTodo: { content: event.target.value } });

    selectTodoList = () => {
        window.Main.invoke(new MsgTodoList()).then((todos: ITodo[]) => this.setState({ todos }));
    }

    createTodo = (e: any) => {
        const { newTodo, newTodo: { content }, currentTodo } = this.state
        if (content.trim().length > 0) {
            window.Main.invoke(new MsgTodoNew(newTodo)).then(() => this.setState({ newTodo: { content: '' } })).then(this.selectTodoList);
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Breadcrumb>
                        {this.state.parentTodos.map(item => (
                            <Breadcrumb.Item key={item.id}>{item.content}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </Header>
                <TodoList bordered dataSource={this.state.todos} renderItem={item => (
                    <TodoListItem>
                        <TodoItem {...item} />
                    </TodoListItem>
                )} />
                <TodoInput size='large' value={this.state.newTodo.content} onChange={this.onChange} onPressEnter={this.createTodo} />
            </Container>
        );
    }
}

interface ITodosProps {

}

interface ITodosState {
    parentTodos: ITodo[],
    todos: ITodo[],
    currentTodo?: ITodo,
    newTodo: ITodoNew
}

const Container = styled.div`
	height: 100vh;
	padding: 25px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const Header = styled.div`
    padding: 10px 25px;
    background-color: #ddd;
`

const TodoList: StyledComponent<React.ComponentType<ListProps<ITodo>>, any> = styled(List)`
    flex: 1;
    padding: 10px 0px;
`

const TodoListItem: StyledComponent<React.ComponentType<ListItemProps>, any> = styled(List.Item)`
    list-style-type: none;
`

const TodoInput: StyledComponent<React.ComponentType<InputProps>, any> = styled(Input)`
    padding: 10px;
    background-color: #ddd;
    border: none;
    border-radius: 4px;
`

const newTodo = {
    content: ''
}

