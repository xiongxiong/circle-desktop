
import { GlobalStyle } from './styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';
import { FlexBox } from './components/FlexBox';
import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { ListPanel } from './components/ListPanel';
import { useAppSelector } from './store/hooks';
import { contentToSearch } from './store/slice/AppSlice';

export const App = () => {

    const searchContent = useAppSelector(contentToSearch);

    const boxRender = () => <ListPanel />

    return (
        <>
                <GlobalStyle />
                <ThemeProvider theme={themeDefault}>
                    <Suspense fallback={<Spin size="large" />}>
                        <Container stairs={[{width: '200px', minWidth: '200px'}]} stairAt={1} boxRender={boxRender}>
                            {searchContent === undefined ? <Todos /> : <TodosForSearch />}
                        </Container>
                    </Suspense>
                </ThemeProvider>
        </>
    );
}

const Todos = React.lazy(() => import('./pages/Todos'));

const TodosForSearch = React.lazy(() => import('./pages/TodosForSearch'));

const Container = styled(FlexBox)`
    height: 100vh;
`