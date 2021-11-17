import { ChakraProvider } from "@chakra-ui/react";
import { NextComponentType, NextPageContext } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps as NextAppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "../axios";
import { ProtectedRoute } from "../components/ProtectedRoute";
import theme from "../theme";

interface IsProtectedProp {
  isProtected?: boolean;
}

// Custom type to override Component type
type AppProps<P = any> = {
  Component: NextComponentType<NextPageContext, any, {}> & IsProtectedProp;
} & Omit<NextAppProps<P>, "Component">;

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <SWRConfig
      value={{
        fetcher: (url) => axios(url).then((res) => res.data),
      }}
    >
      <ChakraProvider theme={theme}>
        {Component.isProtected ? (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </SWRConfig>
  </SessionProvider>
);

export default MyApp;
