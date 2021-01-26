
/**
 * this will create an empty rgb1 color object, can be initialized with 'from' methods
 * @param {number} floatingPointPrecision 
 */
function rgb1Factory(floatingPointPrecision) {
    console.log('[wip] rgb1');
    const color = {};
  
    /**
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
  
    /**
     * @param {string} input 
     */
    function fromHEX(input) {
      const r = parseInt(input.substr(0,2), 16);
      const g = parseInt(input.substr(2,2), 16);
      const b = parseInt(input.substr(4,2), 16);
  
      return fromRGB(r, g, b);
    }
  
    function fromHSV(hue, saturation, value) {
      const rgb1Color = {};
  
      if (saturation == 0)
      {
        rgb.r = hsv.v;
        rgb.g = hsv.v;
        rgb.b = hsv.v;
        
        return rgb;
      }
  
  
    }
    
    color.fromRGB255 = fromRGB;
    color.fromHEX = fromHEX;
    return color;
  }

  module.exports = { rgb1Factory };