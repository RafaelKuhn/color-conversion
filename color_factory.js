const { rgb1Factory } = require("./rgb1_factory");
const { rgb255Factory } = require("./rgb255_factory");
const { hexFactory } = require("./hex_factory");
const { hsvFactory } = require("./hsv_factory");

const colorTypesEnum = [ 'RGB1', 'RGB255', 'HEX', 'HSV' ];

function allFactories(floatPrecision) {
  const factories = [];

  factories.push(
    function() { rgb1Factory(floatPrecision) },
    function() { rgb255Factory() },
    function() { hexFactory() },
    function() { hsvFactory() }
  )

  return factories;
}

module.exports = {
  ColorTypes: colorTypesEnum,
  allFactories: allFactories,
  RGB1: rgb1Factory,
  RGB255: rgb255Factory,
  HEX: hexFactory,
  HSV: hsvFactory
}