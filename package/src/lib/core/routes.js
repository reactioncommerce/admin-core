export const routes = [];
export const defaultRouteGroups = {
  navigation: "navigation",
  settings: "settings"
};

/**
 * @name registerRoute
 * @summary Registers new route for the admin UI.
 * @param {Object} route - The route
 * @param {String} route.path - The URL path for this route
 * @param {Node|String} route.MainComponent - A react component to render in
 * the main content area or the name of a Blaze template that has been registered
 * by a package.
 * @param {Node} route.IconComponent - A React component that renders the menu icon for this route
 * @param {String} route.navigationItemLabel - The i18n key for this route, i.e. "admin.dashboard.ordersLabel"
 * @returns {undefined}
 */
export function registerRoute(route) {
  routes.push(route);
}
