const { hexToRgb255 } = require('../color-factories/color_operations');

function hsvFactory(floatPrecision = 1) {
  const hsvColor = { type: 'HSV', floatPrecision: floatPrecision, h: 0, s: 0, v: 0 };

  function fromRGB1(r, g, b) {
    let rdif;
    let gdif;
    let bdif;

    let h;
    let s;
    let v;

    v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function (c) {
      return (v - c) / 6 / diff + 1 / 2;
    };

    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);

      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = (1 / 3) + rdif - bdif;
      } else if (b === v) {
        h = (2 / 3) + gdif - rdif;
      }

      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }

    hsvColor.h = parseInt(Math.round(h * 360));
    hsvColor.s = Number(parseFloat(s * 100).toFixed(floatPrecision)); // isso retorna uma string wtf 
    hsvColor.v = Number(parseFloat(v * 100).toFixed(floatPrecision)); // TODO: fazer o do fromHex

    return hsvColor;
  }
  
  function fromRGB255(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    return fromRGB1(r, g, b);
  }

  function fromHEX(hexString) {
    const rgb255 = hexToRgb255(hexString);

    return fromRGB255(rgb255.r, rgb255.g, rgb255.b);
  }
  
  return { fromRGB1, fromRGB255, fromHEX }
}

module.exports = { hsvFactory }