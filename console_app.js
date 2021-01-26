const { exit }  = require("process");
const readline  = require("readline");
const { ColorTypes, allFactories } = require("./color_factory.js");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputColorFormatString = `\nselect color input format\n
     <format>    |                      <example input>                      |
_________________|___________________________________________________________|
  [1] -> RGB 1   | 0.46, 0.02, 0.96  or  0.46,0.02,0.96  or  0.46 0.02 0.96  |
  [2] -> RGB 255 |    119, 7, 247    or     119,7,247    or     119 7 247    |
  [3] -> HEX     |      #7707F7      or       7707F7                         |
  [4] -> HSV/HSB |   360, 100, 100   or                                      |\n
   `
;

const floatPrecision = 2;

function inputColorString(formatIndex) {
    return(`\ninput color with format ${ColorTypes[formatIndex]}\n\n   `
  );
} 

function askForColor() {
  reader.question(inputColorFormatString, function(colorTypeIndex) {
    if (isNaN(colorTypeIndex) || !colorTypeIndex) {
     console.log("is not a number!");
     exit();
    }
    
    colorTypeIndex = parseInt(colorTypeIndex);
    colorTypeIndex--;
    const colorType = ColorTypes[colorTypeIndex];
    if (!colorType) {
      console.log('wrong color type informed');
      exit();
    }
    
    reader.question(inputColorString(colorTypeIndex), function(input) {
      reader.close();
      const inputColor = sanitizeColorFromInput(colorType, input);

      outputAllColorFormats(inputColor);
    });
  });
}

function sanitizeColorFromInput(type, input) {
  input = input.trim();
  const color = {};
  color.type = type;

  let asTriplet = function() { console.log(`'asTriplet' has no function assigned`);}

  console.log('\n');
  let splitInput;
  switch (type) {
    case 'RGB1':
    case 'RGB255':
      console.log(`sanitizing ${input} with RGB type`);
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
      
      color.r = splitInput[0];
      color.g = splitInput[1];
      color.b = splitInput[2];  
      asTriplet = function () {
        return [color.r, color.g, color.b];
      }
      break;
      
    case 'HEX':
      console.log(`sanitizing ${input} with HEXADECIMAL type`);
      input.trim();
      if (input.includes('#')) {
        input = input.substr(1, 6);
      }
        
      color.hexValue = input;
      asTriplet = function () {
        return [input.substr(0,2), input.substr(2,2), input.substr(4,2)];
      }
      break;
    
    case 'HSV':
      console.log(`sanitizing ${input} with HSV type`);
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

      color.h = splitInput[0];
      color.s = splitInput[1];
      color.v = splitInput[2];
      asTriplet = function () {
        return [color.h, color.s, color.v];
      }
      break;

    default:
      throw new Error('color type not found when sanitizing')
  }

  color.asTriplet = asTriplet;
  return color;
}

function outputAllColorFormats(color) {
  let rgb1Color;
  let rgb255Color;
  let hexColor;
  let hsvColor;
  switch (color.type) {
    case 'RGB1':
      outputAllRgb1(color);
      break;

    case 'RGB255':
      rgb1Color = allFactories.RGB1(floatPrecision).fromRGB255(color.r, color.g, color.b)
      outputAllRgb1(rgb1Color);

      break;

    case 'HEX':
      rgb1Color = allFactories.RGB1(floatPrecision).fromHEX(color.hexValue);
      outputAllRgb1(rgb1Color);

      break;

    case 'HSV':
      rgb1Color = allFactories.RGB1(floatPrecision).fromHSV(color.h, color.s, color.v );
      outputAllRgb1(rgb1Color);
      break;
      
    default:
      throw new Error('color type not found when outputting');
  }
}

function outputAllRgb1(color) {
  console.log("\nRGB1:")
  outputSingleRGB(color, ' ');
  console.log('or');
  outputSingleRGB(color, ', ');
  console.log("\n\n")
}

function outputSingleRGB(color, separator) {
  console.log(`${color.r}${separator}${color.g}${separator}${color.b}`)
}

module.exports = { askForColor };

/* */
