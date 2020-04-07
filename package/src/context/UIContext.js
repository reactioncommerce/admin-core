import { createContext } from "react";

export default createContext({
  isDetailDrawerOpen: false,
  isMobile: false,
  isNavigationDrawerOpen: true,
  onCloseDetailDrawer: () => { },
  onCloseNavigationDrawer: () => { },
  onToggleDetailDrawer: () => { },
  onToggleNavigationDrawer: () => { },
  setDetailDrawerOpen: () => { },
  setNavigationDrawerOpen: () => { }
});
