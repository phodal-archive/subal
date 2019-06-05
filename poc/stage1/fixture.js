const fs = require('fs');
const path = require('path');
const Subal = require('./index');

const filePath = path.join(__dirname, 'fixture/blogs.json');

fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
  if (!err) {
    let subal = new Subal(data);

    console.log(subal.tokenizer().tokens);

    let results = subal
      .tokenizer()
      .parser()
      .build();

    console.log(JSON.stringify(results));
  } else {
    console.log(err);
  }
});
