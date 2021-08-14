
import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';
import { Todos } from './pages/Todos';
import { FlexBoxProject } from './components/FlexBoxProject';

export function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDefault}>
        <FlexBoxProject>
          <Todos />
        </FlexBoxProject>
      </ThemeProvider>
    </>
  );
}