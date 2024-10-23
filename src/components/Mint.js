import React, { useEffect, useState, useContext, useRef } from "react";
import { getNounData, getRandomNounSeed } from "./Utils/utils.js";
import ImageData from "../data/image-data.json";
import { buildSVG } from "./Utils/svg-builder.js";
import { svg2png } from "./Utils/svg2png";
import { PNGCollectionEncoder } from "./Utils/png-collection-encoder.js";
import Nouncillor from "./Nouncillor.js";
import { mint } from "../eth/mint.js";
import { toast } from "react-toastify";
import logo from "../assets/logo.webp";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Loading from './Loading';
import ThemeToggler from './ThemeToggler';


// Initialize the PNGCollectionEncoder with the image palette.
const encoder = new PNGCollectionEncoder(ImageData.palette);

// Utility functions for parsing and formatting trait names.
const parseTraitName = (partName) =>
  capitalizeFirstLetter(partName.substring(partName.indexOf("-") + 1));

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const traitKeyToLocalizedTraitKeyFirstLetterCapitalized = (s) => {
  const traitMap = new Map([
    ["background", "Background"],
    ["head", "Head"],
    ["glasses", "Glasses"],
  ]);
  return traitMap.get(s);
};



// The Mint component.
const Mint = () => {
  const { address, chain, isConnected } = useAccount(); // Get connected account info
  console.log("address", address);

  // State hooks.
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nounPng, setNounPng] = useState(null);
  const [nounSvg, setNounSvg] = useState([]);
  const [modSeed, setModSeed] = useState({});
  const lastSeed = useRef({});
  const [traits, setTraits] = useState([]);
  const [selectIndexes, setSelectIndexes] = useState({});

  // Function to handle the minting transaction
  const sendTx = async () => {
    setLoading(true);
    try {
      // Check if the wallet is connected
      if (!isConnected) throw new Error("Please connect your wallet.");

      // Check if the user is on the correct network
      if (chain?.id !== 11155111) {
        throw new Error("Please switch to the Sepolia network.");
      }

      const seed = { ...getRandomNounSeed(), ...modSeed };

      // Call the mint function
      const response = await mint(seed);

const hash = response.hash;
const onClick = hash
  ? () => window.open(`https://sepolia.etherscan.io/tx/${hash}`)
  : undefined;

toast("Transaction sent!", {
  type: "info",
  onClick,
  style: { backgroundColor: '#e0f7fa', color: '#00796b', fontWeight: 'bold' },
});

} catch (err) {
  const errorMessage = err.message || "An unexpected error occurred!";
  
toast(
  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
    <strong style={{ marginRight: '10px', color: '#d32f2f' }}>Error:</strong>
    <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
      {errorMessage}
    </span>
  </div>,
  {
    type: "error",
    style: {
      backgroundColor: '#ffebee',  // Light red background for error
      color: '#d32f2f',           // Dark red text
      fontSize: '14px',
      padding: '10px',
      borderRadius: '5px',
      maxWidth: '400px',           // Control the width to avoid too long lines
      whiteSpace: 'normal',        // Allow the text to wrap normally
      wordBreak: 'break-word',     // Break long words properly
    },
    closeOnClick: true,          // Close the toast on click
    autoClose: 5000,             // Auto close after 5 seconds
  }
);
} finally {
  setLoading(false);
}
  };


  // Function to generate the noun SVG and PNG images.
  const generateNounSvg = React.useCallback(async () => {
    const seed = { ...getRandomNounSeed(), ...lastSeed.current, ...modSeed };
    const { parts, background } = getNounData(seed);
    const svg = buildSVG(parts, encoder.data.palette, background);
    setNounSvg([svg]);
    lastSeed.current = seed;

    // Convert SVG to PNG.
    const png = await svg2png(svg, 512, 512);
    setNounPng(png);
  }, [modSeed]);

  // Function to create trait options for the dropdowns.
  const traitOptions = (trait) => {
    return Array.from(Array(trait.traitNames.length + 1)).map((_, index) => {
      const traitName = trait.traitNames[index - 1];
      const parsedTitle = index === 0 ? "Random" : parseTraitName(traitName);
      return (
        <option key={index} value={traitName}>
          {parsedTitle}
        </option>
      );
    });
  };

  // Handler for trait selection changes.
  const traitButtonHandler = (trait, traitIndex) => {
    setModSeed((prev) => {
      if (traitIndex < 0) {
        const state = { ...prev };
        delete state[trait.title];
        return state;
      }
      return {
        ...prev,
        [trait.title]: traitIndex,
      };
    });
  };

