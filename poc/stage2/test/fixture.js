const fs = require('fs');
const path = require('path');
const Subal = require('../index');

const filePath = path.join(__dirname, 'basic.md');

fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
  if (!err) {
    let subal = new Subal(data);

    let results = subal
      .lexer()
      .tokenizer()
      .generator();
    // console.log(results);
  } else {
    console.log(err);
  }
});
