<template>
  <div class="home">
    <page-search :width="clientWidth"></page-search>
    <index-swipe :width="clientWidth"></index-swipe>
    <div style="font-size: 18px; text-align: center; margin: 30px 0;">产品分类</div>
    <item-type :width="clientWidth" :type="0"></item-type>
    <about-company :width="clientWidth"></about-company>
  </div>
</template>

<script>
  import PageSearch from '@/components/page-search'
  import IndexSwipe from '@/components/index-swipe'
  import ItemType from '@/components/item-type'
  import AboutCompany from '@/components/about-company'
  export default {
    name: 'home',
    components: {
      'page-search': PageSearch,
      'index-swipe': IndexSwipe,
      'item-type': ItemType,
      'about-company': AboutCompany
    },
    data () {
      return {
        clientHeight: window.innerHeight,
        clientWidth: window.innerWidth
      }
    },
    created () {
      document.title = '香杭微景'
    }
  }
</script>

<style scoped>

</style>