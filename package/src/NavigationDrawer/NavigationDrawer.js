import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
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
import ShopLogo from "../ShopLogo";
import useRoutes from "../hooks/useRoutes";

const activeClassName = "nav-item-active";

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
  listItem: {
    "paddingLeft": theme.spacing(2),
    "paddingRight": theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.colors.darkBlue600,
      transition: `background-color ${theme.transitions.duration.shortest} ${theme.transitions.easing.easeInOut}`
    }
  },
  listItemText: {
    paddingLeft: 0,
    fontSize: theme.typography.fontSize,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    color: theme.palette.colors.black15
  },
  listItemNested: {
    "paddingTop": 0,
    "paddingBottom": 0,
    "paddingLeft": theme.spacing(8),
    "&:hover": {
      backgroundColor: theme.palette.colors.darkBlue600,
      transition: `background-color ${theme.transitions.duration.shortest} ${theme.transitions.easing.easeInOut}`
    }
  },
  link: {
    [`&.${activeClassName} span`]: {
      color: theme.palette.text.secondaryActive,
      fontWeight: theme.typography.fontWeightSemiBold
    },
    [`&.${activeClassName} $icon`]: {
      color: theme.palette.text.active
    }
  }
}));

/**
 * Navigation Drawer component
 * @param {Object} props Component props
 * @returns {React.Component} NavigationDrawer component
 */
function NavigationDrawer(props) {
  const {
    isMobile,
    isNavigationDrawerOpen,
    onDrawerClose,
    setIsSettingsOpen
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const primaryRoutes = useRoutes({ groups: ["navigation"] });
  const { t } = useTranslation();

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
      onClose: onDrawerClose,
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
            <Fab classes={{ root: classes.closeButton }} onClick={onDrawerClose} size="small">
              <CloseIcon />
            </Fab>
          </Hidden>

        </Toolbar>
      </AppBar>
      <List disablePadding>
        {primaryRoutes.map((route) => (

          <ListItem
            button
            className={classes.listItem}
            key={route.path}
            onClick={() => {
              history.push(route.href || route.path);
              setIsSettingsOpen(false);
              onDrawerClose();
            }}
          >
            <ListItemIcon className={classes.icon}>
              {route.IconComponent && <route.IconComponent />}
            </ListItemIcon>
            <ListItemText
              disableTypography
              className={classes.listItemText}
            >
              {t(route.navigationItemLabel)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

NavigationDrawer.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  isMobile: PropTypes.bool,
  isNavigationDrawerOpen: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  setIsSettingsOpen: PropTypes.func.isRequired
};

NavigationDrawer.defaultProps = {
  setIsNavigationDrawerOpen() { }
};

export default NavigationDrawer;

/*

          <NavLink
            activeClassName={activeClassName}
            className={classes.link}
            to={route.href || route.path}
            key={route.path}
            onClick={() => {
              setIsSettingsOpen(false);
              onDrawerClose();
            }}
          >
          </NavLink>

*/