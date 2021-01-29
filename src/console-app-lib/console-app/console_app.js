const readline  = require("readline-sync");
const validator = require('./input-validator');
const sanitizer = require('./input-sanitizer');

const { ColorTypes, ColorMaker } = require("../../lib/color_maker");

const floatPrecision = 3; // TODO: prompt user for float precision on decimals

const validationFunctions = {
  RGB1: validator.validateRgb1,
  RGB255: validator.validateRgb255,
  HEX: validator.validateHex,
  HSV: validator.validateHsv
}

const sanitizationFunctions = {
  RGB1: sanitizer.sanitizeRgb1,
  RGB255: sanitizer.sanitizeRgb255,
  HEX: sanitizer.sanitizeHex,
  HSV: sanitizer.sanitizeHsv
}

// TODO: constant to store makeCOLORNAME functions accessible by tag

function startConsoleApp() {
  const colorType = askForColorType();

  const colorInput = askForColorInput(colorType);

  const sanitizedColor = sanitizeColorInput(colorInput, colorType);

  outputAllColorFormats(sanitizedColor);
}

function askForColorType() {
  const rawColorType = readline.question(
`\n[prompt] select color input format\n
     <format>    
_________________
  [1] -> RGB 1 
  [2] -> RGB 255 
  [3] -> HEX
  [4] -> HSV/HSB

   `);

  validateColorTypeIndex(rawColorType);

  const colorType = getColorTypeFromIndex(rawColorType);

  return colorType;
}

function askForColorInput(colorType) {
  const placeHolders = getPlaceHolderArray(colorType);
  const rawColor = readline.question(`
 <format>  |                      <example input>                      |
___________|___________________________________________________________|
${placeHolders.rgb1} RGB 1   | 0.46, 0.02, 0.96  or  0.46,0.02,0.96  or  0.46 0.02 0.96  |
${placeHolders.rgb255} RGB 255 |    119, 7, 247    or     119,7,247    or     119 7 247    |
${placeHolders.hex} HEX     |      #7707F7      or       7707F7                         |
${placeHolders.hsv} HSV/HSB |   360, 100, 100   or                                      |

   `);
  
  validateColorInput(rawColor, colorType);
  return rawColor;
}

function sanitizeColorInput(rawColor, colorType) {
  const sanitizationFunction = sanitizationFunctions[colorType];
  
  console.log(`\n[prompt] sanitizing ${rawColor} with function`);
  console.log(sanitizationFunction);

  return sanitizationFunction(rawColor);
}

function getPlaceHolderArray(colorType) {
  const doubleSpace = '  ';
  const arrow = '->';

  const placeHolders = {
    rgb1: colorType == ColorTypes[0] ? arrow : doubleSpace,
    rgb255: colorType == ColorTypes[1] ? arrow : doubleSpace,
    hex: colorType == ColorTypes[2] ? arrow : doubleSpace,
    hsv: colorType == ColorTypes[3] ? arrow : doubleSpace,
  }

  return placeHolders;
}

function validateColorTypeIndex(colorTypeIndex) {
  if (isNaN(colorTypeIndex) || !colorTypeIndex) {
    throw Error('input is not a number!');
  }
}

function getColorTypeFromIndex(colorTypeIndex) {
  colorTypeIndex = parseInt(colorTypeIndex);
  colorTypeIndex--;
  const colorType = ColorTypes[colorTypeIndex];
  if (!colorType) {
    throw Error('wrong color type informed');
  }
  
  return colorType;
}

function validateColorInput(colorInput, colorType) {
  const validationFunction = validationFunctions[colorType];
  
  console.log(`\n[prompt] validating ${colorInput} with function`);
  console.log(validationFunction);
  
  validationFunction(colorInput);
}

// TODO: check if user wants to output a json file or just graphically
// TODO: REFACTOR ALL THIS SHIT CODE BELOW
function outputAllColorFormats(color) {
  let rgb1Color, rgb255Color, hexColor, hsvColor;

  switch (color.type) {
    case 'RGB1':
      rgb1Color = color;
      rgb255Color = ColorMaker.makeRGB255().fromRGB1(color.r, color.g, color.b);

      hexColor = ColorMaker.makeHEX().fromRGB1(color.r, color.g, color.b);
      break;

    case 'RGB255':
      rgb1Color = ColorMaker.makeRGB1(floatPrecision).fromRGB255(color.r, color.g, color.b);
      rgb255Color = color;

      hexColor = ColorMaker.makeHEX().fromRGB255(color.r, color.g, color.b);
      break;

    case 'HEX':
      rgb1Color = ColorMaker.makeRGB1(floatPrecision).fromHEX(color.hexValue);
      rgb255Color = ColorMaker.makeRGB255().fromHEX(color.hexValue);

      hexColor = color;
      break;

    case 'HSV':
      rgb1Color = ColorMaker.makeRGB1(floatPrecision).fromHSV(color.h, color.s, color.v );
      rgb255Color = ColorMaker.makeRGB255().fromHSV(color.h, color.s, color.v);

      hexColor = ColorMaker.makeHEX().fromHSV(color.h, color.s, color.v);
      break;
      
    default:
      throw Error('color type not found when outputting');
  }

  console.log('\n\n[prompt] output:')

  
  outputAllRgb1(rgb1Color);
  outputAllRgb255(rgb255Color);
  outputAllHex(hexColor);
}

function outputAllRgb1(color) {
  console.log("\nRGB1:")
  outputSingleRGB(color, ' ');
  console.log('or');
  outputSingleRGB(color, ', ');
}

function outputAllRgb255(color) {
  console.log("\nRGB255:")
  outputSingleRGB(color, ' ');
  console.log('or');
  outputSingleRGB(color, ', ');
}

function outputAllHsv(color) {
  console.log("\nHSV:")
  outputSingleHSV(color, ' ');
  console.log('or');
  outputSingleHSV(color, ', ');
}

function outputSingleRGB(color, separator) {
  console.log(`${color.r}${separator}${color.g}${separator}${color.b}`)
}

function outputSingleHSV(color, separator) {
  console.log(`${color.h}${separator}${color.s}${separator}${color.v}`)
}

function outputAllHex(hexColor) {
  console.log("\nHEX:")
  console.log(hexColor.hexValue);
  console.log('or');
  console.log(`#${hexColor.hexValue}`);
}

module.exports = { startConsoleApp };

/* */
