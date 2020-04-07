import { useLazyQuery } from "@apollo/react-hooks";
import shopQuery from "../graphql/queries/shop.graphql";
import useCurrentShopId from "./useCurrentShopId.js";

/**
 * React Hook that gets the globally current shop
 * @return {Object} Object with `shop` and `shopId` props
 */
export default function useCurrentShop() {
  const { currentShopId: shopId } = useCurrentShopId();

  const [getShop, { called, data, loading, refetch }] = useLazyQuery(shopQuery, {
    fetchPolicy: "network-only"
  });

  // Wait until we're sure we have a shop ID to call the query
  if (shopId && !called) {
    getShop({
      variables: { id: shopId }
    });
  }

  return {
    isLoadingShop: loading,
    refetchShop: refetch,
    shop: data && data.shop,
    shopId
  };
}
