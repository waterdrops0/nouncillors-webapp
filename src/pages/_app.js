import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../components/Layout'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { http, WagmiProvider } from 'wagmi';
import {
  mainnet,
  sepolia,
} from 'wagmi/chains';


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



const queryClient = new QueryClient()

function App({ Component, pageProps }) {
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
