import React from 'react';
import loadingNoun from '../assets/loading-skull-noun.gif';

// Component: LoadingNoun
// - Displays a loading image (a skull gif).
export const LoadingNoun = () => {
  return (
    <div className="relative pt-[100%] h-0">
      {/* Image is rendered in a square container. */}
      <img 
        src={loadingNoun} 
        alt={'loading noun'} 
        className="absolute top-0 left-0 w-full h-full align-middle rendering-pixelated"
      />
    </div>
  );
};

// Component: Noun
// - Displays an image, either a provided one or the loading image by default.
const Nouncillor = (props) => {
  const { imgPath, alt, className } = props;
  return (
    <div className={""}>
      <img
        src={imgPath ? imgPath : loadingNoun}
        alt={alt}
        className={`w-full h-full align-middle rendering-pixelated ${className || ''}`}
      />
    </div>
  );
};

export default Nouncillor;
