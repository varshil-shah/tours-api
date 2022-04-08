const EventEmitter = require('events');
const http = require('http');

class Sale extends EventEmitter {
  constructor() {
    super();
  }
}

const myEventEmitter = new EventEmitter();

myEventEmitter.on('onSale', () => {
  console.log(`There was a new sale`);
});

myEventEmitter.on('onSale', () => {
  console.log(`Customer: Varshil Shah`);
});

myEventEmitter.emit('onSale');

/////////////////////////////////////////
const server = http.createServer();

server.on('request', (req, res) => {
  res.end(`<h1>Request received</h1>`);
});

server.on('request', (req, res) => {
  console.log(`Another request received`);
});

server.on('close', (req, res) => {
  console.log(`Server closed`);
});

server.listen(3000, '127.0.0.1', () => {
  console.log(`Server listening on port 3000`);
});
