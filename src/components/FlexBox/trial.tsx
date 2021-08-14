
import { GlobalStyle } from '../../styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from '../../styles/Themes';
import { FlexBox } from '.';

export function App() {

  const boxRender = () => (
    <Head>

    </Head>
  );

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDefault}>
        <Container>
          <FlexBoxContainer direction='row' boxRender={boxRender} stairs={['10%', '50%']} stairNext={1} stairPrev={0}>
            <Tail></Tail>
          </FlexBoxContainer>
        </Container>
      </ThemeProvider>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const FlexBoxContainer = styled(FlexBox)`
  flex: 1;
`

const Head = styled.div`
  background-color: aliceblue;
`

const Tail = styled.div`
  flex: 1;
  background-color: cadetblue;
`
