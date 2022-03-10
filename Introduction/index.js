const fs = require('fs');
const http = require('http');
const url = require('url');

/*
FILES -

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
*/

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const replaceTemplate = (templateCard, product) => {
  let output = templateCard.replace(/{%NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic)
    output = output.replace(/{%NON_ORGANIC%}/g, 'not-organic');
  return output;
};

// HTTP -
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page -
  if (pathName === '/overview' || pathName === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj
      .map((card) => replaceTemplate(templateCard, card))
      .join('');
    const result = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(result);

    // Product page -
  } else if (pathName === '/product') {
    res.end('<h1>This is an product page :)</h1>');

    // API -
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    // Page not found -
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'some-dummy-data': 'page-not-found',
    });
    res.end('<h1>Page not found :(</h1>');
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
