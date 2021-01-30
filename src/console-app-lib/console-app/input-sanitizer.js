// TODO: perhaps transform this into a factory, with 'sanitize' being the main function and 'asRgb1' for example being a sub function

function sanitizeRgb1(rawInput) {
  const rgbSanitized = sanitizeAnyRgb(rawInput);
  
  return { type: 'RGB1', ...rgbSanitized };
}

function sanitizeRgb255(rawInput) {
  const rgbSanitized = sanitizeAnyRgb(rawInput);
  
  return { type: 'RGB255', ...rgbSanitized };
}

function sanitizeHex(rawInput) {
  const trimmedInput = rawInput.trim();
  let hexValue;
  if (trimmedInput.startsWith('#')) {
    hexValue = trimmedInput.substr(1, 6);
  } else {
    hexValue = trimmedInput.substr(0, 6);
  }
  return { type: 'HEX', hexValue }
}

function sanitizeHsv(rawInput) {
  const trimmedInput = getSplitArrayOfNumbers(rawInput);

  const h = trimmedInput[0];
  const s = trimmedInput[1];
  const v = trimmedInput[2];

  return {  type: 'HSV', h, s, v };
}

function sanitizeAnyRgb(rgbRawInput) {
  const trimmedInput = rgbRawInput.trim();
  let splitInput = getSplitArrayOfNumbers(trimmedInput);

  const r = splitInput[0];
  const g = splitInput[1];
  const b = splitInput[2];

  return {r, g, b};
}

function getSplitArrayOfNumbers(rgbRawInput) {
  let splitInput;
  if (rgbRawInput.includes(', ')) {
    splitInput = rgbRawInput.split(', ');
  } else if (rgbRawInput.includes(',')) {
    splitInput = rgbRawInput.split(',');
  } else if (rgbRawInput.includes(' ')) {
    splitInput = rgbRawInput.split(' ');
  }

  splitInput = splitInput.map( (stringElement) => { 
    return Number(stringElement);
  });

  return splitInput;
}

module.exports = {
  sanitizeRgb1,
  sanitizeRgb255,
  sanitizeHex,
  sanitizeHsv
}