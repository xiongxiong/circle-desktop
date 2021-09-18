import { Input, InputProps } from 'antd';
import React, { useLayoutEffect } from 'react';
import styled, { StyledComponent, ThemeContext } from 'styled-components';
import { ITodo, ITodoBasic, ITodoUpdate, ITodoStat, IHasContent, TodoStatus } from '@/interface/Data';
import { MsgTodoSelectList, MsgTodoInsert, MsgTodoSelect, MsgTodoDuplicate, MsgTodoUpdate, MsgTodoSelectRoot, MsgDialogMessageBox, IDialogButtonProps } from '@/interface/BridgeMsg';
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
import { useDispatch } from 'react-redux';
import { toggle } from '~/store/slice/ViewModeSlice';
import IconSousuo from '~/components/@iconfont/IconSousuo';
import IconShibai from '~/components/@iconfont/IconShibai';
import IconQitadingdan from '~/components/@iconfont/IconQitadingdan';
import IconXiaolian from '~/components/@iconfont/IconXiaolian';
import IconZhengque from '~/components/@iconfont/IconZhengque';
import IconShaixuan1 from '~/components/@iconfont/IconShaixuan1';
import { useAppSelector } from '~/store/hooks';
import { selectedList } from '~/store/slice/ListStateSlice';

export interface ITodosProps {

}

enum TodoActions {
    MOVE,
    COPY
}

interface ITodoInAction {
    action: TodoActions,
    todo: ITodoBasic
}

