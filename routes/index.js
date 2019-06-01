var express = require('express');
var swipl = require('swipl');
var fs = require('fs');
var router = express.Router();
const readline = require('readline');



swipl.call('working_directory(_,routes)');

router.get('/', function (req, res) {
  let fileNameList = [];
  swipl.call('consult(dlog)');
  fs.readdirSync('./prolog_db').forEach(file => {
    fileNameList.push(file);
  });
  res.render('index', { files: fileNameList });
});

router.get('/result', function (req, res) {
  let userInput = req.query.dlogQuery;
  fs.readdirSync('./prolog_db').forEach(file => {
    let fileName = 'prolog_db/' + file;
    swipl.call(`consult(\'${fileName}\')`);
  });
  let result = swipl.call(userInput);
  console.log(result);
  res.render('result', { X: result.X, Y: result.Y });
});

router.delete('/deleteFile/:name', (req, res, next) => {
  const fileName = req.params.name;
  const path = './prolog_db/'.concat(fileName);

  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    console: false
  });

  let regex = /^-?([a-z][a-zA-Z]+)\(([A-Z,]*)\)/gm

  readInterface.on('line', function (line) {
    let result = regex.exec(line);
    if (result != null) {
      let tuple = {
        name: result[1],
        arity: (result[2].match(/,/g) || []).length + 1
      }
      swipl.call(`abolish(${tuple.name}/${tuple.arity})`);
    }
  });

  fs.unlinkSync(path);
  res.redirect(303, '/');
});

module.exports = router;
