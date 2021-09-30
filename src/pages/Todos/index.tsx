import { Input, InputProps } from 'antd';
import React, { useEffect, createRef, useReducer, Reducer } from 'react';
import styled, { css, StyledComponent, ThemeContext } from 'styled-components';
import { ITodo, ITodoBasic, ITodoUpdate, ITodoStat, IHasContent, TodoStatus, IHasPriority, IListBasic, childrenDoing, todoCanUpdateIsFinish } from '@/interface/Data';
import { MsgTodoSelectList, MsgTodoInsert, MsgTodoDuplicate, MsgTodoUpdate, MsgTodoSelectRoot, MsgDialogMessageBox, IDialogButtonProps, MsgTodoSelectStat, MsgTodoSelectAncestorList, MsgTodoSelect } from '@/interface/BridgeMsg';
import { ITodoItemTailButtonProps, TodoItem } from '~/components/TodoItem';
import { TodoNavi } from '~/components/TodoNavi';
import IconZengjia from '~/components/@iconfont/IconZengjia';
import { useContext } from 'react';
import { Empty } from '~/components/Empty';
import { ButtonGroup } from '~/components/ButtonGroup';
import IconShibai from '~/components/@iconfont/IconShibai';
import IconQitadingdan from '~/components/@iconfont/IconQitadingdan';
import IconZhengque from '~/components/@iconfont/IconZhengque';
import { useAppSelector } from '~/store/hooks';
import { selectedList, setListSelected } from '~/store/slice/AppSlice';
import { ContextMenu } from 'primereact/contextmenu';
import IconKuandai from '~/components/@iconfont/IconKuandai';
import IconSousuo from '~/components/@iconfont/IconSousuo';
import { createSignal } from '@react-rxjs/utils';
import { bind } from '@react-rxjs/core';
import { debounceTime } from 'rxjs';
import { ITheme, priorityColors } from '~/styles/Themes';
import IconGouwu from '~/components/@iconfont/IconGouwu';
import IconTarget from '~/components/@iconfont/IconTarget';
import { ITodoStatusButtonProps } from '~/components/TodoStatusButton';
import IconShijian from '~/components/@iconfont/IconShijian';
import IconBack from '~/components/@iconfont/IconBack';
import IconDeleteLight from '~/components/@iconfont/IconDeleteLight';
import IconFolderForbidLine from '~/components/@iconfont/IconFolderForbidLine';
import { useDispatch } from 'react-redux';
import { ListNode } from '~/components/ListTree';

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

interface ITodosState {
    viewMode: ViewMode, // 视图模式
    todos: ITodo[], // 待办列表
    rootNode: ITodo | undefined, // 导航根节点
    currentNode: ITodo | undefined, // 导航当前节点
    navNodes: ITodo[], // 导航节点
    todoStat: ITodoStat, // 待办数量统计
    currentTodo: ITodo | undefined, // 选中待办
    holdingTodo: ITodo | undefined, // 需要保持选中状态的待办
    contextTodo: ITodo | undefined, // 上下文菜单对应待办
    newTodo: IHasContent & IHasPriority, // 新待办
    todoStatus: TodoStatus, // 待办列表状态筛选
    todoInAction: ITodoInAction | undefined, // 待办移动或复制
}

interface ITodosAction {
    type: string,
    payload: any,
}

const blankTodo: IHasContent & IHasPriority = { content: '', priority: 0 };

const blankTodoStat: ITodoStat = { childrenCount: 0, childrenFinish: 0, childrenDelete: 0 };

const init: (listSelected?: IListBasic) => ITodosState = (listSelected?: IListBasic) => ({
    viewMode: listSelected ? ViewMode.CASCADE : ViewMode.SEARCH,
    todos: [],
    rootNode: undefined,
    currentNode: undefined,
    navNodes: [],
    todoStat: blankTodoStat,
    currentTodo: undefined,
    holdingTodo: undefined,
    contextTodo: undefined,
    newTodo: blankTodo,
    todoStatus: TodoStatus.DOING,
    todoInAction: undefined,
});

