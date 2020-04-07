import { registerRoute } from "./routes";
import { registerBlock, replaceBlock } from "./blocks";

export const plugins = [];

/**
 * Plugin registration
 * @param {Plugin} plugin An object containing the plugins configuration
 * @returns {undefined} no return
 */
export function registerPlugin(plugin) {
  plugins.push(plugin({
    registerRoute,
    registerBlock,
    replaceBlock
  }));
}
