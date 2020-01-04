<template>
    <div class="products">
        <div :style="'height: '+this.$store.state.realHeight(750,50,clientWidth) +'px'" class="products-page-head">
            {{dataList.name}}
        </div>
        <div>
            <div style="display: flex;justify-content: space-between; margin-top: 30px; flex-wrap:wrap;">
                <img-box
                        v-for="(item, index) in dataList.data"
                        :key="index"
                        :img-url="item.imgUrl"
                        :title="item.name"
                        :url="item.url"
                        :size="((clientWidth-5)/2)">
                </img-box>
            </div>
        </div>
    </div>
</template>

<script>
    import ImgBox from '@/components/img-box'
    export default {
        name: "Products",
        components: {
            'img-box': ImgBox
        },
        data () {
            return {
                type: Number(this.$route.params.type),
                typeId: Number(this.$route.params.typeId),
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
                dataList: {
                    name: '商品列表',
                    data: []
                }
            }
        },
        methods: {
            getStaticData () {
                return {
                    name: (this.type===-1)?('"'+this.$route.params.typeId+'"的搜索结果'):'精抛水晶砖',
                    data: [{
                        name: '(精抛）XHZ-017 100*200*50mm',
                        imgUrl: 'http://kealine.top/shop/img/sj/1/1.jpg',
                        url: '/product/1'
                    },{
                        name: '（精抛）XHZ-016 100*200*50mm',
                        imgUrl: 'http://kealine.top/shop/img/sj/1/2.jpg',
                        url: '#'
                    },{
                        name: '（精抛）XHZ-016-1 100*200*50mm',
                        imgUrl: 'http://kealine.top/shop/img/sj/1/3.jpg',
                        url: '#'
                    },{
                        name: '（精抛）XHZ-018 100*200*50mm',
                        imgUrl: 'http://kealine.top/shop/img/sj/1/4.jpg',
                        url: '#'
                    },{
                        name: '（精抛气泡）XHZ-013  100*200*50mm',
                        imgUrl: 'http://kealine.top/shop/img/sj/1/5.jpg',
                        url: '#'
                    },{
                        name: '（精抛气泡）XHZ-013-1  100*200*50mm',
                        imgUrl: 'http://kealine.top/shop/img/sj/1/6.jpg',
                        url: '#'
                    },{
                        name: '（精抛气泡）XHZ-013-2  100*200*50mm',
                        imgUrl: 'http://kealine.top/shop/img/sj/1/7.jpg',
                        url: '#'
                    },{
                        name: '（精抛气泡）XHZ-019 100*200*50mm',
                        imgUrl: 'http://kealine.top/shop/img/sj/1/8.jpg',
                        url: '#'
                    },]
                }
            },
            getData () {
                const that = this
                that.dataList = this.getStaticData()
            }
        },
        created () {
            this.getData()
        },
        watch: {
            '$route' () {
                this.type = Number(this.$route.params.type)
                this.typeId = Number(this.$route.params.typeId)
                this.getData()
            }
        }
    }
</script>

<style scoped>
    .products{

    }
    .products-page-head{
        width: 100%;
        font-size: 24px;
        text-align: center;
        margin-bottom: 30px;
        padding-top: 30px;
    }
</style>