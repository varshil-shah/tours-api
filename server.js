/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotevn = require('dotenv');

process.on('uncaughtException', (error) => {
  console.log(`UNCAUGHT EXCEPTION | SHUTTING DOWN ...`);
  console.log(error);
  process.exit(1);
});

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
  console.log(`UNHANDLED REJECTION | SHUTTING DOWN ...`);
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED! Shutting down server!');
  server.close(() => {
    console.log('Process terminated');
  });
});
