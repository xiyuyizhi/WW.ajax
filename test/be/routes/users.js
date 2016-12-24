var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userId', function(req, res, next) {

  setTimeout(function(){
    res.send({
      "message":"用户id："+req.params.userId
    });
  },2000)
});
router.post('/',function(req,res,next){

  console.log(req.body)
  setTimeout(function(){
    res.send({
      'status':"ok"
    });
  },3000)
})

module.exports = router;
