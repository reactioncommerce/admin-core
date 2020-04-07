import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";
import useCurrentShop from "../hooks/useCurrentShop";
import GenericErrorBoundary from "../GenericErrorBoundary";

const defaultLogo = "/public/reaction-logo-circular.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  logoName: {
    color: theme.palette.colors.black15
  }
}));

/**
 * ShopLogo
 * @param {Object} props Component props
 * @returns {Node} React component
 */
function ShopLogo({ shouldShowShopName, linkTo, size }) {
  const classes = useStyles();

  const { shop } = useCurrentShop();

  if (!shop) {
    return (
      <Link
        className={classes.root}
        to={linkTo}
      >
        <img
          alt="Reaction Commerce"
          className={classes.logo}
          src={defaultLogo}
          width={size}
        />
        {shouldShowShopName &&
          <Typography
            variant="h3"
            component="span"
            className={classes.logoName}
          >
            Reaction Commerce
          </Typography>
        }
      </Link>
    );
  }

  const customLogoFromUpload = shop.brandAssets && shop.brandAssets.navbarBrandImage && shop.brandAssets.navbarBrandImage.large;
  const customLogoFromUrlInput = shop.shopLogoUrls && shop.shopLogoUrls.primaryShopLogoUrl;

  return (
    <GenericErrorBoundary>
      <Link
        className={classes.root}
        to={linkTo}
      >
        <img
          alt={shop.name}
          className={classes.logo}
          src={customLogoFromUrlInput || customLogoFromUpload || defaultLogo}
          width={size}
        />
        {shouldShowShopName &&
          <Typography
            variant="h3"
            component="span"
            className={classes.logoName}
          >
            {shop.name}
          </Typography>
        }
      </Link>
    </GenericErrorBoundary>
  );
}

ShopLogo.propTypes = {
  linkTo: PropTypes.string,
  shopId: PropTypes.string,
  shouldShowShopName: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ShopLogo.defaultProps = {
  linkTo: "/",
  shouldShowShopName: false,
  size: 60
};

export default ShopLogo;
