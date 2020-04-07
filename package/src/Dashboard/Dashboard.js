import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "../AppBar";
import ProfileMenu from "../ProfileMenu";
import NavigationDrawer from "../NavigationDrawer";
import Routes from "../Routes";
import { UIContext } from "../context/UIContext";
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
  const [isPrimarySidebarOpen, setPrimarySidebarOpen] = useState(true);

  const onTogglePrimarySidebar = () => {
    setPrimarySidebarOpen((prevValue) => !prevValue);
  };

  const onToggleDetailDrawer = () => {
    setDetailDrawerOpen((prevValue) => !prevValue);
  };

  const onCloseDetailDrawer = () => {
    setDetailDrawerOpen(false);
  };

  const onClosePrimarySidebar = () => {
    setPrimarySidebarOpen(false);
  };

  const contextValue = useMemo(() => ({
    isDetailDrawerOpen,
    isMobile,
    isPrimarySidebarOpen: (isMobile && isPrimarySidebarOpen) || true,
    onClosePrimarySidebar,
    onTogglePrimarySidebar,
    onCloseDetailDrawer,
    onToggleDetailDrawer,
    setDetailDrawerOpen,
    setPrimarySidebarOpen
  }), [isDetailDrawerOpen, isMobile, isPrimarySidebarOpen]);

  return (
    <UIContext.Provider value={contextValue}>
      <CssBaseline />
      <div className={classes.container}>
        <AppBar>
          <ProfileMenu size={40} />
        </AppBar>
        <NavigationDrawer
          isMobile={isMobile}
          isSidebarOpen={isPrimarySidebarOpen}
          setIsSidebarOpen={(value) => {
            setPrimarySidebarOpen(value);
          }}
          onDrawerClose={onClosePrimarySidebar}
        />
        <Routes
          isExactMatch={true}
          routes={routes}
        />
      </div>
    </UIContext.Provider>
  );
}

export default Dashboard;
