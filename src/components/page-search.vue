<template>
    <div style="padding: 10px 20px; background: rgb(242,242,242)">
        <input
                type="text"
                v-model="keyword"
                @keyup.enter="searchGo"
                placeholder="搜索"
                :style="'height: '+this.$store.state.realHeight(750,50,width) +'px'"
                class="search-input">
    </div>
</template>

<script>
    export default {
        name: "page-search",
        props: {
            width: Number
        },
        data () {
            return {
                keyword: '',
            }
        },
        methods: {
            searchGo(){
                console.log(this.keyword)
                this.$router.push('/products/-1?keyword='+this.keyword+'&title="'+this.keyword+'"的搜索结果')
            }
        }
    }
</script>

<style scoped>
    .search-input{
        width: 100%;
        background: white;
        font-size: 14px;
        text-align: center;
    }
</style>