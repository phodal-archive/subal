const block = require('./utils/block');

function lexer(src) {
  let cap;
  this.tokens = [];

  src = src.replace(/^ +$/gm, '');
  this.rules = block.normal;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    console.log(this.tokens);
  }

  return this.tokens;
}

module.exports = lexer;
