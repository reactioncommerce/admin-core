import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "../AppBar";
import ProfileMenu from "../ProfileMenu";
import NavigationDrawer from "../NavigationDrawer";
import Routes from "../Routes";
import UIContext from "../context/UIContext";
import useMediaQuery from "../hooks/useMediaQuery";
import useRoutes from "../hooks/useRoutes";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex"
  },
  leftSidebarOpen: {
    ...theme.mixins.leadingPaddingWhenPrimaryDrawerIsOpen
  }
}));

/**
 * Main dashboard layout
 * @returns {React.ReactElement} A react element representing the main dashboard
 */
function Dashboard() {
  const classes = useStyles();
  const isMobile = useMediaQuery("mobile");
  const routes = useRoutes();
  const [isDetailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [isNavigationDrawerOpen, setNavigationDrawerOpen] = useState(false);

  const onToggleNavigationDrawer = () => {
    setNavigationDrawerOpen((prevValue) => !prevValue);
  };

  const onToggleDetailDrawer = () => {
    setDetailDrawerOpen((prevValue) => !prevValue);
  };

  const onCloseDetailDrawer = () => {
    setDetailDrawerOpen(false);
  };

  const onCloseNavigationDrawer = () => {
    setNavigationDrawerOpen(false);
  };

  const contextValue = useMemo(() => ({
    isDetailDrawerOpen,
    isMobile,
    isNavigationDrawerOpen: (isMobile && isNavigationDrawerOpen) || isNavigationDrawerOpen,
    onCloseNavigationDrawer,
    onToggleNavigationDrawer,
    onCloseDetailDrawer,
    onToggleDetailDrawer,
    setDetailDrawerOpen,
    setNavigationDrawerOpen
  }), [isDetailDrawerOpen, isMobile, isNavigationDrawerOpen]);

  return (
    <UIContext.Provider value={contextValue}>
      <CssBaseline />
      <div className={classes.container}>
        <AppBar>
          <ProfileMenu size={40} />
        </AppBar>
        <NavigationDrawer />
        <Routes
          isExactMatch={true}
          routes={routes}
        />
      </div>
    </UIContext.Provider>
  );
}

export default Dashboard;
