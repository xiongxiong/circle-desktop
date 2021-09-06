
import { GlobalStyle } from './styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';
import { FlexBox } from './components/FlexBox';
import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Observer } from 'mobx-react';
import { StoreContext } from './store/Store';
import { ListPanel } from './components/ListPanel';

export const App = () => {

    const boxRender = () => <ListPanel />

    return (
        <StoreContext.Consumer>
            {(store) => (
                <>
                    <GlobalStyle />
                    <ThemeProvider theme={themeDefault}>
                        <Suspense fallback={<Spin size="large" />}>
                            <Observer>
                                {() => (
                                    <Container stairs={['200px']} stairAt={1} boxRender={boxRender}>
                                        {(store.viewMode === "list" && <Todos />) || (store.viewMode === "search" && <TodosForSearch />)}
                                    </Container>
                                )}
                            </Observer>
                        </Suspense>
                    </ThemeProvider>
                </>
            )}
        </StoreContext.Consumer>
    );
}

const Todos = React.lazy(() => import('./pages/Todos'));

const TodosForSearch = React.lazy(() => import('./pages/TodosForSearch'));

const Container = styled(FlexBox)`
    height: 100vh;
`