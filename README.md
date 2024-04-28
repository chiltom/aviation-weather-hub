# The Aviation Weather Hub

This is the aviation weather hub, a service for aircrew weather forecasters to enhance their forecast abilities and optimize their daily workflow.

## Purpose

Forecasting and briefing is a hard job as it is. When flight-related data is scattered across the internet amongst many different services with no consolidation points, it makes the job even harder. Large organizations can have many different aircraft and flights moving at the same time, and 
not much forethought is given as to how many forecasters may be needed to make briefing efficient.

## Solution
This application aims to consolidate much of this data while providing a personalized task management system to meet your specific needs. 

Flight data and information for an organization must be stored with the highest level of security. This application uses HTTP-Only Cookie Authentication and is served with an HTTPS SSL certificate to securely store your session data and credentials and ensure that cross-site scripting (XSS) attacks are mitigated and your data is safe.

The workflow portion of the application involves storing a forecaster's favorite airports and locations to the workflow page, and being able to pull the latest METAR or TAF data for them. This portion also holds a forecaster's personal lists and tasks for each shift that they may want to store for later use. This is extremely helpful due to the various tasks and issues that a forecaster is responsible for throughout their shifts. 

The flights portion of the application involves storing all of the flight and brief data for a forecaster's flights that they are responsible for briefing. The formats and relevant fields are all described in detail in the page.

There are many more features that will be implemented in the future to consolidate more essential data to this site, such as a map with satellite, radar, and precipitation layers, as well as a training page to train junior forecasters eager to get on the desk and start briefing.

## Architecture

If you would like to read more and see a storyboard of the architecture, read here: [Storyboard](./docs/architecture.md)

## Follow-up

If there are any bugs or defects that can be fixed, please feel free to contact me about it and I would love to work through it!
Additionally, if you have any feedback or features that you would like to see in the application please reach out, I would love to talk about it.

## Disclaimer

This application and all source code belongs to Tom Childress, 2024.
