
import { GlobalStyle } from '../../styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from '../../styles/Themes';
import { ButtonGroup } from '.';

export function App() {

  const buttons = [
    {
      name: 'hello',
      func: () => console.log('hello')
    },
    {
      name: 'world',
      func: () => console.log('world')
    }
  ]

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDefault}>
        <Container>
          <ButtonGroup buttons={buttons} />
        </Container>
      </ThemeProvider>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
