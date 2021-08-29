
import { GlobalStyle } from './styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';
import { FlexBox } from './components/FlexBox';
import React, { Suspense } from 'react';
import { Spin } from 'antd';

const Todos = React.lazy(() => import('./pages/Todos'));

export const App = () => {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={themeDefault}>
                <Suspense fallback={<Spin size="large" />}>
                    <Container stairs={['200px']} stairAt={0}>
                        <Todos />
                    </Container>
                </Suspense>
            </ThemeProvider>
        </>
    );
}

const Container = styled(FlexBox)`
    height: 100vh;
`