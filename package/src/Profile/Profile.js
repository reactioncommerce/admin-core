import React from "react";
import { Box } from "@material-ui/core";
import Blocks from "../Blocks";

/**
 * @summary Profile React component
 * @param {Object} props React props
 * @return {React.Node} React node
 */
export default function ProfileMenu() {
  return (
    <Blocks region="Profile">
      {(blocks) =>
        blocks.map((block, index) => (
          <Box key={index} marginBottom={2}>
            {block}
          </Box>
        ))
      }
    </Blocks>
  );
}
