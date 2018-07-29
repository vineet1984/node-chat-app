const {generateMessage, generateLocationMessage} = require("./message");

const mocha = require("mocha");
const expect = require("expect");
const request = require("supertest");

describe("generateMessage", () => {
	it("Should generate a correct message object", () => {
		var from = "Vineet";
		var text = "Hi";
		var res = generateMessage(from, text);
		expect(res.from).toBe(from);
		expect(res.text).toBe(text);
		expect(typeof res.createdAt).toBe('number');
	});
});

describe("generateLocationMessage", () => {
	it("Should generate a correct location object", () => {
		var from = "Vineet";
		var latitude = 1;
		var longitude = 1;
		var url = "https://www.google.com/maps?q=1,1";
		var res = generateLocationMessage(from, latitude, longitude);
		expect(res.from).toBe(from);
		expect(res.url).toBe(url);
		expect(typeof res.createdAt).toBe('number');
	});
});