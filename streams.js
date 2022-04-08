const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution - 1 (not a good practice)
  // fs.readFile('test-file.txt', (err, data) => {
  //   res.end(data);
  // });

  // solution - 2: Stream
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });

  // solution - 3: pipe func - to control flow of read/write
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
});

server.listen(3000, '127.0.0.1', () => {
  console.log(`Listening on port 3000...`);
});
