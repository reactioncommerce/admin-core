import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    flexGrow: 1,
    transition: "padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms"
  },
  standardContent: {
    maxWidth: 1140,
    paddingTop: theme.mixins.toolbar.minHeight + (theme.spacing(2)),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: "0 auto"
  },
  wideContent: {
    width: "100vw",
    paddingTop: theme.mixins.toolbar.minHeight + (theme.spacing(3)),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    flexGrow: 1,
    transition: "padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms"
  },
  fullContent: {
    width: "100vw",
    height: "100vh",
    paddingTop: theme.mixins.toolbar.minHeight,
    flexGrow: 1,
    transition: "padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    overflow: "hidden"
  },
  leadingDrawerOpen: {
    paddingLeft: theme.dimensions.drawerWidth + theme.spacing(2)
  },
  trailingDrawerOpen: {
    paddingRight: theme.dimensions.detailDrawerWidth + theme.spacing(2)
  },
  leadingDrawerOpenFullLayout: {
    paddingLeft: theme.dimensions.drawerWidth
  },
  trailingDrawerOpenFullLayout: {
    paddingRight: theme.dimensions.detailDrawerWidth
  }
}));

const ContentLayout = ({
  children,
  isLeadingDrawerOpen,
  isTrailingDrawerOpen,
  size
}) => {
  const classes = useStyles();

  return (
    <div
      className={
        clsx(classes.root, {
          [classes[`${size}Content`]]: true,
          [classes.leadingDrawerOpen]: isLeadingDrawerOpen && size !== "full",
          [classes.trailingDrawerOpen]: isTrailingDrawerOpen && size !== "full",
          [classes.leadingDrawerOpenFullLayout]: isLeadingDrawerOpen && size === "full",
          [classes.trailingDrawerOpenFullLayout]: isTrailingDrawerOpen && size === "full"
        })
      }
    >
      {children}
    </div>
  );
};

ContentLayout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  isLeadingDrawerOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  isTrailingDrawerOpen: PropTypes.bool,
  size: PropTypes.oneOf(["standard", "wide", "full"])
};

ContentLayout.defaultProps = {
  size: "standard"
};

export default ContentLayout;
