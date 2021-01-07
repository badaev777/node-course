const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(msg) {
        this.emit('message', `${msg} ${Date.now()}`)
    }
}

const logger = new Logger();

logger.on('message', data => {
    console.log(data);
});

logger.log('Hello');
