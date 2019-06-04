/*
 * Based on [https://github.com/vtrushin/json-to-ast](https://github.com/vtrushin/json-to-ast)
 * MIT Copyright (C) 2016 by Vlad Trushin
 */

const constants = require('./constants');

const PUNCTUATOR_TOKENS_MAP = constants.PUNCTUATOR_TOKENS_MAP;
const PUNCTUATOR_TOKENS_MAP_STR = constants.PUNCTUATOR_TOKENS_MAP_STR;
const KEYWORD_TOKENS_MAP = constants.KEYWORD_TOKENS_MAP;

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

function parseString(char, current) {
  return null;
}

function parseNumber(char, current) {
  return null;
}


function parseWhitespace(input, index) {
  const char = input.charAt(index);

  if (char === '\r') { // CR (Unix)
    index ++;
    if (input.charAt(index) === '\n') { // CRLF (Windows)
      index ++;
    }
  } else if (char === '\n') { // LF (MacOS)
    index ++;
  } else if (char === '\t' || char === ' ') {
    index ++;
  } else {
    return null;
  }

  return {
    index
  };
}

function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    const whitespace = parseWhitespace(char, current);

    if (whitespace) {
      current = whitespace.current;
      continue;
    }

    let matched =
      parseChar(char, current)
      || parseKeyword(char, current)
      || parseString(char, current)
      || parseNumber(char, current);

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
