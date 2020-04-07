import envalid from "envalid";

const config = {
  PUBLIC_GRAPHQL_API_URL: process.env.PUBLIC_GRAPHQL_API_URL,
  PUBLIC_OIDC_CLIENT_ID: process.env.PUBLIC_OIDC_CLIENT_ID,
  PUBLIC_OIDC_URL: process.env.PUBLIC_OIDC_URL,
  PUBLIC_ROOT_URL: process.env.PUBLIC_ROOT_URL,
  PUBLIC_I18N_BASE_URL: process.env.PUBLIC_I18N_BASE_URL,
  PUBLIC_I18N_FALLBACK_LANGUAGE: process.env.PUBLIC_I18N_FALLBACK_LANGUAGE
};

export default envalid.cleanEnv(config, {
  PUBLIC_GRAPHQL_API_URL: envalid.str({
    desc: "A URL that is accessible from browsers and accepts GraphQL POST requests over HTTP",
    example: "http://localhost:3000/graphql"
  }),
  PUBLIC_I18N_BASE_URL: envalid.str({
    desc: "A URL that has /locales/namespaces.json and /locales/resources.json endpoints for loading translations",
    example: "http://localhost:3000"
  }),
  PUBLIC_I18N_FALLBACK_LANGUAGE: envalid.str({
    default: "en",
    desc: "The language to fallback on in case of a failure to detect or load the preferred language",
    example: "en"
  }),
  PUBLIC_OIDC_CLIENT_ID: envalid.str({
    default: "reaction-admin-core",
    desc: "The OAuth2 client ID to use for authentication flows from the browser",
    example: "reaction-admin-core"
  }),
  PUBLIC_OIDC_URL: envalid.url({
    desc: "An OAuth2 OpenID Connect compliant URL",
    example: "http://localhost:4444"
  }),
  PUBLIC_ROOT_URL: envalid.url({
    desc: "The canonical root URL for the Reaction Admin Core site",
    example: "http://localhost:8081"
  })
});
