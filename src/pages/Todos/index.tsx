import { Input, InputProps } from 'antd';
import React, { useState, useEffect, createRef } from 'react';
import styled, { css, StyledComponent, ThemeContext } from 'styled-components';
import { ITodo, ITodoBasic, ITodoUpdate, ITodoStat, IHasContent, TodoStatus, IHasPriority } from '@/interface/Data';
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
import { priorityColors } from '~/styles/Themes';
import { serialAsync } from '~/util/SerialAsync';

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
    const [rootNode, setRootNode] = useState(undefined as ITodo | undefined);
    const [currentNode, setCurrentNode] = useState(undefined as ITodo | undefined); // 层级导航当前节点
    const [navNodes, setNavNodes] = useState([] as ITodo[]); // 层级导航
    const [todoStat, setTodoStat] = useState({ childrenCount: 0, childrenFinish: 0, childrenDelete: 0 } as ITodoStat); // 待办数量统计
    const [currentTodo, setCurrentTodo] = useState(undefined as (ITodo | undefined)); // 选中待办
    const [contextTodo, setContextTodo] = useState(undefined as (ITodo | undefined)); // 上下文菜单对应待办
    const [searchText, setSearchText] = createSignal<string>(); // 搜索内容
    const [useSearchText, searchTextObs] = bind(searchText); // 搜索内容观察者
    const [newTodo, setNewTodo] = useState(todoBlank); // 新待办
    const [todoStatus, setTodoStatus] = useState(TodoStatus.DOING); // 待办列表状态筛选
    const [todoInAction, setTodoInAction] = useState(undefined as (ITodoInAction | undefined)); // 待办移动或复制

    useEffect(() => {
        selectTodoRoot();
        listSelected ? setViewMode(ViewMode.CASCADE) : setViewMode(ViewMode.SEARCH);
        setTodoStatus(TodoStatus.DOING);
    }, [listSelected]);

    useEffect(() => {
        viewMode === ViewMode.SEARCH && changeCurrentNodeToRoot();
    }, [viewMode]);

    useEffect(() => {
        selectTodoListAndTodoStat();
        return () => {
            selectTodoListAndTodoStat = () => { };
        };
    }, [viewMode, currentNode, todoStatus]);

    const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

    searchTextObs.pipe(debounceTime(300)).subscribe(toSearch => selectTodoListAndTodoStat(false, toSearch));

    // 变更待办根节点
    const changeRootNode = (todo?: ITodo) => {
        setRootNode(todo);
        setCurrentNode(todo);
        setCurrentTodo(undefined);
        setContextTodo(undefined);
        setNavNodes(todo ? [todo] : []);
    }

    // 变更导航当前节点到待办根节点
    const changeCurrentNodeToRoot = () => {
        navNodes.length > 0 && changeRootNode(navNodes[0]);
    }

    // 查询待办根节点
    let selectTodoRoot = () => {
        changeRootNode(undefined);
        if (listSelected) {
            const { id: listId } = listSelected;
            window.Main.invoke(new MsgTodoSelectRoot({ listId })).then(todo => {
                changeRootNode(todo);
            });
        }
    }

    const selectTodoListAndTodoStatForSearch = (content?: string) => {
        console.log("CCC");
        window.Main.invoke(new MsgTodoSelectList({ listId: listSelected?.id, content, status: todoStatus })).then((todos: ITodo[]) => {
            setTodos(todos);
        });
        window.Main.invoke(new MsgTodoSelectStat({ listId: listSelected?.id, content })).then(node => {
            const { childrenCount, childrenFinish, childrenDelete } = node || {};
            setTodoStat({ childrenCount, childrenFinish, childrenDelete });
        });
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

        if (listSelected) {
            switch (viewMode) {
                case ViewMode.CASCADE:
                    if (currentNode) {
                        console.log("CCC");
                        const { childrenCount, childrenFinish, childrenDelete } = currentNode;
                        setTodoStat({ childrenCount, childrenFinish, childrenDelete });

                        window.Main.invoke(new MsgTodoSelectList({ listId: listSelected?.id, parentId: currentNode.id, status: todoStatus })).then((todos: ITodo[]) => {
                            setTodos(todos);
                        });
                    }
                    break;
                case ViewMode.SEARCH:
                    navNodes.length === 1 && selectTodoListAndTodoStatForSearch(content);
                    break;
                default: break;
            }
        } else {
            switch (viewMode) {
                case ViewMode.SEARCH:
                    selectTodoListAndTodoStatForSearch(content);
                    break;
                default: break;
            }
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewTodo({ ...newTodo, content: event.target.value });

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

    const todoSelected = (event: React.MouseEvent, todo: ITodo) => {
        setCurrentTodo(todo);
        cm.current?.hide(event);
    };

    const todoSelectedClear = () => setCurrentTodo(undefined);

    const toLevNext = (todo: ITodo) => {
        setNavNodes(navNodes.concat([todo]));
        setCurrentNode(todo);
        todoSelectedClear();
    }

    const toLevPrev = (todo: ITodo) => {
        setNavNodes(navNodes.slice(0, navNodes.indexOf(todo) + 1));
        setCurrentNode(todo);
    }

    // 模式按钮
    const viewModeBtns = [
        {
            render: (checked: boolean) => (<IconKuandai size={theme.iconSize1} color={checked ? theme.color1 : 'black'} />),
            func: () => setViewMode(ViewMode.CASCADE),
        },
        {
            render: (checked: boolean) => (<IconSousuo size={theme.iconSize1} color={checked ? theme.color1 : 'black'} />),
            func: () => setViewMode(ViewMode.SEARCH),
        },
    ];

    const viewModeBtnCheckedIndex = () => [ViewMode.CASCADE, ViewMode.SEARCH].indexOf(viewMode);

    // 操作按钮
    const todoPasteBtns = [
        {
            render: () => (<IconShibai size={theme.iconSize1} />),
            func: () => setTodoInAction(undefined)
        },
        {
            render: () => (<IconQitadingdan size={theme.iconSize1} />),
            func: () => {
                if (listSelected) {
                    switch (viewMode) {
                        case ViewMode.CASCADE:
                            todoOnAction(currentNode);
                            break;
                        case ViewMode.SEARCH:
                            todoOnAction(rootNode);
                            break;
                        default: break;
                    }
                }
            }
        },
    ];

    // 待办状态按钮
    const todoStatusBtns = () => {
        const { childrenCount = 0, childrenFinish = 0, childrenDelete = 0 } = todoStat || {};
        return [
            {
                render: (checked: boolean) => (
                    <ButtonBox>
                        <IconXiaolian size={theme.iconSize1} color={checked ? theme.color1 : 'black'} />
                        <ButtonText>
                            {childrenCount - childrenFinish - childrenDelete}
                        </ButtonText>
                    </ButtonBox>
                ),
                func: () => setTodoStatus(TodoStatus.DOING)
            },
            {
                render: (checked: boolean) => (
                    <ButtonBox>
                        <IconZhengque size={theme.iconSize1} color={checked ? theme.color1 : 'black'} />
                        <ButtonText>
                            {childrenFinish}
                        </ButtonText>
                    </ButtonBox>
                ),
                func: () => setTodoStatus(TodoStatus.DONE)
            },
            {
                render: (checked: boolean) => (
                    <ButtonBox>
                        <IconShaixuan1 size={theme.iconSize1} color={checked ? theme.color1 : 'black'} />
                        <ButtonText>
                            {childrenDelete}
                        </ButtonText>
                    </ButtonBox>
                ),
                func: () => setTodoStatus(TodoStatus.DELETED)
            }
        ];
    };

    const todoStatusBtnCheckedIndex = () => [TodoStatus.DOING, TodoStatus.DONE, TodoStatus.DELETED].indexOf(todoStatus);

    // 右键菜单
    const contextMenuItems = () => {
        const separator = { separator: true };
        const actionPriority = {
            template: (item: any, options: any) => (
                <MenuItemPriorityBox className="p-menuitem-link" onClick={(e) => cm.current?.hide(e)}>
                    {priorityColors.map((color, index) => <MenuItemPriorityBtn key={index} color={color} onClick={() => contextTodo && updateTodoPriority({ ...contextTodo, priority: index })} />)}
                </MenuItemPriorityBox>
            )
        };
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
        const actionRestore = {
            label: '还原',
            icon: 'pi pi-fw pi-directions-alt',
            command: () => contextTodo && updateTodoIsDelete({ ...contextTodo, isDelete: false }),
        };
        switch (viewMode) {
            case ViewMode.CASCADE:
                switch (todoStatus) {
                    case TodoStatus.DOING:
                        return [actionPriority, separator, actionDetail, separator, actionCopy, actionMove, actionDelete];
                    case TodoStatus.DONE:
                        return [actionDetail, separator, actionCopy];
                    case TodoStatus.DELETED:
                        return [actionDetail, separator, actionCopy, actionRestore];
                    default: break;
                }
            case ViewMode.SEARCH:
                switch (todoStatus) {
                    case TodoStatus.DOING:
                        return [actionPriority, separator, actionDetail, separator, actionCopy, actionMove, actionDelete];
                    case TodoStatus.DONE:
                        return [actionDetail, separator, actionCopy];
                    case TodoStatus.DELETED:
                        return [actionDetail, separator, actionCopy, actionRestore];
                    default: break;
                }
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
            <TodoItem key={item.id} todo={item} isSelected={id === idCurrent} onClick={(event, todo) => todoSelected(event, todo)} levNextEnabled={viewMode === ViewMode.CASCADE} onLevNext={toLevNext} onUpdateIsFinish={updateTodoIsFinish} onUpdateContent={updateTodoContent} inAction={!!todoInAction} onAction={todoOnAction} onContextMenu={onTodoContextMenu} />
        );
    }

    return (
        <>
            <TodoContextMenu model={contextMenuItems()} ref={cm} />
            <Container onClick={todoSelectedClear}>
                <Header>
                    {listSelected && (
                        <>
                            <ButtonGroupBox>
                                <ButtonGroup buttons={viewModeBtns} radio checkedIdx={viewModeBtnCheckedIndex()} />
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
                        <ButtonGroup buttons={todoStatusBtns()} radio checkedIdx={todoStatusBtnCheckedIndex()} />
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
                    <NewTodoContainer>
                        <IconZengjia color={theme.color1} />
                        <TodoInput size='large' placeholder='Add a Task' value={newTodo.content} onFocus={todoSelectedClear} onChange={onChange} onPressEnter={insertTodo} />
                        <PriorityBox>
                            {priorityColors.map((color, index) => <PriorityBtn key={index} color={color} enabled={newTodo.content.length > 0} selected={index === newTodo.priority} onClick={() => setNewTodo({ ...newTodo, priority: index })} />)}
                        </PriorityBox>
                        <ConfirmBtn enabled={newTodo.content.length > 0} onClick={insertTodo}>OK</ConfirmBtn>
                    </NewTodoContainer>
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
    margin: 0px 0px 8px 0px;
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

const NewTodoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 0px 0px 8px;
    background-color: ${props => props.theme.color2};
    border-radius: 4px;
    overflow: hidden;
`

const TodoInput: StyledComponent<React.ComponentType<InputProps>, any> = styled(Input)`
    flex: 1;
    border: none;
    padding: 4px 8px 4px;
    margin: 6px 0px;
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

const PriorityBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 4px;
`

const PriorityBtn = styled.div.attrs({} as { color: string, enabled: boolean, selected: boolean })`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin: 0px 2px;
    background-color: ${props => props.color};
    border: 2px solid ${props => props.theme.color2};

    ${props => props.enabled && props.selected && css`
        border: 2px solid ${props.theme.color1};
    `}
    ${props => props.enabled && css`
        &:hover{
            border: 2px solid ${props.theme.color1};
        }
    `}
`

const ConfirmBtn = styled.div.attrs({} as {enabled: boolean})`
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0px 8px;
    font-size: ${props => props.theme.fontSize3};
    background-color: ${props => props.theme.color1};
    border-radius: 4px;
    cursor: default;
    background-color: ${props => props.theme.color4};

    ${props => props.enabled && css`
        &:hover{
            cursor: pointer;
            color: ${props.theme.color1};
            background-color: ${props.theme.color8};
        }
    `}
`

const todoBlank: IHasContent & IHasPriority = { content: '', priority: 0 };

const ButtonBox = styled.div`
    display: flex;
`

const ButtonText = styled.div`
    min-width: 26px;
    display: flex;
    justify-content: center;
`

const MenuItemPriorityBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const MenuItemPriorityBtn = styled.div.attrs({} as { color: string })`
    width: 16px;
    height: 16px;
    border-radius: 8px;
    border: 1px solid;
    background-color: ${props => props.color};
`

export default Todos;