import { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { setAccessToken } from "../lib/graphql/initApollo";
import viewerQuery from "../graphql/queries/viewer.graphql";

/**
 * Hook to get user permissions for the App component
 * @return {Object} Permissions
 */
export default function useAuth() {
  const { logout: oidcLogout, oidcUser } = useReactOidc();

  const { access_token: accessToken } = oidcUser || {};
  setAccessToken(accessToken);

  const [getViewer, {
    data: viewerData
  }] = useLazyQuery(
    viewerQuery,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      onError(error) {
        // Can't find any more reliable way to check the status code from within this hook
        if (typeof error.message === "string" && error.message.includes("Received status code 401")) {
          // Token is expired or user was deleted from database
          oidcLogout();
        } else {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    }
  );

  // Perform a `viewer` query whenever we get a new access token
  useEffect(() => {
    if (accessToken) getViewer();
  }, [accessToken, getViewer]);

  const logout = () => {
    // This involves redirect, so the page will full refresh at this point
    oidcLogout();
  };

  return {
    logout,
    viewer: viewerData ? viewerData.viewer : null
  };
}
