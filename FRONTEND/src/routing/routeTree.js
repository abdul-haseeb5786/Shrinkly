import { createRootRoute } from '@tanstack/react-router'
import App from '../App'
import { authRoute } from './auth.route'
import { homePageRoute } from './homepage'
import { dashboardRoute } from './dashboard'
import { customUrlRoute } from './customurl'
import { urlExpiryRoute } from './urlexpiry'

export const rootRoute = createRootRoute({
  component: App
})

export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dashboardRoute,
    customUrlRoute,
    urlExpiryRoute

])
