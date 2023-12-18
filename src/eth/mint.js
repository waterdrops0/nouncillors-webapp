import { ethers } from 'ethers';
import { createInstance } from './forwarder';
import { signMetaTxRequest } from './signer';
import { fetchProof } from './fetchProof';

async function sendMetaTx(receiver, provider, signer, proof) {
  console.log(`Sending mint meta-tx with proof=${proof}`);
  const url = 'https://api.defender.openzeppelin.com/autotasks/5a315aa2-c9dc-4a10-b633-14860b7796f8/runs/webhook/db212240-681e-4a15-adbe-0577807ea1b5/WjYUohJcYZA72jYbTpHreu';
  if (!url) throw new Error(`Missing relayer url`);

  const forwarder = createInstance(provider);
  const from = await signer.getAddress();
  console.log("The *from* address is: ", from);
  const data = receiver.interface.encodeFunctionData('mint', [proof]);
  console.log("The *data* is: ", data);
  const to = await receiver.getAddress();
  console.log("The *to* address is: ", to);
  

  const request = await signMetaTxRequest(signer.provider, forwarder, { to, from, data }); 
  console.log("This is the request :", request);
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' },
    });
}

export async function mint(receiver, provider) {
  if (!window.ethereum) throw new Error(`User wallet not found`);
  await window.ethereum.enable();

  const userProvider = await new ethers.BrowserProvider(window.ethereum);
  const userNetwork = await userProvider.getNetwork();

  const signer = await userProvider.getSigner();
  const from = await signer.address;
  console.log(from);

  const proof = await fetchProof(from);
   if (!proof) throw new Error(`Proof cannot be empty`);

  console.log(userNetwork);
  if (userNetwork.chainId !== 11155111n) throw new Error(`Please switch to Sepolia for signing`);
  
  
  
  return sendMetaTx(receiver, provider, signer, proof);
}