import React, { useEffect, useState, useContext } from 'react';
import { getNounData, getRandomNounSeed } from './Utils/utils.js';
import ImageData from '../data/image-data.json';
import { buildSVG } from './Utils/svg-builder.js';
import { svg2png } from './Utils/svg2png';
import { PNGCollectionEncoder } from './Utils/png-collection-encoder.js'
import Nouncillor from './Nouncillor.js';
import { mint } from '../eth/mint.js';
import { EthereumContext } from "../eth/context.js";
import { toast } from 'react-toastify';

// Defines a new PNGCollectionEncoder instance for handling image data.
const encoder = new PNGCollectionEncoder(ImageData.palette);

// Function to parse and capitalize the first letter of a trait name.
const parseTraitName = partName =>
  capitalizeFirstLetter(partName.substring(partName.indexOf('-') + 1));

// Utility function to capitalize the first letter of a string.
const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

// Maps a trait key to a localized version with the first letter capitalized.
const traitKeyToLocalizedTraitKeyFirstLetterCapitalized = s => {
  const traitMap = new Map([
    ['background', 'Background'],
    ['head', 'Head'],
    ['glasses', 'Glasses'],
  ]);

  return traitMap.get(s);
};

// React component for minting NFTs.
const Mint = () => {
  // State hooks for managing various component states.
  const [loading, setLoading] = useState(false);
  const { receiver, provider } = useContext(EthereumContext);  
  const [nounPng, setNounPng] = useState(null);
  const [nounSvg, setNounSvg] = useState([]);
  const [modSeed, setModSeed] = useState({});
  const [lastSeed, setLastSeed] = useState({});
  const [traits, setTraits] = useState([]);
  const [selectIndexes, setSelectIndexes] = useState({});

  // Function to handle the transaction sending process.
  const sendTx = async () => {
    setLoading(true);
    
    // Attempts to mint the NFT and handles the response or errors.
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

  // Function to generate an SVG image for the NFT.
  const generateNounSvg = React.useCallback(
    async () => {
      const seed = { ...getRandomNounSeed(), ...lastSeed, ...modSeed };
      const { parts, background } = getNounData(seed);
      const svg = buildSVG(parts, encoder.data.palette, background);
      setNounSvg([svg]);
      setLastSeed(seed);

      // Convert SVG to PNG and update the nounPng state
      const png = await svg2png(svg, 512, 512);
      setNounPng(png);
    },
    [modSeed, lastSeed],
  );

  // Function to create trait options for the dropdown.
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

  // Handles the selection of traits and updates the modSeed state.
  const traitButtonHandler = (trait, traitIndex) => {
    setModSeed(prev => {
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

// useEffect hook to initialize trait data and images on component mount.
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

        generateNounSvg();
        }, [generateNounSvg, modSeed]); 

// JSX rendering the component UI.        
  return (
    <>

      <div className="flex flex-col h-[90vh] gap-3 pt-3 items-center justify-center md:flex-row md:items-center overflow-hidden">

        {/* Nouncillor Display Area */}
        <div className="flex-1 flex items-center justify-center bg-gray-500 p-0 md:pl-4 mt-12 md:mt-0 border border-gray-400 shadow h-full">
          {nounSvg && (
            <div className="w-full h-full flex justify-center items-center">
              {/* Responsive image */}
              <Nouncillor imgPath={`data:image/svg+xml;base64,${btoa(nounSvg)}`} alt="nouncillor" className="max-w-full max-h-full object-contain" />
            </div>
          )}
        </div>

        {/* Configuration Area */}
        <div className="flex-1 flex flex-col overflow-auto p-0 md:pl-4 bg-gray-400 border border-gray-400 h-full gap-2">
          {
            traits && traits.map((trait, index) => (
              <div key={index} className="px-4 py-2">
                {/* Label for each trait dropdown */}
                <label htmlFor={`floatingSelect-${index}`} className="block text-sm font-medium text-gray-700">
                  {traitKeyToLocalizedTraitKeyFirstLetterCapitalized(trait.title)}
                </label>
                {/* Dropdown select for traits */}
                <select
                  id={`floatingSelect-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={trait.traitNames[selectIndexes?.[trait.title]] ?? -1}
                  onChange={(e) => {
                    const selectedIndex = e.currentTarget.selectedIndex;
                    traitButtonHandler(trait, selectedIndex - 1); // Adjust for 'random' option
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

          {/* Mint Button section */}
          <div className="mt-auto">
            <button
              className="bg-gray-200 text-black font-medium py-2 px-4 w-full rounded border border-gray-400 shadow hover:bg-gray-300"
              onClick={sendTx}
              type="mint"
              disabled={loading}
            >
              {loading ? 'Minting...' : 'Mint'}
            </button>
          </div>
        </div>
      </div>
    </>
  );

        }

export default Mint;
