import { ITodo, ITodoBasic, ITodoUpdate, todoCanFinish } from '@/interface/Data';
import React, { useContext, useState, useEffect, MouseEvent, createElement, ReactNode } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import { IComponent } from '~/interfaces/Component';
import IconQitadingdan from '../@iconfont/IconQitadingdan';
import { TodoStatusButton } from '../TodoStatusButton';
import { priorityColors } from '~/styles/Themes';
import IconZhengque from '../@iconfont/IconZhengque';
import { IconButton, IIconProps } from '../IconButton';

export interface ITodoItemTailBtn {
    enabled?: boolean,
    func?: (todo: ITodo) => void,
    contentFore?: ReactNode,
    contentBack?: ReactNode,
}

export interface ITodoItem extends IComponent {
    todo: ITodo,
    isSelected: boolean,
    onClick: (event: React.MouseEvent, todo: ITodo) => void,
    tailBtn: ITodoItemTailBtn,
    onUpdateIsFinish: (todo: ITodoUpdate) => void,
    onUpdateContent: (todo: ITodoBasic) => void,
    inAction?: boolean, // 是否有待办正处于移动或者复制模式
    onAction?: (todo: ITodoBasic) => void, // 待办粘贴操作,
    onContextMenu: (e: MouseEvent<HTMLDivElement>, todo: ITodo) => void,
}

export const TodoItem = (props: ITodoItem) => {

    const { todo, todo: { id, content: initContent, comment, isFinish, isDelete, childrenCount, childrenFinish, childrenDelete, priority, childrenPriority }, isSelected = false, onClick, tailBtn, onUpdateIsFinish, onUpdateContent, inAction = false, onContextMenu, onAction, className } = props;
    
    const [content, setContent] = useState(initContent);

    useEffect(() => setContent(initContent), [initContent]);

    const theme = useContext(ThemeContext);

    const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { id } = todo;
        if (content !== initContent) {
            onUpdateContent({ id, content });
        }
    }

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            (event.target as HTMLInputElement).blur();
        }
    }

    const onContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
        onClick(event, todo);
        event.stopPropagation();
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

    const IconPaste = IconButton(IconQitadingdan);

    /**
     * Container区域内IconGroup区域外第一次点击默认行为为选中条目，控件仅可以对之后的点击作出响应，IconGroup区域内的控件不受限制
     */
    return (
        <>
            <Container className={className} isSelected={isSelected} onClick={onContainerClick} onContextMenu={e => onContextMenu(e, todo)}>
                <TodoStatusButton icon={IconZhengque} iconSize={12} bgColor={priorityColors[priority]} bgColorHover={theme.color6} enabled={todoCanFinish(todo)} checked={isFinish} colorUnchecked={theme.color1} onClick={() => onUpdateIsFinish({ id, isFinish: !isFinish })} />
                <ContentArea>
                    <Header>
                        <ListName />
                        <NaviBox />
                    </Header>
                    <Body>
                        {isSelected ? (
                            <ContentInput value={content} onChange={onChange} onBlur={onInputBlur} onKeyPress={onKeyPress} />
                        ) : (
                            <ContentBox>
                                <ContentRect>
                                    <Content>{content}</Content>
                                </ContentRect>
                            </ContentBox>
                        )}
                        <IconGroup onClick={(e) => e.stopPropagation()}>
                            {inAction && onAction && <IconPaste size={theme.iconSize2} onClick={() => onAction(todo)} />}
                        </IconGroup>
                    </Body>
                    <Footer>

                    </Footer>
                </ContentArea>
                {tailBtn && <StatBtn enabled={tailBtn.enabled} onClick={() => tailBtn.enabled && tailBtn.func && tailBtn.func(todo)}>
                    <StatBtnLayer className="stat-btn-fore">{tailBtn.contentFore}</StatBtnLayer>
                    <StatBtnLayer className="stat-btn-back">{tailBtn.contentBack}</StatBtnLayer>
                </StatBtn>}
            </Container>
        </>
    );
}

const Container = styled.div.attrs({} as { isSelected: boolean })`
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    margin: 1px;
    border-radius: 4px;
    overflow: hidden;
    background-color: ${props => props.isSelected ? props.theme.color3 : props.theme.color1};
`

const ContentArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    font-size: 8px;
    height: 12px;
`

const Body = styled.div`
    display: flex;
    align-items: stretch;
`

const Footer = styled.div`
    display: flex;
    align-items: center;
    height: 12px;
`

const ListName = styled.div`

`

const NaviBox = styled.div`
    flex: 1;
`

const StatBtn = styled.div.attrs({} as { enabled: boolean })`
    width: 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    & .stat-btn-fore {
        display: flex;
    }
    & .stat-btn-back {
        display: none;
    }

    ${props => props.enabled && css`
        &:hover{
            cursor: pointer;
            color: ${props.theme.color1};
            background: ${props.theme.color3};

            & .stat-btn-fore {
                display: none;
            }
            & .stat-btn-back {
                display: flex;
            }
        }
    `}
`

const StatBtnLayer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const IconGroup = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 4px 0px 8px;

    & > * {
        padding: 2px;
        margin: 0px 2px;
        border-radius: 2px;
    }
`

const ContentBox = styled.div`
    flex: 1;
    position: relative;
    height: 22px;
`

const ContentRect = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    align-items: center;
`

const Content = styled.p`
    flex: 1;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 4px 8px;
    font-size: ${props => props.theme.fontSize1};
`

const ContentInput = styled.input`
    flex: 1;
    background-color: transparent;
    border: none;
    font-size: ${props => props.theme.fontSize1};
    font-family: inherit;
    padding: 4px 8px;

    &:focus {
        background-color: ${props => props.theme.color1};
        outline: none;
        border: none;
        border-radius: 4px;
    }
`

