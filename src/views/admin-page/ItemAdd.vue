<template>
    <div v-if="!loading" :style="'min-height: '+clientHeight/10*9+'px'">
        <div style="font-size: 18px; text-align: center; padding: 30px 0;"><h2>新增产品</h2></div>
        <mt-field label="产品名称" placeholder="请输入产品名称" v-model="itemData.name"></mt-field>
        <mt-cell title="一级分类" is-link @click.native="pick1Show=true">
            {{pick1.type1}}
        </mt-cell>
        <mt-cell title="二级分类" is-link @click.native="pick2Show=true">
            {{pick2.name}}
        </mt-cell>
        <mt-field label="产品描述" placeholder="请输入产品描述" type="textarea" rows="3" v-model="itemData.description"></mt-field>

        <img-list-frame :img-list="itemData.image_list" @delImg="delImgs"></img-list-frame>

        <upload-item @uploadOK="newImgs"></upload-item>

        <mt-button size="large" style="margin-top: 10px; background-color: #06AD56;color: white" @click.native="saveItem" :disabled="itemData.name===''">立即新增</mt-button>

        <mt-popup
                v-model="pick1Show"
                position="bottom"
                style="width: 100%;">
            <mt-picker :slots="pickData1" @change="onValuesChange" :visibleItemCount="3" valueKey="type1"></mt-picker>
        </mt-popup>

        <mt-popup
                v-model="pick2Show"
                position="bottom"
                style="width: 100%;">
            <mt-picker :slots="pickData2" @change="onValuesChange" :visibleItemCount="3" valueKey="name"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import ImgListFrame from '@/components/img-list-frame'
    import UploadItem from '@/components/upload-item'
    import { Indicator,Toast } from 'mint-ui'
    export default {
        name: "ItemAdd",
        components: {
            'img-list-frame': ImgListFrame,
            'upload-item': UploadItem
        },
        data() {
            return {
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
                loading: true,
                listData: null,
                pick1Show: false,
                pickData1: [{
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }
                ],
                pick1: {
                    id: -1,
                    type1: '请选择'
                },
                pick2Show: false,
                pickData2: [{
                    flex: 1,
                    values: [],
                    className: 'slot2',
                    textAlign: 'center'
                }
                ],
                pick2: {
                    id: -1,
                    name: '请选择'
                },
                itemData: {
                    name: '',
                    image_list: [],
                    description: '',
                    category_id: -1
                },
            }
        },
        methods: {
            onValuesChange(picker, values) {
                const pick = picker.valueKey
                if(pick==="type1") {
                    this.pick1 = values[0]
                    this.pick2 = ''
                    this.pickData2[0].values = this.listData.get(values[0].id)
                } else {
                    this.pick2 = values[0]
                    this.itemData.category_id = values[0].id
                }
            },
            getData () {
                const that = this
                if(that.$store.state.types.length === 0) {
                    setTimeout( () => {
                        that.getData()
                    }, 200)
                    return
                }
                that.pickData1[0].values = []
                that.listData = new Map()
                for(const item of that.$store.state.types) {
                    if (!item.parent_id) continue
                    if (item.parent_id === 1) {
                        that.pickData1[0].values.push({
                            id: item.id,
                            type1: item.name,
                        })
                    }
                    var tmp = []
                    for(const item2 of that.$store.state.types) {
                        if(item2.parent_id === item.id) {
                            tmp.push(item2)
                        }
                    }
                    that.listData.set(item.id, tmp)
                }
                that.loading = false
            },
            delImgs (index) {
                this.itemData.image_list.splice(index,1)
            },
            newImgs (url) {
                this.itemData.image_list.push(url)
            },
            addOK () {
                Indicator.close()
                Toast({
                    message: '添加成功'
                });
                this.$router.push('/admin')
            },
            saveItem () {
                const that = this
                Indicator.open({
                    text: '正在添加',
                    spinnerType: 'fading-circle'
                });
                let sendData = JSON.parse(JSON.stringify(that.itemData));
                sendData.image_list = JSON.stringify(sendData.image_list)
                console.log(sendData)
                that.$http.post(that.$store.state.api + '/item', sendData)
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
    };
</script>

<style scoped>

</style>