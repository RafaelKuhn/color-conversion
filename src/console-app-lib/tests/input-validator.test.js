const validator = require('../console-app/input-validator')

test('rgb1, rgb255 and hsv must have separators', () => {
  expect(() => {
    validator.validateRgb1('1197247');
  }).toThrowError('separator');
});

test('hex string only accepts alphanumeric characters', () => {
  expect( () => {
    validator.validateHex('f3f3f@');
    validator.validateHex('f3f3g3');
  }).toThrowError('invalid');
});

test('hex string cant be too big or too small', () => {
  expect(() => {
    validator.validateHex('f3f3f3f3');
    validator.validateHex('#f3f3f3f3');
  }).toThrowError('big');

  expect(() => {
    validator.validateHex('f3f3f');
    validator.validateHex('#f3f3f');
  }).toThrowError('small');
});

test('hex string without # can have 6 digits and with # can have 7 digits', () => {
  expect(() => {
    validator.validateHex('f3f3f3');
    validator.validateHex('#f3f3f3');
  }).not.toThrowError();
});

