const readline  = require("readline-sync");
const validator = require('../lib/utils/input-validator');
const sanitizer = require('../lib/utils/input-sanitizer');

const { ColorTypes, ColorMaker } = require("../lib/color-factories/color_factories");

const floatPrecision = 2; // TODO: prompt user for float precision on decimals

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


function startConsoleApp() {
  const colorType = askForColorType();

  const colorInput = askForColorInput(colorType);

  const sanitizedColor = sanitizeColorInput(colorInput, colorType);

  outputAllColorFormats(sanitizedColor)

  /*
  reader.question(inputColorFormatString, function(colorTypeIndex) {
    validateColorTypeInput(colorTypeIndex);
    
    const colorType = getColorTypeFromIndex(colorTypeIndex);
    
    const inputColorString = `\n[prompt] input color with format ${colorType}\n\n   `
    reader.question(inputColorString, function(input) {
      reader.close();
      const inputColor = sanitizeColorFromInput(colorType, input);

      outputAllColorFormats(inputColor);
    });
  }); /* */
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

function validateColorInput(colorInput, colorType) {
  const validationFunction = validationFunctions[colorType];
  
  console.log(`\n[prompt] validating ${colorInput} with function`);
  console.log(validationFunction);
  
  validationFunction(colorInput);
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

function sanitizeColorInput(rawColor, colorType) {
  const sanitizationFunction = sanitizationFunctions[colorType];
  
  console.log(`\n[prompt] sanitizing ${rawColor} with function`);
  console.log(sanitizationFunction);

  /* refactor this */ return sanitizeColorFromInput(rawColor, colorType);
  return sanitizationFunction();
}

// REFACTOR BELOW
function sanitizeColorFromInput(input, type) {
  console.log('\n');
  console.log(`[prompt] sanitizing ${input} with ${type} type\n`);
  
  let colorObject = { type };
  switch (type) {
    case 'RGB1':
    case 'RGB255':
      const rgbSanitized = sanitizeRGB(input);
      colorObject = { ...colorObject, ...rgbSanitized };
      break;
      
    case 'HEX':
      const hexSanitized = sanitizeHex(input);
      colorObject = { ...colorObject, ...hexSanitized };
      
      break;
    
    case 'HSV':
      input.trim();
      if (input.includes(', ')) {
        splitInput =  input.split(', ');
      } else if (input.includes(',')) {
        splitInput =  input.split(',');
      } else if (input.includes(' ')) {
        splitInput =  input.split(' ');
      } else {
        console.log(`input ${input} does not contain separators <, > <,> or < >`);
      }

      colorObject.h = splitInput[0];
      colorObject.s = splitInput[1];
      colorObject.v = splitInput[2];
      break;

    default:
      throw new Error('color type not found when sanitizing')
  }

  console.log(colorObject);
  return colorObject;
}
// REFACTOR ABOVE

function sanitizeRGB(input) {
  input.trim();
  let splitInput;
  if (input.includes(', ')) {
    splitInput =  input.split(', ');
  } else if (input.includes(',')) {
    splitInput =  input.split(',');
  } else if (input.includes(' ')) {
    splitInput =  input.split(' ');
  } else {
    console.log(`input ${input} does not contain separators <, > <,> or < >`);
  }
  
  let r = splitInput[0];
  let g = splitInput[1];
  let b = splitInput[2];

  return {r, g, b};
}

function sanitizeHex(input) {
  input.trim();
  
  if (input.includes(' ')) {
    throw new Error('spaces not allowed in hexadecimal color format');
  }

  let hexValue;
  if (input.includes('#')) {
    hexValue = getHexValueWithHash(input);
  } else {
    hexValue = getHexValueWithoutHash(input);
  }

  return { hexValue }
}

function getHexValueWithHash(input) {
  maxLength = 7;
  if (input.length < maxLength) {
    throw new Error('input is too small for hexadecimal format');
  }
  if (input.length > maxLength) {
    throw new Error('input is too big for hexadecimal format');
  }

  input = input.substr(1, 6);
  checkIfMatchesHexRegex(input);
  
  return input;
}

function getHexValueWithoutHash(input) {
  const maxLength = 6;
  if (input.length < maxLength) {
    throw new Error('input is too small for hexadecimal format');
  }
  if (input.length > maxLength) {
    throw new Error('input is too big for hexadecimal format');
  }

  checkIfMatchesHexRegex(input);

  return input;
}

function checkIfMatchesHexRegex(input) {
  const hexRegex = /^[0-9a-fA-F]+/;
  
  if (!hexRegex.test(input)) {
    throw new Error('input has invalid characters');
  }
} // TODO this and all 'sanitizers' must be inside commons and be checked every hex conversion

function outputAllColorFormats(color) {
  let rgb1Color, rgb255Color, hexColor, hsvColor;

  switch (color.type) {
    case 'RGB1':
      rgb1Color = color;
      
      hexColor = ColorMaker.makeHEX().fromRGB1(color.r, color.g, color.b);
      break;

    case 'RGB255':
      rgb1Color = ColorMaker.makeRGB1(floatPrecision).fromRGB255(color.r, color.g, color.b);
      
      hexColor = ColorMaker.makeHEX().fromRGB255(color.r, color.g, color.b);
      break;

    case 'HEX':
      rgb1Color = ColorMaker.makeRGB1(floatPrecision).fromHEX(color.hexValue);

      hexColor = color;
      break;

    case 'HSV':
      rgb1Color = ColorMaker.makeRGB1(floatPrecision).fromHSV(color.h, color.s, color.v );
      
      hexColor = ColorMaker.makeHEX().fromHSV(color.h, color.s, color.v);
      break;
      
    default:
      throw new Error('color type not found when outputting');
  }

  console.log('\n\n[prompt] output:')
  // TODO: check if user wants to output a json file or just graphically
  outputAllRgb1(rgb1Color);
  outputAllHex(hexColor)
}

function outputAllRgb1(color) {
  console.log("\nRGB1:")
  outputSingleRGB(color, ' ');
  console.log('or');
  outputSingleRGB(color, ', ');
}

function outputSingleRGB(color, separator) {
  console.log(`${color.r}${separator}${color.g}${separator}${color.b}`)
}

function outputAllHex(hexColor) {
  console.log("\nHEX:")
  console.log(hexColor.hexValue);
  console.log('or');
  console.log(`#${hexColor.hexValue}`);
}

module.exports = { startConsoleApp };

/* */
