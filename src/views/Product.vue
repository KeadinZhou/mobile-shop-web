<template>
    <div style="background-color: white">
        <mt-swipe :auto="2000" :style="'height: '+ (clientHeight - 80) +'px'">
            <mt-swipe-item v-for="(item, index) in productData.imgList" :key="index">
                <div class="img-box" :style="'background: url(\''+item+'\') no-repeat;background-position: center; background-size: contain;background-color: white;'"></div>
            </mt-swipe-item>
        </mt-swipe>
        <h2 style="margin: 20px 0; text-align: center">{{productData.name}}</h2>
        <p style="color: #5a5a5a; font-size: 14px;padding: 10px">{{productData.dis}}</p>
    </div>
</template>

<script>
    export default {
        name: "Product",
        data () {
            return {
                id: Number(this.$route.params.id),
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
                productData:{
                    name: '商品名称',
                    imgList: [],
                    dis: '商品描述'
                }
            }
        },
        methods: {
            getStaticData () {
                return {
                    name: '(精抛）XHZ-017 100*200*50mm',
                    imgList: [
                        'http://kealine.top/shop/img/sj/1/1.jpg',
                        'http://kealine.top/shop/img/sj/1/2.jpg',
                        'http://kealine.top/shop/img/sj/1/3.jpg',
                        'http://kealine.top/shop/img/sj/1/4.jpg',
                        'http://kealine.top/shop/img/sj/1/5.jpg',
                        'http://kealine.top/shop/img/sj/1/6.jpg',
                        'http://kealine.top/shop/img/sj/1/7.jpg',
                        'http://kealine.top/shop/img/sj/1/8.jpg',
                    ],
                    dis: '商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述'
                }
            },
            getData () {
                const that = this
                that.productData = this.getStaticData()
            }
        },
        created () {
            this.getData()
        },
        watch: {
            '$route' () {
                this.id = Number(this.$route.params.id)
                this.getData()
            }
        }
    }
</script>

<style scoped>
    .img-box{
        width: 100%;
        height: 100%;
    }
</style>