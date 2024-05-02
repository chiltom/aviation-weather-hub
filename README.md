<img src="./front-end/src/assets/dall-e-underbelly-jet-clouds.webp" width="200px" height="150px"/>

# The Aviation Weather Hub

> The Forecasting Consolidation Service

This is the aviation weather hub, a service for aircrew weather forecasters to enhance their forecast abilities and optimize their daily workflow.

## Developing

Here's how to get started looking at the source code and developing locally:

- Clone this repository to your local machine with the following command:

  ```bash
  git clone https://github.com/chiltom/aviation-weather-hub.git
  ```

- Navigate to the `scripts` directory and run the following commands to install application dependencies locally:

  ```bash
  ./install.sh # Installs project dependencies
  ```

- Finally, from this directory, run the following scripts in the same manner:
  ```bash
  ./run-back-end.sh # Spins up the Django server with a connection to your database
  ./run-front-end.sh # Spins up the Vite + React server
  ```

## Purpose

> Why The Aviation Weather Hub?

Forecasting and briefing is a hard job as it is.

When flight-related data is scattered across the internet amongst many different services with no consolidation points, it makes the job even harder.

Large organizations can have many different aircraft and flights moving at the same time, and
not much forethought is given as to how many forecasters may be needed to make briefing efficient.

This application aims to consolidate much of this data while providing a personalized task management system to meet your specific needs.

To learn the details about critical data security and the features of this application, read here: [Features](./docs/features.md)

## Architecture

If you would like to read more and see a storyboard of the architecture and structure of the application, read here: [Storyboard](./docs/architecture.md)

## Contributing

> Always Evolving to Meet Forecasters' Needs

If there's anything that you'd like to contribute or make suggestions for, please fork the repository and use a feature branch. I'd love to see a pull request and will evaluate it as soon as possible.

## Links

- Repository: https://github.com/chiltom/aviation-weather-hub
- Issue tracker: https://github.com/chiltom/aviation-weather-hub/issues
  - In case of any sensitive issues such as security vulnerabilities, please contact me by email directly. I highly appreciate any effort to improve the application's security and privacy!

<br/>

<div align="center">©Tom Childress 2024</div>
