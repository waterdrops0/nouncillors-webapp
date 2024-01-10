import {
  Container,
  Col,
  Button,
  Row,
  FloatingLabel,
  Form,
} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { getNounData, getRandomNounSeed } from '../components/Utils/utils.js';
import ImageData from '../data/image-data.json';
import { buildSVG } from '../components/Utils/svg-builder.js';
import { buildSVGForSinglePart } from '../components/Utils/svg-builder2.js';
import { PNGCollectionEncoder } from '../components/Utils/png-collection-encoder.js'
import Noun from '../components/Noun.js';
import NounModal from '../components/NounModal.js';
import ScrollContainer from '../components/ScrollContainer.js'
import classes from '../styles/Playground.module.css';

import { EthereumContext } from '../eth/context.js';
import { createProvider } from '../eth/provider.js';
import { createInstance } from '../eth/receiver.js';

import Mint from '../components-old/Mint.js/index.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const encoder = new PNGCollectionEncoder(ImageData.palette);

const Playground = () => {
  const [nounSvg, setNounSvg] = useState([]);
  const [modSeed, setModSeed] = useState({});
  const [displayNoun, setDisplayNoun] = useState(false);
  const [lastSeed, setLastSeed] = useState({});
  const [head, setHead] = useState([]);
  const [glasses, setGlasses] = useState([]);

  const provider = createProvider();
  const receiver = createInstance(provider);
  const ethereumContext = { provider, receiver };

  const generateNounSvg = React.useCallback(
    () => {
        const seed = { ...getRandomNounSeed(), ...lastSeed, ...modSeed };
        const { parts, background } = getNounData(seed);
        const svg = buildSVG(parts, encoder.data.palette, background);
        setNounSvg([svg]);
        setLastSeed(seed);
    },
    [modSeed],
    );

  const displayHeads = (images) => {
    const newHead = [];
    
    Object.keys(images).forEach((key) => {
      images[key].forEach((trait, i) => {
        if (trait.filename.startsWith('head')) {
          const svgData = buildSVGForSinglePart(trait.data, encoder.data.palette);
          newHead.push({ id: i, svgData });
        }
      });
    });

    setHead(newHead);
  };

  const displayGlasses = (images) => {
    const newGlasses = [];
    
    Object.keys(images).forEach((key) => {
      images[key].forEach((trait, i) => {
        if (trait.filename.startsWith('glasses')) {
          const svgData = buildSVGForSinglePart(trait.data, encoder.data.palette);
          newGlasses.push({ id: i, svgData });
        }
      });
    });

    setGlasses(newGlasses);
  };

    useEffect(() => {
        // Display heads
        displayHeads(ImageData.images);

        // Display glasses
        displayGlasses(ImageData.images)

        // Call generateNounSvg whenever modSeed changes
        generateNounSvg();
        console.log("the modSeed is:", modSeed);

        }, [generateNounSvg, modSeed]); 

return (
  <>
  
    {/* Banner */}
    <div className="bg-blue-500 text-white text-center py-4">
      <h1 className="text-2xl font-bold">Nouncil NFT</h1>
    </div>



    {displayNoun && nounSvg && (
      <NounModal
        onDismiss={() => setDisplayNoun(false)}
        svg={nounSvg} 
      />
    )}

    <div className="flex flex-row min-h-screen">
      {/* Left Half: Main Content Area for Displaying Generated Noun */}
      <div className="flex-1 bg-gray-800 rounded-lg">
        {nounSvg && (
           <div className="rounded-lg hover:cursor-pointer hover:scale-105 transition-transform" onClick={() => setDisplayNoun(true)}>
            <Noun imgPath={`data:image/svg+xml;base64,${btoa(nounSvg)}`} alt="noun" className="rounded-lg p-20 max-h-screen" />
          </div>
        )}
      </div>

      {/* Right Half: Sidebar for Traits */}
      <div className="flex-1 bg-gray-900 p-4 rounded-lg overflow-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Create your base Nouncillors NFT</h2>
        <p className="text-white mb-4">
          Unlock more you contribute to Nouns. A Nouncillor's traits can't be changed after initial minting.
        </p>

        {/* Heads Traits Section */}
            <div className="mb-6">
              <h3 className="text-left text-xl text-white mb-1">Head</h3>
              <span className="text-yellow-400 text-sm mb-2 block">Permanent trait. This can't be changed after minting.</span>
              <ScrollContainer>
                {head.map((head) => (
                  <div key={head.id} className="rounded-lg hover:cursor-pointer hover:scale-105 transition-transform"
                       onClick={() => setModSeed(prev => ({ ...prev, head: head.id }))} dangerouslySetInnerHTML={{ __html: head.svgData }} />
                ))}
              </ScrollContainer>
            </div>

            {/* Glasses Traits Section */}
            <div className="mb-6">
              <h3 className="text-left text-xl text-white mb-1">Glasses</h3>
              <span className="text-yellow-400 text-sm mb-2 block">Permanent trait. This can't be changed after minting.</span>
              <ScrollContainer>
                {glasses.map((glass) => (
                  <div key={glass.id} className="rounded-lg hover:cursor-pointer hover:scale-105 transition-transform"
                       onClick={() => setModSeed(prev => ({ ...prev, glasses: glass.id }))} dangerouslySetInnerHTML={{ __html: glass.svgData }} />
                ))}
              </ScrollContainer>
            </div>

            <EthereumContext.Provider value={ethereumContext}>
              <Mint />
            </EthereumContext.Provider>
            <ToastContainer hideProgressBar={true} />    

        <Button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
          Sign
        </Button>
      </div>
    </div>
  </>
);
        }
export default Playground;
