<template>
  <div>
    <div v-if="data">
      <div v-for="(value, key) in data" :key="value.id">
        <div v-if="value[0].type === 'paragraph' && value[0].spans.length === 0">
          <p>{{ value[0].text }}</p>
        </div>
        <div v-else-if="value[0].type === 'paragraph' && value[0].spans.length > 0">
          <div v-for="p in value" :key="p.type">
            <div v-if="p.spans[0]">
              <b v-if="p.spans[0].type === 'strong'">{{ p.text }}</b>
              <i v-if="p.spans[0].type === 'em'">{{ p.text }}</i>
            </div>
            <p v-else>{{ p.text }}</p>
          </div>
        </div>
        <h1 v-if="value[0].type === 'heading1'">{{ value[0].text }}</h1>
        <h2 v-if="value[0].type === 'heading2'">{{ value[0].text }}</h2>
        <h3 v-if="value[0].type === 'heading3'">{{ value[0].text }}</h3>
        <h4 v-if="value[0].type === 'heading4'">{{ value[0].text }}</h4>
        <h5 v-if="value[0].type === 'heading5'">{{ value[0].text }}</h5>
        <h6 v-if="value[0].type === 'heading6'">{{ value[0].text }}</h6>
        <a v-if="value[0].type === 'link'" :href="value[0].url">{{ value[0].link_name }}</a>
        <img v-if="value[0].type === 'photo'" :src="value[0].url" :width="value[0].width" :height="value[0].height">
        <div v-if="key === 'ul-list'">
          <ul v-for="listItem in value" :key="listItem.id">
            <li>{{ listItem.text }}</li>
          </ul>
        </div>
      </div>
    </div>
    <h4 v-else>
      Loading content...
    </h4>
  </div>
</template>

<script>
export default {
  name: 'CmsPrismic',
  beforeMount () {
    this.$store.dispatch(
      'prismic-cms/loadPrismicPage',
      {
        type: this.type,
        orderings: this.orderings
      }
    ).then((res) => {
      this.cms = res
    })
  },
  props: {
    type: {
      type: String,
      default: null,
      required: true
    },
    orderings: {
      type: String,
      default: null,
      required: true
    }
  },
  computed: {
    data () {
      let res = this.cms
      if (this.cms) {
        Object.keys(res).filter(key => {
          return res[key].link_type !== undefined
        }).map(key => (res[key] = [{
          type: 'link',
          link_name: key,
          link_type: res[key].link_type,
          url: res[key].url
        }]))
        Object.keys(res).filter(key => {
          return res[key].alt !== undefined
        }).map(key => (res[key] = [{
          type: 'photo',
          alt: key,
          url: res[key].url,
          width: res[key].dimensions.width,
          height: res[key].dimensions.height
        }]))
      }
      return res
    }
  },
  data () {
    return {
      cms: null
    }
  }
}
</script>
