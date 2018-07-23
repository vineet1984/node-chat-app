var express = require("express");
var path = require("path");
var port = process.env.PORT || 3000;
var app = express();

var publicPath = path.join(__dirname,"..", "public");

app.use(express.static(publicPath));

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});