import React from "react";
import i18next from "i18next";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import useRoutes from "../hooks/useRoutes";

const useStyles = makeStyles((theme) => ({
  listItemRoot: {
    "paddingTop": theme.spacing(1),
    "paddingBottom": theme.spacing(1),
    "paddingLeft": theme.spacing(4),
    "marginBottom": 2,
    "&$focusVisible": {
      color: theme.palette.colors.coolGrey500,
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.palette.colors.darkBlue100
    },
    "&$selected, &$selected:hover": {
      color: theme.palette.colors.coolGrey500,
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.palette.colors.darkBlue100
    }
  },
  listItemButton: {
    "borderRadius": theme.shape.borderRadius,
    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.palette.colors.darkBlue100
    }
  },
  /* Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`. */
  focusVisible: {},
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {}
}));

/**
 * @summary A list settings for a shop
 * @returns {Node} React node
 */
export default function SettingsMenu() {
  const classes = useStyles();
  const history = useHistory();
  const routeMatch = useRouteMatch("/settings/:setting");
  const settingsRoutes = useRoutes({ groups: ["settings"] });

  return (
    <List>
      {settingsRoutes && Array.isArray(settingsRoutes) && settingsRoutes.map((setting) => (
        <ListItem
          button
          component="nav"
          key={setting.path}
          selected={setting.path.startsWith(routeMatch.url)}
          classes={{
            root: classes.listItemRoot,
            selected: classes.selected,
            button: classes.listItemButton
          }}
          onClick={() => {
            history.push(setting.path);
          }}
        >
          <ListItemText
            primary={i18next.t(setting.navigationItemLabel)}
          />
        </ListItem>
      ))}
    </List>
  );
}
