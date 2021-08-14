
import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { themeDefault } from './styles/Themes';
import { Todos } from './pages/Todos';
import { FlexBox } from './components/FlexBox';

export function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDefault}>
        <FlexBox boxRender={() => undefined} stairs={['30%']}>
          <Todos />
        </FlexBox>
      </ThemeProvider>
    </>
  );
}