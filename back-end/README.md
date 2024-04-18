# Back-End (Server Side Application)

- This serves as the back-end/server side of the application with the purpose of providing a RESTful API that meets HTTP standards and seamlessly transfers data to and from the front-end and database.
  - This is done by using Object Relational Mapping (ORM) to connect persistent data to the user.
  - The RESTful API provides the client with the ability to perform all CRUD operations using proper HTTP methods (GET, POST, PUT, DELETE).
  - This application utilizes the CheckWX API to grab all weather data and the OpenWX Geocoding API to grab coordinates for NamedLocations.

## Build

- This back-end application is built with Django + DRF.
- All dependencies are listed in requirements.txt.
  - Notable libraries and frameworks will be mentioned and elaborated on below.
- Django and Django Rest Framework provided the necessary classes and methods to build this RESTful API's capabilities.

## Database

- This application uses PostgreSQL as its RDBMS due to Postgres' ability to handle complex data and queries and high level of scalability.
