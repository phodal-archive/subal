/*
 * Based on [https://github.com/vtrushin/json-to-ast](https://github.com/vtrushin/json-to-ast)
 * MIT Copyright (C) 2016 by Vlad Trushin
 */

const {
  PUNCTUATOR_TOKENS_MAP,
  KEYWORD_TOKENS_MAP,
  PUNCTUATOR_TOKENS_MAP_STR,
  TOKEN_TYPES,
  TOKEN_TYPES_STR,
  NUMBER_STATES,
  STRING_STATES,
  ESCAPES_SYMBOL
} = require('./utils/constants');

// HELPERS

function isDigit1to9(char) {
  return char >= '1' && char <= '9';
}

function isDigit(char) {
  return char >= '0' && char <= '9';
}

function isHex(char) {
  return (
    isDigit(char)
    || (char >= 'a' && char <= 'f')
    || (char >= 'A' && char <= 'F')
  );
}

function isExp(char) {
  return char === 'e' || char === 'E';
}

function parseChar(char, current) {
  if (char in PUNCTUATOR_TOKENS_MAP) {
    return {
      type: PUNCTUATOR_TOKENS_MAP[char],
      type_str: PUNCTUATOR_TOKENS_MAP_STR[char],
      current: current + 1,
      value: null
    };
  }

  return null;
}

function parseKeyword(char, current) {
  for (const name in KEYWORD_TOKENS_MAP) {
    if (KEYWORD_TOKENS_MAP.hasOwnProperty(name) && char.substr(current, name.length) === name) {
      return {
        type: KEYWORD_TOKENS_MAP[name],
        type_str: PUNCTUATOR_TOKENS_MAP_STR[char],
        current: current + name.length,
        value: name
      };
    }
  }

  return null;
}

function parseString(input, index) {
  const startIndex = index;
  let buffer = '';
  let state = STRING_STATES._START_;

  while (index < input.length) {
    const char = input.charAt(index);

    switch (state) {
      case STRING_STATES._START_: {
        if (char === '"') {
          index++;
          state = STRING_STATES.START_QUOTE_OR_CHAR;
        } else {
          return null;
        }
        break;
      }

      case STRING_STATES.START_QUOTE_OR_CHAR: {
        if (char === '\\') {
          buffer += char;
          index++;
          state = STRING_STATES.ESCAPE;
        } else if (char === '"') {
          index++;
          return {
            type_str: TOKEN_TYPES_STR.STRING,
            type: TOKEN_TYPES.STRING,
            current: index,
            value: input.slice(startIndex, index)
          };
        } else {
          buffer += char;
          index++;
        }
        break;
      }

      case STRING_STATES.ESCAPE: {
        if (char in ESCAPES_SYMBOL) {
          buffer += char;
          index++;
          if (char === 'u') {
            for (let i = 0; i < 4; i++) {
              const curChar = input.charAt(index);
              if (curChar && isHex(curChar)) {
                buffer += curChar;
                index++;
              } else {
                return null;
              }
            }
          }
          state = STRING_STATES.START_QUOTE_OR_CHAR;
        } else {
          return null;
        }
        break;
      }
    }
  }
}

function parseNumber(input, index) {
  const startIndex = index;
  let passedValueIndex = index;
  let state = NUMBER_STATES._START_;

  iterator: while (index < input.length) {
    const char = input.charAt(index);

    switch (state) {
      case NUMBER_STATES._START_: {
        if (char === '-') {
          state = NUMBER_STATES.MINUS;
        } else if (char === '0') {
          passedValueIndex = index + 1;
          state = NUMBER_STATES.ZERO;
        } else if (isDigit1to9(char)) {
          passedValueIndex = index + 1;
          state = NUMBER_STATES.DIGIT;
        } else {
          return null;
        }
        break;
      }

      case NUMBER_STATES.MINUS: {
        if (char === '0') {
          passedValueIndex = index + 1;
          state = NUMBER_STATES.ZERO;
        } else if (isDigit1to9(char)) {
          passedValueIndex = index + 1;
          state = NUMBER_STATES.DIGIT;
        } else {
          return null;
        }
        break;
      }

      case NUMBER_STATES.ZERO: {
        if (char === '.') {
          state = NUMBER_STATES.POINT;
        } else if (isExp(char)) {
          state = NUMBER_STATES.EXP;
        } else {
          break iterator;
        }
        break;
      }

      case NUMBER_STATES.DIGIT: {
        if (isDigit(char)) {
          passedValueIndex = index + 1;
        } else if (char === '.') {
          state = NUMBER_STATES.POINT;
        } else if (isExp(char)) {
          state = NUMBER_STATES.EXP;
        } else {
          break iterator;
        }
        break;
      }

      case NUMBER_STATES.POINT: {
        if (isDigit(char)) {
          passedValueIndex = index + 1;
          state = NUMBER_STATES.DIGIT_FRACTION;
        } else {
          break iterator;
        }
        break;
      }

      case NUMBER_STATES.DIGIT_FRACTION: {
        if (isDigit(char)) {
          passedValueIndex = index + 1;
        } else if (isExp(char)) {
          state = NUMBER_STATES.EXP;
        } else {
          break iterator;
        }
        break;
      }

      case NUMBER_STATES.EXP: {
        if (char === '+' || char === '-') {
          state = NUMBER_STATES.EXP_DIGIT_OR_SIGN;
        } else if (isDigit(char)) {
          passedValueIndex = index + 1;
          state = NUMBER_STATES.EXP_DIGIT_OR_SIGN;
        } else {
          break iterator;
        }
        break;
      }

      case NUMBER_STATES.EXP_DIGIT_OR_SIGN: {
        if (isDigit(char)) {
          passedValueIndex = index + 1;
        } else {
          break iterator;
        }
        break;
      }
    }

    index++;
  }

  if (passedValueIndex > 0) {
    return {
      type: TOKEN_TYPES.NUMBER,
      type_str: TOKEN_TYPES_STR.NUMBER,
      current: passedValueIndex,
      value: input.slice(startIndex, passedValueIndex)
    };
  }

  return null;
}


function parseWhitespace(input, index) {
  const char = input.charAt(index);

  if (char === '\r') { // CR (Unix)
    index++;
    if (input.charAt(index) === '\n') { // CRLF (Windows)
      index++;
    }
  } else if (char === '\n') { // LF (MacOS)
    index++;
  } else if (char === '\t' || char === ' ') {
    index++;
  } else {
    return null;
  }

  return {
    current: index
  };
}

function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    const whitespace = parseWhitespace(input, current);

    if (whitespace) {
      current = whitespace.current;
      continue;
    }

    let matched =
      parseChar(char, current)
      || parseKeyword(input, current)
      || parseString(input, current)
      || parseNumber(input, current);

    if (matched) {
      const token = {
        type_str: matched.type_str,
        type: matched.type,
        value: matched.value
      };

      tokens.push(token);
      current = matched.current;
    } else {
      current++;
    }
  }

  return tokens;
}

module.exports = tokenizer;
