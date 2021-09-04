import React from 'react';
import styled, { StyledComponent, ThemeContext } from 'styled-components';
import { ITodo, ITodoHasIdContent, ITodoUpdate, ITodoStat, TodoStatus } from '@/interface/Todo';
import { MsgTodoUpdate, MsgTodoSelect, MsgTodoSelectList } from '@/interface/BridgeMsg';
import { TodoItem } from '~/components/TodoItemForSearch';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Empty } from '~/components/Empty';
import { FlexBox, IFlexBoxRef } from '~/components/FlexBox';
import { createRef } from 'react';
import { ButtonGroup } from '~/components/ButtonGroup';
import { TodoDetail } from '~/components/TodoDetailForSearch';
import { StoreContext } from '~/store/Store';
import IconZhengque from '~/components/@iconfont/IconZhengque';
import IconXiaolian from '~/components/@iconfont/IconXiaolian';
import IconShaixuan1 from '~/components/@iconfont/IconShaixuan1';
import { Input, InputProps } from 'antd';
import IconShaixuan from '~/components/@iconfont/IconShaixuan';
import { debounceTime } from 'rxjs';
import { createSignal } from '@react-rxjs/utils';
import { bind } from '@react-rxjs/core';

export interface ITodosProps {

}

export const Todos = (props: ITodosProps) => {

    const theme = useContext(ThemeContext);
    const store = useContext(StoreContext);

    const [todos, setTodos] = useState([] as ITodo[]); // 待办列表
    const [todoStat, setTodoStat] = useState({ childrenCount: 0, childrenFinish: 0, childrenDelete: 0 } as ITodoStat); // 待办数量统计
    const [currentTodo, setCurrentTodo] = useState(undefined as (ITodo | undefined)); // 选中待办
    const [todoStatus, setTodoStatus] = useState(TodoStatus.DOING); // 待办列表状态筛选
    const [searchText, setSearchText] = createSignal<string>();
    const [useSearchText, searchTextObs] = bind(searchText);

    useEffect(() => {
        selectTodoListAndTodoStat(true);
    }, [todoStatus]);

    useEffect(() => {
        currentTodo ? openDetail() : shutDetail();
    }, [currentTodo]);

    searchTextObs.pipe(debounceTime(600)).subscribe(toSearch => window.Main.invoke(new MsgTodoSelectList({ content: toSearch, status: todoStatus })).then((todos: ITodo[]) => {
        console.log("todos : ", todos);
        setTodos(todos);
    }));

    const finishStatusBtns = () => {
        const { childrenCount = 0, childrenFinish = 0, childrenDelete = 0 } = todoStat || {};
        return [
            {
                render: () => (
                    <ButtonBox>
                        <IconXiaolian size={theme.iconSize0} />
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
                        <IconZhengque size={theme.iconSize0} />
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
                        <IconShaixuan1 size={theme.iconSize0} />
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
            render: () => (<IconShaixuan size={theme.iconSize0} />),
            func: () => store.setViewModeToList()
        },
    ];

    /**
     * 查询待办列表
     * @param clearBeforeRequest 是否在查询发起前清空当前待办列表
     */
    const selectTodoListAndTodoStat = (clearBeforeRequest: boolean = false) => {
        clearBeforeRequest && setTodos([]);

        window.Main.invoke(new MsgTodoSelectList({ content: '', status: todoStatus })).then((todos: ITodo[]) => {
            console.log("todos : ", todos);
            setTodos(todos);
        });

        window.Main.invoke(new MsgTodoSelect(nodeHome)).then(node => {
            const { childrenCount, childrenFinish, childrenDelete } = node || {};
            setTodoStat({ childrenCount, childrenFinish, childrenDelete });
        });
    }

    const updateTodoContent = (todo: ITodoHasIdContent) => {
        window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoComment = (todo: ITodoUpdate) => {
        window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoIsFinish = (todo: ITodoUpdate) => {
        window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const updateTodoIsDelete = (event: React.MouseEvent, todo?: ITodoUpdate) => {
        if (todo) {
            window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => {
                if (ok) {
                    todoSelectedClear();
                    selectTodoListAndTodoStat();
                }
            });
        }
    }

    const updateTodoPriority = (todo: ITodoUpdate) => {
        window.Main.invoke(new MsgTodoUpdate(todo)).then(ok => ok && selectTodoListAndTodoStat());
    }

    const todoSelected = (event: React.MouseEvent, todo: ITodo) => setCurrentTodo(todo);

    const todoSelectedClear = () => setCurrentTodo(undefined);

    const detailRef: React.ForwardedRef<IFlexBoxRef> = createRef();

    const openDetail = () => detailRef.current?.stairTo(1);

    const shutDetail = () => detailRef.current?.stairTo(0);

    const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

    const listItemRender = (item: ITodo) => {
        const { id } = item;
        const { id: idCurrent } = currentTodo || {};
        return (
            <TodoItem key={item.id} todo={item} isSelected={id === idCurrent} onClick={(event, todo) => todoSelected(event, todo)} onFinish={updateTodoIsFinish} onUpdateContent={updateTodoContent} onUpdatePriority={updateTodoPriority} />
        );
    }

    const boxRender = () => currentTodo && (<TodoDetail todo={currentTodo} closePanel={shutDetail} updateTodoIsDelete={updateTodoIsDelete} updateTodoCotent={updateTodoContent} updateTodoComment={updateTodoComment} />);

    return (
        <FlexBox ref={detailRef} direction='row-reverse' stairs={['30%']} boxRender={boxRender}>
            <Container onClick={todoSelectedClear}>
                <Header>
                    <SearchBox>
                        <SearchInput placeholder='Type to Search' onChange={onSearchTextChange} />
                    </SearchBox>
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

const SearchBox = styled.div`
    flex: 1;
    display: flex;
    background-color: ${props => props.theme.color2};
    border-radius: 4px;
`

const SearchInput: StyledComponent<React.ComponentType<InputProps>, any> = styled(Input)`
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

const ButtonBox = styled.div`
    display: flex;
`

const ButtonText = styled.div`
    min-width: 26px;
    display: flex;
    justify-content: center;
`
export default Todos;