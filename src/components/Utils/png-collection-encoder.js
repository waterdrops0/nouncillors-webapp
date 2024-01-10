//import { promises as fs } from 'fs';
import { Image } from './image';

/**
 * A class used to convert PNG images into the following RLE format:
 * Palette Index, Bounds [Top (Y), Right (X), Bottom (Y), Left (X)] (4 Bytes), [Pixel Length (1 Byte), Color Index (1 Byte)][].
 */
export class PNGCollectionEncoder {
  constructor(colors = []) {
    this._transparent = ['', 0];
    this._colors = new Map([this._transparent]);
    colors.forEach((color, index) => this._colors.set(color, index));
    this._images = new Map();
    this._folders = {};
  }

  /**
   * The flattened run-length encoded image data
   */
  get images() {
    return this.format(true).root;
  }

  /**
   * The run-length encoded image data and file names in their respective folders
   */
  get data() {
    return { palette: [...this._colors.keys()], images: this.format() };
  }

  /**
   * Decode a PNG image and re-encode using a custom run-length encoding
   * @param image The image name
   * @param png The png image data
   * @param folder An optional containing folder name
   */
    encodeImage(name, png, folder = null) {
    const image = new Image(png.width, png.height, png.rgbaAt);
    const rle = image.toRLE(this._colors);

    this._images.set(name, rle);
    if (folder) {
      (this._folders[folder] = this._folders[folder] || []).push(name);
    }

    return rle;
  }

  /**
   * Write the color palette and encoded part information to a JSON file
   * @param outputFile The output file path and name
   */
  /*
  async writeToFile(outputFile = 'encoded-images.json') {
    await fs.writeFile(outputFile, JSON.stringify(this.data, null, 2));
  }
  */



  /**
   * Return an object that contains all encoded images in their respective folders.
   * @param flatten Whether all image data should be flattened (no sub-folders)
   */
  format(flatten = false) {
    const images = new Map(this._images);
    const folders = Object.entries(this._folders);

    let data = {};
    if (!flatten && folders.length) {
      data = folders.reduce((result, [folder, filenames]) => {
        result[folder] = [];
        filenames.forEach(filename => {
          result[folder].push({
            filename,
            data: images.get(filename),
          });
          images.delete(filename);
        });
        return result;
      }, {});
    }

    // Write all remaining files to `root`
    if (images.size) {
      data.root = [...images.entries()].map(([filename, data]) => ({
        filename,
        data,
      }));
    }
    return data;
  }
}