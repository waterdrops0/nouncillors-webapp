import imageData from '../../data/image-data.json';

const { bodies, accessories, heads, glasses } = imageData.images;

/**
 * Get encoded part and background information using a Noun seed
 * @param seed The Noun seed
 */
export const getNounData = (seed) => {
  return {
    parts: [
      bodies[seed.body],
      accessories[seed.accessory],
      heads[seed.head],
      glasses[seed.glasses],
    ],
    background: imageData.bgcolors[seed.background],
  };
};

/**
 * Generate a random Noun seed
 */
export const getRandomNounSeed = () => {
  return {
    background: Math.floor(Math.random() * imageData.bgcolors.length),
    body: Math.floor(Math.random() * bodies.length),
    accessory: Math.floor(Math.random() * accessories.length),
    head: Math.floor(Math.random() * heads.length),
    glasses: Math.floor(Math.random() * glasses.length),
  };
};

/**
 * Convert the provided number to a padded hex string
 * @param num The number to convert
 * @param pad The desired number of chars in the hex string
 */
export const toPaddedHex = (num, pad = 2) => {
  return num.toString(16).padStart(pad, '0');
};

/**
 * Convert an RGB color to hex (without `#` prefix)
 * @param r The red value
 * @param g The green value
 * @param b The blue value
 */
export const rgbToHex = (r, g, b) => {
  return `${toPaddedHex(r)}${toPaddedHex(g)}${toPaddedHex(b)}`;
};