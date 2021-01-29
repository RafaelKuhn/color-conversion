const { rgb255Factory } = require('../color-factories/rgb255_factory');

const rgb255 = rgb255Factory();
let color;

test('from rgb1 works', () => {
  color = rgb255.fromRGB1(0.1, 0.1, 0.1);

  expect(color).toMatchObject({ r: 26, g: 26, b: 26 });
})

test('from hex works', () => {
  color = rgb255.fromHEX('7707f7');

  expect(color).toMatchObject({ r: 119, g: 7, b: 247 });
})

test('from hsv works', () => {
  color = rgb255.fromHSV('360', '100', '100');

  expect(color).toMatchObject({ r: 255, g: 0, b: 0 });
})