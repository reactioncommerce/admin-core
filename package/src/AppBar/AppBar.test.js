import React from "react";
import { render } from "../test-utils";
import AppBar from "./AppBar";

test("render the AppBar with a title and children", () => {
  const { asFragment } = render((
    <AppBar title="Title">
      <span>Sub Component</span>
    </AppBar>
  ));
  expect(asFragment()).toMatchSnapshot();
});
