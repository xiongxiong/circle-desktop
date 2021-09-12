import { MsgListInsert, MsgListTreeSelect } from "@/interface/BridgeMsg";
import { IListBasic } from "@/interface/Data";
import { Key, useEffect } from "react";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { ThemeContext } from "styled-components";
import { IComponent } from "~/interfaces/Component";
import { setCurList } from "~/store/slice/curListSlice";
import IconHangcheng from "../@iconfont/IconHangcheng";
import IconJia from "../@iconfont/IconJia";
import { IconButton } from "../IconButton";
import { ListTree } from "../ListTree";

export interface IListPanelProps extends IComponent {

}

export const ListPanel = (props: IListPanelProps) => {

    const {className} = props;

    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();

    const [treeNodes, setTreeNodes] = useState([]);

    useEffect(() => selectTreeNodes(), [true])

    const IconNewList = IconButton(IconJia);
    const IconNewGroup = IconButton(IconHangcheng);

    const insertList = () => {
        window.Main.invoke(new MsgListInsert({title: '未命名列表'})).then(ok => selectTreeNodes());
    }

    const insertGroup = () => {
        window.Main.invoke(new MsgListInsert({title: '未命名分组', isGroup: true})).then(ok => selectTreeNodes());
    }

    const selectTreeNodes = () => {
        window.Main.invoke(new MsgListTreeSelect()).then(nodes => setTreeNodes(nodes));
    }

    const onListTreeSelect = (keys: Key[], event: any) => {
        const {node: {id, parentId, title, isGroup}} = event;
        if (!isGroup) {
            dispatch(setCurList({id, parentId, title, isGroup}));
        }
    }

    return (
        <Container className={className}>
            <Header>

            </Header>
            <Body>
                <ListTree nodes={treeNodes}/> 
            </Body>
            <Footer>
                <IconNewList size={theme.iconSize1} onClick={insertList} />
                <IconNewGroup size={theme.iconSize1} onClick={insertGroup} />
            </Footer>
        </Container>
    );
}

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: ${props => props.theme.color4};
`

const Header = styled.div`
    height: 100px;
`

const Body = styled.div`
    flex: 1;
    display: flex;
    font-size: ${props => props.theme.fontSize2};
`

const Footer = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
`