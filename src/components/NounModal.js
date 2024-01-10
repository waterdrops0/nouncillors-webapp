import { Button } from 'react-bootstrap';
import classes from '../styles/NounModal.module.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Noun from './Noun';
import { svg2png } from './Utils/svg2png';
import { Backdrop } from './Modal';

const downloadNounPNG = (png) => {
  const downloadEl = document.createElement('a');
  downloadEl.href = png;
  downloadEl.download = 'noun.png';
  downloadEl.click();
};

const NounModal = ({ onDismiss, svg }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [png, setPng] = useState(null);

  const isMobile = width <= 991;

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    const loadPng = async () => {
      setPng(await svg2png(svg, 512, 512));
    };
    loadPng();

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [svg]);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onDismiss={onDismiss} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>
          {png && (
            <Noun
              imgPath={png}
              alt="noun"
              className={classes.nounImg}
              wrapperClassName={classes.nounWrapper}
            />
          )}
          <div className={classes.displayNounFooter}>
            <span>Use this Nouncillor as your profile picture!</span>
            {!isMobile && png && (
              <Button onClick={() => downloadNounPNG(png)}>Download</Button>
            )}
          </div>
        </div>,
        document.getElementById('backdrop-root')
      )}
    </>
  );
};

export default NounModal;
