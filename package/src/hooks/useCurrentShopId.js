import { useQuery } from "@apollo/react-hooks";
import primaryShopIdQuery from "../graphql/queries/primaryShopId.graphql";

/**
 * React Hook that gets the current shop ID
 * @return {Array} [currentShopId]
 */
export default function useCurrentShopId() {
  let currentShopId = null;
  const { data, loading } = useQuery(primaryShopIdQuery);

  if (data && data.primaryShopId) {
    currentShopId = data.primaryShopId;
  }

  return {
    currentShopId,
    isLoadingCurrentShopId: loading
  };
}
