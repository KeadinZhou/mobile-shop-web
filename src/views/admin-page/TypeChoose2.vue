<template>
    <div :style="'min-height: '+clientHeight/10*9+'px'">
        <div style="font-size: 18px; text-align: center; padding: 30px 0;"><h2>二级分类列表</h2></div>
        <div v-for="(item, index) in dataList" :key="index">
            <div style="width: 100%; text-align: center; font-size: 14px; color: #333333; margin: 30px 0">{{item.name}}</div>
            <mt-cell
                    v-for="(item2, index2) in dataList2.get(item.id)"
                    :key="index2"
                    :title="item2.name"
                    is-link
                    :to="'/admin/type-edit?id='+item2.id">
            </mt-cell>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TypeChoose2",
        data () {
            return {
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
                dataList: [],
                dataList2: new Map()
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
                that.dataList = []
                for (var item of that.$store.state.types) {
                    if(item.parent_id===1) {
                        that.dataList.push(item)
                    }
                }

                that.dataList2 = new Map()

                var tmp
                for(item of that.dataList) {
                    tmp = []
                    for(var item2 of that.$store.state.types) {
                        if(item.id === item2.parent_id) {
                            tmp.push(item2)
                        }
                    }
                    that.dataList2.set(item.id, tmp)
                }
            },
        },
        created () {
            this.getData()
        }
    }
</script>

<style scoped>

</style>