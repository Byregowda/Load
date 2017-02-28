var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var app = express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  }
 
});

var upload = multer({ storage : storage}).single('textfile');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
	//console.log("Hello Bengaluru");
	res.send("HEllo sir")
});

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/file-upload', function(req, res) {

upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
})



var port= process.env.port||8000;
app.listen(port,function(){
	console.log("Server running at 8000");
})	

