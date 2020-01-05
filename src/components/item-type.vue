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
                let tmp;
                if(that.type === 0) {
                    tmp = [];
                    for (const item of that.$store.state.types) {
                        if (item.parent_id===1) {
                            tmp.push({
                                id: item.id,
                                imgUrl: item.image_list.length?item.image_list[0]:'#',
                                title: item.name,
                                url: '/second?type=' + item.id
                            })
                        }
                    }
                    console.log(tmp)
                    return tmp
                }
                else {
                    tmp = [];
                    for (const item of that.$store.state.types) {
                        if (item.parent_id === that.typeId) {
                            tmp.push({
                                id: item.id,
                                imgUrl: item.image_list.length?item.image_list[0]:'#',
                                title: item.name,
                                url: '/products/' + item.id + '?title=' + item.name
                            })
                        }
                    }
                    console.log(tmp)
                    return tmp
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