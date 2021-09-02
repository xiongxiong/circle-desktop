import React from 'react';
import styled, { StyledComponent, ThemeContext } from 'styled-components';
import { ITodo, ITodoHasIdContent, ITodoUpdateIsFinish, ITodoUpdateIsDelete, ITodoStat, ITodoUpdatePriority, IHasContent, ITodoHasIdComment, TodoStatus } from '@/interface/Todo';
import { MsgTodoSelectList, MsgTodoInsert, MsgTodoUpdateIsFinish, MsgTodoUpdateIsDelete, MsgTodoSelect, MsgTodoUpdateContent, MsgTodoUpdatePriority, MsgTodoUpdateParentId, MsgTodoDuplicate, MsgTodoUpdateComment } from '@/interface/BridgeMsg';
import { TodoItem } from '~/components/TodoItem';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Empty } from '~/components/Empty';
import { FlexBox, IFlexBoxRef } from '~/components/FlexBox';
import { createRef } from 'react';
import { ButtonGroup } from '~/components/ButtonGroup';
import { TodoDetail } from '~/components/TodoDetail';
import { IconButton } from '~/components/IconButton';
import IconSousuo from '~/components/@iconfont/IconSousuo';
import { StoreContext } from '~/store/Store';

export interface ITodosProps {
    
}

enum TodoActions {
    MOVE,
    COPY
}

interface ITodoInAction {
    action: TodoActions,
    todo: ITodoHasIdContent
}

export const Todos = (props: ITodosProps) => {

    const theme = useContext(ThemeContext);
    const store = useContext(StoreContext);

    const [todos, setTodos] = useState([] as ITodo[]); // 待办列表
    const [currentNode, setCurrentNode] = useState(nodeHome); // 层级导航当前节点
    const [navNodes, setNavNodes] = useState([nodeHome]); // 层级导航
    const [todoStat, setTodoStat] = useState({ childrenCount: 0, childrenFinish: 0, childrenDelete: 0 } as ITodoStat); // 待办数量统计
    const [currentTodo, setCurrentTodo] = useState(undefined as (ITodo | undefined)); // 选中待办
    const [tosoStatus, setTodoStatus] = useState(TodoStatus.DOING); // 待办列表状态筛选
    const [todoInAction, setTodoInAction] = useState(undefined as (ITodoInAction | undefined)); // 待办移动或复制

    useEffect(() => {
        selectTodoListAndTodoStat(true);
    }, [currentNode, tosoStatus]);

    useEffect(() => {
        currentTodo ? openDetail() : shutDetail();
    }, [currentTodo]);

    const finishStatusBtns = () => {
        const { childrenCount = 0, childrenFinish = 0, childrenDelete = 0 } = todoStat || {};
        return [
            {
                text: '未完成 ' + (childrenCount - childrenFinish - childrenDelete),
                func: () => setTodoStatus(TodoStatus.DOING)
            },
            {
                text: '已完成 ' + (childrenFinish),
                func: () => setTodoStatus(TodoStatus.DONE)
            },
            {
                text: '已删除 ' + (childrenDelete),
                func: () => setTodoStatus(TodoStatus.DELETED)
            }
        ];
    };

    const searchBtns = () => [
        {
            icon: () => (<IconSousuo size={theme.iconSize0}/>),
            func: () => store.setViewModeToList()
        },
    ];

    const todoPasteBtns = [
        {
            icon: () => (<IconButton name="shibai" size={theme.iconSize0}/>),
            text: '取消',
            func: () => setTodoInAction(undefined)
        },
        {
            icon: () => (<IconButton name="qitadingdan" size={theme.iconSize0}/>),
            text: '粘贴',
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
        window.Main.invoke(new MsgTodoSelectList({ parentId: idNode, status: tosoStatus })).then((todos: ITodo[]) => {
            console.log("todos : ", todos);
            setTodos(todos);
        });

        window.Main.invoke(new MsgTodoSelect(currentNode)).then(node => {
            const { childrenCount, childrenFinish, childrenDelete } = node || {};
            setTodoStat({ childrenCount, childrenFinish, childrenDelete });
        });
    }

    const updateTodoContent = (todo: ITodoHasIdContent) => {
        window.Main.invoke(new MsgTodoUpdateContent(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoComment = (todo: ITodoHasIdComment) => {
        window.Main.invoke(new MsgTodoUpdateComment(todo)).then(ok => ok && selectTodoListAndTodoStat());
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

    const moveTodo = (todo: ITodoHasIdContent) => setTodoInAction({ action: TodoActions.MOVE, todo });

    const copyTodo = (todo: ITodoHasIdContent) => setTodoInAction({ action: TodoActions.COPY, todo });

    const todoOnAction = (parentTodo: ITodoHasIdContent) => {
        if (todoInAction) {
            const { id: parentId } = parentTodo;
            const { action, todo: { id } } = todoInAction;
            setTodoInAction(undefined);
            switch (action) {
                case TodoActions.MOVE:
                    updateTodoParentId(id, parentId);
                    break;
                case TodoActions.COPY:
                    duplicateTodo(id, parentId);
                    break;
                default: break;
            }
        }
    }

    const todoSelected = (event: React.MouseEvent, todo: ITodo) => setCurrentTodo(todo);

    const todoSelectedClear = () => setCurrentTodo(undefined);

    const toLevNext = (todo: ITodoHasIdContent) => {
        setNavNodes(navNodes.concat([todo]));
        setCurrentNode(todo);
        todoSelectedClear();
    }

    const detailRef: React.ForwardedRef<IFlexBoxRef> = createRef();

    const openDetail = () => detailRef.current?.stairTo(1);

    const shutDetail = () => detailRef.current?.stairTo(0);

    const listItemRender = (item: ITodo) => {
        const { id } = item;
        const { id: idCurrent } = currentTodo || {};
        return (
            <TodoItem key={item.id} todo={item} isSelected={id === idCurrent} onClick={(event, todo) => todoSelected(event, todo)} onLevNext={toLevNext} onFinish={updateTodoIsFinish} onUpdateContent={updateTodoContent} onUpdatePriority={updateTodoPriority} inAction={!!todoInAction} onAction={todoOnAction} />
        );
    }

    const boxRender = () => currentTodo && (<TodoDetail todo={currentTodo} closePanel={shutDetail} updateTodoIsDelete={updateTodoIsDelete} updateTodoCotent={updateTodoContent} updateTodoComment={updateTodoComment} moveTodo={moveTodo} copyTodo={copyTodo} />);

    return (
        <FlexBox ref={detailRef} direction='row-reverse' stairs={['30%']} boxRender={boxRender}>
            <Container onClick={todoSelectedClear}>
                <Header>
                    {todoInAction && (
                        <ButtonGroupBox>
                            <ButtonGroup buttons={todoPasteBtns} />
                        </ButtonGroupBox>
                    )}
                    <ButtonGroupBox>
                        <ButtonGroup buttons={searchBtns()} />
                    </ButtonGroupBox>
                    <ButtonGroupBox>
                        <ButtonGroup buttons={finishStatusBtns()} radio />
                    </ButtonGroupBox>
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

const ButtonGroupBox = styled.div`
    margin-left: 12px;
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

const nodeHome: ITodoHasIdContent = { id: 0, content: 'Home' };

export default Todos;