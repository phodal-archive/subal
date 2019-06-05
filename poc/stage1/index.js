const tokenizer = require('./src/tokenizer');
const parser = require('./src/parser');
const generator = require('./src/generator');

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

  generator(isDebug) {
    if (isDebug) {
      console.log(JSON.stringify(this.ast));
    }
    this.code = generator(this.ast);
    return this;
  };

  build () {
    return this.code;
  }
}

module.exports = Subal;
