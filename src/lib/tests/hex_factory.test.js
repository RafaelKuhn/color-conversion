const { hexFactory } = require("../color-factories/hex_factory");

const hex = hexFactory();
let color;

test('from rgb1 works', () => {
  color = hex.fromRGB1(0.1, 0.1, 0.1);
  expect(color.hexValue).toBe('1a1a1a');
})

test('from rgb255 works', () => {
  color = hex.fromRGB255(119, 7, 247);
  
  expect(color.hexValue).toBe('7707f7');
})

test('from hsv works', () => {
  color = hex.fromHSV(360, 100, 100);

  expect(color.hexValue).toBe('ff0000');
})