var ip = "192.168.1.55:1111"

var HIDDEV = "\\\\?\\hid#vid_054c&pid_0002#8&3c95396&1&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}"


var HID = require('node-hid');
var BitMask = require('bit-mask');
var BitArray = require('node-bitarray');
var bitwise = require('bitwise');
var socket = require('socket.io-client')('http://'+ip);

var device = new HID.HID(HIDDEV);

device.on("data", function(data) {
    SendeController1(data);
    SendeController2(data);
    SendeController3(data);
    SendeController4(data);
});

function SendeController1(data){
    var byte1 = bitwise.readByte(data[4]);
    var byte2 = bitwise.readByte(data[3]);

    var buttonsGedrueckt = 0;
    var buttonNr = 0;

    if (byte2[0]){
        buttonsGedrueckt++;
        buttonNr = 0;
    }

    if (byte1[4]){
        buttonsGedrueckt++;
        buttonNr = 1;
    }

    if (byte1[5]){
        buttonsGedrueckt++;
        buttonNr = 2;
    }

    if (byte1[6]){
        buttonsGedrueckt++;
        buttonNr = 3;
    }

    if (byte1[7]){
        buttonsGedrueckt++;
        buttonNr = 4;
    }

    if (buttonsGedrueckt === 1){
        Emit(0, buttonNr);
    }
}

function SendeController2(data){
    var byte = bitwise.readByte(data[3]);

    var buttonsGedrueckt = 0;
    var buttonNr = 0;

    if (byte[1]){
        buttonsGedrueckt++;
        buttonNr = 1;
    }

    if (byte[2]){
        buttonsGedrueckt++;
        buttonNr = 2;
    }

    if (byte[3]){
        buttonsGedrueckt++;
        buttonNr = 3;
    }

    if (byte[4]){
        buttonsGedrueckt++;
        buttonNr = 4;
    }

    if (byte[5]){
        buttonsGedrueckt++;
        buttonNr = 0;
    }

    if (buttonsGedrueckt === 1){
        Emit(1, buttonNr);
    }
}

function SendeController3(data){
    var byte1 = bitwise.readByte(data[3]);
    var byte2 = bitwise.readByte(data[2]);

    var buttonsGedrueckt = 0;
    var buttonNr = 0;

    if (byte1[6]){
        buttonsGedrueckt++;
        buttonNr = 1;
    }

    if (byte1[7]){
        buttonsGedrueckt++;
        buttonNr = 2;
    }

    if (byte2[0]){
        buttonsGedrueckt++;
        buttonNr = 3;
    }

    if (byte2[1]){
        buttonsGedrueckt++;
        buttonNr = 4;
    }

    if (byte2[2]){
        buttonsGedrueckt++;
        buttonNr = 0;
    }

    if (buttonsGedrueckt === 1){
        Emit(2, buttonNr);
    }
}

function SendeController4(data){
    var byte = bitwise.readByte(data[2]);

    var buttonsGedrueckt = 0;
    var buttonNr = 0;

    if (byte[3]){
        buttonsGedrueckt++;
        buttonNr = 1;
    }

    if (byte[4]){
        buttonsGedrueckt++;
        buttonNr = 2;
    }

    if (byte[5]){
        buttonsGedrueckt++;
        buttonNr = 3;
    }

    if (byte[6]){
        buttonsGedrueckt++;
        buttonNr = 4;
    }

    if (byte[7]){
        buttonsGedrueckt++;
        buttonNr = 0;
    }

    if (buttonsGedrueckt === 1){
        Emit(3, buttonNr);
    }
}

function Emit(ControllerNr, buttonNr){
	console.log('button-clicked', `{ "ControllerNr": ${ControllerNr}, "ButtonNr": ${buttonNr} }`);
	if (buttonNr == 0){
	
    socket.emit('buzzerresponse', { buzzerid: ControllerNr, timestamp: '0' });
	}
}