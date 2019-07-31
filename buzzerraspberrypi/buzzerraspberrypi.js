var ip = "192.168.100.105:1111"


var io = require('socket.io-client')('http://'+ip);
var socket = io.on('connect', function() {
		console.log("Mit Server verbunden.");
});
var Gpio = require('onoff').Gpio;
var buzzer1out = new Gpio(26, 'out');
var buzzer1in  = new Gpio(20, 'in', 'rising');
var buzzer2out = new Gpio(19, 'out');
var buzzer2in  = new Gpio(16, 'in', 'rising');
var buzzer3out = new Gpio(6, 'out');
var buzzer3in  = new Gpio(12, 'in', 'rising');
var buzzer4out = new Gpio(22, 'out');
var buzzer4in  = new Gpio(23, 'in', 'rising');

buzzer1out.writeSync(1);
buzzer2out.writeSync(1);
buzzer3out.writeSync(1);
buzzer4out.writeSync(1);

function send_response(data) {
	send = socket.emit('buzzerresponse', { buzzerid: data, timestamp: '0' });
}

buzzer1in.watch(function(err, value) {
	send_response(0);
});
buzzer2in.watch(function(err, value) {
	send_response(1);
});
buzzer3in.watch(function(err, value) {
	send_response(2);
});
buzzer4in.watch(function(err, value) {
	send_response(3);
});

process.on('SIGINT', function () {
	buzzer1in.unexport();
	buzzer2in.unexport();
	buzzer3in.unexport();
	buzzer4in.unexport();
	buzzer1out.unexport();
	buzzer2out.unexport();
	buzzer3out.unexport();
	buzzer4out.unexport();
});
