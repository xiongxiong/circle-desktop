import React, { useState, useEffect, useContext, createRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ITodo, ITodoBasic, ITodoUpdate, ITodoStat, TodoStatus } from '@/interface/Data';
import { MsgTodoUpdate, MsgTodoSelectList, MsgTodoSelectStatAll, MsgDialogMessageBox, IDialogButtonProps } from '@/interface/BridgeMsg';
import { TodoItem } from '~/components/TodoItem';
import { Empty } from '~/components/Empty';
import { ButtonGroup } from '~/components/ButtonGroup';
import { useDispatch } from 'react-redux';
import IconZhengque from '~/components/@iconfont/IconZhengque';
import IconXiaolian from '~/components/@iconfont/IconXiaolian';
import IconShaixuan1 from '~/components/@iconfont/IconShaixuan1';
import { useAppSelector } from '~/store/hooks';
import { contentToSearch } from '~/store/slice/AppSlice';
import { ContextMenu } from 'primereact/contextmenu';

export interface ITodosProps {

}

export const Todos = (props: ITodosProps) => {

    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const searchContent = useAppSelector(contentToSearch);
    const cm = createRef<ContextMenu>();

    const [todos, setTodos] = useState([] as ITodo[]); // 待办列表
    const [todoStat, setTodoStat] = useState({ childrenCount: 0, childrenFinish: 0, childrenDelete: 0 } as ITodoStat); // 待办数量统计
    const [currentTodo, setCurrentTodo] = useState(undefined as (ITodo | undefined)); // 选中待办
    const [contextTodo, setContextTodo] = useState(undefined as (ITodo | undefined)); // 上下文菜单对应待办
    const [todoStatus, setTodoStatus] = useState(TodoStatus.DOING); // 待办列表状态筛选

    useEffect(() => {
        selectTodoListAndTodoStat();
    }, [todoStatus, searchContent]);

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

    /**
     * 查询待办列表
     * @param clearBeforeRequest 是否在查询发起前清空当前待办列表
     */
    const selectTodoListAndTodoStat = (clearBeforeRequest: boolean = false) => {
        clearBeforeRequest && setTodos([]);

        window.Main.invoke(new MsgTodoSelectList({ listId: 1, content: searchContent, status: todoStatus })).then((todos: ITodo[]) => {
            setTodos(todos);
        });

        window.Main.invoke(new MsgTodoSelectStatAll({ listId: 1 })).then(node => {
            const { childrenCount, childrenFinish, childrenDelete } = node || {};
            setTodoStat({ childrenCount, childrenFinish, childrenDelete });
        });
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

    const updateTodoIsDelete = (todo?: ITodoUpdate & ITodoStat) => {
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

        if (todo) {
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
    }

    const updateTodoPriority = (todo: ITodoUpdate) => {
        window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const todoSelected = (event: React.MouseEvent, todo: ITodo) => setCurrentTodo(todo);

    const todoSelectedClear = () => setCurrentTodo(undefined);

    const menuItems = [
        {
            label: '详情',
            icon: 'pi pi-fw pi-info-circle',
        },
        {
            separator: true
        },
        {
            label: '删除',
            icon: 'pi pi-fw pi-trash',
            command: () => contextTodo && updateTodoIsDelete({...contextTodo, isDelete: true}),
        },
    ];

    const onTodoContextMenu = (e: React.MouseEvent<HTMLDivElement>, todo: ITodo) => {
        setContextTodo(todo);
        cm.current?.show(e);
    }

    const listItemRender = (item: ITodo) => {
        const { id } = item;
        const { id: idCurrent } = currentTodo || {};
        return (
            <TodoItem key={item.id} todo={item} isSelected={id === idCurrent} onClick={(event, todo) => todoSelected(event, todo)} onFinish={updateTodoIsFinish} onUpdateContent={updateTodoContent} onUpdatePriority={updateTodoPriority} onContextMenu={onTodoContextMenu} />
        );
    }

    return (
        <>
            <TodoContextMenu model={menuItems} ref={cm} />
            <Container onClick={todoSelectedClear}>
                <Header>
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
    margin: 0px 0px 4px 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`

const ButtonGroupBox = styled.div`
    margin-left: 12px;
    font-size: ${props => props.theme.fontSize1};
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

const ButtonBox = styled.div`
    display: flex;
`

const ButtonText = styled.div`
    min-width: 26px;
    display: flex;
    justify-content: center;
`
export default Todos;