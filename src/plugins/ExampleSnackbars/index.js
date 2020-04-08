/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */
import React from "react";
import TagIcon from "mdi-material-ui/Tag";
import { Box, Card, CardContent, CardHeader } from "@material-ui/core";
import { Button } from "@reactioncommerce/catalyst";
import { useSnackbar } from "../../../package/src";

/**
 * Register sample tags plugin
 * @param {Object} params Params provided by `registerPlugin`
 * @returns {undefined}
 */
export default function ({ registerRoute }) {
  // Register routes
  registerRoute({
    path: "/snackbars",
    group: "navigation",
    navigationItemLabel: "Snackbars",
    IconComponent: TagIcon,
    MainComponent: () => {
      const { enqueueSnackbar } = useSnackbar();

      const handleSuccess = () => {
        enqueueSnackbar("Success", {
          variant: "success"
        });
      };

      const handleError = () => {
        enqueueSnackbar("Error", {
          variant: "error"
        });
      };

      const handleWarning = () => {
        enqueueSnackbar("Error", {
          variant: "warning"
        });
      };

      const handleInfo = () => {
        enqueueSnackbar("Error", {
          variant: "info"
        });
      };

      return (
        <Card>
          <CardHeader title="Snackbar examples" />
          <CardContent>
            <Box paddingBottom={1}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSuccess}
              >
                  Open success snackbar
              </Button>
            </Box>

            <Box paddingBottom={1}>
              <Button
                color="error"
                variant="contained"
                onClick={handleError}
              >
                Open error snackbar
              </Button>
            </Box>

            <Box paddingBottom={1}>
              <Button
                color="primary"
                onClick={handleWarning}
              >
                Open warning snackbar
              </Button>
            </Box>

            <Box paddingBottom={1}>
              <Button
                color="primary"
                onClick={handleInfo}
              >
                Open info snackbar
              </Button>
            </Box>

          </CardContent>
        </Card>
      );
    }
  });
}
