const { hsvFactory } = require('../color-factories/hsv_factory');

const hsv = hsvFactory(1);
const expectedPurple = { h: 268, s: 97.2, v: 96.9 };



test('from rgb1 works', () => {
  expect(hsv.fromRGB1(1, 0, 0)).toMatchObject({ h: 0, s: 100, v: 100 });
  expect(hsv.fromRGB1(0.467, 0.027, 0.969)).toMatchObject(expectedPurple);
})

test('from rgb255 works', () => {
  expect(hsv.fromRGB255(119, 7, 247)).toMatchObject(expectedPurple);
})

test('from hex works', () => {
  expect(hsv.fromHEX('7707f7')).toMatchObject(expectedPurple)
})