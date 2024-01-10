import React, { useRef } from 'react';

const ScrollContainer = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="flex items-center space-x-2">
      <img
        src="/icons/arrow.svg"
        alt="An arrow pointing left"
        onClick={() => scroll(-300)}
        className="transform rotate-180 focus:outline cursor-pointer bg-gray-500 hover:bg-gray-400 py-2 px-4 border border-gray-400 rounded shadow"
      />
      
      <div
        ref={scrollRef}
        className="flex flex-row overflow-x-auto scrollbar-hide space-x-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {children}
      </div>

      <img
        src="/icons/arrow.svg"
        alt="An arrow pointing right"
        onClick={() => scroll(300)}
        className="focus:outline cursor-pointer bg-gray-500 hover:bg-gray-400 py-2 px-4 border border-gray-400 rounded shadow"
      />

    </div>
  );
};

export default ScrollContainer;