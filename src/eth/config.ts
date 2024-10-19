import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, sepolia, } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Join-Nouncil',
  projectId: '30eb1d2ba9fd631ac27a190400dfb379',
  chains: [mainnet, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transporters: {
    [mainnet.id]: http('https://mainnet.infura.io/v3/1290d77fdc964638b22f2cbf80c76373'),
    [sepolia.id]: http('https://sepolia.infura.io/v3/1290d77fdc964638b22f2cbf80c76373'),
  }
});
