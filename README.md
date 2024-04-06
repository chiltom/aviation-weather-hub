# The Aviation Weather Hub

This is the aviation weather hub, a service for aircrew weather forecasters to enhance their forecast abilities and optimize their daily workflow.

## Purpose

Forecasting and briefing is a hard job as it is. When flight-related data is scattered across the internet amongst many different services with no consolidation points, it makes the job even harder. This application aims to consolidate much of this data while providing a personalized task management system to meet your specific needs.

## Architecture

This project is constructed with the following stack:
  
  - Front-End: Vite + React.js

  - Back-End: Python + Django

  - Database: PostgreSQL

If you would like to read more and see a storyboard of the architecture, read here: [Storyboard](./docs/architecture.md)

## Installating and Running the Application

- To download and install this application for use, clone the repository into your local machine, change directories into the scripts directory, and follow these steps:

  - Run the following command in your terminal to install all dependencies on your local machine: `./install.sh`

  - Run the following command in the same shell to run the back-end server: `./run-back-end.sh`

  - Run the following command in a new shell to run the front-end server: `./run-front-end.sh`

- Finally, in your browser of choice visit the url http://localhost:5173/ to use the application!
