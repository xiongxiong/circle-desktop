import { List, ListProps, Breadcrumb, Typography, Input, InputProps } from 'antd'
import React from 'react'
import styled, { StyledComponent } from 'styled-components'
import { INewTodo, ITodo, ITodoService } from '~/entities/Todo'
import { todoService as dbService } from '~/utils/sqlite'

export class Todos extends React.Component<ITodosProps, ITodosState> {

    constructor(props: ITodosProps) {
        super(props)
        this.state = {
            parentTodos: parentTodos,
            todos: todos,
            currentTodo: undefined,
            newTodo: newTodo
        }
    }

    newTodo = async () => {
        const { newTodo, newTodo: { content }, currentTodo } = this.state
        if (content.trim().length > 0) {
            dbService.create(newTodo)
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
                    <List.Item>
                        <Typography.Text mark>[TODO]</Typography.Text> {item.content}
                    </List.Item>
                )} />
                <TodoInput size='large' value={this.state.newTodo.content} onPressEnter={this.newTodo} />
            </Container>
        )
    }
}

interface ITodosProps {

}

interface ITodosState {
    parentTodos: ITodo[],
    todos: ITodo[],
    currentTodo?: ITodo,
    newTodo: INewTodo
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
    padding: 25px;
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

const parentTodos = [
    {
        id: 0,
        content: '把大象装进冰箱需要几步？',
        children: []
    },
    {
        id: 1,
        content: '打开冰箱门',
        children: []
    },
    {
        id: 2,
        content: '什么样的冰箱？',
        children: []
    }
]

const todos = [
    {
        id: 0,
        content: '把大象装进冰箱需要几步？',
        children: [
            {
                id: 1,
                content: '打开冰箱门',
                children: [
                    {
                        id: 2,
                        content: '什么样的冰箱？',
                        children: [
                            {
                                id: 3,
                                content: '温度设定多少？',
                                children: []
                            },
                            {
                                id: 4,
                                content: '大象会冻死吗？',
                                children: []
                            },
                            {
                                id: 5,
                                content: '大象如何呼吸？',
                                children: []
                            }
                        ]
                    },
                    {
                        id: 6,
                        content: '有这么大的冰箱吗？',
                        children: []
                    },
                    {
                        id: 7,
                        content: '冰箱还是冷库？',
                        children: []
                    },
                    {
                        id: 8,
                        content: '冰箱还是冰柜？',
                        children: []
                    }
                ]
            },
            {
                id: 9,
                content: '把大象推进去',
                children: [
                    {
                        id: 10,
                        content: '哪来的大象？',
                        children: []
                    },
                    {
                        id: 11,
                        content: '亚洲象还是非洲象？',
                        children: []
                    },
                    {
                        id: 12,
                        content: '猎杀大象不违法吗？',
                        children: []
                    },
                    {
                        id: 13,
                        content: '死的大象还是活的大象？',
                        children: []
                    },
                    {
                        id: 14,
                        content: '运输大象需要麻醉吗？',
                        children: []
                    }
                ]
            },
            {
                id: 15,
                content: '关上冰箱门',
                children: [
                    {
                        id: 16,
                        content: '需要上锁吗？',
                        children: []
                    },
                    {
                        id: 17,
                        content: '大象跑出来怎么办？',
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 1,
        content: 'Wonder Circle',
        children: [
            {
                id: 18,
                content: '设计初衷',
                children: [
                    {
                        id: 19,
                        content: '千里之行，始于足下',
                        children: []
                    },
                    {
                        id: 20,
                        content: '万丈高台，起于垒土',
                        children: []
                    },
                    {
                        id: 21,
                        content: 'Breakdown，分解任务的能力',
                        children: []
                    }
                ]
            },
            {
                id: 22,
                content: '展示形式',
                children: [
                    {
                        id: 23,
                        content: 'Breadcrumb，面包屑 + 列表',
                        children: []
                    },
                    {
                        id: 24,
                        content: '渐进展开式思维导图',
                        children: []
                    },
                    {
                        id: 25,
                        content: '甘特图，任务管理',
                        children: []
                    }
                ]
            },
        ]
    }
]
