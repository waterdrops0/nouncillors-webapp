import {
  Container,
  Col,
  Button,
  Row,
  FloatingLabel,
  Form,
} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { getNounData, getRandomNounSeed } from '../components/Utils/utils.js';
import ImageData from '../data/image-data.json';
import { buildSVG } from '../components/Utils/svg-builder.js';
import { buildSVGForSinglePart } from '../components/Utils/svg-builder2.js';
import { PNGCollectionEncoder } from '../components/Utils/png-collection-encoder.js'
import Noun from '../components/Noun.js';
import NounModal from '../components/NounModal.js';
import classes from '../styles/Playground.module.css';

const encoder = new PNGCollectionEncoder(ImageData.palette);

const parseTraitName = partName =>
  capitalizeFirstLetter(partName.substring(partName.indexOf('-') + 1));

const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

const traitKeyToLocalizedTraitKeyFirstLetterCapitalized = s => {
  const traitMap = new Map([
    ['background', 'Background'],
    ['body', 'Body'],
    ['accessory', 'Accessory'],
    ['head', 'Head'],
    ['glasses', 'Glasses'],
  ]);

  return traitMap.get(s);
};


const Playground = () => {
  const [nounSvgs, setNounSvgs] = useState([]);
  const [traits, setTraits] = useState([]);
  const [modSeed, setModSeed] = useState({});
  const [initLoad, setInitLoad] = useState(true);
  const [displayNoun, setDisplayNoun] = useState(false);
  const [indexOfNounToDisplay, setIndexOfNounToDisplay] = useState();
  const [selectIndexes, setSelectIndexes] = useState({});
  const [lastSeed, setLastSeed] = useState({});

  const generateNounSvg = React.useCallback(
    (amount = 1) => {
      for (let i = 0; i < amount; i++) {
        const seed = { ...getRandomNounSeed(), ...lastSeed, ...modSeed };
        const { parts, background } = getNounData(seed);
        const svg = buildSVG(parts, encoder.data.palette, background);
        setNounSvgs(prev => {
          return prev ? [svg, ...prev] : [svg];
        });
        setLastSeed(seed);
      }
    },
    [modSeed],
  );



  function displayHeadTraits(images, containerId) {
    const container = document.getElementById(containerId);
    for (let key in images) {
        let imageTraits = images[key];
        for (let i = 0; i < imageTraits.length; i++) {
            let trait = imageTraits[i];
            if (trait.filename.startsWith('head')) {
                console.log("This is the RLE data for a head", trait);
                console.log("this is the trait.title", trait.filename);
                const svgData = buildSVGForSinglePart(trait.data, encoder.data.palette)
                
                const svgElement = document.createElement('div');
                svgElement.className = "rounded-lg hover:cursor-pointer hover:scale-105 transition-transform";
                svgElement.onclick = () => {
          setModSeed(prev => ({
            ...prev,
            ['head']: i,
          }));
        
        };
                svgElement.innerHTML = svgData;
                container.appendChild(svgElement);
            }
        }
    }
};

function displayGlasses(images, containerId) {
    const container = document.getElementById(containerId);
    for (let key in images) {
        let imageTraits = images[key];
        for (let i = 0; i < imageTraits.length; i++) {
            let trait = imageTraits[i];
            if (trait.filename.startsWith('glasses')) {
                const svgData = buildSVGForSinglePart(trait.data, encoder.data.palette)
                const svgElement = document.createElement('div');
                svgElement.className = "rounded-lg hover:cursor-pointer hover:scale-105 transition-transform";
                svgElement.onclick = () => {
          setModSeed(prev => ({
            ...prev,
            ['glasses']: i,
          }));
          
        };
                svgElement.innerHTML = svgData;
                container.appendChild(svgElement);
            }
        }
    }
};

    useEffect(() => {
        // Display heads
        displayHeadTraits(ImageData.images, 'headsContainer');

        // Display glasses
        displayGlasses(ImageData.images, 'glassesContainer')


        // Map trait titles to their names
        const traitTitles = ['background', 'body', 'accessory', 'head', 'glasses'];
        const traitNames = [
            ['cool', 'warm'],
            ...Object.values(ImageData.images).map(i => {
            return i.map(imageData => imageData.filename);
            }),
        ];

        // Set traits state
        setTraits(
            traitTitles.map((title, index) => {
            return {
                title: title,
                traitNames: traitNames[index],
            };
            }),
        );

        // Call generateNounSvg whenever modSeed changes
        generateNounSvg();
        console.log("the modSeed is:", modSeed);

        }, [generateNounSvg, modSeed]); 

  const traitOptions = trait => {
    return Array.from(Array(trait.traitNames.length + 1)).map((_, index) => {
      const traitName = trait.traitNames[index - 1];
      const parsedTitle = index === 0 ? 'Random' : parseTraitName(traitName);
      return (
        <option key={index} value={traitName}>
          {parsedTitle}
        </option>
      );
    });
  };

  const traitButtonHandler = (trait, traitIndex) => {
    setModSeed(prev => {
      // -1 traitIndex = random
      if (traitIndex < 0) {
        let state = { ...prev };
        delete state[trait.title];
        return state;
      }
      return {
        ...prev,
        [trait.title]: traitIndex,
      };
    });
  };

  return (
    <>
     
      {displayNoun && indexOfNounToDisplay !== undefined && nounSvgs && (
        <NounModal
          onDismiss={() => {
            setDisplayNoun(false);
          }}
          svg={nounSvgs[indexOfNounToDisplay]}
        />
      )}

        
      <Container fluid="lg" className="pt-8">
        <Row>
          <Col lg={3}>
            <Col lg={12}>
              <Button
              onClick={() => {
                generateNounSvg();
              }}
             className={classes.primaryBtn}
              >
              Generate Nouncillors
            </Button>
            </Col>
            <Row>
              {traits &&
                traits.map((trait, index) => {
                  return (
                    <Col lg={12} xs={6}>
                      <Form className={classes.traitForm}>
                        <FloatingLabel
                          controlId="floatingSelect"
                          label={traitKeyToLocalizedTraitKeyFirstLetterCapitalized(trait.title)}
                          key={index}
                          className={classes.floatingLabel}
                        >
                          <Form.Select
                            aria-label="Floating label select example"
                            className={classes.traitFormBtn}
                            value={trait.traitNames[selectIndexes?.[trait.title]] ?? -1}
                            onChange={e => {
                              let index = e.currentTarget.selectedIndex;
                              traitButtonHandler(trait, index - 1); // - 1 to account for 'random'
                              setSelectIndexes({
                                ...selectIndexes,
                                [trait.title]: index - 1,
                              });
                            }}
                          >
                            {traitOptions(trait)}
                          </Form.Select>
                        </FloatingLabel>
                      </Form>
                    </Col>
                  );
                })}
            </Row>
          </Col>
          <div id="headsContainer" className="flex flex-row"></div>
          <div id="glassesContainer" className="flex flex-row"></div>
          <Col lg={9}>
            <Row>
              {nounSvgs &&
                nounSvgs.map((svg, i) => {
                  return (
                    <Col xs={4} lg={3} key={i}>

                      <div className="">
                      <div
                        onClick={() => {
                          setIndexOfNounToDisplay(i);
                          setDisplayNoun(true);
                        }}
                      >
                        <Noun
                          imgPath={`data:image/svg+xml;base64,${btoa(svg)}`}
                          alt="noun"
                          className="rounded-lg hover:cursor-pointer hover:scale-105 transition-transform"
                        />
                      </div>
                      </div>

                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
      </Container>

   </>
  );
};
export default Playground;