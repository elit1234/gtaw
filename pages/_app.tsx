import "./fonts.css";
import type { AppProps } from "next/app";
import { wrapper } from "../src/redux/store";

import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components";
import Head from "next/head";

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    overflow-x: hidden;
    
  * {
  box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  margin: 0;
    padding: 0;
  }
`;
function MyApp({ Component, pageProps }: AppProps) {
  const theme: DefaultTheme = {
    colors: {
      background: "#1D2127",
      altBackground: "#21262D",
      activeBackground: "#2c323c",
      lightBackground: "#424b59",
      lightActiveBackground: "#4d5768",
      text: "#fff",
      altText: "#ABB4BE",
    },
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps();

export default wrapper.withRedux(MyApp);
