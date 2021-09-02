
import { GlobalStyle } from './styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';
import { FlexBox } from './components/FlexBox';
import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Observer, observer } from 'mobx-react';
import { IRootStore, StoreContext } from './store/Store';

export const App = () => (
    <StoreContext.Consumer>
        {(store) => (
            <>
                <GlobalStyle />
                <ThemeProvider theme={themeDefault}>
                    <Suspense fallback={<Spin size="large" />}>
                        <Observer>
                            {() => (
                                <Container stairs={['200px']} stairAt={0}>
                                    {(store.viewMode === "list" && <Todos />) || (store.viewMode === "search" && <TodosForSearch />)}
                                </Container>
                            )}
                        </Observer>
                        {/* <Container stairs={['200px']} stairAt={0}>
                        <Todos />
                                </Container> */}
                    </Suspense>
                </ThemeProvider>
            </>
        )}
    </StoreContext.Consumer>
);

const Todos = React.lazy(() => import('./pages/Todos'));

const TodosForSearch = React.lazy(() => import('./pages/TodosForSearch'));

const Container = styled(FlexBox)`
    height: 100vh;
`