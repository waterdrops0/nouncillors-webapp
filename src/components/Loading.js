import React from 'react';
import Image from 'next/image';
import loadingGif from '../assets/loading-skull-noun.gif';

const Loading = () => {

  return (
    <div style={styles.loadingContainer}>
      <Image src={loadingGif} alt="Loading..." style={styles.gif} />
    </div>
  );
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  gif: {
    width: '150px',
    height: 'auto',
  },
};

export default Loading;
