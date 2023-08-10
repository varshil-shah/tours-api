const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const dotevn = require('dotenv');

dotevn.config({
  path: '../../config.env',
});

const imageKit = require('../../utils/image-kit');
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const imagePath = 'D:\\nodejs-bootcamp\\public\\img\\users';
console.log(path.isAbsolute(imagePath));

const myUsers = [];
async function storeAndUpdateImagePath() {
  for (const user of users) {
    console.log(user);
    try {
      const imageBuffer = await sharp(path.join(imagePath, user.photo))
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 });

      // Upload image to imagekit
      const uploadResponse = await imageKit.upload({
        file: imageBuffer,
        fileName: `${user.photo}`,
        folder: 'users',
      });

      user.photo = uploadResponse.url;
      myUsers.push(user);
    } catch (e) {
      console.log(e);
    }
  }
}

storeAndUpdateImagePath().then(() => {
  fs.writeFileSync(
    path.join(__dirname, 'users-imagekit.json'),
    JSON.stringify(myUsers)
  );
});
