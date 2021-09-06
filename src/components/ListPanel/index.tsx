import styled from "styled-components";
import { IComponent } from "~/interfaces/Component";
import IconHangcheng from "../@iconfont/IconHangcheng";
import IconMulu from "../@iconfont/IconMulu";

export interface IListPanelProps extends IComponent {

}

export const ListPanel = (props: IListPanelProps) => {

    const {className} = props;

    return (
        <Container className={className}>
            <Header>

            </Header>
            <Body>

            </Body>
            <Footer>
                <IconMulu />
                <IconHangcheng />
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