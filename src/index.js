import { Reaction, registerPlugin } from "../package/src";
import React from "react";
import config from "./reaction.config";

// Register fake plugins for testing
registerPlugin(() => {
  return {
    route: "/test-1",
    navTitle: "Test 1",
    MainComponent: () => (<span>Route Test 1</span>)
  }
})

registerPlugin(() => {
  return {
    route: "/test-2",
    navTitle: "Test 2",
    MainComponent: () => (<span>Route Test 2</span>)
  }
})

// Configure and "start" the Reaction webapp
Reaction({
  title: "Reaction Admin Core Lib",
  ...config
});