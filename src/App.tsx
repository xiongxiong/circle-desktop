
import { GlobalStyle } from './styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';
import { Todos } from './pages/Todos';
import { FlexBox } from './components/FlexBox';

export function App() {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={themeDefault}>
                <Container stairs={['30%']}>
                    <Todos />
                </Container>
            </ThemeProvider>
        </>
    );
}

const Container = styled(FlexBox)`
    height: 100vh;
`