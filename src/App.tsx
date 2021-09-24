
import { GlobalStyle } from './styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';
import { FlexBox } from './components/FlexBox';
import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { ListPanel } from './components/ListPanel';

export const App = () => {

    const boxRender = () => <ListPanel />

    return (
        <>
                <GlobalStyle />
                <ThemeProvider theme={themeDefault}>
                    <Suspense fallback={<Spin size="large" />}>
                        <Container stairs={[{width: '200px', minWidth: '200px'}]} stairAt={1} boxRender={boxRender}>
                            <Todos />
                        </Container>
                    </Suspense>
                </ThemeProvider>
        </>
    );
}

const Todos = React.lazy(() => import('./pages/Todos'));

const Container = styled(FlexBox)`
    height: 100vh;
`