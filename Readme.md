# Dero API Playground
Following Apollos Dero courses

This site is to learn how to interact with the API bridge 

Smart Contracts are written & compiled on my Goland IDE running Go

## To get this site set up

```
yarn create vite  (from parent dir)
```
Then I added Dero dependencies 

```yarn add await-to-js dero-rpc-bridge-api```

Initially, going to avoid a CSS framework and instead try Tailwind

```yarn add tailwindcss postcss autoprefixer```

Followed this article to get Tailwind set up: https://blog.logrocket.com/setting-up-dev-environment-react-vite-tailwind/

```yarn tailwindcss init```

Then added ```"./src/**/*.{js,jsx,ts,tsx}"```  to content[] within the tailwind.config.cjs file to tell tailwind what files to act on

Then deleted all from index.css, and added the following:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Finally created file `postcss.config.cjs` and added thi content:

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

#### Adding Classnames module 
Enables styled base components using tailwind
[Read here](https://www.smashingmagazine.com/2020/05/reusable-react-components-tailwind/)

ToDo - Article to create a theme for react using tailwind [Read Here](https://blog.logrocket.com/theming-react-components-tailwind-css/)

`yarn add classnames`

#### Adding prop-types since not using Typescript

`yarn add prop-types`

### Dero Contract calls 
From the background.js github file (see link in Resources below), we use `start-transfer` wallet call to interact with Smart Contracts on chain via RPC Bridge

## Resources
 - Tailwind https://nerdcave.com/tailwind-cheat-sheet
 - Styled Components with vite: https://dev.to/glocore/configure-emotion-with-your-vite-react-project-7jl
 - Apollo Odyssey Video for rpc bridge: https://odysee.com/@apollo5ever:1/dd101-w3-api:e
 - Github source for Bridge - This is drilled down into test file where I can copy/paste & the code used to connect to the bridge: https://github.com/g45t345rt/dero-rpc-bridge/blob/master/api/webpage-test/index.js
 - Github source for api calls to interact with Bridge - https://github.com/g45t345rt/dero-rpc-bridge/blob/master/extension/src/background.js