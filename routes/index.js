var express = require('express');
var swipl = require('swipl');
var fs = require('fs');
var router = express.Router();

swipl.call('working_directory(_,routes)');

router.get('/', function (req, res) {
  let fileNameList = [];
  swipl.call('consult(dlog)');
  fs.readdirSync('./prolog_db').forEach(file => {
    fileNameList.push(file);
  });
  res.render('index', {files: fileNameList});
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
  console.log('im here');
  swipl.call(`unload_file(${fileName})`);
  fs.unlinkSync(path);
  res.redirect(303, '/');
});

module.exports = router;
