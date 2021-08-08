
import { GlobalStyle } from './styles/GlobalStyle';
import { Todos } from './pages/Todos';
import { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';

export function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDefault}>
        <Todos />
      </ThemeProvider>
    </>
  );
}