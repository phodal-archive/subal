const tokenizer = require('./src/tokenizer');
const parser = require('./src/parser');
const generator = require('./src/generator-obj');

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

  build() {
    return this.code;
  }

  renderString() {
    console.log(`interface HeimdallGenerator {\n ${this.code.current} }\n`);
    for (let i = 0; i < this.code.childNodes.length; i++) {
      console.log(this.code.childNodes[i]);
    }

    return this;
  }
}

module.exports = Subal;
