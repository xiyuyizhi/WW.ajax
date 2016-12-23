var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  res.send({
    "message":"用户id："+req.params.userId
  });
});
router.post('/',function(req,res,next){

  console.log(req.body)
  res.json({
    'status':'ok'
  })
})

module.exports = router;
