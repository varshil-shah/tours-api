const fs = require('fs');
const crypto = require('crypto');

process.env.UV_THREADPOOL_SIZE = 1;
const start = Date.now();

setTimeout(() => console.log('Timer one finished!'), 0);
setImmediate(() => console.log('Immediate one finished!'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished!');

  setTimeout(() => console.log('Timer two finished!'), 0);
  setTimeout(() => console.log('Timer three finished!'), 5000);
  setImmediate(() => console.log('Immediate two finished!'));

  process.nextTick(() => console.log('Process.nextTick() executed!'));

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted!');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted!');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted!');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted!');
  });
});

console.log('Hello from top-level code!');
