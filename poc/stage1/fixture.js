var fs = require('fs');
var path = require('path');
var tokenizer = require('./src/tokenizer');

var filePath = path.join(__dirname, 'fixture/blogs.json');

fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
  if (!err) {
    tokenizer(data)
  } else {
    console.log(err);
  }
});
