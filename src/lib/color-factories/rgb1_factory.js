const { hsvToRgb1, hexToRgb255 } = require('./color_operations');

/**
 * this will create an empty rgb1 color object, can be initialized with 'from' methods
 * @param {number} floatingPointPrecision 
 */
function rgb1Factory(floatingPointPrecision = 4) {
  let rgb1Color = { type: 'RGB1', r: 0.0, g: 0.0, b: 0.0 };

  /**
   * @param {number} r 8-byte value of red (0 - 255)
   * @param {number} g 8-byte value of green (0 - 255)
   * @param {number} b 8-byte value of blue (0 - 255)
   */
  function fromRGB255(r, g, b) {
    rgb1Values = {
      r: (r / 255).toFixed(floatingPointPrecision),
      g: (g / 255).toFixed(floatingPointPrecision),
      b: (b / 255).toFixed(floatingPointPrecision)
    }

    rgb1Color = { ...rgb1Color, ...rgb1Values };

    return rgb1Color;
  }
  
  /**
   * @param {string} input a hexadecimal string containing respectively each RGB 8 bit channel, example: '7707f7' or '7707F7'
   */
  function fromHEX(input) {
    const rgb255Color = hexToRgb255(input);
    const rgb1Color = fromRGB255(rgb255Color.r, rgb255Color.g, rgb255Color.b);

    return rgb1Color;
  }

  /**
   * @param {number} hue hue is in degrees (0° to 359º)
   * @param {number} saturation percentage of saturation (0 to 100)
   * @param {number} value percentage of value or brightness (0 to 100)
   */
  function fromHSV(hue, saturation, value) {
    const rgb1Values = hsvToRgb1(hue, saturation, value);
    console.log(rgb1Values);

    rgb1Color = { ...rgb1Color, rgb1Values }

    return rgb1Color;
  };
    
  return { fromRGB255, fromHEX, fromHSV };
}

module.exports = { rgb1Factory };