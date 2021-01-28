hexFactory = {};

hexFactory.fromRGB = function (r, g, b) {
  console.log('hex to rgb starting');
  console.log(`${r} ${g} ${b}`);
  const hexR = Math.round(r * 255).toString(16);
  const hexG = Math.round(g * 255).toString(16);
  const hexB = Math.round(b * 255).toString(16);

  const hexColor = hexR + hexG + hexB;
  return hexColor;
}

module.exports = { hexFactory }