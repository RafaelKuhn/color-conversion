
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
    /**
     * 
     * @param {number} hue hue is in degrees (0° to 359º)
     * @param {number} saturation percentage of saturation (0 to 100)
     * @param {number} value percentage of value or brightness (0 to 100)
     */
    function fromHSV(hue, saturation, value) {
      const rgb1Color = {};
      if (hue > 360) {
          hue = hue % 360;
      }

	  hue        /= 60;
	  saturation /= 100;
	  value      /= 100;
	  const hueClass = Math.floor(hue) % 6;

	  const f = hue - Math.floor(hue);
	  const p = (value * (1 - saturation)).toFixed(floatingPointPrecision);
	  const q = (value * (1 - (saturation * f))).toFixed(floatingPointPrecision);
	  const t = (value * (1 - (saturation * (1 - f)))).toFixed(floatingPointPrecision);

	  switch (hueClass) {
		case 0:
          rgb1Color.r = value; rgb1Color.g = t; rgb1Color.b = p;
          break;
		case 1:
          rgb1Color.r = q; rgb1Color.g = value; rgb1Color.b = p;
          break;
		case 2:
          rgb1Color.r = p; rgb1Color.g = value; rgb1Color.b = t;
          break;
		case 3:
          rgb1Color.r = p; rgb1Color.g = q; rgb1Color.b = value;
          break;
		case 4:
          rgb1Color.r = t; rgb1Color.g = p; rgb1Color.b = value;
          break;
		case 5:
          rgb1Color.r = value; rgb1Color.g = p; rgb1Color.b = q;
          break;
      }
      
      return rgb1Color;
    };
    
    return { fromRGB255, fromHEX, fromHSV };
  }

  module.exports = { rgb1Factory };