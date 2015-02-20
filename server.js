var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/app/javascript'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
});


app.listen(port, function () {
    console.log('Server listening to port ' + port);
});