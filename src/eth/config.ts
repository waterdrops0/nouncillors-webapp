import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.infura.io/v3/1290d77fdc964638b22f2cbf80c76373'),
    [sepolia.id]: http('https://sepolia.infura.io/v3/1290d77fdc964638b22f2cbf80c76373'),
  },
})




