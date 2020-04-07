import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Helmet from "react-helmet";
import i18next from "i18next";
import { UIContext } from "../context/UIContext";
import useMediaQuery from "../hooks/useMediaQuery";
import ContentLayout from "../ContentLayout";

/**
 * Operator routes
 * @param {Object} props ComponentProps
 * @returns {Object} An object containing filtered routes
 */
function Routes({
  DefaultLayoutComponent = ContentLayout,
  isExactMatch,
  routes
}) {
  const isMobile = useMediaQuery("mobile");
  const uiContext = useContext(UIContext);

  return (
    <Switch>
      {routes.map((route) => (
        <Route
          exact={isExactMatch}
          key={route.path}
          path={route.path}
          render={(routeProps) => {
            const title = i18next.t(route.navigationItemLabel);

            if (route.LayoutComponent === null) {
              return (
                <>
                  <Helmet title={title} />
                  <route.MainComponent {...routeProps} />
                </>
              );
            }

            const LayoutComponent = route.LayoutComponent || DefaultLayoutComponent;

            return (
              <LayoutComponent
                isLeadingDrawerOpen={!isMobile}
                isTrailingDrawerOpen={uiContext.isDetailDrawerOpen && !isMobile}
                {...route.layoutComponentProps}
              >
                <Helmet title={title} />
                <route.MainComponent {...routeProps} />
              </LayoutComponent>
            );
          }}
          {...route.props}
        />
      ))}
    </Switch>
  );
}

Routes.propTypes = {
  DefaultLayoutComponent: PropTypes.element,
  isExactMatch: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    props: PropTypes.object
  }))
};

export default Routes;
