const { rgb1Factory } = require("./rgb1_factory");
const { rgb255Factory } = require("./rgb255_factory");
const { hexFactory } = require("./hex_factory");
const { hsvFactory } = require("./hsv_factory");

const colorTypesEnum = [ 'RGB1', 'RGB255', 'HEX', 'HSV' ];

module.exports = {
  ColorTypes: colorTypesEnum,
  Convert: {
    RGB1: rgb1Factory,
    RGB255: rgb255Factory,
    HEX: hexFactory,
    HSV: hsvFactory
  }
}