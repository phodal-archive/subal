const TOKEN_TYPES = {
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

const TOKEN_TYPES_STR = {
  LEFT_BRACE: 'LEFT_BRACE',		// {
  RIGHT_BRACE: 'RIGHT_BRACE',		// }
  LEFT_BRACKET: 'LEFT_BRACKET',	// [
  RIGHT_BRACKET: 'RIGHT_BRACKET',	// ]
  COLON: 'COLON',			// :
  COMMA: 'COMMA',			// ,
  STRING: 'STRING',			//
  NUMBER: 'NUMBER',			//
  TRUE: 'TRUE',			// true
  FALSE: 'FALSE',			// false
  NULL: 'NULL'			// null
};

const PUNCTUATOR_TOKENS_MAP = { // Lexeme: Token
  '{': TOKEN_TYPES.LEFT_BRACE,
  '}': TOKEN_TYPES.RIGHT_BRACE,
  '[': TOKEN_TYPES.LEFT_BRACKET,
  ']': TOKEN_TYPES.RIGHT_BRACKET,
  ':': TOKEN_TYPES.COLON,
  ',': TOKEN_TYPES.COMMA
};

const PUNCTUATOR_TOKENS_MAP_STR = { // Lexeme: Token
  '{': TOKEN_TYPES_STR.LEFT_BRACE,
  '}': TOKEN_TYPES_STR.RIGHT_BRACE,
  '[': TOKEN_TYPES_STR.LEFT_BRACKET,
  ']': TOKEN_TYPES_STR.RIGHT_BRACKET,
  ':': TOKEN_TYPES_STR.COLON,
  ',': TOKEN_TYPES_STR.COMMA
};

const KEYWORD_TOKENS_MAP = { // Lexeme: Token
  'true': TOKEN_TYPES.TRUE,
  'false': TOKEN_TYPES.FALSE,
  'null': TOKEN_TYPES.NULL
};

const NUMBER_STATES = {
  _START_: 0,
  MINUS: 1,
  ZERO: 2,
  DIGIT: 3,
  POINT: 4,
  DIGIT_FRACTION: 5,
  EXP: 6,
  EXP_DIGIT_OR_SIGN: 7
};

const STRING_STATES = {
  _START_: 0,
  START_QUOTE_OR_CHAR: 1,
  ESCAPE: 2
};

const ESCAPES_SYMBOL = {
  '"': 0,		// Quotation mask
  '\\': 1,	// Reverse solidus
  '/': 2,		// Solidus
  'b': 3,		// Backspace
  'f': 4,		// Form feed
  'n': 5,		// New line
  'r': 6,		// Carriage return
  't': 7,		// Horizontal tab
  'u': 8		// 4 hexadecimal digits
};

module.exports = {
  PUNCTUATOR_TOKENS_MAP,
  KEYWORD_TOKENS_MAP,
  PUNCTUATOR_TOKENS_MAP_STR,
  TOKEN_TYPES,
  TOKEN_TYPES_STR,
  NUMBER_STATES,
  STRING_STATES,
  ESCAPES_SYMBOL
};
