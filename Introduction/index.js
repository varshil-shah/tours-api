const fs = require('fs');

// BLOCKING CODE - SYNCHRONOUS CODE
const textIn = fs.readFileSync('txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This messages is added by NodeJS.\nCreated on ${Date.now()}`;
fs.writeFileSync('txt/output.txt', textOut);
console.log('File written!');

// NON-BLOCKING CODE - ASYNCHRONOUS CODE
fs.readFile('txt/start.txt', 'utf-8', (_, data1) => {
  fs.readFile(`txt/${data1}.txt`, 'utf-8', (_, data2) => {
    console.log(data2);
    fs.readFile('txt/append.txt', 'utf-8', (_, data3) => {
      console.log(data3);

      fs.writeFile('txt/final.txt', `${data2}\n${data3}`, 'utf-8', (_) => {
        console.log('You file has been written!');
      });
    });
  });
});
console.log('Will read file?');
