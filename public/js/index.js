var socket = io();

function scrollToBottom() {
	//Selectors
	var messages = jQuery("#messages");
	var newMessage = messages.children("li:last-child");
	//Heights
	var clientHeight = messages.prop("clientHeight");
	var scrollTop = messages.prop("scrollTop");
	var scrollHeight = messages.prop("scrollHeight");
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
		messages.scrollTop(scrollHeight);
}

socket.on('connect', function() {
	console.log("Connected to server");
});
			
socket.on("newMessage", function(message) {
	formattedTime = moment(message.createdAt).format("h:mm a");
	var template = jQuery("#message-template").html();
	var html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	});
	jQuery("#messages").append(html);
	scrollToBottom();
});

socket.on('disconnect', function() {
	console.log("Disconnected from server");
});

jQuery("#message-form").on("submit", function(e) {
	e.preventDefault();

	var messageTextbox = jQuery("[name=message]");
	socket.emit("createMessage", {
		from: "User",
		text: messageTextbox.val()
	}, function(message) {
		messageTextbox.val("");
	});	
});

var locationButton = jQuery("#send-location");

locationButton.on("click", function() {
	console.log("Button clicked!");		
	if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  	}

  	locationButton.attr("disabled", "disabled").text('Sending location...');

  	navigator.geolocation.getCurrentPosition(function(position) {
  		locationButton.removeAttr("disabled").text('Send Location');
		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
  	}, function() {
  			locationButton.removeAttr("disabled").text('Sending Location');
  			alert("Unable to fetch location");
  	});
});

socket.on("newLocationMessage", function(location) {
	formattedTime = moment(location.createdAt).format("h:mm a");
	var template = jQuery("#location-message-template").html();
	var html = Mustache.render(template, {
		from: location.from,
		url: location.url,
		createdAt: formattedTime
	});
	jQuery("#messages").append(html);
	scrollToBottom();
});