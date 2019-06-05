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
} = require('./constants');


const escapes = {
  'b': '\b',	// Backspace
  'f': '\f',	// Form feed
  'n': '\n',	// New line
  'r': '\r',	// Carriage return
  't': '\t'	// Horizontal tab
};

const passEscapes = ['"', '\\', '/'];

const OBJECT_STATES = {
  _START_: 0,
  OPEN_OBJECT: 1,
  PROPERTY: 2,
  COMMA: 3
};

const PROPERTY_STATES = {
  _START_: 0,
  KEY: 1,
  COLON: 2
};

/** @param hexCode {string} hexCode without '\u' prefix */
function parseHexEscape(hexCode) {
  let charCode = 0;

  for (let i = 0; i < 4; i++) {
    charCode = charCode * 16 + parseInt(hexCode[i], 16);
  }

  return String.fromCharCode(charCode);
}


function parseProperty(tokenList, index) {
  // property: STRING COLON value
  let startToken;
  const property = {
    type: 'Property',
    key: null,
    value: null
  };
  let state = PROPERTY_STATES._START_;

  while (index < tokenList.length) {
    const token = tokenList[index];

    switch (state) {
      case PROPERTY_STATES._START_: {
        if (token.type === TOKEN_TYPES.STRING) {
          const key = {
            type: 'Identifier',
            value: token.value,
            raw: token.value
          };
          startToken = token;
          property.key = key;
          state = PROPERTY_STATES.KEY;
          index ++;
        } else {
          return null;
        }
        break;
      }

      case PROPERTY_STATES.KEY: {
        if (token.type === TOKEN_TYPES.COLON) {
          state = PROPERTY_STATES.COLON;
          index ++;
        }
        break;
      }

      case PROPERTY_STATES.COLON: {
        const value = parseValue(tokenList, index);
        property.value = value.value;
        return {
          value: property,
          index: value.index
        };
      }

    }
  }
}

function parseString(/** string */string) {
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const char = string.charAt(i);

    if (char === '\\') {
      i++;
      const nextChar = string.charAt(i);
      if (nextChar === 'u') {
        result += parseHexEscape(string.substr(i + 1, 4));
        i += 4;
      } else if (passEscapes.indexOf(nextChar) !== -1) {
        result += nextChar;
      } else if (nextChar in escapes) {
        result += escapes[nextChar];
      } else {
        break;
      }
    } else {
      result += char;
    }
  }
  return result;
}

function parseLiteral(tokenList, index) {
  const token = tokenList[index];
  let value = null;

  switch (token.type) {
    case TOKEN_TYPES.STRING: {
      value = token.value;
      break;
    }
    case TOKEN_TYPES.NUMBER: {
      value = Number(token.value);
      break;
    }
    case TOKEN_TYPES.TRUE: {
      value = true;
      break;
    }
    case TOKEN_TYPES.FALSE: {
      value = false;
      break;
    }
    case TOKEN_TYPES.NULL: {
      value = null;
      break;
    }
    default: {
      return null;
    }
  }

  const literal = {
    type: 'Literal',
    value,
    raw: token.value
  };

  return {
    value: literal,
    index: index + 1
  }
}

function parseObject(tokenList, index) {
  let startToken;
  const object = {
    type: 'Object',
    children: []
  };
  let state = OBJECT_STATES._START_;

  while (index < tokenList.length) {
    const token = tokenList[index];

    switch (state) {
      case OBJECT_STATES._START_: {
        if (token.type === TOKEN_TYPES.LEFT_BRACE) {
          startToken = token;
          state = OBJECT_STATES.OPEN_OBJECT;
          index ++;
        } else {
          return null;
        }
        break;
      }

      case OBJECT_STATES.OPEN_OBJECT: {
        if (token.type === TOKEN_TYPES.RIGHT_BRACE) {
          return {
            value: object,
            index: index + 1
          };
        } else {
          const property = parseProperty(tokenList, index);
          object.children.push(property.value);
          state = OBJECT_STATES.PROPERTY;
          index = property.index;
        }
        break;
      }

      case OBJECT_STATES.PROPERTY: {
        if (token.type === TOKEN_TYPES.RIGHT_BRACE) {
          return {
            value: object,
            index: index + 1
          };
        } else if (token.type === TOKEN_TYPES.COMMA) {
          state = OBJECT_STATES.COMMA;
          index ++;
        }
        break;
      }

      case OBJECT_STATES.COMMA: {
        const property = parseProperty(tokenList, index);
        if (property) {
          index = property.index;
          object.children.push(property.value);
          state = OBJECT_STATES.PROPERTY;
        }
        break;
      }
    }
  }
}

const ARRAY_STATES = {
  _START_: 0,
  OPEN_ARRAY: 1,
  VALUE: 2,
  COMMA: 3
};

function parseArray(tokenList, index) {
  // array: LEFT_BRACKET (value (COMMA value)*)? RIGHT_BRACKET
  let startToken;
  const array = {
    type: 'Array',
    children: []
  };
  let state = ARRAY_STATES._START_;
  let token;

  while (index < tokenList.length) {
    token = tokenList[index];

    switch (state) {
      case ARRAY_STATES._START_: {
        if (token.type === TOKEN_TYPES.LEFT_BRACKET) {
          startToken = token;
          state = ARRAY_STATES.OPEN_ARRAY;
          index++;
        } else {
          return null;
        }
        break;
      }

      case ARRAY_STATES.OPEN_ARRAY: {
        if (token.type === TOKEN_TYPES.RIGHT_BRACKET) {
          return {
            value: array,
            index: index + 1
          };
        } else {
          const value = parseValue(tokenList, index);
          index = value.index;
          array.children.push(value.value);
          state = ARRAY_STATES.VALUE;
        }
        break;
      }

      case ARRAY_STATES.VALUE: {
        if (token.type === TOKEN_TYPES.RIGHT_BRACKET) {
          return {
            value: array,
            index: index + 1
          };
        } else if (token.type === TOKEN_TYPES.COMMA) {
          state = ARRAY_STATES.COMMA;
          index++;
        }
        break;
      }

      case ARRAY_STATES.COMMA: {
        const value = parseValue(tokenList, index);
        index = value.index;
        array.children.push(value.value);
        state = ARRAY_STATES.VALUE;
        break;
      }
    }
  }
}

function parseValue(tokenList, index) {
  let value = (
    parseLiteral(tokenList, index)
    || parseObject(tokenList, index)
    || parseArray(tokenList, index)
  );

  if (value !== undefined || value !== null) {
    return value;
  }
}

function parser(tokens) {
  return parseValue(tokens, 0).value;
}

module.exports = parser;
