const { expect } = require("@jest/globals");

const colorMaker = require("../color_maker");

test('color maker has colorTypesEnum', () => {
  expect(colorMaker).toHaveProperty('ColorTypes');
});