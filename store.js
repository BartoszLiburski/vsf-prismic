import fetch from 'isomorphic-fetch'
import config from 'config'

const headers = {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
  mode: 'cors'
}

// actions
const actions = {
  loadPrismicPage (context, {type, orderings}) {
    const cache = global.$VS.db.cmsContent
    const cacheKey = type + '&' + orderings
    return new Promise((resolve, reject) => {
      cache.getItem(cacheKey, (err, result) => {
        if (err) {
          reject(err)
        }
        if (result) {
          resolve(result)
        } else {
          let json
          let url = (config.cms.endpointPrismic)
            .replace('{{type}}', type)
            .replace('{{orderings}}', orderings)
          fetch(url, headers)
            .then((response) => {
              return response.text()
            })
            .then((res) => {
              json = JSON.parse(res)
              cache.setItem(cacheKey, json.result[0].data)
                .catch((err) => {
                  console.error('CMS cache error' + err)
                })
              resolve(json.result[0].data)
            })
            .catch(() => {
              console.log('CMS fetch error.')
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
