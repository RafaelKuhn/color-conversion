const { exit }  = require("process");
const readline  = require("readline");
const { ColorTypes, allFactories, RGB1, RGB255, HEX, HSV } = require("./color_factory.js");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputColorFormatString = `\nselect color input format\n
     format           example input
  [1] -> RGB 1    '(0 - 1)'
  [2] -> RGB 255  '(119, 7, 247)' or '119, 7, 247' or '119 7 247'
  [3] -> HEX      '#7707F7' or '7707F7'
  [4] -> HSV      ('100, 100, 100)'\n\n   `;


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
      const color = sanitizeColorFromInput(colorType, input);


      outputAllColorFormats(color);
    });
  });
}

function sanitizeColorFromInput(type, input) {
  input = input.trim();
  const color = {};
  color.type = type;

  let asTriplet = function() { console.log(`'asTriplet' has no function assigned`);}

  switch (type) {
    case 'RGB1':
    case 'RGB255':
      const splitInput = input.split(' ');
      console.log('with RGB type');
      color.r = splitInput[0];
      color.g = splitInput[1];
      color.b = splitInput[2];  
      asTriplet = function () {
        return [color.r, color.g, color.b];
      }
      break;
      
      case 'HEX':
        console.log('with HEXADECIMAL type');
        color.hex = input;
        asTriplet = function () {
          return [input.substr(0,2), input.substr(2,2), input.substr(4,2)];
        }
      break;
    
    case 'HSV':
      console.log('with HSV type');
      console.log('NOT IMPLEMENTED');
      break;

    default:
      console.log('type not detected');
  }
  
  color.asTriplet = asTriplet;
  
  return color;
}

function outputAllColorFormats(color) {
  console.log('\n');
  switch (color.type) {
    case 'RGB1':
      break;

    case 'RGB255':
      break;

    case 'HEX':
      console.log("RGB1:\n")

      allFactories(4).forEach( (factory) => {
        console.log("-> "+ factory);
        factory();
      })

      console.log("\n\n")
      break;

    case 'HSV':
      break;

    default:
      break;
  }
}

function outputRGB(color, separator) {
  console.log(`${color.r}${separator}${color.g}${separator}${color.b}`)
}

module.exports = { askForColor };

/* */