useEffect(() => {

  
  const timer = setTimeout(() => {
    setIsPageLoading(false);
  }, 1000);

  
  

  const traitTitles = ["background", "head", "glasses"];
  const traitNames = [
    ["cool", "warm"],
    ...["heads", "glasses"].map((category) => {
      return ImageData.images[category].map(
        (imageData) => imageData.filename
      );
    }),
  ];
  setTraits(
    traitTitles.map((title, index) => {
      return {
        title: title,
        traitNames: traitNames[index],
      };
    })
  );

  generateNounSvg();

  return () => clearTimeout(timer); // Cleanup the timeout on component unmount
}, [modSeed, generateNounSvg]);


  // Render the component UI.
  return (
    <>
      {isPageLoading ? (
        // Show the loading component if isLoading is true
        <Loading />
      ) : (
        <div className="">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-5">
            {/* Logo on the left */}
            <div>
              <Image src={logo} alt="Logo" width={91} automatically provided />
            </div>
            <div>

  <ThemeToggler />

    </div>

            {/* Right side: network display and connect wallet button */}
            <div className="flex items-center">
              <ConnectButton label='Connect'/>
            </div>
          </div>
          <div className="flex flex-col md:flex-row h-[100vh] pt-3 items-center justify-center overflow-hidden">
            {/* Nouncillor Display Area */}
            <div className="flex-1">
              <div className="h-full w-full flex justify-center items-center">
                {nounSvg && (
                  <div className="max-w-[80%] max-h-[80%] flex justify-center items-center">
                    <Nouncillor
                      imgPath={`data:image/svg+xml;base64,${btoa(nounSvg)}`}
                      alt="nouncillor"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Configuration Area */}
            <div className="flex-1 flex justify-center items-center">
              <div className="max-w-[80%] flex flex-col overflow-auto bg-prototype-600 bg-opacity-75">
                {traits &&
                  traits.map((trait, index) => (
                    <div key={index} className="px-4 py-2 w-full">
                      {/* Label for each trait dropdown */}
                      <label
                        htmlFor={`floatingSelect-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {traitKeyToLocalizedTraitKeyFirstLetterCapitalized(
                          trait.title
                        )}
                      </label>
                      {/* Dropdown select for traits */}
                      <select
                        id={`floatingSelect-${index}`}
                        className="mt-1 w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={
                          trait.traitNames[selectIndexes?.[trait.title]] ?? -1
                        }
                        onChange={(e) => {
                          const selectedIndex =
                            e.currentTarget.selectedIndex;
                          traitButtonHandler(trait, selectedIndex - 1); // Adjust for 'Random' option
                          setSelectIndexes({
                            ...selectIndexes,
                            [trait.title]: selectedIndex - 1,
                          });
                        }}
                      >
                        {traitOptions(trait)}
                      </select>
                    </div>
                  ))}

                {/* Mint Button Section */}
                <div className="mt-auto w-full">
                  <button
                    className="w-full py-2 px-4 bg-gray-200 text-black font-medium border border-gray-400 rounded shadow hover:bg-gray-300 disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={sendTx}
                    type="button"
                    disabled={loading}
                  >
                    {loading ? "Minting..." : "Join Nouncil !"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mint;