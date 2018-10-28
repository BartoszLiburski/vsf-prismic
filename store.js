import fetch from 'isomorphic-fetch'
import config from 'config'
import * as localForage from 'localforage'
import UniversalStorage from './../../../core/store/lib/storage'
import Vue from 'vue'

const headers = {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
  mode: 'cors'
}
const cmsContent = new UniversalStorage(localForage.createInstance({
  name: 'shop/prismic-cms',
  storeName: 'cmsContent'
}))
let url
let cacheKey
// actions
const actions = {
  loadPrismicPage (context, {type, orderings, contentId}) {
    if (Vue.prototype.$localCache['shop/prismic-cms']) {
      Vue.prototype.$localCache['shop/prismic-cms'] = cmsContent
    }
    if (type && orderings) {
      url = (config.prismic.typeAndTag)
        .replace('{{type}}', type)
        .replace('{{orderings}}', orderings)
      cacheKey = type + '&' + orderings
    } else if (contentId) {
      url = (config.prismic.contentId)
        .replace('{{contentId}}', contentId)
      cacheKey = 'id:' + contentId
    } else {
      return false
    }
    const cache = Vue.prototype.$localCache['shop/prismic-cms']
    return new Promise((resolve, reject) => {
      cache.getItem(cacheKey, (err, result) => {
        if (err) {
          reject(err)
        }
        if (result) {
          resolve(result)
        } else {
          let json
          fetch(url, headers)
            .then((response) => {
              return response.text()
            })
            .then((res) => {
              json = JSON.parse(res)
              if (!json.result) {
                console.error('Nothing to save in cache')
                resolve(false)
              }
              cache.setItem(cacheKey, json.result[0].data)
                .catch((err) => {
                  console.error('CMS cache error' + err)
                })
              resolve(json.result[0].data)
            })
            .catch((e) => {
              console.log('CMS fetch error:' + e)
            })
        }
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
