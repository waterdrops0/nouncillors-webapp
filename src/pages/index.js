import { EthereumContext } from '../eth/context';
import { createProvider } from '../eth/provider';
import { createReceiverInstance } from '../eth/receiver';

import Mint from '../components/Mint';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MintPage = () => {
  const provider = createProvider();
  const receiver = createReceiverInstance(provider);
  const ethereumContext = { provider, receiver };

  return (
     <>
     <div className="">
      <main className="">
        <div className="">
            <EthereumContext.Provider value={ethereumContext}>
              <Mint />
            </EthereumContext.Provider>
            <ToastContainer hideProgressBar={true} />
        </div>
      </main>
    </div></>
  );
};

export default MintPage;