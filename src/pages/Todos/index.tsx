import { Input, InputProps } from 'antd';
import React from 'react';
import styled, { StyledComponent, ThemeContext } from 'styled-components';
import { ITodo, ITodoBasic, ITodoUpdateIsFinish, ITodoUpdateIsDelete, ITodoStat, ITodoUpdatePriority, ITodoHasContent } from '@/interface/Todo';
import { MsgTodoSelectList, MsgTodoInsert, MsgTodoUpdateIsFinish, MsgTodoUpdateIsDelete, MsgTodoSelect, MsgTodoUpdateContent, MsgTodoUpdatePriority, MsgTodoUpdateParentId, MsgTodoDuplicate } from '@/interface/BridgeMsg';
import { TodoItem } from '~/components/TodoItem';
import { useState } from 'react';
import { useEffect } from 'react';
import { TodoNav } from '~/components/TodoNav';
import IconZengjia from '~/components/@iconfont/IconZengjia';
import { useContext } from 'react';
import { Empty } from '~/components/Empty';
import { FlexBox, IFlexBoxRef } from '~/components/FlexBox';
import { createRef } from 'react';
import { ButtonGroup } from '~/components/ButtonGroup';
import { TodoDetail } from '~/components/TodoDetail';

export interface ITodosProps {

}

interface ITodoInAction {
    action: 'move' | 'copy',
    todo: ITodoBasic
}

