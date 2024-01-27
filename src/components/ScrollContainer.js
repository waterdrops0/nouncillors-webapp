import React, { useRef } from 'react';

// Component: ScrollContainer
// - Takes children as props to render inside a horizontally scrollable container.
const ScrollContainer = ({ children }) => {
  // useRef hook to reference the scrollable div.
  const scrollRef = useRef(null);

  // Function to scroll the container.
  // - scrollOffset: Number of pixels to scroll horizontally.
  const scroll = (scrollOffset) => {
    // Scrolls the referenced div by the given offset.
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Left scroll arrow: Decrements horizontal scroll by 300px. */}
      <img
        src="/icons/arrow.svg"
        alt="An arrow pointing left"
        onClick={() => scroll(-300)}
        className="transform rotate-180 focus:outline cursor-pointer bg-gray-500 hover:bg-gray-400 py-2 px-4 border border-gray-400 rounded shadow"
      />
      
      {/* Scrollable container for child elements. */}
      <div
        ref={scrollRef}
        className="flex flex-row overflow-x-auto scrollbar-hide space-x-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {children}
      </div>

      {/* Right scroll arrow: Increments horizontal scroll by 300px. */}
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