<template>
    <div style="display: flex;justify-content: space-between; margin-top: 30px; flex-wrap:wrap;">
        <img-box
                v-for="(item, index) in typeData"
                :key="index"
                :img-url="item.imgUrl"
                :title="item.title"
                :url="item.url"
                :size="(line)?((width-(typeData.length/line-1)*5)/(typeData.length/line)):((width-(typeData.length-1)*5)/typeData.length)">
        </img-box>
    </div>
</template>

<script>
    import ImgBox from '@/components/img-box'
    export default {
        name: "item-type",
        props:{
            width: Number,
            type: Number,
            typeId: Number,
            line: Number
        },
        components: {
            'img-box':ImgBox
        },
        data () {
            return {
                typeData: []
            }
        },
        methods: {
            getStaticData (){
                const that = this
                if(that.type === 0) {
                    return [{
                        imgUrl: 'http://kealine.top/shop/img/sj/1/1.jpg',
                        title: '艺术玻璃',
                        url: '#'
                    },{
                        imgUrl: 'http://kealine.top/shop/img/sj/1/2.jpg',
                        title: '亚克力',
                        url: '#'
                    },{
                        imgUrl: 'http://kealine.top/shop/img/sj/1/3.jpg',
                        title: '水晶',
                        url: '/second'
                    },{
                        imgUrl: 'http://kealine.top/shop/img/sj/1/4.jpg',
                        title: '微景观',
                        url: '#'
                    },]
                }
                else {
                    switch (that.typeId) {
                        case 0: return []
                        case 1: return []
                        case 2: return [{
                            imgUrl: 'http://kealine.top/shop/img/sj/1/1.jpg',
                            title: '精抛水晶砖',
                            url: '/products/1/1'
                        },{
                            imgUrl: 'http://kealine.top/shop/img/sj/2/1.jpg',
                            title: '热熔水晶砖',
                            url: '#'
                        },{
                            imgUrl: 'http://kealine.top/shop/img/sj/3/1.jpg',
                            title: '多面立体水晶砖',
                            url: '#'
                        },{
                            imgUrl: 'http://kealine.top/shop/img/sj/4/1.jpg',
                            title: '波纹气泡水晶砖',
                            url: '#'
                        },{
                            imgUrl: 'http://kealine.top/shop/img/sj/5/1.jpg',
                            title: '异型水晶砖',
                            url: '#'
                        },{
                            imgUrl: 'http://kealine.top/shop/img/sj/6/1.jpg',
                            title: '夹砖水晶砖',
                            url: '#'
                        },]
                        case 3: return []
                    }
                }
            },
            getData () {
                const that = this
                that.typeData = []
                that.typeData = that.getStaticData()
            }
        },
        created () {
            this.getData()
        }
    }
</script>

<style scoped>

</style>