
/**
 * this will create an empty rgb1 color object, can be initialized with 'from' methods
 * @param {number} floatingPointPrecision 
 */
function rgb1Factory(floatingPointPrecision = 4) {  
    /**
     * @param {number} r byte value of red (0 - 255)
     * @param {number} g byte value of green (0 - 255)
     * @param {number} b byte value of blue (0 - 255)
     */
    function fromRGB255(r, g, b) {
      const rgb1Color = {};
      
      rgb1Color.r = (r / 255).toFixed(floatingPointPrecision);
      rgb1Color.g = (g / 255).toFixed(floatingPointPrecision);
      rgb1Color.b = (b / 255).toFixed(floatingPointPrecision);
      
      return rgb1Color;
    }
  
    /**
     * @param {string} input a hexadecimal string containing respectively each RGB 8 bit channel, example: '7707f7' or '7707F7'
     */
    function fromHEX(input) {
      const r = parseInt(input.substr(0,2), 16);
      const g = parseInt(input.substr(2,2), 16);
      const b = parseInt(input.substr(4,2), 16);
  
      return fromRGB255(r, g, b);
    }
  
    function fromHSV(hue, saturation, value) {
      const rgb1 = {};
  
      if (saturation == 0)
      {
        rgb1.r = hsv.v;
        rgb1.g = hsv.v;
        rgb1.b = hsv.v;
        
        return rgb1;
      }
  
  
    }
    
    return { fromRGB255, fromHEX, fromHSV };
  }

  module.exports = { rgb1Factory };