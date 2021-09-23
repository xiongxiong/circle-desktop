
import styled, { ThemeProvider } from 'styled-components';
import { TodoNavi } from '.';
import { ITodoBasic } from '@/interface/Data';
import { GlobalStyle } from '~/styles/GlobalStyle';
import { themeDefault } from '~/styles/Themes';

export function App() {

    const nodes = [
        {
            id: 0,
            content: 'comeback down',
        },
        {
            id: 1,
            content: 'base component',
        },
        {
            id: 2,
            content: 'hello world',
        },
        {
            id: 3,
            content: 'woo',
        },
        {
            id: 4,
            content: 'not important',
        },
        {
            id: 5,
            content: 'i love you',
        },
        {
            id: 6,
            content: 'come on, baby',
        },
        {
            id: 7,
            content: 'do it, do it',
        },
        {
            id: 8,
            content: 'there must be something wrong',
        },
        {
            id: 9,
            content: 'my first desktop app',
        },
        {
            id: 10,
            content: 'ding ding dong dong',
        },
        {
            id: 11,
            content: 'bj haru dance',
        },
    ];

    const toLevPrev = (node: ITodoBasic) => {
        console.log("TO LEV PREV :", node);
    }

    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={themeDefault}>
                <Container>
                    <NavContainer>
                        <TodoNavi nodes={nodes} toLevPrev={toLevPrev} />
                    </NavContainer>
                </Container>
            </ThemeProvider>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const NavContainer = styled.div`
    background-color: ${props => props.theme.color5};
`
