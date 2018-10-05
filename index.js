import extensionStore from './store'
import extensionRoutes from './router'

const EXTENSION_KEY = 'prismic-cms'

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store

  return {EXTENSION_KEY, extensionRoutes, extensionStore}
}
