
import { GlobalStyle } from './styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';
import { Todos } from './pages/Todos';
import { FlexBox } from './components/FlexBox';

export const App = () => {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={themeDefault}>
                <Container stairs={['200px']} stairAt={0}>
                    <Todos />
                </Container>
            </ThemeProvider>
        </>
    );
}

const Container = styled(FlexBox)`
    height: 100vh;
`