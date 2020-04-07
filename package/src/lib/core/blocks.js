import Logger from "../../utils/logger";

export const BlocksTable = {}; // storage for separate elements of each block
export const BlockComponents = {};

/**
 * @example // Register a component and container(s) with a name.
 * // The raw component can then be extended or replaced.
 *
 * // Structure of a component in the list:
 *
 * BlocksTable.MyComponent = {
 *    name: 'MyComponent',
 *    hocs: [fn1, fn2],
 *    rawComponent: React.Component
 * }
 * @name registerComponent
 * @method
 * @memberof Components/Helpers
 * @param {Object} options The name of the component to register.
 * @param {Object} options.name The name of the component to register.
 * @param {Object} options.Component The name of the component to register.
 * @param {Object} options.region The name of the component to register.
 * @param {Object} options.priority The name of the component to register.
 * @param {Object} options.priority The name of the component to register.
 * @param {React.Component} rawComponent Interchangeable/extendable component.
 * @param {Function|Array} hocs The HOCs to wrap around the raw component.
 *
 * @returns {React.Component} returns the final wrapped component
 */
export function registerBlock(options) {
  const {
    name,
    Component,
    region,
    priority
  } = options;

  if (!region) {
    throw new Error("A region is required for registerBlock");
  }

  if (!name) {
    throw new Error("A name is required for registerBlock");
  }

  if (!Component) {
    throw new Error("A component is required for registerBlock");
  }

  if (!BlocksTable[region]) {
    BlocksTable[region] = {};
  }

  // store the component in the table
  BlocksTable[region][name] = {
    name,
    Component,
    region,
    priority
  };
}

/**
 * @name getBlock
 * @method
 * @summary Get a block registered with registerBlock({ name, component, hocs, region }).
 * @param {String} regionName The name of region the block belongs to.
 * @param {String} blockName The name of the block.
 * @returns {Function|React.Component} A (wrapped) React component
 * @memberof Components/Helpers
 */
export function getBlock(regionName, blockName) {
  const block = BlocksTable[regionName][blockName];

  if (!block) {
    throw new Error(`Block ${blockName} in region ${regionName} not registered.`);
  }

  return block.Component;
}

/**
 * @name getBlocks
 * @method
 * @summary Get a component registered with registerComponent(name, component, ...hocs).
 * @param {String} regionName The name of the region to get.
 * @returns {Function|React.Component} A (wrapped) React component
 * @memberof Components/Helpers
 */
export function getBlocks(regionName) {
  const region = BlocksTable[regionName];

  if (!region) {
    Logger.warn(`No blocks available for region named ${regionName}.`);
    return null;
  }

  const blocks = Object
    .values(region)
    .sort((blockA, blockB) => blockA.priority - blockB.priority)
    .map(({ Component }) => Component);

  return blocks;
}

/**
 * @name replaceBlock
 * @method
 * @summary Replace a Reaction component with a new component and optionally add one or more higher order components.
 * This function keeps track of the previous HOCs and wraps the new HOCs around previous ones
 * @param {Object} options Object containing block information
 * @param {String} options.region The region of the block that will be replaced
 * @param {String} options.block The name of the block that will be replaced
 * @param {React.Component} options.component Interchangeable/extendable component.
 * @returns {Function|React.Component} A component callable with Components[name]
 * @memberof Components/Helpers
 */
export function replaceBlock({ region, block, Component }) {
  const previousBlock = BlocksTable[region][block];

  if (!previousBlock) {
    throw new Error(`Block '${block}' of region ${region} not found. Use registerComponent to create it.`);
  }

  return registerBlock({
    name: block,
    region,
    Component
  });
}

/**
 * @name getBlockComponent
 * @method
 * @summary Get the Component registered within a block
 * @param {String} regionName The name of the block region.
 * @param {String} blockName The name of the block component to get.
 * @returns {Function|React.Component} A React component
 * @memberof Components/Helpers
 */
export const getBlockComponent = (regionName, blockName) => BlocksTable[regionName][blockName].Component;

/**
 * @name loadRegisteredBlocks
 * @method
 * @summary Populate the final BlockComponents object with the contents of the lookup table.
 * This should only be called once on app startup.
 * @returns {Object} An object containing all of the registered blocks by region
 * @memberof Components/Helpers
 **/
export function loadRegisteredBlocks() {
  Object.keys(BlocksTable).forEach((regionName) => {
    BlockComponents[regionName] = getBlocks(regionName);
  });
  return BlockComponents;
}
