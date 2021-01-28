const { exit }  = require("process");
const readline  = require("readline");
const { ColorTypes, ColorMaker } = require("../lib/color-factories/color_factories");

const reader = readline.createInterface({ input: process.stdin, output: process.stdout });

const inputColorFormatString = `\n[prompt] select color input format\n
     <format>    |                      <example input>                      |
_________________|___________________________________________________________|
  [1] -> RGB 1   | 0.46, 0.02, 0.96  or  0.46,0.02,0.96  or  0.46 0.02 0.96  |
  [2] -> RGB 255 |    119, 7, 247    or     119,7,247    or     119 7 247    |
  [3] -> HEX     |      #7707F7      or       7707F7                         |
  [4] -> HSV/HSB |   360, 100, 100   or                                      |\n
   `;

const floatPrecision = 2; // TODO: prompt user for float precision on decimals

function askForColor() {
  reader.question(inputColorFormatString, function(colorTypeIndex) {
    validateColorTypeInput(colorTypeIndex);
    
    const colorType = getColorTypeFromIndex(colorTypeIndex);
    
    const inputColorString = `\n[prompt] input color with format ${colorType}\n\n   `
    reader.question(inputColorString, function(input) {
      reader.close();
      const inputColor = sanitizeColorFromInput(colorType, input);

      outputAllColorFormats(inputColor);
    });
  });
}

function validateColorTypeInput(colorTypeIndex) {
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

function sanitizeColorFromInput(type, input) {
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

module.exports = { startConsoleApp: askForColor };

/* */
