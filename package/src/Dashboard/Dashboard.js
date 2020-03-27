import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const activeClassName = "active";

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
  shopLogo: {
    flex: 1,
    marginRight: theme.spacing(2)
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
 * App component
 * @param {Object} props Props
 * @returns {React.ReactElement} App
 */
function Dashboard({ title, plugins }) {
  const history = useHistory();
  const classes = useStyles();
  const { viewer, logout } = useAuth();

  return (
    <Container>
      <Drawer
        open={true}
        variant="persistent"
      >
        <List>
          {plugins.map(({ route, navTitle }, index) => (
            <ListItem
              key={index}
              button
              onClick={() => history.push(route)}
              className={classes.listItem}
            >
              <ListItemText
                disableTypography
                primary={navTitle}
                className={classes.listItemText}
              />
            </ListItem>
          ))}
          <ListItem
            button
            onClick={() => logout()}
            className={classes.listItem}
          >
            <ListItemText
              disableTypography
              primary="Sign Out"
              className={classes.listItemText}
            />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ paddingLeft: 320 }}>
        <Typography variant="h1">{title || "Reaction Admin"}</Typography>
        <Typography variant="h2">Welcome {viewer && viewer.primaryEmailAddress}</Typography>
        <Switch>
          {plugins.map(({ MainComponent, route }, index) => (
            <Route exact path={route} component={MainComponent} key={index} />
          ))}
        </Switch>
      </div>
    </Container>
  );
}

Dashboard.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string
};

export default Dashboard;
