import { ITodo, ITodoHasIdContent, ITodoUpdate, todoCanFinish } from '@/interface/Data';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { IComponent } from '~/interfaces/Component';
import IconDuigouWeigouxuan from '../@iconfont/IconDuigouWeigouxuan';
import IconDuigouzhong from '../@iconfont/IconDuigouzhong';
import IconGengduo from '../@iconfont/IconGengduo';
import IconJia from '../@iconfont/IconJia';
import IconLiebiao from '../@iconfont/IconLiebiao';
import IconQitadingdan from '../@iconfont/IconQitadingdan';
import IconZengjia from '../@iconfont/IconZengjia';
import { PriorityButtonGroup } from '../PriorityButtonGroup';

export interface ITodoItem extends IComponent {
    todo: ITodo,
    isSelected: boolean,
    onClick: (event: React.MouseEvent, todo: ITodo) => void,
    onLevNext?: (todo: ITodoHasIdContent) => void,
    onFinish: (todo: ITodoUpdate) => void,
    onUpdateContent: (todo: ITodoHasIdContent) => void,
    onUpdatePriority: (todo: ITodoUpdate) => void,
    inAction?: boolean, // 是否有待办正处于移动或者复制模式
    onAction?: (todo: ITodoHasIdContent) => void, // 待办粘贴操作
}

export const TodoItem = (props: ITodoItem) => {

    const { todo, todo: { content: initContent, comment, isFinish, isDelete, childrenCount, priority, childrenPriority }, isSelected = false, onClick = () => { }, onLevNext, onFinish = (todo: ITodoUpdate) => { }, onUpdateContent = (todo: ITodoHasIdContent) => { }, onUpdatePriority = (todo: ITodoUpdate) => { }, inAction = false, onAction, className } = props;

    const [priorityMode, setPriorityMode] = useState(false);
    const [content, setContent] = useState(initContent);

    useEffect(() => setContent(initContent), [initContent]);

    const theme = useContext(ThemeContext);
    const colors = [theme.priorColor1, theme.priorColor2, theme.priorColor3, theme.priorColor4, theme.priorColor5, theme.priorColor6, theme.priorColor7, theme.priorColor8, theme.priorColor9];

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

    const updateTodoIsFinish = (isFinish: boolean) => {
        const { id } = todo;
        onFinish({ id, isFinish });
    }

    const onContainerClick = (event: React.MouseEvent) => {
        onClick(event, todo);
        event.stopPropagation();
    }

    const switchPriorityMode = () => {
        if (isSelected && !isFinish && !isDelete) {
            setPriorityMode(!priorityMode);
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

    const todoUpdatePriority = (priority: number) => {
        const { id } = todo;
        onUpdatePriority({ id, priority });
    }

    const IconFinish = isFinish ? IconDuigouzhong : IconDuigouWeigouxuan;
    const IconLevNext = childrenCount > 0 ? IconGengduo : IconJia;

    /**
     * Container区域内IconGroup区域外第一次点击默认行为为选中条目，控件仅可以对之后的点击作出响应，IconGroup区域内的控件不受限制
     */
    return (
        <Container className={className} isSelected={isSelected} onClick={onContainerClick}>
            <PrioritySwitchButton color={colors[priority - 1]} onClick={switchPriorityMode} />
            <PrioritySwitchArea>
                <ContentContainer>
                    <ContentGroup>
                        {isSelected ? (
                            <ContentInput value={content} onChange={onChange} onBlur={onInputBlur} onKeyPress={onKeyPress} />
                        ) : (
                            <InfoShowBox>
                                <Content hasComment={!!comment}>{content}</Content>
                                {comment && (
                                    <Comment>{comment}</Comment>
                                )}
                            </InfoShowBox>
                        )}
                    </ContentGroup>
                    <IconGroup onClick={(e) => e.stopPropagation()}>
                        {inAction && onAction && <IconQitadingdan size={theme.iconSize1} onClick={() => onAction(todo)} />}
                        <IconFinish size={theme.iconSize1} color={!todoCanFinish(todo) ? 'lightgray' : 'black'} onClick={() => updateTodoIsFinish(!isFinish)} />
                        {onLevNext && <IconLevNext size={theme.iconSize1} color={colors[childrenPriority - 1]} onClick={() => onLevNext(todo)} />}
                    </IconGroup>
                </ContentContainer>
                <PriorityContainer show={priorityMode && isSelected} onClick={() => setPriorityMode(false)}>
                    <PriorityButtonGroup colors={colors} setPriority={todoUpdatePriority} />
                </PriorityContainer>
            </PrioritySwitchArea>
        </Container>
    );
}

const Container = styled.div.attrs({} as { isSelected: boolean })`
    height: 41px;
    display: flex;
    align-items: stretch;
    margin: 1px;
    border-radius: 4px;
    overflow: hidden;
    background-color: ${props => props.isSelected ? props.theme.color3 : props.theme.color1};
`

const PrioritySwitchButton = styled.div.attrs({} as { color: string })`
    width: 16px;
    background-color: ${props => props.color};
`

const PrioritySwitchArea = styled.div`
    flex: 1;
    position: relative;
`

const PriorityContainer = styled.div.attrs({} as { show: boolean })`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: ${props => props.show ? 2 : -1};
    background-color: ${props => props.theme.color1};
    display: flex;
    justify-content: stretch;
`

const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 8px;
`

const ContentGroup = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

const InfoShowBox = styled.div`
    flex: 1;
    max-width: 100%;
    display: flex;
    align-items: center;
    padding: 4px 8px;
`

const Content = styled.p.attrs({} as {hasComment: boolean})`
    min-width: 20%;
    max-width: ${props => props.hasComment ? 80 : 100}%;
    font-size: 12px;
    font-family: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const Comment = styled.p`
    min-width: 20%;
    max-width: 80%;
    padding: 0px 8px;
    color: ${props => props.theme.color8};
    font-size: 10px;
    font-family: inherit;
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const ContentInput = styled.input`
    flex: 1;
    background-color: transparent;
    border: none;
    font-size: 12px;
    font-family: inherit;
    padding: 4px 8px;

    &:focus {
        background-color: ${props => props.theme.color1};
        outline: none;
        border: none;
        border-radius: 4px;
    }
`

