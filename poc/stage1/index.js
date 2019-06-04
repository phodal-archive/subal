const tokenizer = require('./src/tokenizer');
const parser = require('./src/parser');

class Subal {
  constructor(data) {
    this.data = data;
  }

  parser() {
    this.ast = parser(this.tokens);
    return this;
  };

  tokenizer() {
    this.tokens = tokenizer(this.data);
    return this;
  };

  build () {
    return this.ast;
  }
}

module.exports = Subal;
