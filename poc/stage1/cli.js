#!/usr/bin/env node

const fs = require('fs');
const Subal = require('./index');

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
// Read the file and print its contents.
let  filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  let subal = new Subal(data);

  let results = subal
    .tokenizer()
    .parser()
    .generator()
    .renderString();

  console.log(results);
});
