# Front-End (Client Side Application)

- This serves as the front-end/client side of the application with the purpose of providing an enhanced user experience with each interaction.
  - The format is designed to provide meaningful data and observations to both skilled and junior forecasters.
  - The UI is also built as a safe space for any forecaster to store their daily tasks/workflow for ease-of-use and quick reference.

## Build

- This front-end application is built with Vite + TypeScript + React.
- All dependencies are listed in the package.json, with more details (version numbers, further dependencies, etc.) in the package-lock.json.
  - Notable libraries and frameworks will be mentioned and elaborated on below.
- This application is built as a single-page application (SPA), with navigation being handled by react-router-dom.
  - This creates the best user experience with minimal rendering speeds upon changes after mount.

## Design

- React-Bootstrap is used to efficiently create highly styled components such as the NavBar, Task Cards, and more.
- Tailwind CSS is used to minutely customize many components across the application for effective styling.
