import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../eth/config";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mint</title>
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
      theme={lightTheme({
        overlayBlur: 'small',
        accentColor: '#d94339',
        accentColorForeground: 'white',
        borderRadius: 'none',
        fontStack: 'system',
      })} >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
