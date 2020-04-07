/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */
import React from "react";
import TagIcon from "mdi-material-ui/Tag";
import { Card, CardContent } from "@material-ui/core";

/**
 * Register sample tags plugin
 * @param {Object} params Params provided by `registerPlugin`
 * @returns {undefined}
 */
export default function ({ registerRoute, registerSetting, registerBlock }) {
  // Register routes
  registerRoute({
    path: "/tags",
    group: "navigation",
    navigationItemLabel: "Tags (sample)",
    IconComponent: TagIcon,
    MainComponent: () => (
      <Card>
        <CardContent>
          Display Tags
        </CardContent>
      </Card>
    )
  });

  registerSetting({
    name: "tags",
    navigationItemLabel: "Tags",
    MainComponent: () => (
      <Card>
        <CardContent>
          Setting for tags
        </CardContent>
      </Card>
    )
  });

  // Register blocks
  registerBlock({
    name: "ProductTags",
    region: "ProductDetailMain",
    Component: () => (
      <Card>
        <CardContent>
          "Product Tags" Block registered in "Tags" plugin
        </CardContent>
      </Card>
    )
  });
}
