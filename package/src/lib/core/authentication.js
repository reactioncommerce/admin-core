import { oidcLog } from "@axa-fr/react-oidc-context";

const makeAbsolute = (relativeUrl, rootUrl) => {
  const url = new URL(relativeUrl, rootUrl); // eslint-disable-line node/no-unsupported-features/node-builtins
  return url.href;
};

/**
 * Generate props for the Oidc AuthenticationProvider
 * @param {Object} config Config options
 * @param {String} config.oidcClientId OIDC client id
 * @param {String} config.oidcUrl OIDC url
 * @param {String} config.rootUrl Webapp root url
 * @returns {Object} An object containing props for the Oidc AuthenticationProvider
 */
export function getOidcProps({ oidcClientId, oidcUrl, rootUrl, ...otherProps }) {
  /* eslint-disable camelcase */
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
  /* eslint-enable camelcase */

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
    sessionLostComponent: () => null,
    ...otherProps
  };
}
