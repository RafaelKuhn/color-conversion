const sanitizer = require('../console-app/input-sanitizer');

const tempRgb1 = sanitizer.sanitizeRgb1('  0.01, 0.001, 0.0001  ');
const tempRgb255 = sanitizer.sanitizeRgb255('  119, 7, 247 ');
const tempHex = sanitizer.sanitizeHex('  #7707f7 ');
const tempHsv = sanitizer.sanitizeHsv(' 360, 85, 50');

test('rgb1 sanitizes correctly', () => {
  expect(tempRgb1.r).toBe(0.01);
  expect(tempRgb1.g).toBe(0.001);
  expect(tempRgb1.b).toBe(0.0001);
});

test('rgb255 sanitizes correctly', () => {
  expect(tempRgb255.r).toBe(119);
  expect(tempRgb255.g).toBe(7);
  expect(tempRgb255.b).toBe(247);
});

test('hex sanitizes correctly', () => {
  expect(sanitizer.sanitizeHex('#f3f3f3').hexValue).toBe('f3f3f3');
  expect(sanitizer.sanitizeHex('f3f3f3').hexValue).toBe('f3f3f3');
  expect(sanitizer.sanitizeHex('   #f3f3f3   ').hexValue).toBe('f3f3f3');
  expect(sanitizer.sanitizeHex('  f3f3f3  ').hexValue).toBe('f3f3f3');
});

test('hsv sanitizes correctly', () => {
  expect(tempHsv.h).toBe(360);
  expect(tempHsv.s).toBe(85);
  expect(tempHsv.v).toBe(50);
});

test('rgb1, rgb255, hex and hsv have "type" property with corresponding value', () => {
  expect(tempRgb1).toHaveProperty('type');
  expect(tempRgb255).toHaveProperty('type');
  expect(tempHex).toHaveProperty('type');
  expect(tempHsv).toHaveProperty('type');

  expect(tempRgb1.type).toBe('RGB1');
  expect(tempRgb255.type).toBe('RGB255');
  expect(tempHex.type).toBe('HEX');
  expect(tempHsv.type).toBe('HSV');

});