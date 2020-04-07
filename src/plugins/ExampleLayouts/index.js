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
export default function ({ registerRoute }) {
  // Register routes
  registerRoute({
    path: "/layout-standard",
    group: "navigation",
    navigationItemLabel: "Standard Layout",
    IconComponent: TagIcon,
    MainComponent: () => (
      <Card>
        <CardContent>
          Standard layout is centered with a max-width.
        </CardContent>
      </Card>
    )
  });

  registerRoute({
    path: "/layout-wide",
    group: "navigation",
    navigationItemLabel: "Wide Layout",
    layoutComponentProps: {
      size: "wide"
    },
    IconComponent: TagIcon,
    MainComponent: () => (
      <Card>
        <CardContent>
          Wide layout is full width including padding on the leading and trailing edges of the view.
        </CardContent>
      </Card>
    )
  });

  registerRoute({
    path: "/layout-full",
    group: "navigation",
    navigationItemLabel: "Full Layout",
    layoutComponentProps: {
      size: "full"
    },
    IconComponent: TagIcon,
    MainComponent: () => (
      <Card>
        <CardContent>
          Full layout if full width with padding on the leading and trailing edges of the view.
          The "Full" layout doesn't scroll.
        </CardContent>
      </Card>
    )
  });
}
