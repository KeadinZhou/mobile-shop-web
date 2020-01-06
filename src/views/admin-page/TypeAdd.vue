<template>
    <div :style="'min-height: '+clientHeight/10*9+'px'">
        <div v-if="typeData">
            <div style="font-size: 18px; text-align: center; padding: 30px 0;"><h2>新增分类</h2></div>
            <mt-field label="分类名称" placeholder="请输入分类名称" v-model="typeData.name"></mt-field>

            <mt-cell title="类别类型" is-link @click.native="pickShow=true" v-if="pick">
                {{pick.name}}
            </mt-cell>

            <img :src="typeData.image_list.length?typeData.image_list[0]:'#'" alt="" width="100%">
            <upload-item @uploadOK="uploadImg"></upload-item>
            <mt-button size="large" style="margin-top: 20px; background-color: #06AD56;color: white" @click.native="addType" :disabled="!typeData.name">立即新增</mt-button>

            <mt-popup
                    v-model="pickShow"
                    position="bottom"
                    style="width: 100%;">
                <mt-picker :slots="pickData" @change="onValuesChange" :visibleItemCount="3" valueKey="name"></mt-picker>
            </mt-popup>
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
                typeData: {
                    name: '',
                    image_list: [],
                    parent_id: null
                },
                pickShow: false,
                pickData: [{
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }],
                pick: {
                    id: -1,
                    name: '请选择'
                },
            }
        },
        methods: {
            onValuesChange(picker, values) {
                this.pick = values[0]
            },
            getData () {
                const that = this
                if(that.$store.state.types.length === 0) {
                    setTimeout( () => {
                        that.getData()
                    }, 200)
                    return
                }
                that.pickData[0].values = []
                for(const item of that.$store.state.types) {
                    if (!item.parent_id || item.parent_id === 1) {
                        that.pickData[0].values.push(item)
                    }
                }
                that.loading = false
            },
            uploadImg (data) {
                const that = this
                console.log(data)
                that.typeData.image_list = [data]
            },
            addOK () {
                const that = this
                Indicator.close()
                Toast({
                    message: '新增成功'
                });
                this.$store.commit('updateTypes')
                setTimeout(()=>{
                    that.$router.push('/')
                },200)
            },
            addType () {
                const that = this
                Indicator.open({
                    text: '正在新增',
                    spinnerType: 'fading-circle'
                });
                that.$http.post(that.$store.state.api + '/category', {
                    image_list: JSON.stringify(that.typeData.image_list),
                    name: that.typeData.name,
                    parent_id: that.pick.id
                })
                    .then(data => {
                        const Data = data.data.data
                        console.log(Data)
                        that.addOK()
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