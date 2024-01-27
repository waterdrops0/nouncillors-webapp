// Import Ethereum signature utility library
const ethSigUtil = require('eth-sig-util');

// Override toJSON method of BigInt to return a string representation
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Define EIP712 domain structure for typed data signing
const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' }
];

// Define the structure for a forward request in EIP712
const ForwardRequest = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'gas', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'deadline', type: 'uint48' },
  { name: 'data', type: 'bytes' },
];

// Prepare EIP712 typed data for meta transaction
function getMetaTxTypeData(chainId, verifyingContract) {
  return {
    types: {
      EIP712Domain,
      ForwardRequest,
    },
    domain: {
      name: 'NouncilForwarder',
      version: '1',
      chainId,
      verifyingContract,
    },
    primaryType: 'ForwardRequest',
  }
};

// Function to sign typed data using EIP712 standard
async function signTypedData(signer, from, data) {
  // Sign using private key if signer is a string
  if (typeof(signer) === 'string') {
    const privateKey = Buffer.from(signer.replace(/^0x/, ''), 'hex');
    return ethSigUtil.signTypedMessage(privateKey, { data });
  }

  // If signer is not a private key, use RPC call to sign
  const isHardhat = data.domain.chainId == 31337;
  const [method, argData] = isHardhat
    ? ['eth_signTypedData', data]
    : ['eth_signTypedData_v4', JSON.stringify(data)]
  return await signer.send(method, [from, argData]);
}

// Retrieve the current nonce for an address from a forwarder contract
async function getNonce(forwarder, address) {
  return await forwarder.nonces(address);
}

// Build a forward request with necessary parameters
async function buildRequest(forwarder, input) {
  const nonce = await getNonce(forwarder, input.from).then(nonce => nonce.toString());
  const deadline = Math.floor(Date.now() / 1000) + 3600; 
  return { value: 0, gas: 1e6, nonce, deadline, ...input };
}

// Construct the EIP712 typed data for a meta transaction
async function buildTypedData(forwarder, request) {
  const chainId = 11155111n;
  const forwarderAddress = await forwarder.getAddress();
  console.log("forwarder.address=", forwarderAddress);
  const typeData = getMetaTxTypeData(chainId, forwarderAddress);
  return { ...typeData, message: request };
}

// Main function to sign a meta transaction request
async function signMetaTxRequest(signer, forwarder, input) {
  const request = await buildRequest(forwarder, input);
  const toSign = await buildTypedData(forwarder, request);
  console.log("The request toSign is: ", toSign);
  const signature = await signTypedData(signer, input.from, toSign);
  return { signature, request };
}

// Export relevant functions for external use
module.exports = { 
  signMetaTxRequest,
  buildRequest,
  buildTypedData,
};