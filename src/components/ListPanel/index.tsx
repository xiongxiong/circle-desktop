import { MsgListInsert, MsgListTreeSelect } from "@/interface/BridgeMsg";
import DirectoryTree from "antd/lib/tree/DirectoryTree";
import { useEffect } from "react";
import { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { IComponent } from "~/interfaces/Component";
import IconHangcheng from "../@iconfont/IconHangcheng";
import IconJia from "../@iconfont/IconJia";
import IconMulu from "../@iconfont/IconMulu";
import { IconButton } from "../IconButton";

export interface IListPanelProps extends IComponent {

}

export const ListPanel = (props: IListPanelProps) => {

    const {className} = props;

    const theme = useContext(ThemeContext);

    const [listTree, setListTree] = useState([]);

    useEffect(() => selectListTree(), [true])

    const IconNewList = IconButton(IconJia);
    const IconNewGroup = IconButton(IconHangcheng);

    const listInsert = () => {
        window.Main.invoke(new MsgListInsert({title: '未命名列表'})).then(ok => {});
    }

    const selectListTree = () => {
        window.Main.invoke(new MsgListTreeSelect()).then(root => {
            console.log("[LIST TREE]", root);
            setListTree(root.children)
        });
    }

    return (
        <Container className={className}>
            <Header>

            </Header>
            <Body>
                <DirectoryTree treeData={listTree}/>
            </Body>
            <Footer>
                <IconNewList size={theme.iconSize1} />
                <IconNewGroup size={theme.iconSize1} />
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
`

const Footer = styled.div`
    height: 40px;
    padding: 0px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`