const reducer: Reducer<ITodosState, ITodosAction> = (state: ITodosState, action: ITodosAction) => {
    switch (action.type) {
        case "setViewMode":
            return {
                ...state,
                viewMode: action.payload,
                currentNode: state.rootNode,
                navNodes: state.rootNode ? [state.rootNode] : [],
                currentTodo: undefined,
                contextTodo: undefined,
            };
        case "setTodos":
            return { 
                ...state, 
                todos: action.payload,
                currentTodo: state.holdingTodo,
                holdingTodo: undefined,
            };
        case "setRootNode":
            return {
                ...state,
                rootNode: action.payload,
                currentNode: action.payload,
                navNodes: action.payload ? [action.payload] : [],
                currentTodo: undefined,
                contextTodo: undefined,
            };
        case "setCurrentNode":
            return { ...state, currentNode: action.payload };
        case "setNavNodes":
            return { ...state, navNodes: action.payload };
        case "setTodoStat":
            return { ...state, todoStat: action.payload };
        case "setCurrentTodo":
            return { ...state, currentTodo: action.payload };
        case "setHoldingTodo":
            return { ...state, holdingTodo: action.payload };
        case "setContextTodo":
            return { ...state, contextTodo: action.payload };
        case "setNewTodo":
            return { ...state, newTodo: action.payload };
        case "setTodoStatus":
            return { ...state, todoStatus: action.payload };
        case "setTodoInAction":
            return { ...state, todoInAction: action.payload };
        case "changeListSelected":
            return {
                ...state,
                viewMode: action.payload ? ViewMode.CASCADE : ViewMode.SEARCH,
                rootNode: undefined,
                currentNode: undefined,
                navNodes: [],
                currentTodo: undefined,
                contextTodo: undefined,
            };
        case "targetCascade":
            const { current, ancestors } = action.payload as { current: ITodo, ancestors: ITodo[] };
            return {
                ...state,
                viewMode: ViewMode.CASCADE,
                todos: [],
                rootNode: ancestors.length > 0 ? ancestors[0] : undefined,
                currentNode: ancestors.length > 0 ? ancestors[ancestors.length - 1] : undefined,
                navNodes: ancestors,
                todoStat: ancestors.length > 0 ? ancestors[ancestors.length - 1] : blankTodoStat,
                holdingTodo: current,
            };
        default: throw new Error(`>> TODOS STATE REDUCER : NOT SUPPORTED ACTION -- ${action.type}`);
    }
}

export interface ITodosProps {

}

