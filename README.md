# Stream Flows

Streams Flows is a React web app that visualizes recent historical USGS streamflow data. 
The intended use case is for planning fly fishing trips in Colorado, but this app could
be useful for any stream-based activity (e.g. rafting, swimming).

## Limitations

### Restricted site locations

Today, the `AddSiteDialog` only shows USGS sites in CO. However, this app can render data from 
any active USGS site in the United States.

Until `AddSiteDialog` is expanded to include sites beyond CO, users can add them by finding the
corresponding site ID via https://maps.waterdata.usgs.gov/mapper/index.html and adding a new `site` 
query paramater to the app URL. 

For example, the site [RIO GRANDE AT STATE HWY 346 NEAR BOSQUE, NM](https://waterdata.usgs.gov/nwis/inventory?agency_code=USGS&site_no=08331510) 
can be manually added by appending `&site=08331510` to the app URL.

## Tecnical details

- Retreives live streamflow data from the following USGS REST APIs:
    - [USGS Instantaneous Values Web Service](https://waterservices.usgs.gov/rest/IV-Service.html)
    - [USGS Daily Values Site Web Service](https://waterservices.usgs.gov/rest/DV-Service.html)
- Written in [Typescript](https://www.typescriptlang.org/)
- Uses [ESLint](https://eslint.org/) for static analysis
- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Client-only app served using [GitHub Pages](https://pages.github.com/)

## Architecture

This is a client application that consumes data from independent USGS REST APIs. There are no custom
backend components.

When a user adds a new USGS site, it is added as a `site` query parameter on the URL. 
Users can bookmark the updated URL to view at a later time.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run deploy`

Deploys the app to GitHub pages.\
Open https://codylund.github.io/stream-flows/ to view it in the browser.

This is a production endpoint. All release candidates should be thuroughly tested before deployment.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Note: there are currently no tests in this project.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
