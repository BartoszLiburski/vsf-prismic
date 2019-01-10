<template>
  <div>
    <div v-if="cms">
      {{ cms }}
    </div>
    <div v-else>
      {{ $t('Loading content...') }}
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
        contentId: this.contentId,
        filter: this.filter,
        filterOption: this.filterOption
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
    },
    filter: {
      type: String,
      default: null,
      required: false
    },
    filterOption: {
      type: String,
      default: null,
      required: false
    }
  },
  data () {
    return {
      cms: {
        body: []
      }
    }
  }
}
</script>
