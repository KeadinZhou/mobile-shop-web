<template>
    <div :style="'min-height: '+clientHeight/10*9+'px'">
        <div style="font-size: 18px; text-align: center; padding: 30px 0;"><h2>首页轮播图设置</h2></div>
        <img-list-frame :img-list="imgList" @delImg="delImgs"></img-list-frame>
        <upload-item @uploadOK="newImg" style="margin-top: 50px"></upload-item>
    </div>
</template>

<script>
    import ImgListFrame from '@/components/img-list-frame'
    import UploadItem from '@/components/upload-item'
    import { Indicator,Toast } from 'mint-ui'
    export default {
        name: "HomeEdit",
        components: {
            'img-list-frame': ImgListFrame,
            'upload-item': UploadItem
        },
        data() {
            return {
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
                imgList: []
            }
        },
        methods: {
            getData () {
                const that = this
                if(that.$store.state.types.length === 0) {
                    setTimeout( () => {
                        that.getData()
                    }, 200)
                    return
                }
                that.imgList = that.$store.state.types[0].image_list
            },
            delImgs (index) {
                this.imgList.splice(index,1)
                this.saveChange()
            },
            newImg (url) {
                this.imgList.push(url)
                this.saveChange()
            },
            saveOK () {
                Indicator.close()
                Toast({
                    message: '保存成功'
                });
            },
            saveChange () {
                const that = this
                Indicator.open({
                    text: '正在保存更改',
                    spinnerType: 'fading-circle'
                });
                that.$http.post(that.$store.state.api + '/category/1', {
                    image_list: JSON.stringify(that.imgList),
                    name: '首页',
                    id: 1,
                    parent_id: null
                })
                    .then(data => {
                        const Data = data.data.data
                        console.log(Data)
                        that.saveOK()
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
        }
    }
</script>

<style scoped>

</style>