import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: black;
    background-color: white;
    /* font-family: 'alibaba'; */
  }

  @font-face {
    font-family: 'alibaba';
    src: url('./assets/fonts/Alibaba-PuHuiTi-Regular.ttf') format('truetype');
    font-weight: normal;
  }

  @font-face {
    font-family: 'alibaba';
    src: url('./assets/fonts/Alibaba-PuHuiTi-Bold.ttf') format('truetype');
    font-weight: bold;
  }

  @font-face {
    font-family: 'alibaba';
    src: url('./assets/fonts/Alibaba-PuHuiTi-Heavy.ttf') format('truetype');
    font-weight: bolder;
  }

  @font-face {
    font-family: 'alibaba';
    src: url('./assets/fonts/Alibaba-PuHuiTi-Light.ttf') format('truetype');
    font-weight: lighter;
  }
`;