export const Todos = (props: ITodosProps) => {

    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const listSelected = useAppSelector(selectedList);

    const [todos, setTodos] = useState([] as ITodo[]); // 待办列表
    const [currentNode, setCurrentNode] = useState(undefined as ITodoBasic | undefined); // 层级导航当前节点
    const [navNodes, setNavNodes] = useState([] as ITodoBasic[]); // 层级导航
    const [todoStat, setTodoStat] = useState({ childrenCount: 0, childrenFinish: 0, childrenDelete: 0 } as ITodoStat); // 待办数量统计
    const [currentTodo, setCurrentTodo] = useState(undefined as (ITodo | undefined)); // 选中待办
    const [newTodo, setNewTodo] = useState(todoBlank); // 新待办
    const [todoStatus, setTodoStatus] = useState(TodoStatus.DOING); // 待办列表状态筛选
    const [todoInAction, setTodoInAction] = useState(undefined as (ITodoInAction | undefined)); // 待办移动或复制

    useEffect(() => {
        selectTodoRoot();
    }, [listSelected]);

    useEffect(() => {
        selectTodoListAndTodoStat(true);
    }, [currentNode, todoStatus]);

    useLayoutEffect(() => {
        currentTodo ? openDetail() : shutDetail();
    }, [currentTodo]);

    const finishStatusBtns = () => {
        const { childrenCount = 0, childrenFinish = 0, childrenDelete = 0 } = todoStat || {};
        return [
            {
                render: () => (
                    <ButtonBox>
                        <IconXiaolian size={theme.iconSize1} />
                        <ButtonText>
                            {childrenCount - childrenFinish - childrenDelete}
                        </ButtonText>
                    </ButtonBox>
                ),
                func: () => setTodoStatus(TodoStatus.DOING)
            },
            {
                render: () => (
                    <ButtonBox>
                        <IconZhengque size={theme.iconSize1} />
                        <ButtonText>
                            {childrenFinish}
                        </ButtonText>
                    </ButtonBox>
                ),
                func: () => setTodoStatus(TodoStatus.DONE)
            },
            {
                render: () => (
                    <ButtonBox>
                        <IconShaixuan1 size={theme.iconSize1} />
                        <ButtonText>
                            {childrenDelete}
                        </ButtonText>
                    </ButtonBox>
                ),
                func: () => setTodoStatus(TodoStatus.DELETED)
            }
        ];
    };

    const viewModeBtns = () => [
        {
            render: () => (<IconSousuo size={theme.iconSize1} />),
            func: () => dispatch(toggle())
        },
    ];

    const todoPasteBtns = [
        {
            render: () => (<IconShibai size={theme.iconSize1} />),
            func: () => setTodoInAction(undefined)
        },
        {
            render: () => (<IconQitadingdan size={theme.iconSize1} />),
            func: () => todoOnAction(currentNode)
        },
    ];

    const selectTodoRoot = () => {
        if (listSelected) {
            const { id: listId } = listSelected;
            window.Main.invoke(new MsgTodoSelectRoot({ listId })).then(todo => {
                console.log("root : ", todo);
                setCurrentNode(todo);
                setNavNodes([todo]);
            });
        } else {
            setCurrentNode(undefined);
            setNavNodes([]);
        }
    }

    /**
     * 查询待办列表
     * @param clearBeforeRequest 是否在查询发起前清空当前待办列表
     */
    const selectTodoListAndTodoStat = (clearBeforeRequest: boolean = false) => {
        clearBeforeRequest && setTodos([]);

        if (listSelected && currentNode) {
            const { id: listId } = listSelected;
            const { id: idNode } = currentNode;
            window.Main.invoke(new MsgTodoSelectList({ listId, parentId: idNode, status: todoStatus })).then((todos: ITodo[]) => {
                console.log("todos : ", todos);
                setTodos(todos);
            });

            window.Main.invoke(new MsgTodoSelect(currentNode)).then(node => {
                const { childrenCount, childrenFinish, childrenDelete } = node || {};
                setTodoStat({ childrenCount, childrenFinish, childrenDelete });
            });
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewTodo({ content: event.target.value });

    const insertTodo = () => {
        if (listSelected) {
            const { id: listId } = listSelected;
            const { id } = currentNode || {};
            if (newTodo.content.trim().length > 0) {
                window.Main.invoke(new MsgTodoInsert({ ...newTodo, parentId: id, listId })).then((ok) => {
                    if (ok) {
                        setNewTodo(todoBlank);
                        selectTodoListAndTodoStat();
                    }
                });
            }
        }
    }

    const updateTodoContent = (todo: ITodoBasic) => {
        window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoComment = (todo: ITodoUpdate) => {
        window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoIsFinish = (todo: ITodoUpdate) => {
        window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoIsDelete = (event: React.MouseEvent, todo?: ITodoUpdate & ITodoStat) => {
        const updateFunc = (todo: ITodoUpdate & ITodoStat) => {
            window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => {
                if (ok) {
                    todoSelectedClear();
                    selectTodoListAndTodoStat();
                }
            });
        }
        const buttons: IDialogButtonProps[] = [
            {
                label: '取消',
                func: () => {}
            },
            {
                label: '确定',
                func: () => todo && updateFunc(todo)
            }
        ]

        if (todo) {
            const {childrenCount} = todo;
            if (childrenCount > 0) {
                window.Main.invoke(new MsgDialogMessageBox({
                    type: 'warning',
                    title: '「待办」删除',
                    message: '该待办包含子待办，确定删除？',
                    buttons: buttons.map(({label}) => label),
                    defaultId: 1,
                    cancelId: 0,
                    noLink: true
                })).then(res => {
                    const {response = 0} = res || {};
                    buttons[response] && buttons[response].func();
                });
            } else {
                updateFunc(todo);
            }
        }
    }

    const updateTodoParentId = (id: number, parentId: number) => {
        window.Main.invoke(new MsgTodoUpdate({ id, parentId })).then(ok => ok && selectTodoListAndTodoStat());
    }

    const duplicateTodo = (id: number, parentId: number) => {
        window.Main.invoke(new MsgTodoDuplicate({ id, parentId })).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoPriority = (todo: ITodoUpdate) => {
        window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const moveTodo = (todo: ITodoBasic) => setTodoInAction({ action: TodoActions.MOVE, todo });

    const copyTodo = (todo: ITodoBasic) => setTodoInAction({ action: TodoActions.COPY, todo });

    const todoOnAction = (parentTodo?: ITodoBasic) => {
        if (todoInAction && parentTodo) {
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
        <FlexBox ref={detailRef} direction='row-reverse' stairs={[{width: '30%', minWidth: '200px'}]} boxRender={boxRender}>
            <Container onClick={todoSelectedClear}>
                <Header>
                    <TodoNavBox>
                        {navNodes.length <= 1 ? undefined : (<TodoNav renderItem={navNodeRender} nodes={navNodes} />)}
                    </TodoNavBox>
                    {todoInAction && (
                        <ButtonGroupBox>
                            <ButtonGroup buttons={todoPasteBtns} />
                        </ButtonGroupBox>
                    )}
                    <ButtonGroupBox>
                        <ButtonGroup buttons={viewModeBtns()} />
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
                {listSelected && !listSelected.isGroup && (
                    <InputContainer>
                        <IconZengjia color={theme.color1} />
                        <TodoInput size='large' placeholder='Add a Task' value={newTodo.content} onFocus={todoSelectedClear} onChange={onChange} onPressEnter={insertTodo} />
                    </InputContainer>
                )}
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

const TodoNavBox = styled.div`
    flex: 1;
`

const ButtonGroupBox = styled.div`
    margin-left: 12px;
    font-size: ${props => props.theme.fontSize1};
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

const todoBlank: IHasContent = { content: '' };

const ButtonBox = styled.div`
    display: flex;
`

const ButtonText = styled.div`
    min-width: 26px;
    display: flex;
    justify-content: center;
`

export default Todos;