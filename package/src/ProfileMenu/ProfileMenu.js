import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import i18next from "i18next";
import ButtonBase from "@material-ui/core/ButtonBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Avatar
} from "@material-ui/core";
import useAuth from "../hooks/useAuth";

/**
 * @summary ProfileMenu React component
 * @param {Object} props React props
 * @return {React.Node} React node
 */
function ProfileMenu(props) {
  const { logout, viewer } = useAuth();
  const history = useHistory();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  if (!viewer) return null;

  return (
    <Fragment>
      <ButtonBase
        centerRipple
        onClick={(event) => {
          setMenuAnchorEl(event.currentTarget);
        }}
      >
        <Avatar {...props} />
      </ButtonBase>

      <Menu
        id="profile-actions-menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchorEl(null); // close menu
            history.push("/profile");
          }}
        >
          {i18next.t("admin.userAccountDropdown.profileLabel")}
        </MenuItem>
        <MenuItem onClick={logout}>{i18next.t("accountsUI.signOut")}</MenuItem>
      </Menu>
    </Fragment>
  );
}

ProfileMenu.propTypes = {
  logout: PropTypes.func,
  viewer: PropTypes.object
};

export default ProfileMenu;
