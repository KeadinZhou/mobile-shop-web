<template>
    <div class="products" :style="'min-height: '+clientHeight/1.1+'px'">
        <div :style="'height: '+this.$store.state.realHeight(750,50,clientWidth) +'px'" class="products-page-head">
            {{this.$route.query.title}}
        </div>
        <div :style="'height: '+clientHeight/2+'px'" class="nothing" v-if="!dataList.length">
            <div style="color: #333333; text-align: center;width: 100%">暂时没有结果</div>
        </div>
        <div>
            <div style="display: flex;justify-content: space-between; margin-top: 30px; flex-wrap:wrap;">
                <img-box
                        v-for="(item, index) in dataList"
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
    import { Indicator,Toast } from 'mint-ui';
    export default {
        name: "Products",
        components: {
            'img-box': ImgBox
        },
        data () {
            return {
                type: Number(this.$route.params.type),
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
                dataList: []
            }
        },
        methods: {
            getData () {
                const that = this
                Indicator.open({
                    text: '正在加载',
                    spinnerType: 'fading-circle'
                });
                const sendData = {
                    name: this.type===-1?this.$route.query.keyword:null,
                    category_id: this.type!==-1?this.type:null
                }
                that.$http.post(that.$store.state.api + '/item/search', sendData)
                    .then(data => {
                        const Data = data.data.data
                        console.log(Data)
                        that.dataList = []
                        for (const item of Data) {
                            that.dataList.push({
                                id: item.id,
                                name: item.name,
                                imgUrl: item.image_list.length?item.image_list[0]:'#',
                                url: '/product/'+item.id,
                            })
                        }
                        Indicator.close()
                    })
                    .catch(function (error) {
                        Indicator.close()
                        if (error.response) {
                            const tmp = error.response.data.msg
                            if ((typeof tmp) === 'string') {
                                Toast({
                                    message: tmp
                                });
                            } else {
                                for (const index in tmp) {
                                    Toast({
                                        message: tmp[index][0]
                                    });
                                    break
                                }
                            }
                        }
                    })
            }
        },
        created () {
            this.getData()
        },
        watch: {
            '$route' () {
                this.type = Number(this.$route.params.type)
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
    .nothing{
        color: #333333;
        text-align: center;
        line-height: 100%;
        display: flex;
        justify-items: center;
        align-items: center;
    }
</style>