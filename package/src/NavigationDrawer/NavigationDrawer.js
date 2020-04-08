import React, { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  Fab,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  makeStyles
} from "@material-ui/core";
import CloseIcon from "mdi-material-ui/Close";
import { useTranslation } from "react-i18next";
import FolderIcon from "mdi-material-ui/Folder";
import ShopLogo from "../ShopLogo";
import UIContext from "../context/UIContext";
import useRoutes from "../hooks/useRoutes";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    "color": theme.palette.colors.white,
    "backgroundColor": theme.palette.colors.darkBlue500,
    "&:hover": {
      "backgroundColor": theme.palette.colors.darkBlue600,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.palette.colors.darkBlue500
      }
    }
  },
  icon: {
    minWidth: 32,
    display: "flex",
    justifyContent: "center",
    marginRight: theme.spacing(2),
    color: theme.palette.colors.coolGrey300
  },
  iconActive: {
    color: theme.palette.text.active
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  listItemRoot: {
    "paddingLeft": theme.spacing(2),
    "paddingRight": theme.spacing(2),
    "&$focusVisible": {
      color: theme.palette.text.secondaryActive,
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.palette.colors.darkBlue600
    },
    "&$selected, &$selected:hover": {
      color: theme.palette.text.secondaryActive,
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.palette.colors.darkBlue600
    },
    "&$selected $icon, &$selected:hover $icon": {
      color: theme.palette.text.active
    }
  },
  listItemText: {
    paddingLeft: 0,
    fontSize: theme.typography.fontSize,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    color: theme.palette.colors.black15
  },
  listItemButton: {
    "borderRadius": theme.shape.borderRadius,
    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.palette.colors.darkBlue600
    }
  },
  /* Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`. */
  focusVisible: {},
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {}
}));

/**
 * Navigation Drawer component
 * @returns {React.Component} NavigationDrawer component
 */
function NavigationDrawer() {
  const classes = useStyles();
  const history = useHistory();
  const routeMatch = useRouteMatch("/:any");
  const primaryRoutes = useRoutes({ groups: ["navigation"] });
  const { t } = useTranslation();
  const {
    isMobile,
    isNavigationDrawerOpen,
    onCloseNavigationDrawer
  } = useContext(UIContext);

  let drawerProps = {
    classes: {
      paper: classes.drawerPaper
    },
    open: true,
    variant: "persistent"
  };

  if (isMobile) {
    drawerProps = {
      variant: "temporary",
      anchor: "left",
      open: isNavigationDrawerOpen,
      onClose: onCloseNavigationDrawer,
      ModalProps: {
        keepMounted: true // Better open performance on mobile.
      }
    };
  }

  return (
    <Drawer {...drawerProps}>
      <AppBar
        color="secondary"
        elevation={0}
        position="sticky"
      >
        <Toolbar className={classes.toolbar}>
          <Box flex={1} marginRight={2}>
            <ShopLogo className={classes.shopLogo} shouldShowShopName size={32} />
          </Box>

          <Hidden mdUp>
            <Fab classes={{ root: classes.closeButton }} onClick={onCloseNavigationDrawer} size="small">
              <CloseIcon />
            </Fab>
          </Hidden>

        </Toolbar>
      </AppBar>
      <List disablePadding>
        {primaryRoutes.map(({
          IconComponent,
          href,
          path,
          navigationItemLabel
        }) => (
          <ListItem
            button
            className={classes.listItem}
            classes={{
              root: classes.listItemRoot,
              selected: classes.selected,
              button: classes.listItemButton
            }}
            key={path}
            selected={routeMatch && ((href && href.startsWith(routeMatch.url)) || path.startsWith(routeMatch.url))}
            onClick={() => {
              history.push(href || path);
              onCloseNavigationDrawer();
            }}
          >
            <ListItemIcon className={classes.icon}>
              {(IconComponent && <IconComponent />) || <FolderIcon />}
            </ListItemIcon>
            <ListItemText
              disableTypography
              className={classes.listItemText}
            >
              {t(navigationItemLabel)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default NavigationDrawer;
