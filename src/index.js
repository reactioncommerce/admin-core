/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */
import { Reaction, registerPlugin, App } from "../package/src";
import config from "./config";
import ExamplePluginProducts from "./plugins/ExamplePluginProducts";
import ExamplePluginTags from "./plugins/ExamplePluginTags";
import ExampleLayouts from "./plugins/ExampleLayouts";
import ExampleSnackbars from "./plugins/ExampleSnackbars";

/**
 * Register plugins for testing.
 *
 * In a real application, plugins can either live locally in the project,
 * or installed as NPM packages and registered here.
 *
 * For this sample application, the plugins are all local.
 */
registerPlugin(ExamplePluginProducts);
registerPlugin(ExamplePluginTags);
registerPlugin(ExampleLayouts);
registerPlugin(ExampleSnackbars);

// Configure and "start" the Reaction webapp
Reaction({
  AppComponent: App,
  title: "Reaction Admin Core Lib",
  config
});
