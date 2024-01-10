import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import Noun from '../components/Noun';
import classes from '../styles/Playground.module.css';
import { getRandomNounSeed, getNounData } from '../components/Utils/utils';
import { buildSVG } from '../components/Utils/svg-builder2';
import { PNGCollectionEncoder } from '../components/Utils/png-collection-encoder'
import ImageData from '../data/image-data.json';

const encoder = new PNGCollectionEncoder(ImageData.palette);
console.log(ImageData.palette);

const Playground = () => {
  const [currentGlassesIndex, setCurrentGlassesIndex] = useState(0);
  const [currentHeadIndex, setCurrentHeadIndex] = useState(0);
  const [nounSvg, setNounSvg] = useState('');
const glassesOptions = ImageData?.images?.glasses?.map(item => item.filename) || [];
const headOptions = ImageData?.images?.head?.map(item => item.filename) || [];


  useEffect(() => {
    updateNoun();
  }, [currentGlassesIndex, currentHeadIndex]);

  const updateNoun = () => {
    const seed = {
      ...getRandomNounSeed(),
      glasses: glassesOptions[currentGlassesIndex],
      head: headOptions[currentHeadIndex]
    };
    const { parts, background } = getNounData(seed);
    const svg = buildSVG(parts, encoder.data.palette, background);
    setNounSvg(svg);
  };

  const cycleTrait = (type, direction) => {
    let currentIndex = type === 'glasses' ? currentGlassesIndex : currentHeadIndex;
    let options = type === 'glasses' ? glassesOptions : headOptions;

    currentIndex = (currentIndex + direction + options.length) % options.length;
    type === 'glasses' ? setCurrentGlassesIndex(currentIndex) : setCurrentHeadIndex(currentIndex);
  };

  return (
    <Container fluid="lg" className="pt-8">
      <Row>
        <Col lg={3}>
          <div>
            <div className={classes.traitControl}>
              <Button onClick={() => cycleTrait('glasses', -1)}>{'<'}</Button>
              <span>{glassesOptions[currentGlassesIndex]}</span>
              <Button onClick={() => cycleTrait('glasses', 1)}>{'>'}</Button>
            </div>
            <div className={classes.traitControl}>
              <Button onClick={() => cycleTrait('heads', -1)}>{'<'}</Button>
              <span>{headOptions[currentHeadIndex]}</span>
              <Button onClick={() => cycleTrait('heads', 1)}>{'>'}</Button>
            </div>
          </div>
        </Col>
        <Col lg={9}>
          {nounSvg && (
            <Noun
              imgPath={`data:image/svg+xml;base64,${btoa(nounSvg)}`}
              alt="Noun"
              className="rounded-lg"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Playground;