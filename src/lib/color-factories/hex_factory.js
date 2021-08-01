const { hsvToRgb1 } = require('./color_operations');

function hexFactory() {
  const hexColor = { type: 'HEX', hexValue: '' }
  /**
 * @param {number} r unitary hexValue of red (0 - 1)
 * @param {number} g unitary hexValue of green (0 - 1)
 * @param {number} b unitary hexValue of blue (0 - 1)
 */
  function fromRGB1(r, g, b) {
    const hexR = Math.round(r * 255).toString(16);
    const hexG = Math.round(g * 255).toString(16);
    const hexB = Math.round(b * 255).toString(16);
    
    hexColor.hexValue = hexStringFromRgbArray([hexR, hexG, hexB]);
    
    return hexColor;
  }

  /**
   * @param {number} r 8-byte hexValue of red (0 - 255)
   * @param {number} g 8-byte hexValue of green (0 - 255)
   * @param {number} b 8-byte hexValue of blue (0 - 255)
   */
  function fromRGB255(r, g, b) {
    const hexR = Math.round(r).toString(16);
    const hexG = Math.round(g).toString(16);
    const hexB = Math.round(b).toString(16);

    hexColor.hexValue = hexStringFromRgbArray([hexR, hexG, hexB]);
    
    return hexColor;
  }

  /**
   * @param {number} hue hue is in degrees (0° to 359º)
   * @param {number} saturation percentage of saturation (0 to 100)
   * @param {number} hexValue percentage of hexValue or brightness (0 to 100)
   */
  function fromHSV(h, s, v) {
    const rgb1Color = hsvToRgb1(h, s, v);

    return fromRGB1(rgb1Color.r, rgb1Color.g, rgb1Color.b);
  }
  return { fromRGB1, fromRGB255, fromHSV }
}

function hexStringFromRgbArray(rgbHexArray) {
  let hexString = '';

  for(const element of rgbHexArray) {
    if (element.length < 2) {
      hexString += '0'
    }
    hexString += element;
  }
  
  return hexString;
}

module.exports = { hexFactory }