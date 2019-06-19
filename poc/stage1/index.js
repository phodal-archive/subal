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

  generator() {
    this.code = generator(this.ast);
    return this;
  };

  build() {
    return this.code;
  }

  renderString(rootName) {
    let renderString = '';

    renderString += `interface ${rootName} {\n`;
    let mainNodeKey = Object.keys(this.code.currentObject);
    for (let k = 0; k < mainNodeKey.length; k++) {
      let subNodeKey = mainNodeKey[k];

      renderString += `  ${subNodeKey}: ${this.code.currentObject[subNodeKey]};\n`
    }
    renderString += `}\n\n`;

    let nodeKeys = Object.keys(this.code.childObjects);
    for (let i = 0; i < nodeKeys.length; i++) {
      let nodeKey = nodeKeys[i];
      let nodeValue = this.code.childObjects[nodeKey];

      renderString += `interface ${nodeKey} {\n`;

      let subNodeKeys = Object.keys(nodeValue);
      for (let j = 0; j < subNodeKeys.length; j++) {
        let subNodeKey = subNodeKeys[j];

        renderString += `  ${subNodeKey}: ${nodeValue[subNodeKey]};\n`
      }

      renderString += `}\n\n`;
    }

    return renderString;
  }
}

module.exports = Subal;
