import React from "react";
import ReactDOM from "react-dom";
import initApollo from "../graphql/initApollo";
import { getOidcProps } from "./authentication";
import { plugins } from "./plugins";

/**
 * The starting point for the web-app
 * @param {Object} props Props and config for the app
 * @returns {undefined} no return
 */
export function Reaction(props) {
  const {
    config: {
      PUBLIC_GRAPHQL_API_URL,
      PUBLIC_OIDC_CLIENT_ID,
      PUBLIC_OIDC_URL,
      PUBLIC_ROOT_URL
    },
    AppComponent,
    DashboardComponent,
    dashboardComponentProps
  } = props;

  // Initialize apollo client to be used for the ApolloProvider in the AppComponent
  const apolloClient = initApollo({ graphqlApiUrl: PUBLIC_GRAPHQL_API_URL });

  // Create OIDC props to be used on the AuthenticationProvider in the AppComponent
  const authenticationProviderProps = getOidcProps({
    oidcClientId: PUBLIC_OIDC_CLIENT_ID,
    oidcUrl: PUBLIC_OIDC_URL,
    rootUrl: PUBLIC_ROOT_URL
  });

  ReactDOM.render(
    (
      <AppComponent
        DashboardComponent={DashboardComponent}
        apolloClient={apolloClient}
        authenticationProviderProps={authenticationProviderProps}
        dashboardComponentProps={dashboardComponentProps}
        plugins={plugins}
      />
    ), document.getElementById("app")
  );
}
