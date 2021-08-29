
import { GlobalStyle } from '../../styles/GlobalStyle';
import styled, { ThemeContext, ThemeProvider } from 'styled-components';
import { themeDefault } from '../../styles/Themes';
import { PriorityButtonGroup } from '.';
import { createRef } from 'react';
import { useContext } from 'react';

export function App() {

  const theme = useContext(ThemeContext);
  const colors = [theme.priorColor1, theme.priorColor2, theme.priorColor3, theme.priorColor4, theme.priorColor5, theme.priorColor6, theme.priorColor7, theme.priorColor8, theme.priorColor9];
    
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDefault}>
        <Container>
          <PriorityButtonGroup colors={colors} setPriority={() => {}}/>
        </Container>
      </ThemeProvider>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: stretch;
`
