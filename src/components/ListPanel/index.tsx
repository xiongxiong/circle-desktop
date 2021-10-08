import { MsgListInsert } from "@/interface/BridgeMsg";
import { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css, ThemeContext } from "styled-components";
import { IComponent } from "~/interfaces/Component";
import { useAppSelector } from "~/store/hooks";
import { selectedList, setListSelected } from "~/store/slice/AppSlice";
import IconHangcheng from "../@iconfont/IconHangcheng";
import IconJia from "../@iconfont/IconJia";
import { IconButton, IconProps } from "../IconButton";
import { ListTree } from "../ListTree";
import { trigger } from "~/events";
import { Events } from "~/events/Events";
import IconSousuo from "../@iconfont/IconSousuo";
import { ITheme } from "~/styles/Themes";

interface MenuItemProps {
    label: string,
    icon: React.FunctionComponent<IconProps>,
    func: () => void,
    selected: () => boolean,
}

export interface IListPanelProps extends IComponent {

}

export const ListPanel = (props: IListPanelProps) => {

    const {className} = props;

    const theme: ITheme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const listSelected = useAppSelector(selectedList);

    const [creating, setCreating] = useState(undefined as Creating | undefined);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => setNewTitle(''), [creating]);

    const IconNewList = IconButton(IconJia);
    const IconNewGroup = IconButton(IconHangcheng);

    const menuItems: MenuItemProps[] = [
        {
            label: '搜索全部',
            icon: IconSousuo,
            func: () => dispatch(setListSelected(undefined)),
            selected: () => listSelected === undefined,
        }
    ];

    const menuItemRender = (menu: MenuItemProps, index: number) => (
        <MenuItemContainer key={index} selected={menu.selected()} onClick={menu.func}>
            <menu.icon size={theme.icon_size.xs} />
            <MenuItemText>{menu.label}</MenuItemText>
        </MenuItemContainer>
    );

    const insertList = () => {
        setCreating(Creating.LIST);
    }

    const insertGroup = () => {
        setCreating(Creating.GROUP);
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const onInputBlur = () => {
        setCreating(undefined);
    }

    const onInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && creating && newTitle) {
            window.Main.invoke(new MsgListInsert({title: newTitle, isGroup: creating === Creating.GROUP})).then(ok => {
                setCreating(undefined);
                trigger(Events.LIST_TREE_REFRESH);
            });
        }
    }

    return (
        <Container className={className}>
            <Header>
                {menuItems.map((menu, index) => menuItemRender(menu, index))}
            </Header>
            <Body>
                <ListTree/> 
            </Body>
            <Footer>
                {creating ? (
                    <TheInput autoFocus={true} value={newTitle} placeholder={creating === Creating.LIST ? 'New List' : 'New Group'} onChange={onInputChange} onBlur={onInputBlur} onKeyPress={onInputKeyPress}/>
                ) : (
                    <>
                        <IconNewList size={theme.icon_size.xs} onClick={insertList} />
                        <IconNewGroup size={theme.icon_size.xs} onClick={insertGroup} />
                    </>
                )}
            </Footer>
        </Container>
    );
}

enum Creating {
    LIST = "LIST",
    GROUP = "GROUP"
}

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: ${props => props.theme.color.mercury};
`

const Header = styled.div`
    padding: 4px 4px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: 12px;
`

const MenuItemContainer = styled.div.attrs({} as {selected: boolean})`
    padding: 4px 4px;
    display: flex;
    align-items: center;
    cursor: default;
    ${props => props.selected && css`
        color: ${props => props.theme.color.white};
        background-color: ${props => props.theme.color.carolina_blue};
    `}

    &:hover {
        ${props => !props.selected && css`
            color: ${props => props.theme.color.white};
            background-color: ${props => props.theme.color.periwinkle};
        `}
    }
`

const MenuItemText = styled.span`
    flex: 1;
    margin: 0px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const Body = styled.div`
    flex: 1;
    display: flex;
    font-size: ${props => props.theme.font_size.s};
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

const Footer = styled.div`
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    background-color: ${props => props.theme.color.periwinkle};
`

const TheInput = styled.input`
    flex: 1;
    border: none;
    border-radius: 4px;
    font-family: inherit;
    font-size: ${props => props.theme.font_size.xs};
    padding: 4px 8px;

    &:focus {
        outline: none;
        border: none;
    }

    &::placeholder {
        color: ${props => props.theme.color.periwinkle};
    }
`