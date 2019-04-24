'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({storage: storage});

app.post('/api/fileanalyse', upload.single('upfile'), analyse);
function analyse(req, res, next) {
  const f = req.file;
  
  if (!f) {
    res.send('No file sent');
    return;
  }
  
  res.json({
    name: f.originalname,
    type: f.mimetype,
    size: f.size
  });
}

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
