## Natours API

Natours API provides all the data related to tours and travel. This API contains endpoints for Tours, Users, Reviews and Bookings for a fictional tours company called Natours.

The API is been hosted here [varshil-shah-natours-api](https://varshil-shah-natours-api.cyclic.app/). The complete documentation of an API is available here [Postman Natours API Documentation]() Feel free to test and do ping me if you find any issues.

### Tours

This folder contains routes that will allow you to get all tours, get a specific one, delete a tour, create your own (if your user role is admin or lead-guide), update a tour, get its stats and even geospatial data like getting a tour within a specified radius and the distances of all tours from a specific point.

#### Endpoints for Tour

| **Name**                      | **Type** | **Endpoint**                                                      |
| ----------------------------- | -------- | ----------------------------------------------------------------- |
| Get all Tours                 | GET      | /api/v1/tours                                                     |
| Get Tour                      | GET      | /api/v1/tours/{id}                                                |
| Top 5 Cheap                   | GET      | /api/v1/tours/top-5-cheap/                                        |
| Tour Stats                    | GET      | /api/v1/tours/stats                                               |
| Monthly Plan                  | GET      | /api/v1/tours/monthly-plan/{year}                                 |
| Get Tour Within Radius        | GET      | /api/v1/tours/tours-within/{distance}/center/{latlng}/unit/{unit} |
| Get Distance From Coordinates | GET      | /api/v1/tours/distances/{latlng}/unit/{unit}                      |
| Create Tour                   | POST     | /api/v1/tours                                                     |
| Update Tour                   | PATCH    | /api/v1/tours/{id}                                                |
| Delete Tour                   | DELETE   | /api/v1/tours/{id}                                                |

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
| Delete Review     | DELETE  | /api/v1/reviews/{id} |

### Reviews on Tour

On this endpoints, a user can create and get all reviews on a specific tour.

#### Endpoints for Reviews on Tour

| **Name** | **Type** | **Endpoint** |
| --- | --- | --- |
| Create Review on Tour | POST | /api/v1/tours/{TourId}/reviews |
| Get Review on Tour | GET | /api/v1/tours/{TourId}/reviews |

### Bookings

A new booking is generated every time someone books a tour and it contains information about the purchase. Only admins and lead-guides have access to this data.

#### Endpoints for bookings

| **Name** | **Type** | **Endpoint** |
| --- | --- | --- |
| Get all Bookings | GET | /api/v1/bookings |
| Get Booking | GET | /api/v1/bookings/{id} |


