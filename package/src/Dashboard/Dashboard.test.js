import React from "react";
import { render } from "../test-utils";
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

const mockPlugins = [
  {
    route: "/test-1",
    navTitle: "Test 1",
    // eslint-disable-next-line react/display-name
    MainComponent: () => (<span>Route Test 1</span>)
  }
];

test("should be true", () => {
  const { asFragment } = render((
    <Dashboard
      title="Test App"
      plugins={mockPlugins}
    />
  ));
  expect(asFragment()).toMatchSnapshot();
});
