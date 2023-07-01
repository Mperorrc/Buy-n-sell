import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { theme } from '../chakra/theme';
import { RecoilRoot } from 'recoil';
import {SessionProvider} from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {

  return( 
    
      <RecoilRoot>
        <ChakraProvider theme={theme}>
              <Layout>
                <SessionProvider session={pageProps.session} >
                  <Component {...pageProps} />
                </SessionProvider>
              </Layout>  
        </ChakraProvider>
      </RecoilRoot>
  )
}
