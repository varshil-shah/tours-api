![Natours-Logo](public/img/logo-green.png)

# Natours Tours API

Tours API is a RESTful API that allows users to view all available tours, book tours using Stripe payment gateway, rate tours after completion, filter tours based on their needs, and see all reviews based on tours. It also supports many more features, such as creating and managing user accounts, adding and editing tours, and managing reviews.

The APIs are hosted at -

- [render](https://varshil-shah-tours-api.onrender.com)
- [cyclic](https://varshil-shah-natours-api.cyclic.app)

Sites will take little time to load, as of now they are been hosted on free servers.

The complete documentation of an API is available here [Postman Natours API Documentation]() Feel free to test and do ping me if you find any issues.

## User credentials

email: `john@doe.com`

password: `Test@1234`

## Tours

Our versatile routes empower you to seamlessly manage tours. Whether you're retrieving all tours, specific ones, or exploring geospatial data within a radius, we've got you covered. Admins and lead guides can create and update tours, while everyone can access tour stats.

### Tour Endpoints -

#### Get all tours

Endpoint: `/api/v1/tours`

Description: Get all the tours.

Parameters:

- `sort` (`string`, example: `-price,ratingsAverage`)
  - Allows user to sort tours in ascending and descending order. Use (-) to sort in descending order.
- `page` (`number`, `default=1`)
  - Allows user to access certain page of an API.
- `limit` (`number`, `default=10`)
  - Limits the number of results.
- `duration[gte]` (`number`, example: `5`)
  - Allows user to filter tours based on duration. On numbers, you can use (gte - greater than or equal to, lte - less than or equal, gt - greater than and lt - less than) to filter data.
- `price[lt]` (`number`, example: `1500`)
  - Allows user to filter tours based on price. On numbers, you can use (gte - greater than or equal to, lte - less than or equal, gt - greater than and lt - less than) to filter data.
- `fields` (`string`, example: `name,price,difficulty,duration`)
  - Allows user to projects certain fields from the incoming data.
- `difficulty` (`string`, types: `easy, medium, difficulty`)
  - Filters data based on difficulty level (easy, medium and difficult).

Response:

- status (`string`)
  - The status of the request. Possible values are `success, fail and error`.
- results (`number`)
  - Total number of results available.
- data (`object`)
  - Response from the server.

### User

Users need to sign up in order to purchase tours. This folder will allow you to manage all operations related to users

#### Endpoints for User

| **Name**            | **Type** | **Endpoint**            |
| ------------------- | -------- | ----------------------- |
| Get all Users       | GET      | /api/v1/users           |
| Get User            | GET      | /api/v1/users/{id}      |
| Get Current User    | GET      | /api/v1/users/me        |
| Update User         | PATCH    | /api/v1/users/{id}      |
| Update Current User | PATCH    | /api/v1/users/update-me |
| Delete Current User | PATCH    | /api/v1/users/delete-me |
| Delete User         | DELETE   | /api/v1/users/{id}      |

### Authentication

Sign up providing your name, email, and password. You can set your profile picture later. The email must be unique (never used to create an account before).

#### Endpoints for Authentication

| **Name**                     | **Type** | **Endpoint**                         |
| ---------------------------- | -------- | ------------------------------------ |
| Sign Up                      | POST     | /api/v1/users/signup                 |
| Login                        | POST     | /api/v1/users/login                  |
| Forgot Password              | POST     | /api/v1/users/forgot-password        |
| Reset Password               | PATCH    | /api/v1/users/reset-password/{token} |
| Update Current User Password | PATCH    | /api/v1/users/update-my-password     |

### Review

Users, who have created an account or are currently logged in can perform CURD operation on Review collection.

#### Endpoints for Review

| **Name**          | **Type** | **Endpoint**         |
| ----------------- | -------- | -------------------- |
| Get all Reviews   | GET      | /api/v1/reviews      |
| Get Review        | GET      | /api/v1/reviews/{id} |
| Create New Review | POST     | /api/v1/reviews      |
| Update Review     | PATCH    | /api/v1/reviews/{id} |
| Delete Review     | DELETE   | /api/v1/reviews/{id} |

### Reviews on Tour

On this endpoints, a user can create and get all reviews on a specific tour.

#### Endpoints for Reviews on Tour

| **Name**              | **Type** | **Endpoint**                   |
| --------------------- | -------- | ------------------------------ |
| Create Review on Tour | POST     | /api/v1/tours/{TourId}/reviews |
| Get Review on Tour    | GET      | /api/v1/tours/{TourId}/reviews |

### Bookings

A new booking is generated every time someone books a tour and it contains information about the purchase. Only admins and lead-guides have access to this data.

#### Endpoints for bookings

| **Name**         | **Type** | **Endpoint**          |
| ---------------- | -------- | --------------------- |
| Get all Bookings | GET      | /api/v1/bookings      |
| Get Booking      | GET      | /api/v1/bookings/{id} |
