const lineFeed = '\n'
const lineBreaksExpression = /\r\n|\r/g

function tokenize(input) {
  return input;
}

function tokenizer(input) {
  let node;
  input = input.replace(lineBreaksExpression, lineFeed);

  if (input.charCodeAt(0) === 0xfeff) {
    input = input.slice(1)
  }

  node = {
    type: 'root',
    children: tokenize(input),
  };

  return node;
}

module.exports = tokenizer;
