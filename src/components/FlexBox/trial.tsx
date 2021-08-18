
import { GlobalStyle } from '../../styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { themeDefault } from '../../styles/Themes';
import { FlexBox, IFlexBoxRef } from '.';
import { createRef } from 'react';

export function App() {

  const theRef: React.ForwardedRef<IFlexBoxRef> = createRef();

  const stairs = ['30%', '50%'];

  let stairIndex = 0;
  const changeStair = () => theRef.current?.stairTo((stairIndex += 1) % stairs.length);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDefault}>
        <Container>
          <FlexBoxContainer ref={theRef} direction='row' stairs={stairs} stairAt={0}>
            <Head />
            <Tail onClick={changeStair}></Tail>
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
  flex: 1;
  background-color: cyan;
`

const Tail = styled.div`
  flex: 1;
  background-color: cadetblue;
`