export const Todos = (props: ITodosProps) => {

    const theme: ITheme = useContext(ThemeContext);
    const listSelected = useAppSelector(selectedList);
    const storeDispatch = useDispatch();
    const cm = createRef<ContextMenu>();

    const [{ viewMode, todos, rootNode, currentNode, navNodes, todoStat, currentTodo, holdingTodo, contextTodo, newTodo, todoStatus, todoInAction }, dispatch] = useReducer(reducer, listSelected, init);

    const setViewMode = (viewMode: ViewMode) => {
        dispatch({ type: "setViewMode", payload: viewMode });
    }
    const setTodos = (todos: ITodo[]) => {
        dispatch({ type: "setTodos", payload: todos });
    }
    const setRootNode = (todo?: ITodo) => {
        dispatch({ type: "setRootNode", payload: todo });
    }
    const setCurrentNode = (todo?: ITodo) => {
        dispatch({ type: "setCurrentNode", payload: todo });
    }
    const setNavNodes = (nodes: ITodo[]) => {
        dispatch({ type: "setNavNodes", payload: nodes });
    }
    const setTodoStat = (stat: ITodoStat) => {
        dispatch({ type: "setTodoStat", payload: stat });
    }
    const setCurrentTodo = (todo?: ITodo) => {
        dispatch({ type: "setCurrentTodo", payload: todo });
    }
    const setHoldingTodo = (todo?: ITodo) => {
        dispatch({ type: "setHoldingTodo", payload: todo });
    }
    const setContextTodo = (todo?: ITodo) => {
        dispatch({ type: "setContextTodo", payload: todo });
    }
    const setNewTodo = (todo: IHasContent & IHasPriority) => {
        dispatch({ type: "setNewTodo", payload: todo });
    }
    const setTodoStatus = (status: TodoStatus) => {
        dispatch({ type: "setTodoStatus", payload: status });
    }
    const setTodoInAction = (action?: ITodoInAction) => {
        dispatch({ type: "setTodoInAction", payload: action });
    }
    const changeListSelected = (listSelected?: IListBasic) => {
        dispatch({ type: "changeListSelected", payload: listSelected });
    }
    const targetCascade = (current: ITodo, ancestors: ITodo[]) => {
        dispatch({ type: "targetCascade", payload: { current, ancestors } });
        
        const {listId} = current;
        const targetList = ListNode(listId);
        storeDispatch(setListSelected(targetList));
    }

    const [searchText, setSearchText] = createSignal<string>(); // 搜索内容
    const [useSearchText, searchTextObs] = bind(searchText); // 搜索内容观察者

    useEffect(() => {
        changeListSelected(listSelected);
        selectTodoRoot();
    }, [listSelected]);

    useEffect(() => {
        selectTodoListAndTodoStat();
    }, [viewMode, currentNode, todoStatus]);

    const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

    searchTextObs.pipe(debounceTime(300)).subscribe(toSearch => selectTodoListAndTodoStat(false, toSearch));

    // 查询待办根节点
    const selectTodoRoot = () => {
        if (listSelected) {
            const { id: listId } = listSelected;
            window.Main.invoke(new MsgTodoSelectRoot({ listId })).then(todo => {
                setRootNode(todo);
            });
        }
    }

    /**
     * 查询待办列表
     * @param clearBeforeRequest 是否在查询发起前清空当前待办列表
     * @param content 要搜索的内容
     */
    const selectTodoListAndTodoStat = (clearBeforeRequest: boolean = false, content?: string) => {
        if (clearBeforeRequest) {
            setTodos([]);
            setTodoStat({ childrenCount: 0, childrenFinish: 0, childrenDelete: 0 });
        }

        if (listSelected) {
            switch (viewMode) {
                case ViewMode.CASCADE:
                    if (currentNode) {
                        const { childrenCount, childrenFinish, childrenDelete } = currentNode;
                        setTodoStat({ childrenCount, childrenFinish, childrenDelete });

                        window.Main.invoke(new MsgTodoSelectList({ listId: listSelected?.id, parentId: currentNode.id, status: todoStatus })).then((todos: ITodo[]) => {
                            setTodos(todos);
                        });
                        window.Main.invoke(new MsgTodoSelect({ id: currentNode.id })).then(node => {
                            const { childrenCount, childrenFinish, childrenDelete } = node || {};
                            setTodoStat({ childrenCount, childrenFinish, childrenDelete });
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

    const selectTodoListAndTodoStatForSearch = (content?: string) => {
        window.Main.invoke(new MsgTodoSelectList({ listId: listSelected?.id, content, status: todoStatus })).then((todos: ITodo[]) => {
            setTodos(todos);
        });
        window.Main.invoke(new MsgTodoSelectStat({ listId: listSelected?.id, content })).then(node => {
            const { childrenCount, childrenFinish, childrenDelete } = node || {};
            setTodoStat({ childrenCount, childrenFinish, childrenDelete });
        });
    }

    // 待办从搜索视图定位到层级视图
    const onTargetCascade = (todo: ITodo) => {
        window.Main.invoke(new MsgTodoSelectAncestorList({ id: todo.id })).then(nodes => targetCascade(todo, nodes));
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewTodo({ ...newTodo, content: event.target.value });

    const insertTodo = () => {
        if (listSelected) {
            const { id: listId } = listSelected;
            const { id } = currentNode || {};
            if (newTodo.content.trim().length > 0) {
                window.Main.invoke(new MsgTodoInsert({ ...newTodo, parentId: id, listId })).then((ok) => {
                    if (ok) {
                        setNewTodo(blankTodo);
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
            render: (checked: boolean) => (<IconKuandai size={theme.icon_size.xs} color={checked ? theme.color.white : 'black'} />),
            func: () => setViewMode(ViewMode.CASCADE),
        },
        {
            render: (checked: boolean) => (<IconSousuo size={theme.icon_size.xs} color={checked ? theme.color.white : 'black'} />),
            func: () => setViewMode(ViewMode.SEARCH),
        },
    ];

    const viewModeBtnCheckedIndex = () => [ViewMode.CASCADE, ViewMode.SEARCH].indexOf(viewMode);

    // 操作按钮
    const todoPasteBtns = [
        {
            render: () => (<IconShibai size={theme.icon_size.xs} />),
            func: () => setTodoInAction(undefined)
        },
        {
            render: () => (<IconQitadingdan size={theme.icon_size.xs} />),
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
                        <IconShijian size={theme.icon_size.xs} color={checked ? theme.color.white : 'black'} />
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
                        <IconZhengque size={theme.icon_size.xs} color={checked ? theme.color.white : 'black'} />
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
                        <IconDeleteLight size={theme.icon_size.xs} color={checked ? theme.color.white : 'black'} />
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
        const { id, isFinish, isDelete, priority, childrenFinish, childrenDelete } = item;
        const { id: idCurrent } = currentTodo || {};
        const doingCount = childrenDoing(item);
        const headBtn: () => ITodoStatusButtonProps = () => {
            switch (todoStatus) {
                case TodoStatus.DOING:
                    return {
                        width: "24px",
                        enabled: todoCanUpdateIsFinish(item),
                        onClick: () => updateTodoIsFinish({ id, isFinish: !isFinish }),
                        contentNormal: <IconShijian size={theme.icon_size.s} color={theme.color.white}/>,
                        contentHover: <IconZhengque size={theme.icon_size.s} color={theme.color.white}/>,
                        contentDisabled: <IconFolderForbidLine size={theme.icon_size.s} color={theme.color.jumbo}/>,
                        vpNormal: {color: theme.color.white, bgColor: priorityColors[priority]},
                        vpHover: {color: theme.color.white, bgColor: theme.color.blue_chill},
                        vpDisabled: {color: theme.color.white, bgColor: priorityColors[priority]},
                    };
                case TodoStatus.DONE:
                    return {
                        width: "24px",
                        enabled: todoCanUpdateIsFinish(item),
                        onClick: () => updateTodoIsFinish({ id, isFinish: !isFinish }),
                        contentNormal: <IconZhengque size={theme.icon_size.s} color={theme.color.white}/>,
                        contentHover: <IconBack size={theme.icon_size.s} color={theme.color.white}/>,
                        vpNormal: {color: theme.color.white, bgColor: theme.color.blue_chill},
                        vpHover: {color: theme.color.white, bgColor: theme.color.carolina_blue},
                    };
                    case TodoStatus.DELETED:
                    return {
                        width: "24px",
                        enabled: true,
                        onClick: () => updateTodoIsDelete({ ...item, isDelete: !isDelete }),
                        contentNormal: <IconDeleteLight size={theme.icon_size.s} color={theme.color.white}/>,
                        contentHover: <IconBack size={theme.icon_size.s} color={theme.color.white}/>,
                        vpNormal: {color: theme.color.white, bgColor: theme.color.red},
                        vpHover: {color: theme.color.white, bgColor: theme.color.carolina_blue},
                    };
                default: return {};
            }
        };
        const numStr = (num: number) => num <= 0 ? undefined : (num > 99 ? '99+' : num);
        const tailBtn: () => ITodoItemTailButtonProps = () => {
            switch (viewMode) {
                case ViewMode.CASCADE:
                    switch (todoStatus) {
                        case TodoStatus.DOING:
                            return {
                                enabled: true,
                                func: toLevNext,
                                contentFore: <TodoItemTailBtnText>{numStr(doingCount)}</TodoItemTailBtnText>,
                                contentBack: <IconGouwu size={theme.icon_size.s} color={theme.color.white} />,
                            };
                        case TodoStatus.DONE:
                            return childrenFinish > 0 ? {
                                enabled: true,
                                func: toLevNext,
                                contentFore: <TodoItemTailBtnText>{numStr(childrenFinish)}</TodoItemTailBtnText>,
                                contentBack: <IconGouwu size={theme.icon_size.s} color={theme.color.white} />,
                            } : {};
                        case TodoStatus.DELETED:
                            return childrenDelete > 0 ? {
                                enabled: true,
                                func: toLevNext,
                                contentFore: <TodoItemTailBtnText>{numStr(childrenDelete)}</TodoItemTailBtnText>,
                                contentBack: <IconGouwu size={theme.icon_size.s} color={theme.color.white} />,
                            } : {};
                        default: return {};
                    }
                case ViewMode.SEARCH:
                    return {
                        enabled: true,
                        func: onTargetCascade,
                        contentFore: <IconTarget size={theme.icon_size.s} color={theme.color.mercury} />,
                        contentBack: <IconTarget size={theme.icon_size.s} color={theme.color.white} />,
                    };
                default:
                    return {};
            }
        };
        return (
            <TodoItem key={item.id} todo={item} isSelected={id === idCurrent} onClick={(event, todo) => todoSelected(event, todo)} headBtn={headBtn()} tailBtn={tailBtn()} onUpdateContent={updateTodoContent} inAction={!!todoInAction} onAction={todoOnAction} onContextMenu={onTodoContextMenu} />
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
                {listSelected && !listSelected.isGroup && (todoStatus === TodoStatus.DOING) && (
                    <NewTodoContainer>
                        <IconZengjia color={theme.color.white} />
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
    background-color: ${props => props.theme.color.indigo};
`

const Header = styled.div`
    margin: 0px 0px 8px 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: stretch;
    font-size: ${props => props.theme.font_size.xs};
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
    background-color: ${props => props.theme.color.periwinkle};
`

const SearchBox = styled.div`
    flex: 1;
    border-radius: 4px;
    min-width: 160px;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.color.periwinkle};
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
        color: ${props => props.theme.color.white};
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
        background-color: ${props => props.theme.color.periwinkle};  
    } 
`

const TodoList = styled.div`
    flex: 1;
`

const NewTodoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 0px 0px 8px;
    background-color: ${props => props.theme.color.mariner};
    border-radius: 4px;
    overflow: hidden;
`

const TodoInput: StyledComponent<React.ComponentType<InputProps>, any> = styled(Input)`
    flex: 1;
    border: none;
    padding: 4px 8px 4px;
    margin: 6px 0px;
    color: ${props => props.theme.color.white};
    background-color: transparent;
    font-family: inherit;

    &:focus {
        outline: none;
        border: none;
    }

    &::placeholder {
        color: ${props => props.theme.color.periwinkle};
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
    border: 2px solid ${props => props.theme.color.mariner};

    ${props => props.enabled && props.selected && css`
        border: 2px solid ${props.theme.color.white};
    `}
    ${props => props.enabled && css`
        &:hover{
            border: 2px solid ${props.theme.color.white};
        }
    `}
`

const ConfirmBtn = styled.div.attrs({} as { enabled: boolean })`
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 4px 8px;
    margin: 4px 4px 4px 0px;
    font-size: ${props => props.theme.font_size.m};
    background-color: ${props => props.theme.color.white};
    border-radius: 4px;
    cursor: default;
    background-color: ${props => props.theme.color.mercury};

    ${props => props.enabled && css`
        &:hover{
            cursor: pointer;
            color: ${props.theme.color.white};
            background-color: ${props.theme.color.coral};
        }
    `}
`

const ButtonBox = styled.div`
    display: flex;
    align-items: center;
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

const TodoItemTailBtnText = styled.p`
    color: ${props => props.theme.color.indigo};
    font-size: ${props => props.theme.font_size.xs};
`

export default Todos;