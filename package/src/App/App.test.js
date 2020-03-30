/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from "react";
import { Route, Switch } from "react-router-dom";
import { render } from "../test-utils";
import App from "./App";

jest.mock("@axa-fr/react-oidc-context", () => ({
  AuthenticationProvider: ({ children }) => children,
  OidcSecure: ({ children }) => children
}));

const mockPlugins = [
  {
    route: "/test-1",
    navTitle: "Test 1",
    // eslint-disable-next-line react/display-name
    MainComponent: () => (<span>Route Test 1</span>)
  }
];

const MockDashboardComponent = ({ title, plugins }) => (
  <div>
    <h1>{title}</h1>
    <Switch>
      {plugins.map(({ MainComponent, route }, index) => (
        <Route exact path={route} component={MainComponent} key={index} />
      ))}
    </Switch>
  </div>
);

test("should be true", () => {
  const { asFragment } = render((
    <App
      DashboardComponent={MockDashboardComponent}
      dashboardComponentProps={{
        title: "Test App"
      }}
      plugins={mockPlugins}
    />
  ));
  expect(asFragment()).toMatchSnapshot();
});
