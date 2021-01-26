function rgb1Factory(floatingPointPrecision) {
  const color = {};

  /**
   * 
   * @param {number} r 
   * @param {number} g 
   * @param {number} b 
   */
  function fromRGB(r, g, b) {
    const rgb1Color = {};
    
    rgb1Color.r = (r / 255).toFixed(floatingPointPrecision); 
    rgb1Color.g = (g / 255).toFixed(floatingPointPrecision);
    rgb1Color.b = (b / 255).toFixed(floatingPointPrecision);
    
    return rgb1Color;
  }

  function fromHEX(input) {
    const r = parseInt(input.substr(0,2), 16);
    const g = parseInt(input.substr(2,2), 16);
    const b = parseInt(input.substr(4,2), 16);

    return fromRGB(r, g, b);
  }
  
  color.fromRGB255 = fromRGB;
  color.fromHEX = fromHEX;
  return color;
}

function rgb255Factory(rgb1Color) {
  console.log("2");
}

function hexFactory(type, color) {
  console.log("3");
}

function hsvFactory(type, color) {
  console.log("4");
}

/*
function getAsRgb1(colorType) {
  response = {};
  switch (colorType) {
    case 0:
      response.rgb1value = 'aa';
      break;
    case 1:
      response.literal = 'rgb1';
      break;
    case 2:
      response.literal = 'hex';
      break;
    case 3:
      response.literal = 'hsv';
      break;
  }
} 





/**/



module.exports = { 
    RGB1: rgb1Factory,
    RGB255: rgb255Factory,
    HEX: hexFactory,
    HSV: hsvFactory
}