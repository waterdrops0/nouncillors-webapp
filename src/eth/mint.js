import { ethers } from 'ethers';
import { createInstance } from './forwarder';
import { signMetaTxRequest } from './signer';
import { fetchProof } from './fetchProof';

// Function to send a meta-transaction
async function sendMetaTx(receiver, provider, signer, proof, seed) {
  // URL for the OpenZeppelin Defender relayer webhook
  const url = 'https://api.defender.openzeppelin.com/actions/918b410d-1145-4ebf-8826-f11ded770508/runs/webhook/9fe28a70-5694-4a7d-9ee8-09682f0eb14f/ToUaJPDC8xagbidU1qwFgZ';

  if (!url) throw new Error(`Missing relayer url`);

  // Create an instance of the forwarder contract
  const forwarder = createInstance(provider);
  // Get the address of the signer
  const from = await signer.getAddress();
  // Encode the mint function call with provided proof and seed
  const data = receiver.interface.encodeFunctionData('mint', [proof, seed]);
  // Get the address of the receiver contract
  const to = await receiver.getAddress();

  // Sign the meta transaction request
  const request = await signMetaTxRequest(signer.provider, forwarder, { to, from, data }); 

  console.log('THis is the final request object:', request);

  // Send the request to the relayer
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' },
  });
}

// Exported function to initiate minting process
export async function mint(receiver, provider, seed) {
  // Check for Ethereum provider in the browser
  if (!window.ethereum) throw new Error(`User wallet not found`);
  await window.ethereum.enable();

  // Initialize ethers provider and signer
  const userProvider = await new ethers.BrowserProvider(window.ethereum);
  const userNetwork = await userProvider.getNetwork();
  const signer = await userProvider.getSigner();

  // Fetch proof for the minting process
  const proof = await fetchProof(signer.address);
  if (!proof) throw new Error(`Proof cannot be empty`);

  // Ensure the user is on the correct network
  if (userNetwork.chainId !== 11155111n) throw new Error(`Please switch to Sepolia for signing`);

  // Send the meta transaction
  return sendMetaTx(receiver, provider, signer, proof, seed);
}