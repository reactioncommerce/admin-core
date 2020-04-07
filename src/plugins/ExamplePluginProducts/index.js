/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */
import React from "react";
import FolderIcon from "mdi-material-ui/Folder";
import { Card, CardContent, Box } from "@material-ui/core";

// Normally imported like `import { Blocks } from "@reactioncommerce/admin-core";`
import { Blocks } from "../../../package/src";

/**
 * Register sample products plugin
 * @param {Object} params Params provided by `registerPlugin`
 * @returns {undefined}
 */
export default function ({ registerRoute, registerSetting, registerBlock }) {
  // Register routes
  registerRoute({
    path: "/products",
    group: "navigation",
    navigationItemLabel: "Products (sample)",
    IconComponent: FolderIcon,
    MainComponent: () => (
      <Blocks region="ProductDetailMain">
        {(blocks) =>
          blocks.map((block, index) => (
            <Box key={index} marginBottom={2}>
              {block}
            </Box>
          ))
        }
      </Blocks>
    )
  });

  // Register settings
  registerSetting({
    name: "products",
    navigationItemLabel: "Products",
    MainComponent: () => (
      <Card>
        <CardContent>
          Product plugin settings
        </CardContent>
      </Card>
    )
  });

  // Register blocks
  registerBlock({
    name: "ProductDetails",
    region: "ProductDetailMain",
    Component: () => (
      <Card>
        <CardContent>
          "Product Details" Block registered in "Products" plugin
        </CardContent>
      </Card>
    )
  });

  registerBlock({
    name: "ProductMedia",
    region: "ProductDetailMain",
    Component: () => (
      <Card>
        <CardContent>
          "Product Media" Block registered in "Products" plugin
        </CardContent>
      </Card>
    )
  });
}
