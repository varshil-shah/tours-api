const mongoose = require('mongoose');
const fs = require('fs');
const dotevn = require('dotenv');

const Tour = require('../../models/tour-model');

dotevn.config({
  path: './config.env',
});

const database = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully!`));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA AND STORE IN DATABASE -
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log(`Data successfully loaded!`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE DATA FROM DATABASE -
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log(`All data deleted successfully!`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
