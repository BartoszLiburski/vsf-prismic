# CMS Prismic data extension
Now you can plug headless CMS to your vue storefront

#BEFORE USE!
1. Add line: `require('src/extensions/cms-prismic/index.js')` in file: `vue-storefront/src/extensions/index.js`
2. Add:
    `cmsContent: new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'cmsContent'
    }))`
  in file: `core/store/index.js` to: "Vue.prototype.$db = {", so offline mode could work just fine.

3. Make sure that in `vue-storefront-api` repo, the `cms-prismic` extension is installed

#To display Cms data
To display Cms Block import CmsData component and use it in template:

`import CmsPrismic from 'src/extensions/cms-prismic/components/CmsPrismic'`

Then display your content by:
 `<cms-prismic :type="'store-page'" :orderings="'store1'"/>`
 using two props:
1. type = type in prismic repository of content
2. orderings = tag of prismic content

```
