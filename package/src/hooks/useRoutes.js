import { useMemo } from "react";
import { routes } from "../lib/core/routes";

export const defaultRouteSort = (routeA, routeB) => (
  (routeA.priority || Number.MAX_SAFE_INTEGER) - (routeB.priority || Number.MAX_SAFE_INTEGER)
);

/**
 * Operator routes hook
 * @param {Object} options Options
 * @param {Object} [options.LayoutComponent] LayoutComponent override
 * @param {Object} [options.group] Filter routes by group name
 * @param {Object} [options.filter] Custom filter
 * @param {Object} [options.sort] Route sort function
 * @returns {Array} An array containing filtered routes
 */
export default function useRoutes(options = {}) {
  const {
    groups,
    filter,
    sort = defaultRouteSort
  } = options;

  const memoizedRoutes = useMemo(() => {
    let filteredRoutes;
    if (Array.isArray(groups)) {
      filteredRoutes = routes.filter(({ group: routeGroup }) => groups.includes(routeGroup));
    } else if (filter) {
      filteredRoutes = routes.filter(filter);
    } else {
      filteredRoutes = routes;
    }

    if (sort) {
      filteredRoutes = filteredRoutes.sort(sort);
    }

    return filteredRoutes;
  }, [filter, groups, sort]);

  return memoizedRoutes;
}
