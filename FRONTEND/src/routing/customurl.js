import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import DashboardPage from "../pages/DashboardPage"
import { checkAuth } from "../utils/helper"
import CustomUrlPage from "../pages/CustomUrlPage"

export const customUrlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/custom-url',
  component: CustomUrlPage,
  beforeLoad: checkAuth
})