export const Todos = (props: ITodosProps) => {

    const theme = useContext(ThemeContext);

    const [todos, setTodos] = useState([] as ITodo[]); // 待办列表
    const [currentNode, setCurrentNode] = useState(nodeHome); // 层级导航当前节点
    const [navNodes, setNavNodes] = useState([nodeHome]); // 层级导航
    const [todoStat, setTodoStat] = useState({ childrenCount: 0, childrenFinish: 0 } as ITodoStat); // 待办数量统计
    const [currentTodo, setCurrentTodo] = useState(undefined as (ITodo | undefined)); // 选中待办
    const [newTodo, setNewTodo] = useState(todoBlank); // 新待办
    const [finishStatus, setFinishStatus] = useState(false); // 待办列表完成状态筛选
    const [todoInAction, setTodoInAction] = useState(undefined as (ITodoInAction | undefined)); // 待办移动或复制

    useEffect(() => {
        selectTodoListAndTodoStat(true);
    }, [currentNode, finishStatus]);

    useEffect(() => {
        currentTodo ? openDetail() : closeDetail();
    }, [currentTodo]);

    const finishStatusBtns = () => {
        const { childrenCount = 0, childrenFinish = 0 } = todoStat || {};
        return [
            {
                name: '未完成 ' + (childrenCount - childrenFinish),
                func: () => setFinishStatus(false)
            },
            {
                name: '已完成 ' + (childrenFinish),
                func: () => setFinishStatus(true)
            }
        ];
    };

    const todoPasteBtns = [
        {
            name: '取消',
            func: () => {
                setTodoInAction(undefined);
            }
        },
        {
            name: '粘贴',
            func: () => todoOnAction(currentNode)
        },
    ];

    /**
     * 查询待办列表
     * @param clearBeforeRequest 是否在查询发起前清空当前待办列表
     */
    const selectTodoListAndTodoStat = (clearBeforeRequest: boolean = false) => {
        clearBeforeRequest && setTodos([]);

        const { id: idNode } = currentNode || {};
        window.Main.invoke(new MsgTodoSelectList({ parentId: idNode, isFinish: finishStatus })).then((todos: ITodo[]) => {
            console.log("todos : ", todos);
            setTodos(todos);
        });

        window.Main.invoke(new MsgTodoSelect(currentNode)).then(node => {
            const { childrenCount, childrenFinish } = node || {};
            setTodoStat({ childrenCount, childrenFinish });
        });
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewTodo({ content: event.target.value });

    const insertTodo = () => {
        const { id } = currentNode || {};
        if (newTodo.content.trim().length > 0) {
            window.Main.invoke(new MsgTodoInsert({ ...newTodo, parentId: id })).then((ok) => {
                if (ok) {
                    setNewTodo(todoBlank);
                    selectTodoListAndTodoStat();
                }
            });
        }
    }

    const updateTodoContent = (todo: ITodoBasic) => {
        window.Main.invoke(new MsgTodoUpdateContent(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoIsFinish = (todo: ITodoUpdateIsFinish) => {
        window.Main.invoke(new MsgTodoUpdateIsFinish(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoIsDelete = (event: React.MouseEvent, todo?: ITodoUpdateIsDelete) => {
        if (todo) {
            window.Main.invoke(new MsgTodoUpdateIsDelete(todo)).then(ok => {
                if (ok) {
                    todoSelectedClear();
                    selectTodoListAndTodoStat();
                }
            });
        }
    }

    const updateTodoParentId = (id: number, parentId: number) => {
        window.Main.invoke(new MsgTodoUpdateParentId({ id, parentId })).then(ok => ok && selectTodoListAndTodoStat());
    }

    const duplicateTodo = (id: number, parentId: number) => {
        window.Main.invoke(new MsgTodoDuplicate({ id, parentId })).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoPriority = (todo: ITodoUpdatePriority) => {
        window.Main.invoke(new MsgTodoUpdatePriority(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const moveTodo = (todo: ITodoBasic) => setTodoInAction({ action: 'move', todo });

    const copyTodo = (todo: ITodoBasic) => setTodoInAction({ action: 'copy', todo });

    const todoOnAction = (parentTodo: ITodoBasic) => {
        if (todoInAction) {
            const { id: parentId } = parentTodo;
            const { action, todo: { id } } = todoInAction;
            setTodoInAction(undefined);
            switch (action) {
                case 'move':
                    updateTodoParentId(id, parentId);
                    break;
                case 'copy':
                    break;
                default: break;
            }
        }
    }

    const todoSelected = (event: React.MouseEvent, todo: ITodo) => setCurrentTodo(todo);

    const todoSelectedClear = () => setCurrentTodo(undefined);

    const toLevNext = (todo: ITodoBasic) => {
        setNavNodes(navNodes.concat([todo]));
        setCurrentNode(todo);
        todoSelectedClear();
    }

    const toLevPrev = (todo: ITodoBasic) => {
        setNavNodes(navNodes.slice(0, navNodes.indexOf(todo) + 1));
        setCurrentNode(todo);
    }

    const navNodeRender = (node: ITodoBasic, index: number, nodes: ITodoBasic[]) => {
        const isHead = index === 0;
        const isTail = index === nodes.length - 1;
        return isTail ? (
            <span>{node.content}</span>
        ) : (
            <TodoNode onClick={() => toLevPrev(node)}>{node.content}</TodoNode>
        );
    }

    const detailRef: React.ForwardedRef<IFlexBoxRef> = createRef();

    const openDetail = () => detailRef.current?.stairTo(1);

    const closeDetail = () => detailRef.current?.stairTo(0);

    const listItemRender = (item: ITodo) => {
        const { id } = item;
        const { id: idCurrent } = currentTodo || {};
        return (
            <TodoItem key={item.id} todo={item} isSelected={id === idCurrent} onClick={(event, todo) => todoSelected(event, todo)} onLevNext={toLevNext} onFinish={updateTodoIsFinish} onUpdateContent={updateTodoContent} onUpdatePriority={updateTodoPriority} inAction={!!todoInAction} onAction={todoOnAction} />
        );
    }

    return (
        <FlexBox ref={detailRef} direction='row-reverse' stairs={['30%']}>
            {currentTodo && <TodoDetail todo={currentTodo} closePanel={closeDetail} updateTodoIsDelete={updateTodoIsDelete} updateTodoCotent={updateTodoContent} moveTodo={moveTodo} copyTodo={copyTodo} />}
            <Container onClick={todoSelectedClear}>
                <Header>
                    {navNodes.length <= 1 ? <div /> : (<TodoNav renderItem={navNodeRender} nodes={navNodes} />)}
                    {todoInAction && (<ButtonGroup buttons={todoPasteBtns} />)}
                    <ButtonGroup buttons={finishStatusBtns()} radio />
                </Header>
                <Body>
                    {todos.length === 0 ? (
                        <Empty width="30%" />
                    ) : (
                        <TodoList>
                            {todos.map(item => listItemRender(item))}
                        </TodoList>
                    )}
                </Body>
                <InputContainer>
                    <IconZengjia color={theme.color1} />
                    <TodoInput size='large' placeholder='Add a Task' value={newTodo.content} onFocus={todoSelectedClear} onChange={onChange} onPressEnter={insertTodo} />
                </InputContainer>
            </Container>
        </FlexBox>
    );
}

const Container = styled.div`
    flex: 1;
	padding: 10px 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
    background-color: ${props => props.theme.color0};
`

const Header = styled.div`
    height: 36px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 8px 0px;
    overflow-y: auto;
    
    &::-webkit-scrollbar  
    {
        width: 8px;
        height: 0px;
        background-color: transparent;  
    }  
    &::-webkit-scrollbar-track
    { 
        background-color: transparent;  
    }  
    &::-webkit-scrollbar-thumb
    {
        border-radius: 3px;
        background-color: ${props => props.theme.color3};  
    } 
`

const TodoList = styled.div`
    flex: 1;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 8px;
    background-color: ${props => props.theme.color2};
    border-radius: 4px;
`

const TodoInput: StyledComponent<React.ComponentType<InputProps>, any> = styled(Input)`
    flex: 1;
    border: none;
    padding: 4px 8px 4px;
    color: ${props => props.theme.color1};
    background-color: transparent;
    font-family: inherit;

    &:focus {
        outline: none;
        border: none;
    }

    &::placeholder {
        color: ${props => props.theme.color3};
    }
`

const TodoNode = styled.a`

    &:hover {
        cursor: default;
        color: ${props => props.theme.color6};
    }
`

const HomeNodeBox = styled.div`
    display: flex;
    align-items: center;
`

const isHomeNode = (todo: ITodoBasic) => todo.id === 0;

const nodeHome: ITodoBasic = { id: 0, content: 'Home' };

const todoBlank: ITodoHasContent = { content: '' };

