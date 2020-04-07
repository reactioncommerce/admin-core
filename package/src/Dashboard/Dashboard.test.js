/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from "react";
import { render } from "../test-utils";
import { registerRoute } from "../lib/core/routes";
import Dashboard from "./Dashboard";

jest.mock("../hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({
    logout: jest.fn(),
    viewer: {
      primaryEmail: "test@reactioncommerce.com"
    }
  })
}));

jest.mock("../ShopLogo", () => ({
  __esModule: true,
  default: () => null
}));

registerRoute({
  group: "navigation",
  path: "/test",
  navigationItemTitle: "Test",
  MainComponent: () => (<span>Main Component</span>)
});

test("should render the Dashboard component with a single route", () => {
  const { asFragment } = render((
    <Dashboard />
  ));
  expect(asFragment()).toMatchSnapshot();
});
