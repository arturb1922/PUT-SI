var express = require('express');
const swipl = require('swipl');
const fs = require('fs');
var router = express.Router();

swipl.call('working_directory(_,routes)');

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/result', function (req, res) {
  let userInput = req.query.dlogQuery;

  swipl.call('consult(dlog)');

  fs.readdirSync('./prolog_db').forEach(file => {
    let fileName = 'prolog_db/' + file;
    swipl.call(`consult(\'${fileName}\')`);
  });


  // let fileName1 = 'prolog_db/exmp01.pl';
  // let fileName2 = 'prolog_db/exmp02.pl';

  // swipl.call(`consult(\'${fileName1}\')`);
  // swipl.call(`consult(\'${fileName2}\')`);

  let result = swipl.call(userInput);

  res.render('result', { title: result.X });
});


module.exports = router;
