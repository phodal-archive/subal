const tokenizer = require('./src/tokenizer');
const lexer = require('./src/lexer');
const generator = require('./src/generator');

class SubalMd {
  constructor(data) {
    this.data = data;
  }

  lexer() {
    this.ast = lexer(this.data, {
      gfm: true,
      tables: true
    });
    return this;
  };

  tokenizer() {
    this.tokens = tokenizer(this.ast);
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
