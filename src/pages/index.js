import { EthereumContext } from '../eth/context';
import { createProvider } from '../eth/provider';
import { createInstance } from '../eth/receiver';

import Mint from '../components/Mint';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Delegated from'../components/Delegated';
import Socials from '../components/Socials';


const MintPage = () => {
  const provider = createProvider();
  const receiver = createInstance(provider);
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