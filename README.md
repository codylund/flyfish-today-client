# [flyfish.today] client

[flyfish.today] is a customizable dashboard for historical and realtime streamflow data. 
This repository contains the frontend component for the dashboard.
The backend component, built with Go and Gin, can be found [here][flyfish-today-server].

## Technology

The flyfish.today client is a [React] web app written in [Typescript](https://www.typescriptlang.org/).
It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

The bulk of UX is comprised of [Material UI] components.
Streamflow data is rendered with [Chart.js].

## Data

The [flyfish.today] dashboard is fully customizable.
Registered users can select preferred USGS stream sites and add metadata (e.g. favorite, tags).
User data is persisted and retreived via REST APIs on the [flyfish.today server][flyfish-today-server].
Refer to the documentation in that repo for detailed API information.

The client retreives streamflow data via cross-origin requests to the following USGS REST APIs:
- [USGS Instantaneous Values Web Service](https://waterservices.usgs.gov/rest/IV-Service.html)
- [USGS Daily Values Site Web Service](https://waterservices.usgs.gov/rest/DV-Service.html)

## Build and Test

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open <http://localhost:3000> to view it in the browser.
A local [flyfish.today server][flyfish-today-server] must be listening on <http://localhost:8080>
for the client to function properly.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Deploy

The flyfish.today client is deployed as a standalone Docker container.
See the [Dockerfile](./Dockerfile) included in this repo.

This container uses [`serve`] to deliver the static assets via HTTP.

## Limitations

### Restricted site locations

Today, the `AddSiteDialog` only shows USGS sites in Colorado.
However, this app can render data from any active USGS site in the United States.
A future update may add support for different states.

[flyfish.today]: https://flyfish.today
[flyfish-today-server]: https://github.com/codylund/flyfish-today-server

[Chart.js]: https://www.chartjs.org/
[Material UI]: https://mui.com/material-ui/
[React]: https://react.dev/
[`serve`]: https://github.com/vercel/serve#readme