var express = require("express");
var http = require("http");
var path = require("path");
var socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");

var publicPath = path.join(__dirname,"..", "public");
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.emit("newMessage", generateMessage("Admin", "Welcome to chat app"));

	socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));	

	socket.on("createMessage", (message, callback) => {
		io.emit("newMessage", generateMessage(message.from, message.text));
		callback("");
	});

	socket.on("createLocationMessage", (coords) => {
		io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log("User was Disconnected");
	});
});

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});