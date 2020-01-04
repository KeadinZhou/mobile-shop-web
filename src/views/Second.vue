<template>
    <div class="second">
        <page-search :width="clientWidth"></page-search>
        <img src="https://img.yzcdn.cn/upload_files/2019/07/04/FvAaQ5c-bXd4att5_u8OGFcpw0tx.jpg!large.jpg" alt="" width="100%">
        <item-type :width="clientWidth" :type="1" :type-id="Number(this.$route.query.type)" :line="2"></item-type>
        <about-company :width="clientWidth"></about-company>
    </div>
</template>

<script>
    import PageSearch from '@/components/page-search'
    import ItemType from '@/components/item-type'
    import AboutCompany from '@/components/about-company'
    export default {
        name: 'second',
        components: {
            'page-search': PageSearch,
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
        }
    }
</script>

<style scoped>

</style>