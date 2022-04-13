import '../styles/globals.css'
import { useContext } from 'react';
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { ProfileContext } from '../src/context/ProfileContext';


function MyApp({ Component, pageProps }: AppProps) {
  const profileContext = useContext(ProfileContext);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
