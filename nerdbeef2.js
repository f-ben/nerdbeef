const readline = require('readline');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var conf = require('./config.json');
var new_round = 1;
var os = require('os');
var ifaces = os.networkInterfaces();
var ifacei=0;
var adressen = [];
var fs = require('fs');
var open = require('open');
var globalplayers = [];
globalplayers.splice(0,globalplayers.length);
adressen.splice(0,adressen.length);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.use(express.static('public'));
app.use('/imagequestionimage', express.static(__dirname + '/imagequestionimage'));
app.use('/trivia', express.static(__dirname + '/trivia'));

app.get('/admin', function(req, res) {
	res.sendFile(__dirname + '/public/admin.html');
});
app.get('/fragengenerator', function(req, res) {
	res.sendFile(__dirname + '/public/fragengenerator.html');
});
app.get('/buzzerweb', function(req, res) {
	res.sendFile(__dirname + '/buzzerweb/buzzerweb.html');
});
app.get('/buzzerweb.jpg', function(req, res) {
	res.sendFile(__dirname + '/buzzerweb/buzzerweb.jpg');
});
app.get('/ip.js', function(req, res) {
	res.sendFile(__dirname + '/ip.js');
});
app.get('/jquery.min.js', function(req, res) {
	res.sendFile(__dirname + '/public/jquery/jquery.min.js');
});
app.get('/jquery-ui.js', function(req, res) {
	res.sendFile(__dirname + '/public/jquery/jquery-ui.js');
});
app.get('/jquery.pietimer.js', function(req, res) {
	res.sendFile(__dirname + '/public/jquery/jquery.pietimer.js');
});
app.get('/jquery.mobile.custom.min.js', function(req, res) {
	res.sendFile(__dirname + '/public/jquerymobile/jquery.mobile.custom.min.js');
});
app.get('/jquery.transit.min.js', function(req, res) {
	res.sendFile(__dirname + '/public/jquerytransit/jquery.transit.min.js');
});
app.get('/fragen.txt', function(req, res) {
	res.sendFile(__dirname + '/fragen.txt');
});

io.sockets.on('connection', function(socket) {
	socket.emit('system', 'verbindung hergestellt');

	socket.on('playersync', function(data) {
		io.sockets.emit('sync_players', data);
		globalplayers.splice(0,globalplayers.length);
			for(i=0;i<data.player.length;i++)
				globalplayers.push(data.player[i]);
		io.sockets.emit('post_globalplayers', globalplayers)
	});
	socket.on('getglobalplayers', function(data) {
		io.sockets.emit('post_globalplayers', globalplayers)
	});
	socket.on('gamesync', function(data) {
		io.sockets.emit('sync_game', data);
	});
	socket.on('startquestion', function(data) {
		io.sockets.emit('start_question', data);
	});
	socket.on('buzzerresponse', function(data) {
		io.sockets.emit('buzzer_accepted', data);
	});
	socket.on('disablequestion', function(data) {
		io.sockets.emit('disable_question', data);
	});
	socket.on('fixquestion', function(data) {
		io.sockets.emit('fix_question', data);
	});
	socket.on('showtrivia', function(data) {
		io.sockets.emit('show_trivia', data);
	});
	socket.on('demobuzzer', function(data) {
		io.sockets.emit('buzzer_accepted', data);
	});
	socket.on('pointsrecalc', function(data) {
		io.sockets.emit('points_recalc', data);
	});
	socket.on('debug', function(data) {
		console.log(data);
	});
});

process.stdout.write('\033c');
console.log("--------- N E R D B E E F ---------");

Object.keys(ifaces).forEach(function (ifname) {
	var alias = 0;
	ifaces[ifname].forEach(function (iface) {
		if ('IPv4' !== iface.family || iface.internal !== false) {
			// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
		return;
	}
	// this interface has only one ipv4 adress
	var ip = iface.address + ':' + conf.port
	adressen.push(ip);
	while(ifacei<adressen.length)
	{
		console.log(ifacei+') '+adressen[ifacei]+' ('+ifname+')')
		ifacei++;
	}
    ++alias;
  });
});
console.log("-----------------------------------");

rl.question('Bitte wählen Sie das gewünschte Interface: ', (answer) => {
	iptext = "var ip=\""+adressen[answer]+"\";";
	fs.writeFile('/ip.js', iptext, function (err) {
		if (err) {
			console.log(err);
		}
	});
	open("http://"+adressen[answer]);
	console.log("Server erreichbar über: http://"+adressen[answer]);
	console.log("");
	console.log("Server beenden mit Tastenkombination");
	console.log("STRG+C");
	rl.close();
});

server.listen(conf.port);