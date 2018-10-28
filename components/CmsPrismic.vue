<template>
  <div>
    <div v-if="cms">
      {{ cms }}
    </div>
    <div v-else>
      Loading content...
    </div>
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
        orderings: this.orderings,
        contentId: this.contentId
      }
    ).then((res) => {
      this.cms = res
    })
  },
  props: {
    type: {
      type: String,
      default: null,
      required: false
    },
    orderings: {
      type: String,
      default: null,
      required: false
    },
    contentId: {
      type: String,
      default: null,
      required: false
    }
  },
  data () {
    return {
      cms: null
    }
  }
}
</script>
