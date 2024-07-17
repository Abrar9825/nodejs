var events = require('events');
var eventEmitter = new events.EventEmitter()

// Event handler for 'scream' event
var screamHandler = function () {
    console.log('I hear a scream!');
}

// Event handler for 'whisper' event
var whisperHandler = function () {
    console.log('I hear a whisper...');
}

// Assign event handlers to events
eventEmitter.on('scream', screamHandler);
eventEmitter.on('whisper', whisperHandler);

// Emit the events
eventEmitter.emit('scream');
eventEmitter.emit('whisper');
