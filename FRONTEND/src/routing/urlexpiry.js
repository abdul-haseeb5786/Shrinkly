import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import { checkAuth } from "../utils/helper"
import UrlExpiry from "../pages/UrlExpiry"

export const urlExpiryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/url-with-expiry',
  component: UrlExpiry,
  beforeLoad: checkAuth
})