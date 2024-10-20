import React from 'react';

const Loading = () => {
  return (
    <div style={styles.loadingContainer}>
      {/* Blank Screen or replace with GIF */}
      {/* <img src="/loading.gif" alt="Loading..." style={styles.gif} /> */}
    </div>
  );
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',  // Blank white background
  },
  gif: {
    width: '100px',  // Size of the loading GIF
  },
};

export default Loading;