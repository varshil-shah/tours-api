## Natours API

Natours API provides all the data related to tours and travel. This API contains endpoints for Tours, Users, Reviews and Bookings for a fictional tours company called Natours.

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
