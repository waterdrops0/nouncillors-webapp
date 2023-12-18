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
     <Banner />
     <div className="w-full flex flex-col h-full">
      <Header />
      <main
        className="h-full w-full flex flex-col gap-4 items-center justify-between"
      >
        <div
          className="flex flex-col gap-4 max-[500px]:gap-2 max-lg:gap-8 h-full items-center justify-center"
        >
          <h1
            className="text-[8rem] leading-none font-semibold text-black font-crimson-pro max-lg:text-8xl max-md:text-7xl max-[400px]:text-6xl max-[350px]:text-5xl"
          >
            Nouncil
          </h1>
          <p
            className="text-black max-w-5xl max-md:text-lg text-xl text-center px-16 max-sm:px-8 max-sm:text-base max-[350px]:text-sm"
          >
            A council of Nounish builders working within the framework of <a
              href="https://nouns.wtf"
              className="text-red font-semibold">NounsDAO</a> to proliferate CC0 and nounish culture.
          </p>

          <p>powered by wd_</p>
            <EthereumContext.Provider value={ethereumContext}>
              <Mint />
            </EthereumContext.Provider>
            <ToastContainer hideProgressBar={true} />


          <div
            className="max-md:flex items-center gap-8 max-[500px]:flex-col hidden mt-4"
          >
            <Delegated />
            <Socials />
          </div>
        </div>

        <img
          src="/graphic.webp"
          alt="Nouncil artwork by Messhup"
          draggable={false}
          className="select-none object-contain max-lg:object-cover" />
      </main>
    </div></>
  );
};

export default MintPage;