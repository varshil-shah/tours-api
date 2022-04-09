const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   superagent
//     .get(
//       `https://dog.ceo/api/breed/${data.substring(
//         0,
//         data.length - 2
//       )}/images/random`
//     )
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       fs.writeFile('dog-url.txt', res.body.message, (err) => {
//         console.log(`File saved!`);
//       });
//     });
// });

// CONSUMING PROMISE -
// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   superagent
//     .get(
//       `https://dog.ceo/api/breed/${data.substring(
//         0,
//         data.length - 2
//       )}/images/random`
//     )
//     .then((res) => {
//       fs.writeFile('dog-url.txt', res.body.message, (err) => {
//         if (err)
//           return console.log(
//             `Error occured while writing file - ${err.message}`
//           );
//         console.log(`File saved!`);
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// READ FILE AND RETURN PROMISE -
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('I could not find that file 😢');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};

/*
readFilePromise(`${__dirname}/dogg.txt`)
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePromise('dog-url.txt', res.body.message);
  })
  .then(() => {
    console.log(`Writing to file completed`);
  })
  .catch((err) => {
    console.log(err);
  });
*/

// ASYNC-AWAIT -
const storeDogPictureUrl = async () => {
  try {
    const data = await readFilePromise('dog.txt');
    console.log(data);

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data.trim()}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data.trim()}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data.trim()}/images/random`
    );

    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map((ele) => ele.body.message);

    await writeFilePromise('dog-url.txt', imgs.join('\n'));
    console.log(`Writing to file completed`);
  } catch (error) {
    throw error;
  }
  return '2. READY 🐶';
};

console.log(`1. Will get dog pic`);
storeDogPictureUrl()
  .then((x) => {
    console.log(x);
    console.log(`3. Done getting dog pic`);
  })
  .catch((err) => console.log(err));
