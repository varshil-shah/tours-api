const mongoose = require('mongoose');
const dotevn = require('dotenv');

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
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully!`));

const app = require('./app');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on('unhandledRejection', (error) => {
  console.log(`ERRROR: ${error.name} | ERRROR MSG: ${error.message}`);
  console.log(`UNHANDLED REJECTION | SHUTTING DOWN ...`);
  server.close(() => {
    process.exit(1);
  });
});
