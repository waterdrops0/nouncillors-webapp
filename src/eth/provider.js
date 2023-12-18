import { ethers } from 'ethers';

const CLOUDFLARE_ENDPOINT = 'https://rpc.sepolia.online';
const MAIN_ENDPOINT = 'https://rpc.sepolia.org';
const ALTERNATE_ENDPOINT = 'https://www.sepoliarpc.space';
const UNSECURE_ENDPOINT = 'https://rpc.bordel.wtf/sepolia';
const QUICKNODE_ENDPOINT = "https://muddy-cosmological-crater.ethereum-sepolia.quiknode.pro/136e5233146d35bf932e8e59719a9a579d235634/";

export function createProvider() {  
  return new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT || MAIN_ENDPOINT, 11155111n);
}