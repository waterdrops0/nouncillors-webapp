import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, sepolia, } from 'wagmi/chains';
import { ThemeProvider } from 'next-themes';


const config = getDefaultConfig({
  appName: 'Join-Nouncil',
  projectId: '30eb1d2ba9fd631ac27a190400dfb379',
  chains: [mainnet, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transporters: {
    [mainnet.id]: http('https://mainnet.infura.io/v3/1290d77fdc964638b22f2cbf80c76373'),
    [sepolia.id]: http('https://sepolia.infura.io/v3/1290d77fdc964638b22f2cbf80c76373'),
  }
});


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
        borderRadius: 'small',
        fontStack: 'system',
      })} >
        <ThemeProvider attribute="class" defaultTheme="dark">
            <Component {...pageProps} />
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
