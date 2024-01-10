import React from 'react';
import loadingNoun from '../assets/loading-skull-noun.gif';

export const LoadingNoun = () => {
  return (
    <div className="relative pt-[100%] h-0">
      <img 
        src={loadingNoun} 
        alt={'loading noun'} 
        className="absolute top-0 left-0 w-full h-full align-middle rendering-pixelated"
      />
    </div>
  );
};

const Noun = (props) => {
  const { imgPath, alt, className} = props;
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

export default Noun;
