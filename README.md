# Tours API

The Tours API is a robust RESTful interface designed to provide users with comprehensive functionalities for managing tours. Users can access a variety of features including viewing available tours, booking them through the Stripe payment gateway, rating tours post-completion, and employing filters, pagination, and sorting mechanisms. The API supports additional capabilities such as user account creation and management, tour addition and editing, and review administration. Notably, the implementation incorporates Redis caching to optimize latency and speed. Security measures are heightened through strong encryption, compression techniques, and rate limiting. Furthermore, the project integrates utility methods for email communication using nodemailer (SendGrid) and facilitates file uploads to external storage solutions like Cloudinary or ImageKit.

- The complete project is deployed on Render and can be accessed [here](https://varshil-shah-tours-api.onrender.com).
- _Note: The API is currently hosted on a free Render plan and may take a few seconds to load for the first time._

## Key features -

1. **Functionality**: View and book tours, rate completed tours, filter and sort tours, manage user accounts, and administer reviews.
2. **Performance Optimization**: Redis caching is employed to enhance latency and speed.
3. **Security Measures**: Strong encryption, compression, and rate limiting mechanisms are implemented.
4. **Third-Party Integrations**: Utilizes Stripe for payment processing, nodemailer (SendInBlue) for email communication, and Cloudinary/ImageKit for external file storage.
5. **Comprehensive Features**: Supports pagination, sorting, and filtering tour-related operations.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](https://documenter.getpostman.com/view/18988098/2s9YsFFEQW)
- [Built With](#built-with)
- [Difficulties Faced](#difficulties-faced)
- [Future Scope](#future-scope)
- [License](#license)

## Prerequisites

1. Your system should have Node.js installed. If not, you can install it from [here](https://nodejs.org/en/download/).
2. You should have a MongoDB Atlas account. If not, you can create one from [here](https://www.mongodb.com/cloud/atlas/register).
3. You should have a Stripe account. If not, you can create one from [here](https://dashboard.stripe.com/register).
4. You should have a SendInBlue account. If not, you can create one from [here](https://www.sendinblue.com/).
5. You should have a ImageKit account. If not, you can create one from [here](https://imagekit.io/).
6. For testing, you can use Postman or Insomnia or ThunderClient extension available on VSCode.
7. For caching, you should have a Redis account. In this project, I've using redis from render.com. If not, you can create one from [here](https://render.com/).

## Installation

1. Clone the repository

```sh
git clone https://github.com/varshil-shah/tours-api.git
```

2. Install NPM packages

```sh
npm install or yarn install
```

3. Create a .env file in the root directory, same as the .env.example file, and add the environment variables
4. Run the application

```sh
npm start or yarn start
```

## Usage

1. Helps you to create, read, update and delete tours, users, reviews and bookings.
2. Provides you with the ability to filter, sort and paginate tours and other models too.
3. Integrate the API to any frontend application and use our API to create a fully functional tours website.
4. Manage your users, tours, reviews and bookings with ease.

## Built With

- [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.
- [Redis](https://redis.io/) - Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.
- [JWT](https://jwt.io/) - JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely
  between two parties.

## Difficulties Faced

- The most difficult part of the project was to implement the file upload feature. I had to go through the documentation of ImageKit to understand how to upload files to their servers. I also had to go through the documentation of multer and sharp to understand how to upload files to the local server.
- The second most difficult part of the project was to implement the payment feature. I had to go through the documentation of Stripe to understand how to implement the payment feature in the application.
- The third most difficult part of the project was to implement the filtering, sorting and pagination feature. I had to go through the documentation of Mongoose to understand how to implement the filtering, sorting and pagination feature in the application.

## Future Scope

- Add a frontend application to the API.
- Implement access and refresh tokens for better security.
- Implement maximum login attempts and lockout mechanism.
- Add a feature to search tours by location.

## License

MIT License

## Acknowledgements

Thanks to Jonas Schmedtmann for his amazing course on Node.js, Express.js, MongoDB and Mongoose.
