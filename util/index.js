const mapStringToInt = i => parseInt(i);

export const parseTextInputByNewline = (text = '') => {
  return text.split('\n').map(mapStringToInt);
}

export const parseTextInputByComma = (text = '') => {
  return text.split(',').map(mapStringToInt)
}