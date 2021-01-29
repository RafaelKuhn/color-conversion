// TODO: perhaps transform this into a factory, with 'validate' being the main function and 'asRgb1' for example being a sub function

function validateRgb1(rawInput) {
  validateColorWithSeparators(rawInput);

}

function validateRgb255(rawInput) {
  validateColorWithSeparators(rawInput);

}

function validateHex(rawInput) {
  validateHexString(rawInput);

}

function validateHsv(rawInput) {
  validateColorWithSeparators(rawInput);

}

function validateColorWithSeparators(rawColor) {
  rawColor.trim();
  const hasValidRgbSeparator = input.includes(', ') || input.includes(',') || input.includes(' ');
  
  if (!hasValidRgbSeparator) {
    throw Error('input does not contain valid rgb separator ", " "," or " " between values');
  }
}

function validateHexString(hexString) {
  hexString.trim();
  if (hexString.startsWith('#')) {
    validateHexWithHash(hexString);
    hexString = hexString.substr(1, 6);
  } else {
    validateHexWithoutHash(hexString);
  }

  validateHexCharacters(hexString);
}

function validateHexWithHash(hexString) {
  maxLength = 7;
  if (hexString.length < maxLength) {
    throw Error('input is too small for hexadecimal format');
  } else if (hexString.length > maxLength) {
    throw Error('input is too big for hexadecimal format');
  }
}
function validateHexWithoutHash(hexString) {
  const maxLength = 6;
  if (hexString.length < maxLength) {
    throw Error('input is too small for hexadecimal format');
  } else if (hexString.length > maxLength) {
    throw Error('input is too big for hexadecimal format');
  }
}

function validateHexCharacters(input) {
  const hexRegex = /^[0-9a-fA-F]+/;
  
  if (!hexRegex.test(input)) {
    console.log('deu ruim irmao');
    throw Error('input has invalid characters');
  } else { console.log('ué passou mano')}
}

module.exports = {
  validateRgb1,
  validateRgb255,
  validateHex,
  validateHsv
}