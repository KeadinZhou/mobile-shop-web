<template>
    <div style="background-color: white; padding-bottom: 50px">
        <mt-swipe :auto="2000" :style="'height: '+ (clientHeight - 80) +'px'">
            <mt-swipe-item v-for="(item, index) in productData.imgList" :key="index">
                <div class="img-box" :style="'background: url(\''+item+'\') no-repeat;background-position: center; background-size: contain;background-color: white;'"></div>
            </mt-swipe-item>
        </mt-swipe>
        <h2 style="margin: 20px 0; text-align: center">{{productData.name}}</h2>
        <p style="color: #5a5a5a; font-size: 14px;padding: 10px; text-align: center">{{productData.dis}}</p>
        <template v-if="this.$store.state.user.id!==-9">
            <div style="width: 100%;display: flex;justify-content: center; align-items: center;flex-direction: column">
<!--                <router-link :to="'/admin/item/edit/'+id" style="text-align: center;font-size: 14px;color: #333333;width: 100%">编辑该产品</router-link>-->
                <mt-button type="default" style="width: 90%;margin-top: 30px" @click.native="$router.push('/admin/item/edit/'+id)">编辑该产品</mt-button>
                <mt-button type="danger" style="width: 90%;margin-top: 30px" @click.native="delPro">删除该产品</mt-button>
            </div>
        </template>
    </div>
</template>

<script>
    import { Indicator,Toast } from 'mint-ui';
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
            getData () {
                const that = this
                Indicator.open({
                    text: '正在加载',
                    spinnerType: 'fading-circle'
                });
                that.$http.get(that.$store.state.api + '/item/'+ that.id)
                    .then(data => {
                        const Data = data.data.data
                        console.log(Data)
                        that.productData = {
                            name: Data.name,
                            imgList: Data.image_list,
                            dis: Data.description
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
            },
            delPro () {
                const that = this
                that.$messagebox('确认后删除')
                    .then(() => {
                        Indicator.open({
                            text: '正在删除',
                            spinnerType: 'fading-circle'
                        });
                        that.$http.delete(that.$store.state.api + '/item/' + that.id)
                            .then(data => {
                                const Data = data.data.data
                                console.log(Data)
                                Indicator.close()
                                Toast({
                                    message: '删除成功'
                                });
                                that.$router.push('/')
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
                    })
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