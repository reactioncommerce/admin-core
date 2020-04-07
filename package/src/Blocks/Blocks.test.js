/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from "react";
import { render } from "../test-utils";
import { registerBlock } from "../lib/core/blocks";
import Blocks from "./Blocks";

registerBlock({
  name: "block-1",
  region: "test",
  Component: () => (<span>Block 1</span>)
});

registerBlock({
  name: "block-2",
  region: "test",
  Component: () => (<span>Block 2</span>)
});

test("render the Blocks region named 'test' with two registered blocks", () => {
  const { asFragment } = render((
    <Blocks region="test" />
  ));
  expect(asFragment()).toMatchSnapshot();
});
