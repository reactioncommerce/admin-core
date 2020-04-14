/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from "react";
import { registerRoute, registerSetting, routes, defaultRouteGroups } from "./routes";

beforeEach(() => {
  // Clear the routes array for each test
  routes.splice(0, routes.length);
});

test("should register a route", () => {
  registerRoute({
    navigationItemLabel: "Test",
    path: "/test",
    MainComponent: () => (<span>Test Component</span>)
  });

  expect(routes.length).toEqual(1);
  expect(routes[0].navigationItemLabel).toEqual("Test");
  expect(typeof routes[0].MainComponent).toEqual("function");
  expect(routes[0]).toEqual({
    priority: expect.any(Number),
    navigationItemLabel: "Test",
    path: "/test",
    MainComponent: expect.any(Function)
  });
});

test("should register a setting route", () => {
  registerSetting({
    name: "test-setting",
    navigationItemLabel: "Test Setting",
    MainComponent: () => (<span>Test Component</span>)
  });

  expect(routes.length).toEqual(1);

  expect(routes[0]).toEqual({
    priority: expect.any(Number),
    name: "test-setting",
    group: defaultRouteGroups.settings,
    navigationItemLabel: "Test Setting",
    path: "/settings/test-setting",
    href: "/settings/test-setting",
    MainComponent: expect.any(Function)
  });
});
