import {
  FloatingLabel,
  Form,
} from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { getNounData, getRandomNounSeed } from './Utils/utils.js';
import ImageData from '../data/image-data.json';
import { buildSVG } from './Utils/svg-builder.js';
import { buildSVGForSinglePart } from './Utils/svg-builder2.js';
import { PNGCollectionEncoder } from './Utils/png-collection-encoder.js'
import Noun from './Noun.js';
import ScrollContainer from './ScrollContainer.js'
import SimpleContainer from './SimpleContainer.js'
import { mint } from '../eth/mint.js';
import { EthereumContext } from "../eth/context.js";
import { toast } from 'react-toastify';

const encoder = new PNGCollectionEncoder(ImageData.palette);

const parseTraitName = partName =>
  capitalizeFirstLetter(partName.substring(partName.indexOf('-') + 1));

const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

const traitKeyToLocalizedTraitKeyFirstLetterCapitalized = s => {
  const traitMap = new Map([
    ['background', 'Background'],
    ['head', 'Head'],
    ['glasses', 'Glasses'],
  ]);

  return traitMap.get(s);
};

const Mint = () => {
  const [loading, setLoading] = useState(false);
  const { receiver, provider } = useContext(EthereumContext);  
  const [nounSvg, setNounSvg] = useState([]);
  const [modSeed, setModSeed] = useState({});
  const [lastSeed, setLastSeed] = useState({});
  const [head, setHead] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [background, setBackground] = useState([]);
  const [selectedHead, setSelectedHead] = useState(null);
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [traits, setTraits] = useState([]);
  const [selectIndexes, setSelectIndexes] = useState({});

    const sendTx = async () => {
    setLoading(true);

    
    if (selectedHead === null || selectedGlasses === null) {
      toast('Please select a head and glasses before sending the transaction', { type: 'error' });
      setLoading(false);
      return; 
    }
    
    try {
      const seed = { ...getRandomNounSeed(), ...modSeed}
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

  const traitOptions = trait => {
    return Array.from(Array(trait.traitNames.length + 1)).map((_, index) => {
      const traitName = trait.traitNames[index - 1];
      const parsedTitle = index === 0 ? 'Random' : parseTraitName(traitName);
      return (
        <option key={index} value={traitName}>
          {parsedTitle}
        </option>
      );
    });
  };  

  const traitButtonHandler = (trait, traitIndex) => {
    setModSeed(prev => {
      // -1 traitIndex = random
      if (traitIndex < 0) {
        let state = { ...prev };
        delete state[trait.title];
        return state;
      }
      return {
        ...prev,
        [trait.title]: traitIndex,
      };
    });
  };

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
    const svgData = `<svg width="75" height="75" xmlns="http://www.w3.org/2000/svg">
                       <rect width="100%" height="100%" fill="#${background}" />
                     </svg>`;
    newBackground.push({ id: i, svgData });
  });

  setBackground(newBackground);
};


    useEffect(() => {
        const traitTitles = ['background', 'head', 'glasses'];
        const traitNames = [
          ['cool', 'warm'],
          ...['heads', 'glasses'].map(category => {
            return ImageData.images[category].map(imageData => imageData.filename);
          }),
        ];
        setTraits(
          traitTitles.map((title, index) => {
            return {
              title: title,
              traitNames: traitNames[index],
            };
          }),
        );
      
        displayHeads(ImageData.images);

        displayGlasses(ImageData.images)

        displayBackgrounds(ImageData.bgcolors)

        generateNounSvg();
        }, [generateNounSvg, modSeed]); 

return (
  <>
      <div className="flex flex-col h-[90vh] gap-3 items-center justify-center md:flex-row">


        {/* Left Half: Main Content Area for Displaying Generated Noun */}
        <div className="w-2/3 overflow-hidden bg-gray-500 p-4 mt-12 md:mt-0 md:w-1/3">
          {nounSvg && (
            <div className="hover:cursor-pointer">
              <Noun imgPath={`data:image/svg+xml;base64,${btoa(nounSvg)}`} alt="noun" className="" />
            </div>
          )}
        </div>

        {/* Right Half: Sidebar for Traits */}
        <div className="flex flex-col w-2/3 overflow-auto p-4 bg-gray-400 md:w-1/3 gap-2">
      
          {/* Heads Traits Section */}
              <div className="bg-gray-300 p-2">
                <ScrollContainer>
                  {head.map((head) => (
                    <div key={head.id} className={`rounded-lg hover:cursor-pointer ${
                selectedHead === head.id ? 'border-1 border-blue-500 bg-blue-200' : '' // Conditional styling
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
              <div className="bg-gray-300 p-2">
                <ScrollContainer>
                  {glasses.map((glasses) => (
                    <div key={glasses.id} className={`rounded-lg hover:cursor-pointer ${
                        selectedGlasses === glasses.id ? 'border-1 border-blue-500 bg-blue-200' : '' // Conditional styling
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
              <div className="bg-gray-300 p-2">
                <SimpleContainer>
                  {background.map((background) => (
                    <div key={background.id} className="rounded-lg hover:cursor-pointer hover:scale-105 transition-transform border border-2"
                        onClick={() => setModSeed(prev => ({ ...prev, background: background.id }))} dangerouslySetInnerHTML={{ __html: background.svgData }} />
                  ))}
                </SimpleContainer>
              </div>

               {
                  traits && traits.map((trait, index) => (
                    <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-4 px-4 py-2">
                      <label htmlFor={`floatingSelect-${index}`} className="block text-sm font-medium text-gray-700">
                        {traitKeyToLocalizedTraitKeyFirstLetterCapitalized(trait.title)}
                      </label>
                      <select
                        id={`floatingSelect-${index}`}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={trait.traitNames[selectIndexes?.[trait.title]] ?? -1}
                        onChange={(e) => {
                          const selectedIndex = e.currentTarget.selectedIndex;
                          traitButtonHandler(trait, selectedIndex - 1); // -1 to account for 'random'
                          setSelectIndexes({
                            ...selectIndexes,
                            [trait.title]: selectedIndex - 1,
                          });
                        }}
                      >
                        {traitOptions(trait)}
                      </select>
                    </div>
                  ))
                }

              

          <div className="">
        
          <button className="cursor-pointer bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 w-full border border-gray-400 rounded shadow" onClick={sendTx} type="mint" disabled={loading}>{loading ? 'Minting...' : 'Mint'}</button>
        
          </div>
        </div>
      </div>
  </>
);
        }
export default Mint;