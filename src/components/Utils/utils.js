import { NounSeed, NounData } from './types';
import { images, bgcolors } from '../../data/image-data.json';

const { bodies, accessories, heads, glasses } = images;


/**
 * Get encoded part and background information using a Noun seed
 * @param seed The Noun seed
 */
export const getNounData = (seed: NounSeed): NounData => {
  return {
    parts: [
      bodies[seed.body],
      accessories[seed.accessory],
      heads[seed.head],
      glasses[seed.glasses],
    ],
    background: bgcolors[seed.background],
  };
};

/**
 * Generate a random Noun seed
 * @param seed The Noun seed
 */
export const getRandomNounSeed = (): NounSeed => {
  return {
    background: Math.floor(Math.random() * bgcolors.length),
    body: Math.floor(Math.random() * bodies.length),
    accessory: Math.floor(Math.random() * accessories.length),
    head: Math.floor(Math.random() * heads.length),
    glasses: Math.floor(Math.random() * glasses.length),
  };
};

// ---

/**
 * Convert the provided number to a passed hex string
 * @param c
 * @param pad The desired number of chars in the hex string
 */
export const toPaddedHex = (c: number, pad = 2): string => {
  return c.toString(16).padStart(pad, '0');
};

/**
 * Convert an RGB color to hex (without `#` prefix)
 * @param r The red value
 * @param g The green value
 * @param b The blue value
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `${toPaddedHex(r)}${toPaddedHex(g)}${toPaddedHex(b)}`;
};