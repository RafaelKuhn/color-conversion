const { hexFactory } = require("../color-factories/hex_factory");

const hex = hexFactory();
let hexColor;

test('from rgb1 works', () => {
  hexColor = hex.fromRGB1(0.1, 0.1, 0.1);
  expect(hexColor.value).toBe('1a1a1a');
})

test('from rgb255 works', () => {
  hexColor = hex.fromRGB255(119, 7, 247);
  
  expect(hexColor.value).toBe('7707f7');
})

test('from hsv works', () => {
  hexColor = hex.fromHSV(360, 100, 100);

  expect(hexColor.value).toBe('ff0000');
})