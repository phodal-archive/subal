const tokenizer = require('./src/tokenizer');
const lexer = require('./src/lexer');
const generator = require('./src/generator');

class SubalMd {
  constructor(data) {
    this.data = data;
  }

  parser() {
    this.ast = lexer(this.tokens);
    return this;
  };

  tokenizer() {
    this.tokens = tokenizer(this.data);
    return this;
  };

  generator() {
    this.code = generator(this.ast);
    return this;
  };

  build() {
    return this.code;
  }
}

module.exports = SubalMd;
