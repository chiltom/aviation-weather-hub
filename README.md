# The Aviation Weather Hub

This is the aviation weather hub, a service for aircrew weather forecasters to enhance their forecast abilities and optimize their daily workflow.

## Purpose

Forecasting and briefing is a hard job as it is. When flight-related data is scattered across the internet amongst many different services with no consolidation points, it makes the job even harder. This application aims to consolidate much of this data while providing a personalized task management system to meet your specific needs.

## Installation

To run and download this application, please follow the below steps.

### MacOS

#### Package Management

- If you do not already have Homebrew installed, please run the following command in your terminal:
  - `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
  - Update your version of brew to the latest release
    - `brew update`
    - `brew doctor`
  - After installing Homebrew, you may need to configure the path that Homebrew places its downloads in. To do so, follow these steps:
    - Open your .zshrc file by typing into the shell:
      - `code ~/.zshrc`
    - In your .zshrc, add the line below:
      - `export PATH=$PATH:/usr/local/bin`
    - You may now type the following command in your terminal to reload your ~/.zshrc:
      - `source ~/.zshrc`

#### Python

- Install the most up-to-date version of Python3 from your terminal by running the following command:
  - `brew install python`
- To ensure that python's package manager, pip, was downlaoded, run the following command in the terminal
  - `python3 -m ensurepip`

#### Node.js

- To install and configure node and npm for building the front-end, please enter the following commands into your terminal:
  - `brew install npm`
  - `sudo npm install -g n`
  - `sudo n stable`

#### PostgreSQL

- To install and run PostgreSQL, please enter the following into your shell:
  - `brew install postgresql@14`
  - `brew services restart postgresql@14`

#### Building and Running the Front End

- To build and run the front-end server, change directories into the front-end directory and enter these commands into your terminal:
  - `npm install`
  - `npm run dev`

#### Building and Running the Back End

- To build and run the back-end server, change directories into the back-end directory and enter these commands into your terminal:
  - `python3 -m venv .venv`
  - `source .venv/bin/activate`
  - `pip3 install -r requirements.txt`
  - `dropdb weather_db && createdb weather_db`
  - `python3 manage.py makemigrations`
  - `python3 manage.py migrate`
  - `python3 manage.py runserver`

#### Interacting with the Front-End

- To interact with the React project, enter the following url into your browser
  - http://127.0.0.1:5173/
