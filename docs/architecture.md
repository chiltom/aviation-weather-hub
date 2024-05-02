# Architecture

![Storyboard](./sources/aviation_weather_hub_storyboard.png)

This application is constructed with the following stack:

- Front-End: Vite + React.js + Typescript
- Back-End: Django + DRF
- Database: PostgreSQL

The application is hosted on an AWS EC2 instance, with the front-end being served by Nginx and the back-end being served by Gunicorn.

## Front-End

The front-end is broken down into several portions within the src directory, with each sub-directory holding their respective portions that build the React app.

The use of TypeScript made this application significantly easier to build and scale to any size. Defining interfaces and types to pass objects around and strictly typing return values made the front-end a lot more rigid and easier to build and produce.

The goal was to create as much reusable, scalable code as possible, so I separated as many concerns as possible while still being able to access data as quickly as possible.

- A part of this involved creating a custom provider, the WeatherProvider, and a hook to grab context from within, which was a challenge to learn but led to seamless implementation within the application.
- Another part of this was using the useCallback hook to cache function creation until certain dependencies changed. This allowed components to re-render more efficiently and pages to load faster.

In the future, page animations and transition effects will be implemented to make conditional rendering more smooth on each page change/re-render to make the UI more user-friendly.

## Back-End

The back-end using Django + Django Rest Framework (DRF) made serving the front-end data very efficient and scalable.

By creating comprehensive models with unique composite key constraints and custom validators, the PostgreSQL database was injected with a rigid, scalable persistent data structure.

- Django provides built in model features that automatically index fields that include unique constraints, slug fields, and foreign keys. This allowed the back-end to grab frequently queried data more efficiently.

The endpoints and views that served all HTTP requests were constructed with DRF and comply with all REST API standards, and the main flight and list data components serve all CRUD or GET, POST, PUT, and DELETE requests.

HTTP-Only Cookie Authentication was seamlessly provided by and integrated with DRF, restricting unauthorized access to all data.
