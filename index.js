import extensionStore from './store'

const EXTENSION_KEY = 'prismic-cms'

export default function (app, router, store, config) {
  store.registerModule(EXTENSION_KEY, extensionStore)

  return {EXTENSION_KEY, extensionStore}
}
