var express = require('express');
var router = express.Router();
const path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const multer = require('multer')
var storage = multer.diskStorage({
  destination : function (req,file,cb){
    cb(null,'uploads/');
  },
  filename: function (req, file, cb) {
    var random = Math.random();
    cb(null, random + Date.now() + '-' + file.originalname);
  }
});

const uploadFilter = function(req, file, cb) {
  // filter rules here
  if ( file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .jpg format allowed!'));
  }
}
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024* 1024
  },
  fileFilter: uploadFilter
}).array('avatar',5);
router.get('/upload',function (req,res) {
  res.render('upload',{ message :''})
})
router.post('/uploadfile',function (req,res) {
  upload(req,res,function (err){
    if(err){
      res.render('upload',{ message :err.message})
    }else{
      res.render('upload',{ message :'Tải Thành công'})
    }
  })
})

module.exports = router;
