const { hexToRgb255, hsvToRgb1 } = require('../color-factories/color_operations')

function rgb255Factory() {
  const rgb255color = { type: 'RGB255', r: 0, g: 0, b: 0 };
  
  function fromRGB1(r, g, b) {
    rgb255color.r = Math.round(r * 255);
    rgb255color.g = Math.round(g * 255);
    rgb255color.b = Math.round(b * 255);

    return rgb255color;
  }

  function fromHEX(hexString) {
    const color = hexToRgb255(hexString);

    rgb255color.r = color.r;
    rgb255color.g = color.g;
    rgb255color.b = color.b;
    
    return rgb255color;
  }

  function fromHSV(h, s, v) {
    const rgb1 = hsvToRgb1(h, s, v);

    return fromRGB1(rgb1.r, rgb1.g, rgb1.b);
  }

  return { fromRGB1, fromHEX, fromHSV }
}

module.exports = { rgb255Factory }