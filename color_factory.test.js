const { expect } = require("@jest/globals");

const color_factory = require("./color_factory.js");

test('color factory has colorTypesEnum', () => {
  expect(color_factory).toHaveProperty('ColorTypes');
});