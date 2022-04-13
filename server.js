const dotevn = require('dotenv');
dotevn.config({
  path: './config.env',
});

console.log(process.env.NODE_ENV);

const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
