#!/usr/bin/env node
/* eslint-disable node/shebang */
/* eslint-disable no-console */

const http = require("http");
const { URL } = require("url");

// const missing = [
//   "OAUTH2_ADMIN_URL",
//   "OAUTH2_CLIENT_ID",
//   "ROOT_URL"
// ].filter((key) => !process.env[key]);

const OAUTH2_ADMIN_HOST = "localhost";
const OAUTH2_ADMIN_PORT = 4445;
const OAUTH2_CLIENT_ID = "reaction-admin-core";
const ROOT_URL = "http://localhost:8081";

// if (missing.length) {
//   console.error(`ERROR: Missing required environment variables ${missing.join(" ")}`);
//   process.exit(12);
// }

const makeAbsolute = (relativeUrl, baseUrl = ROOT_URL) => {
  const url = new URL(relativeUrl, baseUrl);
  return url.href;
};

/* eslint-disable camelcase */
const bodyEncoded = JSON.stringify({
  client_id: OAUTH2_CLIENT_ID,
  token_endpoint_auth_method: "none",
  redirect_uris: [
    makeAbsolute("/authentication/callback"),
    makeAbsolute("/authentication/silent_callback")
  ],
  grant_types: ["authorization_code"],
  response_types: ["code"],
  post_logout_redirect_uris: [ROOT_URL]
});
/* eslint-enable camelcase */

const options = {
  hostname: OAUTH2_ADMIN_HOST,
  port: OAUTH2_ADMIN_PORT,
  path: "/clients",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(bodyEncoded)
  }
};

const req = http.request(options, (res) => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", (chunk) => {
    body += chunk.toString();
  });
  res.on("end", () => {
    switch (res.statusCode) {
      case 200:
      // intentional fallthrough!
      // eslint-disable-line no-fallthrough
      case 201:
        console.log("OK: hydra client created");
        break;
      case 409:
        console.log("OK: hydra client already exists");
        break;
      default:
        console.error("ERROR: Could not create hydra client");
        console.error(body);
        // eslint-disable-next-line no-process-exit
        process.exit(10);
    }
  });
});

req.on("error", (error) => {
  console.error("ERROR: Could not create hydra client");
  console.error(error.message);
  // eslint-disable-next-line no-process-exit
  process.exit(11);
});

req.end(bodyEncoded);
