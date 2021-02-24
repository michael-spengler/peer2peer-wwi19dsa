const http = require("http");
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));
// app.use(bodyParser)
app.use(bodyParser.json())

app.get("/", function (req, res) {
    const pathToHTMLOnServer = './server.html'
    res.sendFile(pathToHTMLOnServer);
});

app.post("/saveDataToServer", function (req, res) {
    console.log(req)
    res.send('asdfsadf')
    // console.log(res)

});


app.listen(3000, function () {
    console.log('listening');
});