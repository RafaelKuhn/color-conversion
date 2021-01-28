function hsvToRgb1(hue, saturation, value) {
  const rgb1Color = { type: 'RGB1', r: 0, g: 0, b:0 }
  if (hue > 360) {
    hue = hue % 360;
  }
  
  hue        /= 60;
  saturation /= 100;
  value      /= 100;
  const hueClass = Math.floor(hue) % 6;
  
  const f = hue - Math.floor(hue);
  const p = value * (1 - saturation);
  const q = value * (1 - (saturation * f));
  const t = value * (1 - (saturation * (1 - f)));
  
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
}

function hexToRgb255(hexString) {
  const r = parseInt(hexString.substr(0,2), 16);
  const g = parseInt(hexString.substr(2,2), 16);
  const b = parseInt(hexString.substr(4,2), 16);
  
  return {r, g, b};
}

module.exports = { hsvToRgb1, hexToRgb255 }