import { MsgListInsert, MsgListTreeSelect } from "@/interface/BridgeMsg";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { ThemeContext } from "styled-components";
import { IComponent } from "~/interfaces/Component";
import { useAppSelector } from "~/store/hooks";
import { contentToSearch, selectedList, setContentToSearch } from "~/store/slice/AppSlice";
import IconHangcheng from "../@iconfont/IconHangcheng";
import IconJia from "../@iconfont/IconJia";
import { IconButton } from "../IconButton";
import { ListTree } from "../ListTree";
import { createSignal } from "@react-rxjs/utils";
import { bind } from "@react-rxjs/core";
import { debounceTime } from "rxjs";

export interface IListPanelProps extends IComponent {

}

export const ListPanel = (props: IListPanelProps) => {

    const {className} = props;

    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const listSelected = useAppSelector(selectedList);

    const [treeNodes, setTreeNodes] = useState([]);
    const [creating, setCreating] = useState(undefined as Creating | undefined);
    const [newTitle, setNewTitle] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchText, setSearchText] = createSignal<string>();
    const [useSearchText, searchTextObs] = bind(searchText);

    useEffect(() => selectTreeNodes(), [true])
    useEffect(() => setNewTitle(''), [creating]);

    searchTextObs.pipe(debounceTime(600)).subscribe(searchContent => dispatch(setContentToSearch(searchContent)));

    const IconNewList = IconButton(IconJia);
    const IconNewGroup = IconButton(IconHangcheng);

    const insertList = () => {
        setCreating(Creating.LIST);
    }

    const insertGroup = () => {
        setCreating(Creating.GROUP);
    }

    const selectTreeNodes = () => {
        window.Main.invoke(new MsgListTreeSelect()).then(nodes => setTreeNodes(nodes));
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const onInputBlur = () => {
        setCreating(undefined);
    }

    const onInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const {id, parentId, isGroup} = listSelected || {};
        if (event.key === 'Enter' && creating && newTitle) {
            window.Main.invoke(new MsgListInsert({title: newTitle, parentId: isGroup ? id : parentId, isGroup: creating === Creating.GROUP})).then(ok => {
                setCreating(undefined);
                selectTreeNodes();
            });
        }
    }

    const onSearchFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        dispatch(setContentToSearch(''));
        setSearchValue('');
    }

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setSearchText(event.target.value);
    }

    return (
        <Container className={className}>
            <Header>
                <Search placeholder="Search" value={searchValue} onChange={onSearch} onFocus={onSearchFocus} />
            </Header>
            <Body>
                <ListTree nodes={treeNodes}/> 
            </Body>
            <Footer>
                {creating ? (
                    <TheInput autoFocus={true} value={newTitle} placeholder={creating === Creating.LIST ? 'New List' : 'New Group'} onChange={onInputChange} onBlur={onInputBlur} onKeyPress={onInputKeyPress}/>
                ) : (
                    <>
                        <IconNewList size={theme.iconSize1} onClick={insertList} />
                        <IconNewGroup size={theme.iconSize1} onClick={insertGroup} />
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
    background-color: ${props => props.theme.color4};
`

const Header = styled.div`
    padding: 4px 4px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: 12px;
`

const Search = styled.input`
    border-radius: 4px;
    border: 1px solid gray;
    padding: 4px 8px 4px;
    background-color: ${props => props.theme.color1};
    font-family: inherit;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: lightgray;
    }
`

const Body = styled.div`
    flex: 1;
    display: flex;
    font-size: ${props => props.theme.fontSize2};
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

const Footer = styled.div`
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    background-color: ${props => props.theme.color3};
`

const TheInput = styled.input`
    flex: 1;
    border: none;
    border-radius: 4px;
    font-family: inherit;
    font-size: ${props => props.theme.fontSize1};
    padding: 4px 8px;

    &:focus {
        outline: none;
        border: none;
    }

    &::placeholder {
        color: ${props => props.theme.color3};
    }
`