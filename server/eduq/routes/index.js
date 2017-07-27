var express = require('express');
var router = express.Router();

/* GET . */
router.get('/auth', function(req, res) {
  req.getConnection(function(err,connection){
        connection.query('SELECT * FROM auth_professor',[],function(err,result){
            if(err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
  });
});

module.exports = router;