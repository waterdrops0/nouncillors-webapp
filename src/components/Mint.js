import { useState, useContext } from 'react';
import { mint } from '../eth/mint';
import { EthereumContext } from "../eth/context";
import { toast } from 'react-toastify';

function Mint() {
  const [loading, setLoading] = useState(false);
  const { receiver, provider } = useContext(EthereumContext);

  const sendTx = async () => {
    setLoading(true);
    
    try {
      const response = await mint(receiver, provider);
      const hash = response.hash;
      const onClick = hash
        ? () => window.open(`https://sepolia.etherscan.io/tx/${hash}`)
        : undefined;
      toast('Transaction sent!', { type: 'info', onClick });
    } catch(err) {
      toast(err.message || err, { type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return <div className = "Container">
      <div className="cursor-pointer flex items-center justify-center px-5 py-2 rounded-xl bg-red hover:bg-maroon transition-colors duration-300 text-white font-semibold">
      
        <button onClick={sendTx} type="mint" disabled={loading}>{loading ? 'Minting...' : 'Mint'}</button>
      
    </div>
  </div>
}

export default Mint;