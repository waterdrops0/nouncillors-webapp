import { ethers } from 'ethers';
import { createForwarderInstance } from './forwarder';
import { createReceiverInstance } from './receiver';
import { signMetaTxRequest } from './signer';
import { fetchProof } from './fetchProof';

// Function to send a meta-transaction
async function sendMetaTx(receiver, provider, signer, proof, seed) {
  // URL for the OpenZeppelin Defender relayer webhook
  const url = 'https://api.defender.openzeppelin.com/actions/46dc2e81-0722-4fdb-a340-74f402ed73e7/runs/webhook/9fe28a70-5694-4a7d-9ee8-09682f0eb14f/DXdzbMf1WiMu6qe7r4YLJJ';

  if (!url) throw new Error(`Missing relayer url`);

  // Create an instance of the forwarder contract
  const forwarder = createForwarderInstance(provider);
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
export async function mint(signer, provider, seed) {
  // Fetch proof for the minting process
  const proof = await fetchProof(await signer.getAddress());
  if (!proof) throw new Error(`Proof cannot be empty`);

  // Create the receiver contract instance connected to the signer
  const receiver = createReceiverInstance(provider);

  // Send the meta transaction
  return sendMetaTx(receiver, provider, signer, proof, seed);
}