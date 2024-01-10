// Function to calculate the draw length of a rectangle
const getRectLength = (currentX, drawLength, rightBound) => {
  const remainingPixelsInLine = rightBound - currentX;
  return drawLength <= remainingPixelsInLine ? drawLength : remainingPixelsInLine;
};

// Function to decode the RLE image data
export const decodeImage = (image) => {
  const data = image.replace(/^0x/, '');
  const paletteIndex = parseInt(data.substring(0, 2), 16);
  const bounds = {
    top: parseInt(data.substring(2, 4), 16),
    right: parseInt(data.substring(4, 6), 16),
    bottom: parseInt(data.substring(6, 8), 16),
    left: parseInt(data.substring(8, 10), 16),
  };
  const rects = data.substring(10);

  return {
    paletteIndex,
    bounds,
    rects:
      rects
        .match(/.{1,4}/g)
        .map(rect => [parseInt(rect.substring(0, 2), 16), parseInt(rect.substring(2, 4), 16)]) || [],
  };
};

// Function to build an SVG image for a single part
export const buildSVGForSinglePart = (partData, paletteColors, bgColor) => {
  if (partData === '0x0000000000') {
    return ''; // Return an empty string if the part is empty
  }

  const svgRects = [];
  const { bounds, rects } = decodeImage(partData);

  let currentX = bounds.left;
  let currentY = bounds.top;

  // New scale factor
  const scale = 2.5;

  rects.forEach(draw => {
    let drawLength = draw[0];
    const colorIndex = draw[1];
    const hexColor = paletteColors[colorIndex];

    let length = getRectLength(currentX, drawLength, bounds.right);
    while (length > 0) {
      if (colorIndex !== 0) {
        svgRects.push(
          `<rect width="${length * scale}" height="${scale}" x="${currentX * scale}" y="${currentY * scale}" fill="#${hexColor}" />`,
        );
      }

      currentX += length;
      if (currentX === bounds.right) {
        currentX = bounds.left;
        currentY++;
      }

      drawLength -= length;
      length = getRectLength(currentX, drawLength, bounds.right);
    }
  });

  // Updated SVG dimensions
  const svgWidth = 90;
  const svgHeight = 90;

  const svgStartTag = `<svg width="${svgWidth}" height="${svgHeight}" viewBox="-5 -5 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;
  const backgroundRect = `<rect width="100%" height="100%" fill="${bgColor ? `#${bgColor}` : 'none'}" />`;
  const svgEndTag = `</svg>`;

  return `${svgStartTag}${backgroundRect}${svgRects.join('')}${svgEndTag}`;
};