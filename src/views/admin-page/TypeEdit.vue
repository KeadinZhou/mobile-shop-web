<template>
    <div :style="'min-height: '+clientHeight/10*9+'px'">
        <div v-if="typeData">
            <div style="font-size: 18px; text-align: center; padding: 30px 0;"><h2>分类编辑</h2></div>
            <mt-field label="分类名称" placeholder="请输入分类名称" v-model="typeData.name"></mt-field>
            <img :src="typeData.image_list.length?typeData.image_list[0]:'#'" alt="" width="100%">
            <upload-item @uploadOK="uploadImg"></upload-item>
            <mt-button size="large" style="margin-top: 10px; background-color: #06AD56;color: white" @click.native="saveChange">保存修改</mt-button>
        </div>
    </div>
</template>

<script>
    import UploadItem from '@/components/upload-item'
    import { Indicator,Toast } from 'mint-ui'
    export default {
        name: "FirstEdit",
        components: {
            'upload-item': UploadItem
        },
        data() {
            return {
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
                typeData: null
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
                for (const item of that.$store.state.types) {
                    if(item.id == that.$route.query.id) {
                        that.typeData = item
                    }
                }
                console.log(that.typeData)
            },
            uploadImg (data) {
                const that = this
                console.log(data)
                that.typeData.image_list = [data]
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
                that.$http.post(that.$store.state.api + '/category/'+that.$route.query.id, {
                    image_list: JSON.stringify(that.typeData.image_list),
                    name: that.typeData.name,
                    id: that.typeData.id,
                    parent_id: that.typeData.parent_id
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