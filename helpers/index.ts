import config from 'config'

const getPrismicParams = (type, tag, contentId, filter, filterOption) => {
  let url
  let parameter = contentId
  switch(true) {
    case contentId && !filter:
      url = `/api/ext/cms-prismic/index/?id=${contentId}`
      break;
    case contentId && filter:
      url = `/api/ext/cms-prismic/index/?id=${contentId}&filter=${filter}&filter_option=${filterOption}`
      break;
    case type && !contentId:
      parameter = type
      url = `/api/ext/cms-prismic/index/?type=${type}`
      break;
    case tag && !contentId:
      parameter = '#' + tag
      url = `/api/ext/cms-prismic/index/?tag=${tag}`
      break;
    default:
      throw new Error(`[CmsPrismic Module] Give fetching parameter`)
  }
  return { url: config.api.url + url, parameter: parameter }
}

export {getPrismicParams}
