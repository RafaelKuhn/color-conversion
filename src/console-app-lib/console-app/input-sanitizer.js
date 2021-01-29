// TODO: perhaps transform this into a factory, with 'sanitize' being the main function and 'asRgb1' for example being a sub function

function sanitizeRgb1(rawInput) {
  const rgbSanitized = sanitizeAnyRgb(rawInput);
  

}

function sanitizeRgb255(rawInput) {
  const rgbSanitized = sanitizeAnyRgb(rawInput);
  
}

function sanitizeHex(rawInput) {
  input.trim();
  let hexValue;
  if (input.startsWith('#')) {
    hexValue = rawInput.substr(1,6);
  } else {
    hexValue = rawInput.substr(0, 6);
  }
  return { hexValue }
}

function sanitizeHsv(rawInput) {

}

function sanitizeAnyRgb(rgbRawInput) {
  input.trim();
  let splitInput;
  if (input.includes(', ')) {
    splitInput = input.split(', ');
  } else if (input.includes(',')) {
    splitInput = input.split(',');
  } else if (input.includes(' ')) {
    splitInput = input.split(' ');
  } else {
    throw Error(`input ${input} does not contain separators <, > <,> or < >`);
  }
  
  let r = splitInput[0];
  let g = splitInput[1];
  let b = splitInput[2];

  return {r, g, b};
}

module.exports = {
  sanitizeRgb1,
  sanitizeRgb255,
  sanitizeHex,
  sanitizeHsv
}