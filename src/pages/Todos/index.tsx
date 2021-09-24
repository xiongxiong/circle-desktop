import { Input, InputProps } from 'antd';
import React, { useState, useEffect, createRef } from 'react';
import styled, { StyledComponent, ThemeContext } from 'styled-components';
import { ITodo, ITodoBasic, ITodoUpdate, ITodoStat, IHasContent, TodoStatus } from '@/interface/Data';
import { MsgTodoSelectList, MsgTodoInsert, MsgTodoSelect, MsgTodoDuplicate, MsgTodoUpdate, MsgTodoSelectRoot, MsgDialogMessageBox, IDialogButtonProps, MsgTodoSelectStat } from '@/interface/BridgeMsg';
import { TodoItem } from '~/components/TodoItem';
import { TodoNavi } from '~/components/TodoNavi';
import IconZengjia from '~/components/@iconfont/IconZengjia';
import { useContext } from 'react';
import { Empty } from '~/components/Empty';
import { ButtonGroup } from '~/components/ButtonGroup';
import { useDispatch } from 'react-redux';
import IconShibai from '~/components/@iconfont/IconShibai';
import IconQitadingdan from '~/components/@iconfont/IconQitadingdan';
import IconXiaolian from '~/components/@iconfont/IconXiaolian';
import IconZhengque from '~/components/@iconfont/IconZhengque';
import IconShaixuan1 from '~/components/@iconfont/IconShaixuan1';
import { useAppSelector } from '~/store/hooks';
import { selectedList } from '~/store/slice/AppSlice';
import { ContextMenu } from 'primereact/contextmenu';
import IconKuandai from '~/components/@iconfont/IconKuandai';
import IconSousuo from '~/components/@iconfont/IconSousuo';
import { createSignal } from '@react-rxjs/utils';
import { bind } from '@react-rxjs/core';
import { debounceTime } from 'rxjs';

enum ViewMode {
    CASCADE,
    SEARCH,
}

enum TodoActions {
    MOVE,
    COPY,
}

interface ITodoInAction {
    action: TodoActions,
    todo: ITodoBasic
}

export interface ITodosProps {

}

