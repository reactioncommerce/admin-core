# Reaction Admin Core

## Installation and usage

### Install dependencies

```sh
# Install the Admin Core package
`npm i @reactioncommerce/admin-core`

# Install all required peer-dependencies
`npx install-peerdeps --only-peers @reactioncommerce/admin-core`
```

###  Create a folder called `src` at the base of your repo

### Add the file `src/index.html` using the following template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Reaction Admin</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

### Add the file `src/index.js`  using the following template

```js
/* eslint-disable react/no-multi-comp */
import React from "react";
import { Reaction, registerPlugin, App } from "@reactioncommerce/admin-core";

// Register fake plugins for testing
registerPlugin(() => ({
  route: "/test-1",
  navTitle: "Test 1",
  // eslint-disable-next-line react/display-name
  MainComponent: () => (<span>Route Test 1</span>)
}));

registerPlugin(() => ({
  route: "/test-2",
  navTitle: "Test 2",
  // eslint-disable-next-line react/display-name
  MainComponent: () => (<span>Route Test 2</span>)
}));

// Configure and "start" the Reaction webapp
Reaction({
  AppComponent: App,
  title: "Reaction Admin Core Lib",

  // Ideally these config variables will come from the ENV.
  // dotenv is provided as part of admin-core if you wish yo use it.
  config: {
    PUBLIC_GRAPHQL_API_URL: "http://localhost:3000/graphql",
    PUBLIC_OIDC_CLIENT_ID: "reaction-admin-core",
    PUBLIC_OIDC_URL: "http://localhost:4444",
    PUBLIC_ROOT_URL: "http://localhost:8080"
  }
});
```

### Add the start script to your `package.json` scripts

```js
"scripts": {
  ...
  "start": "reaction --port 8080"
  ...
}
```

### Run your app

`npm start`

*Open http://localhost:8080 to view your site.*

## License

Copyright 2020 Reaction Commerce

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
