const { rgb1Factory } = require("./rgb1_factory");
const { rgb255Factory } = require("./rgb255_factory");
const { hexFactory } = require("./hex_factory");
const { hsvFactory } = require("./hsv_factory");

const colorTypesEnum = [ 'RGB1', 'RGB255', 'HEX', 'HSV' ];

module.exports = {
  ColorTypes: colorTypesEnum,
  ColorMaker: {
    makeRGB1: rgb1Factory,
    makeRGB255: rgb255Factory,
    makeHEX: hexFactory,
    makeHSV: hsvFactory
  }
}