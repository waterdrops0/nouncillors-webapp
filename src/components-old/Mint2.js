import React, { useEffect, useState, useContext } from 'react';
import { getNounData, getRandomNounSeed } from '../components/Utils/utils.js';
import ImageData from '../data/image-data.json';
import { buildSVG } from '../components/Utils/svg-builder.js';
import { buildSVGForSinglePart } from '../components/Utils/svg-builder2.js';
import { PNGCollectionEncoder } from '../components/Utils/png-collection-encoder.js'
import Noun from '../components/Noun.js';
import NounModal from '../components/NounModal.js';
import ScrollContainer from '../components/ScrollContainer.js'
import SimpleContainer from '../components/SimpleContainer.js'
import { mint } from '../eth/mint.js';
import { EthereumContext } from "../eth/context.js";
import { toast } from 'react-toastify';

const encoder = new PNGCollectionEncoder(ImageData.palette);

const Mint = () => {
  const [loading, setLoading] = useState(false);
  const { receiver, provider } = useContext(EthereumContext);  
  const [nounSvg, setNounSvg] = useState([]);
  const [modSeed, setModSeed] = useState({});
  const [displayNoun, setDisplayNoun] = useState(false);
  const [lastSeed, setLastSeed] = useState({});
  const [head, setHead] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [background, setBackground] = useState([]);
  const [selectedHead, setSelectedHead] = useState(null);
  const [selectedGlasses, setSelectedGlasses] = useState(null);

    const sendTx = async () => {
    setLoading(true);

    
    // Check if both selectedHead and selectedGlasses are set
    if (selectedHead === null || selectedGlasses === null) {
      toast('Please select a head and glasses before sending the transaction', { type: 'error' });
      setLoading(false);
      return; 
    }
    
    try {
      const seed = { ...getRandomNounSeed(), ...modSeed}
      console.log("The final seed is:", seed);
      const response = await mint(receiver, provider, seed);
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
  };

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

const displayBackgrounds = (images) => {
  const newBackground = [];

  images.forEach((background, i) => {
    const svgData = `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                       <rect width="100%" height="100%" fill="#${background}" />
                     </svg>`;
    newBackground.push({ id: i, svgData });
  });

  setBackground(newBackground);
};


    useEffect(() => {
        // Display heads
        displayHeads(ImageData.images);

        // Display glasses
        displayGlasses(ImageData.images)

        // Display backgrounds
        displayBackgrounds(ImageData.bgcolors)

        // Call generateNounSvg whenever modSeed changes
        generateNounSvg();
        }, [generateNounSvg, modSeed]); 

return (
  <>
    {displayNoun && nounSvg && (
      <NounModal
        onDismiss={() => setDisplayNoun(false)}
        svg={nounSvg} 
      />
    )}

    <div className="px-20 py-5 min-h-fit h-screen w-screen overflow-hidden">
      {/* Banner */}
      <div className="flex items-center justify-center gap-3 py-4 border-[4px] border-solid border-transparent border-b-red">
        <a href="/">
          <img
            src="/logo.webp"
            alt="Nouncil Logo"
            className="w-24 h-24 select-none"
            draggable={false}
          />
        </a>
        <h1 className="text-3xl text-white font-crimson-pro font-semibold mr-1">Nouncil</h1>
        <h2 className="text-3xl text-green font-crimson-pro font-bold px-5 py-2 rounded-xl bg-red">NFT</h2>
      </div>

      <div className="flex flex-row h-full">
        {/* Left Half: Main Content Area for Displaying Generated Noun */}
        <div className="flex-1 overflow-hidden">
          {nounSvg && (
            <div className="hover:cursor-pointer" onClick={() => setDisplayNoun(true)}>
              <Noun imgPath={`data:image/svg+xml;base64,${btoa(nounSvg)}`} alt="noun" className="" />
            </div>
          )}
        </div>

        {/* Right Half: Sidebar for Traits */}
        <div className="flex-1 bg-gray-900 p-20 overflow-x-auto flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Create your base Nouncillors NFT</h2>
          <p className="text-white mb-4">
            Unlock more you contribute to Nouns. A Nouncillor's traits can't be changed after initial minting.
          </p>

          {/* Heads Traits Section */}
              <div className="flex-grow mb-6">
                <h3 className="text-left text-xl text-white mb-1">Head</h3>
                <span className="text-yellow-400 text-sm mb-2 block">Permanent trait. This can't be changed after minting.</span>
                <ScrollContainer>
                  {head.map((head) => (
                    <div key={head.id} className={`rounded-lg hover:cursor-pointer hover:scale-105 transition-transform ${
                selectedHead === head.id ? 'border-2 border-blue-500 bg-blue-500 hover:scale-102' : '' // Conditional styling
              }`}
                      onClick={() => {
                setModSeed(prev => ({ ...prev, head: head.id }));
                setSelectedHead(head.id); // Update the selected head state
              }}
              dangerouslySetInnerHTML={{ __html: head.svgData }}
            />
          ))}
                </ScrollContainer>
              </div>

              {/* Glasses Traits Section */}
              <div className="flex-grow mb-6">
                <h3 className="text-left text-xl text-white mb-1">Glasses</h3>
                <span className="text-yellow-400 text-sm mb-2 block">Permanent trait. This can't be changed after minting.</span>
                <ScrollContainer>
                  {glasses.map((glasses) => (
                    <div key={glasses.id} className={`rounded-lg hover:cursor-pointer hover:scale-105 transition-transform ${
                        selectedGlasses === glasses.id ? 'border-2 border-blue-500 bg-blue-500 hover:scale-102' : '' // Conditional styling
                      }`}
                              onClick={() => {
                        setModSeed(prev => ({ ...prev, glasses: glasses.id }));
                        setSelectedGlasses(glasses.id); // Update the selected head state
                      }}
                      dangerouslySetInnerHTML={{ __html: glasses.svgData }}
                    />
                  ))}
                </ScrollContainer>
              </div>

              {/* Backgrounds Section */}
              <div className="flex-grow mb-6">
                <h3 className="text-left text-xl text-white mb-1">Background</h3>
                <span className="text-yellow-400 text-sm mb-2 block">Permanent trait. This can't be changed after minting.</span>
                <SimpleContainer>
                  {background.map((background) => (
                    <div key={background.id} className="rounded-lg hover:cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setModSeed(prev => ({ ...prev, background: background.id }))} dangerouslySetInnerHTML={{ __html: background.svgData }} />
                  ))}
                </SimpleContainer>
              </div>

          <div className="flex-grow mb-20">
        
          <button className="cursor-pointer px-5 py-2 rounded-xl bg-red hover:bg-maroon transition-colors duration-300 text-white text-3xl font-crimson-pro font-bold" onClick={sendTx} type="mint" disabled={loading}>{loading ? 'Minting...' : 'Mint'}</button>
        
          </div>
        </div>
      </div>
    </div>
  </>
);
        }
export default Mint;
