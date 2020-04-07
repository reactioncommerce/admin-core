import React from "react";
import ReactDOM from "react-dom";
import SettingsIcon from "mdi-material-ui/Settings";
import initApollo from "../graphql/initApollo";
import SettingsDashboard from "../../SettingsDashboard";
import Profile from "../../Profile";
import { getOidcProps } from "./authentication";
import { plugins } from "./plugins";
import { registerRoute } from "./routes";
import { initI18next } from "./i18n";
import { loadRegisteredBlocks } from "./blocks";

/**
 * The starting point for the web-app
 * @param {Object} props Props and config for the app
 * @returns {undefined} no return
 */
export async function Reaction(props) {
  const {
    config: {
      PUBLIC_GRAPHQL_API_URL,
      PUBLIC_I18N_BASE_URL,
      PUBLIC_I18N_FALLBACK_LANGUAGE,
      PUBLIC_OIDC_CLIENT_ID,
      PUBLIC_OIDC_URL,
      PUBLIC_ROOT_URL
    },
    AppComponent,
    DashboardComponent,
    SettingsDashboardComponent = SettingsDashboard,
    dashboardComponentProps,
    settingsRouteProps,
    shouldShowSettingsInNavigation = true
  } = props;

  // Initialize apollo client to be used for the ApolloProvider in the AppComponent
  const apolloClient = initApollo({ graphqlApiUrl: PUBLIC_GRAPHQL_API_URL });

  // Init i18next
  await initI18next({
    i18nBaseUrl: PUBLIC_I18N_BASE_URL,
    fallbackLng: PUBLIC_I18N_FALLBACK_LANGUAGE
  });

  // Load registered blocks
  loadRegisteredBlocks();

  if (shouldShowSettingsInNavigation) {
    registerRoute({
      group: "navigation",
      priority: 9999,
      path: "/settings/:setting?",
      href: "/settings/shop",
      LayoutComponent: null,
      MainComponent: SettingsDashboardComponent,
      IconComponent: SettingsIcon,
      navigationItemLabel: "admin.settings.settingsLabel",
      ...settingsRouteProps
    });
  }

  // Register a profile page
  registerRoute({
    path: "/profile",
    MainComponent: Profile
  });

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
