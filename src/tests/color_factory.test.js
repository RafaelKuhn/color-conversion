const { expect } = require("@jest/globals");

const color_factory = require("../color-factories/color_factories");

test('color factory has colorTypesEnum', () => {
  expect(color_factory).toHaveProperty('ColorTypes');
});