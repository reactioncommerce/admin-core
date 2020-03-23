import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core";
import { defaultTheme } from "@reactioncommerce/catalyst";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider, OidcSecure, oidcLog } from "@axa-fr/react-oidc-context";
import initApollo from "./lib/graphql/initApollo"
import { ApolloProvider } from "react-apollo";

const plugins = [];

export function Reaction(props) {
  const { oidcClientId, oidcUrl, rootUrl, AppComponent, ...appProps } = props;
  const BaseComponent = AppComponent || App;
  // const oidcProps = getOidcProps({ oidcClientId, oidcUrl, rootUrl});

  const apolloClient = initApollo()

  const oidcConfiguration = {
    client_id: oidcClientId,
    redirect_uri: makeAbsolute("/authentication/callback", rootUrl),
    response_type: "code",
    post_logout_redirect_uri: rootUrl,
    scope: "openid",
    authority: oidcUrl,
    silent_redirect_uri: makeAbsolute("/authentication/silent_callback", rootUrl),
    automaticSilentRenew: true,
    loadUserInfo: true,
    triggerAuthFlow: true
  };
console.log("config", oidcConfiguration)
  const oidcProps = {
    configuration: oidcConfiguration,
    // NONE, ERROR, WARN, INFO, DEBUG
    // Change to DEBUG temporarily if you're debugging an issue with login/logout/auth
    loggerLevel: oidcLog.DEBUG,
    // These are components for which the @axa-fr/react-oidc-context package shows
    // default text if we don't override these. We don't really need them since in
    // our situation they're only shown for a second.
    authenticating: () => null,
    callbackComponentOverride: () => null,
    notAuthenticated: () => null,
    notAuthorized: () => null,
    sessionLostComponent: () => null
  };

  ReactDOM.render((
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AuthenticationProvider {...oidcProps}>
          <ThemeProvider theme={defaultTheme}>
            <OidcSecure>
              <BaseComponent
                {...appProps}
                plugins={plugins}
              />
            </OidcSecure>
          </ThemeProvider>
        </AuthenticationProvider>
      </BrowserRouter>
    </ApolloProvider>
  ), document.getElementById("app"));
}

export function registerPlugin(plugin) {
  plugins.push(plugin())
}

const makeAbsolute = (relativeUrl, rootUrl) => {
  const url = new URL(relativeUrl, rootUrl); // eslint-disable-line node/no-unsupported-features/node-builtins
  return url.href;
};

function getOidcProps({ oidcClientId, oidcUrl, rootUrl }) {
  const oidcConfiguration = {
    client_id: oidcClientId,
    redirect_uri: makeAbsolute("/authentication/callback", rootUrl),
    response_type: "code",
    post_logout_redirect_uri: rootUrl,
    scope: "openid",
    authority: oidcUrl,
    silent_redirect_uri: makeAbsolute("/authentication/silent_callback", rootUrl),
    automaticSilentRenew: true,
    loadUserInfo: true,
    triggerAuthFlow: true
  };

  return {
    configuration: oidcConfiguration,
    // NONE, ERROR, WARN, INFO, DEBUG
    // Change to DEBUG temporarily if you're debugging an issue with login/logout/auth
    loggerLevel: oidcLog.NONE,
    // These are components for which the @axa-fr/react-oidc-context package shows
    // default text if we don't override these. We don't really need them since in
    // our situation they're only shown for a second.
    authenticating: () => null,
    callbackComponentOverride: () => null,
    notAuthenticated: () => null,
    notAuthorized: () => null,
    sessionLostComponent: () => null
  };
}

export default {
  Reaction,
  registerPlugin
};