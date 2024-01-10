import React from 'react';

const SimpleContainer = ({ children }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-row space-x-4">
        {children}
      </div>
    </div>
  );
};

export default SimpleContainer;