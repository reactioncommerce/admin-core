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
    graphqlApiUrl,
    oidcClientId,
    oidcUrl,
    rootUrl,
    AppComponent,
    DashboardComponent,
    dashboardComponentProps
  } = props;

  const apolloClient = initApollo({ graphqlApiUrl });
  const authenticationProviderProps = getOidcProps({ oidcClientId, oidcUrl, rootUrl });

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
