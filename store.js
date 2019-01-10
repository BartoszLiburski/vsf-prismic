import fetch from 'isomorphic-fetch'
import config from 'config'
import Vue from 'vue'

const headers = {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
  mode: 'cors'
}
// actions
const actions = {
  loadPrismicPage (context, {type, orderings, contentId, filter, filterOption}) {
    // set all needed variables
    let url
    let cacheKey
    if (type && orderings) {
      url = (config.prismic.typeAndTag)
        .replace('{{type}}', type)
        .replace('{{orderings}}', orderings)
      cacheKey = type + '&' + orderings
    } else if (contentId && filter) {
      url = (config.prismic.contentIdFilter)
        .replace('{{contentId}}', contentId)
        .replace('{{filter}}', filter)
        .replace('{{filterOption}}', filterOption)
      cacheKey = contentId + '&f:' + filterOption
    } else if (contentId && !filter) {
      url = (config.prismic.contentId)
        .replace('{{contentId}}', contentId)
      cacheKey = contentId
    } else {
      return false
    }
    const cache = Vue.prototype.$db['cms-prismic']
    // fetch every time we are online
    if (navigator.onLine) {
      return fetch(url, headers)
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          if (!json.result) {
            console.error('Nothing to save in cache')
            return false
          }
          cache.setItem(cacheKey, json.result)
            .catch((err) => {
              console.error('CMS cache error' + err)
            })
          return json.result
        })
        .catch((e) => {
          console.error('CMS fetch error:' + e)
        })
    } else { // if offline just check if it exists in cache
      return new Promise((resolve, reject) => {
        cache.getItem(cacheKey, (err, result) => {
          if (err) {
            reject(err)
          }
          if (result) {
            resolve(result)
          }
        })
      })
    }
  }
}

export default {
  namespaced: true,
  actions
}
