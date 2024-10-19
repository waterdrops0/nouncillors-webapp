import { ethers } from "ethers";
import { createForwarderInstance } from "./forwarder";
import { createReceiverInstance } from "./receiver";
import { signMetaTxRequest } from "./signer";
import { fetchProof } from "./fetchProof";

// Function to send a meta-transaction
async function sendMetaTx(receiver, provider, signer, proof, seed) {
  // URL for the OpenZeppelin Defender relayer webhook
  const url = process.env.NEXT_PUBLIC_DEFENDER_WEBHOOK_URL;
  if (!url) throw new Error(`Missing relayer url`);

  // Create an instance of the forwarder contract
  const forwarder = createForwarderInstance(provider);
  // Get the address of the signer
  const from = await signer.getAddress();
  // Encode the mint function call with provided proof and seed
  const data = receiver.interface.encodeFunctionData("mint", [proof, seed]);
  // Get the address of the receiver contract
  const to = await receiver.getAddress();

  // Sign the meta transaction request
  const request = await signMetaTxRequest(signer.provider, forwarder, {
    to,
    from,
    data,
  });

  console.log("This is the final request object:", request);

  // Send the request to the relayer
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  });
}

// Exported function to initiate minting process
export async function mint(seed) {
  // Initialize ethers provider and signer
  const provider = await new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Fetch proof for the minting process
  const proof = await fetchProof(await signer.getAddress());
  if (!proof) throw new Error(`Proof cannot be empty`);

  // Create the receiver contract instance connected to the signer
  const receiver = createReceiverInstance(provider);

  // Send the meta transaction
  return sendMetaTx(receiver, provider, signer, proof, seed);
}
