var express = require('express');
const swipl = require('swipl');
var router = express.Router();

router.get('/',function (req,res) {
  res.render('index');
});



/* GET home page. */
router.get('/result', function(req, res) {
  let userInput = req.query.dlogQuery;

  console.log(userInput);
  const ret = swipl.call('member(X, [1,2,3,4])');
  if (ret) {
    console.log(`Variable X value is: ${ret.X}`);
  } else {
    console.log('Call failed.');
  }

  swipl.call('working_directory(_,routes)');

  swipl.call('consult(dlog)');
  swipl.call('consult(exmp01)');
  swipl.call('consult(exmp02)');
  swipl.call('consult(exmp03)');

  //swipl.call('retractall(X)');

  let result = swipl.call(userInput);

  res.render('result', { title: result.X });
});

module.exports = router;
