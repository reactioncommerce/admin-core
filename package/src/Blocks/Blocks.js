import React from "react";
import PropTypes from "prop-types";
import { BlockComponents } from "../lib/core/blocks";

/**
 * @name Blocks
 * @method
 * @memberof Components/Helpers
 * @param {Object} props Component props
 * @returns {React.Component} returns a React component containing requested blocks
 */
export function Blocks(props) {
  const {
    region,
    children,
    blockProps
  } = props;
  const blocks = BlockComponents[region];
  if (!blocks) return null;

  const elements = blocks.map((BlockComponent, key) => (
    <BlockComponent key={key} {...blockProps} />
  ));

  return children(elements);
}

Blocks.defaultProps = {
  children: (blocks) => blocks
};

Blocks.propTypes = {
  children: PropTypes.func.isRequired
};

export default Blocks;