export const Todos = (props: ITodosProps) => {

    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const listSelected = useAppSelector(selectedList);
    const cm = createRef<ContextMenu>();

    const [viewMode, setViewMode] = useState(ViewMode.CASCADE); // 视图模式
    const [todos, setTodos] = useState([] as ITodo[]); // 待办列表
    const [currentNode, setCurrentNode] = useState(undefined as ITodoBasic | undefined); // 层级导航当前节点
    const [navNodes, setNavNodes] = useState([] as ITodoBasic[]); // 层级导航
    const [todoStat, setTodoStat] = useState({ childrenCount: 0, childrenFinish: 0, childrenDelete: 0 } as ITodoStat); // 待办数量统计
    const [currentTodo, setCurrentTodo] = useState(undefined as (ITodo | undefined)); // 选中待办
    const [contextTodo, setContextTodo] = useState(undefined as (ITodo | undefined)); // 上下文菜单对应待办
    const [searchText, setSearchText] = createSignal<string>(); // 搜索内容
    const [useSearchText, searchTextObs] = bind(searchText); // 搜索内容观察者
    const [newTodo, setNewTodo] = useState(todoBlank); // 新待办
    const [todoStatus, setTodoStatus] = useState(TodoStatus.DOING); // 待办列表状态筛选
    const [todoInAction, setTodoInAction] = useState(undefined as (ITodoInAction | undefined)); // 待办移动或复制

    useEffect(() => {
        listSelected ? setViewMode(ViewMode.CASCADE) : setViewMode(ViewMode.SEARCH);
    }, [listSelected]);

    useEffect(() => {
        viewMode === ViewMode.CASCADE && selectTodoRoot();
        return () => {
            selectTodoRoot = () => { };
        };
    }, [viewMode, listSelected]);

    useEffect(() => {
        selectTodoListAndTodoStat();
        return () => {
            selectTodoListAndTodoStat = () => { };
        };
    }, [viewMode, currentNode, todoStatus]);

    const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

    searchTextObs.pipe(debounceTime(600)).subscribe(toSearch => selectTodoListAndTodoStat(false, toSearch));

    const viewModeBtns = [
        {
            render: () => (<IconKuandai size={theme.iconSize1} />),
            func: () => setViewMode(ViewMode.CASCADE),
        },
        {
            render: () => (<IconSousuo size={theme.iconSize1} />),
            func: () => setViewMode(ViewMode.SEARCH),
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

    let selectTodoRoot = () => {
        if (listSelected) {
            const { id: listId } = listSelected;
            window.Main.invoke(new MsgTodoSelectRoot({ listId })).then(todo => {
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
     * @param content 要搜索的内容
     */
    let selectTodoListAndTodoStat = (clearBeforeRequest: boolean = false, content?: string) => {
        if (clearBeforeRequest) {
            setTodos([]);
            setTodoStat({ childrenCount: 0, childrenFinish: 0, childrenDelete: 0 });
        }

        switch (viewMode) {
            case ViewMode.CASCADE:
                if (currentNode) {
                    window.Main.invoke(new MsgTodoSelectList({ listId: listSelected?.id, parentId: currentNode.id, status: todoStatus })).then((todos: ITodo[]) => {
                        setTodos(todos);
                    });

                    window.Main.invoke(new MsgTodoSelect(currentNode)).then(node => {
                        const { childrenCount, childrenFinish, childrenDelete } = node || {};
                        setTodoStat({ childrenCount, childrenFinish, childrenDelete });
                    });
                }
                break;
            case ViewMode.SEARCH:
                window.Main.invoke(new MsgTodoSelectList({ listId: listSelected?.id, content, status: todoStatus })).then((todos: ITodo[]) => {
                    setTodos(todos);
                });

                window.Main.invoke(new MsgTodoSelectStat({ listId: listSelected?.id, content })).then(node => {
                    const { childrenCount, childrenFinish, childrenDelete } = node || {};
                    setTodoStat({ childrenCount, childrenFinish, childrenDelete });
                });
                break;
            default: break;
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

    const updateTodoIsDelete = (todo: ITodoUpdate & ITodoStat) => {
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
                func: () => { }
            },
            {
                label: '确定',
                func: () => todo && updateFunc(todo)
            }
        ]

        const { childrenCount } = todo;
        if (childrenCount > 0) {
            window.Main.invoke(new MsgDialogMessageBox({
                type: 'warning',
                title: '「待办」删除',
                message: '该待办包含子待办，确定删除？',
                buttons: buttons.map(({ label }) => label),
                defaultId: 1,
                cancelId: 0,
                noLink: true
            })).then(res => {
                const { response = 0 } = res || {};
                buttons[response] && buttons[response].func();
            });
        } else {
            updateFunc(todo);
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

    const menuItems = () => {
        const separator = { separator: true };
        const actionDetail = {
            label: '详情',
            icon: 'pi pi-fw pi-info-circle',
        };
        const actionCopy = {
            label: '复制',
            icon: 'pi pi-fw pi-copy',
            command: () => contextTodo && copyTodo(contextTodo),
        };
        const actionMove = {
            label: '剪切',
            icon: 'pi pi-fw pi-send',
            command: () => contextTodo && moveTodo(contextTodo),
        };
        const actionDelete = {
            label: '删除',
            icon: 'pi pi-fw pi-trash',
            command: () => contextTodo && updateTodoIsDelete({ ...contextTodo, isDelete: true }),
        };
        switch (viewMode) {
            case ViewMode.CASCADE:
                return [actionDetail, separator, actionCopy, actionMove, actionDelete];
            case ViewMode.SEARCH:
                return [actionDetail, separator, actionDelete];
            default:
                return [];
        }
    }

    const onTodoContextMenu = (e: React.MouseEvent<HTMLDivElement>, todo: ITodo) => {
        setContextTodo(todo);
        cm.current?.show(e);
    }

    const listItemRender = (item: ITodo) => {
        const { id } = item;
        const { id: idCurrent } = currentTodo || {};
        return (
            <TodoItem key={item.id} todo={item} isSelected={id === idCurrent} onClick={(event, todo) => todoSelected(event, todo)} onLevNext={toLevNext} onFinish={updateTodoIsFinish} onUpdateContent={updateTodoContent} onUpdatePriority={updateTodoPriority} inAction={!!todoInAction} onAction={todoOnAction} onContextMenu={onTodoContextMenu} />
        );
    }

    return (
        <>
            <TodoContextMenu model={menuItems()} ref={cm} />
            <Container onClick={todoSelectedClear}>
                <Header>
                    {listSelected && (
                        <>
                            <ButtonGroupBox>
                                <ButtonGroup buttons={viewModeBtns} radio />
                            </ButtonGroupBox>
                            <HeaderSeparator />
                        </>
                    )}
                    {viewMode === ViewMode.CASCADE && <NaviBox><TodoNavi nodes={navNodes} toLevPrev={toLevPrev} /></NaviBox>}
                    {viewMode === ViewMode.SEARCH && <SearchBox><Search placeholder="Search" onChange={onSearchTextChange} /></SearchBox>}
                    <HeaderSeparator />
                    {todoInAction && (
                        <>
                            <ButtonGroupBox>
                                <ButtonGroup buttons={todoPasteBtns} />
                            </ButtonGroupBox>
                            <HeaderSeparator />
                        </>
                    )}
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
                {listSelected && !listSelected.isGroup && viewMode !== ViewMode.SEARCH && (
                    <InputContainer>
                        <IconZengjia color={theme.color1} />
                        <TodoInput size='large' placeholder='Add a Task' value={newTodo.content} onFocus={todoSelectedClear} onChange={onChange} onPressEnter={insertTodo} />
                    </InputContainer>
                )}
            </Container>
        </>
    );
}

const TodoContextMenu = styled(ContextMenu)`
    font-size: 12px;
    width: 100px;

    & .p-menuitem-link {
        padding: 0.5em 1em;
    }
`

const Container = styled.div`
    flex: 1;
	padding: 10px 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
    background-color: ${props => props.theme.color0};
`

const Header = styled.div`
    margin: 0px 0px 8px 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: stretch;
    font-size: ${props => props.theme.fontSize1};
`

const HeaderSeparator = styled.div`
    width: 8px;
`

const ButtonGroupBox = styled.div`
`

const NaviBox = styled.div`
    flex: 1;
    padding: 0px 8px;
    border-radius: 4px;
    min-width: 160px;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.color3};
`

const SearchBox = styled.div`
    flex: 1;
    border-radius: 4px;
    min-width: 160px;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.color3};
`

const Search = styled.input`
    flex: 1;
    border: none;
    margin: 0px 8px;
    background: transparent;
    font-family: inherit;
    font-size: inherit;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${props => props.theme.color1};
    }
`

const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0px 0px 4px 0px;
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