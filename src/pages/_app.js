import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../eth/config";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
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
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
