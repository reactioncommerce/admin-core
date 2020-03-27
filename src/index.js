/* eslint-disable react/no-multi-comp */
import React from "react";
import { Reaction, registerPlugin, App } from "../package/src";
import config from "./reaction.config";

// Register fake plugins for testing
registerPlugin(() => ({
  route: "/test-1",
  navTitle: "Test 1",
  // eslint-disable-next-line react/display-name
  MainComponent: () => (<span>Route Test 1</span>)
}));

registerPlugin(() => ({
  route: "/test-2",
  navTitle: "Test 2",
  // eslint-disable-next-line react/display-name
  MainComponent: () => (<span>Route Test 2</span>)
}));

// Configure and "start" the Reaction webapp
Reaction({
  AppComponent: App,
  title: "Reaction Admin Core Lib",
  ...config
});
