import React from "react";
import i18next from "i18next";
import { Switch, Route } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import useRoutes from "../hooks/useRoutes";
import AppBar from "../AppBar";
import ContentLayoutTwoColumn from "../ContentLayoutTwoColumn";
import SettingsMenu from "../SettingsMenu";

/**
 * @name SettingsDashboard
 * @returns {React.component} a functional React component
 */
export default function SettingsDashboard() {
  const settingsRoutes = useRoutes({ groups: ["settings"] });
  return (
    <ContentLayoutTwoColumn
      AppBarComponent={
        <AppBar title={i18next.t("admin.settings.settingsLabel")} />
      }
      PrimaryComponent={
        <Box paddingX={4}>
          <SettingsMenu />
        </Box>
      }
      DetailComponent={
        <Container maxWidth="md">
          <Switch>
            {
              settingsRoutes.map((settingRoute) => (
                <Route
                  key={settingRoute.path}
                  component={settingRoute.MainComponent}
                  path={settingRoute.path}
                />
              ))
            }
          </Switch>
        </Container>
      }
    />
  );
}
