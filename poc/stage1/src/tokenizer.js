const tokenTypes = {
  LEFT_BRACE: 0,		// {
  RIGHT_BRACE: 1,		// }
  LEFT_BRACKET: 2,	// [
  RIGHT_BRACKET: 3,	// ]
  COLON: 4,			// :
  COMMA: 5,			// ,
  STRING: 6,			//
  NUMBER: 7,			//
  TRUE: 8,			// true
  FALSE: 9,			// false
  NULL: 10			// null
};

const punctuatorTokensMap = { // Lexeme: Token
  '{': tokenTypes.LEFT_BRACE,
  '}': tokenTypes.RIGHT_BRACE,
  '[': tokenTypes.LEFT_BRACKET,
  ']': tokenTypes.RIGHT_BRACKET,
  ':': tokenTypes.COLON,
  ',': tokenTypes.COMMA
};

function parseChar(char, current) {
  if (char in punctuatorTokensMap) {
    return {
      type: punctuatorTokensMap[char],
      current: current + 1,
      value: null
    };
  }

  return null;
}

function parseKeyword(char, current) {
  return null;
}

function parseString(char, current) {
  return null;
}

function parseNumber(char, current) {
  return null;
}

function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    let matched =
      parseChar(char, current)
      || parseKeyword(char, current)
      || parseString(char, current)
      || parseNumber(char, current);

    if (matched) {
      const token = {
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
