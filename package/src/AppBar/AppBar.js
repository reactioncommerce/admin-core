import React, { Children } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  AppBar as MuiAppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles
} from "@material-ui/core";
import MenuIcon from "mdi-material-ui/Menu";
import ArrowLeftIcon from "mdi-material-ui/ArrowLeft";
import { UIContext } from "../context/UIContext";

const useStyles = makeStyles((theme) => ({
  action: {
    marginLeft: theme.spacing()
  },
  primarySidebarOpen: {
    ...theme.mixins.leadingPaddingWhenPrimaryDrawerIsOpen
  },
  detailDrawerOpen: {
    ...theme.mixins.trailingPaddingWhenDetailDrawerIsOpen
  },
  title: {
    flex: 1
  }
}));

/**
 * An AppBar for the main content area that provides a place for a title,
 * actions to the right, and a menu button for opening and closing the sidebar drawer menu
 * @param {Object} props Component props
 * @returns {React.Component} A react component
 */
function AppBar({ children, title, onBackButtonClick, shouldShowBackButton = true }) {
  const classes = useStyles();

  return (
    <UIContext.Consumer>
      {({ isMobile, isDetailDrawerOpen, isPrimarySidebarOpen, onTogglePrimarySidebar }) => {
        const toolbarClassName = clsx({
          // Add padding to the left when the primary sidebar is open,
          // only if we're on desktop. On mobile the sidebar floats over
          // the content like a modal that's docked to either the left
          // or right side of the screen.
          [classes.primarySidebarOpen]: isPrimarySidebarOpen && !isMobile,

          // Add padding to the right when the detail sidebar is open.
          // Omit on mobile as the sidebar will float over content.
          [classes.detailDrawerOpen]: isDetailDrawerOpen && !isMobile
        });

        return (
          <MuiAppBar>
            <Toolbar className={toolbarClassName}>
              <Hidden mdUp>
                <IconButton onClick={onTogglePrimarySidebar}>
                  <MenuIcon />
                </IconButton>
              </Hidden>
              {(shouldShowBackButton && onBackButtonClick) && (
                <Box paddingRight={1}>
                  <IconButton onClick={onBackButtonClick}>
                    <ArrowLeftIcon />
                  </IconButton>
                </Box>
              )}
              <Typography
                className={classes.title}
                component="h1"
                variant="h3"
              >
                {title}
              </Typography>
              {Children.map(children, (child) => (
                <div className={classes.action}>
                  {child}
                </div>
              ))}
            </Toolbar>
          </MuiAppBar>
        );
      }}
    </UIContext.Consumer>
  );
}

AppBar.propTypes = {
  children: PropTypes.node,
  onBackButtonClick: PropTypes.func,
  onToggleDrawerOpen: PropTypes.func,
  shouldShowBackButton: PropTypes.bool,
  title: PropTypes.node
};

export default AppBar;
