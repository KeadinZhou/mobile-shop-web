<template>
    <div :style="'min-height: '+clientHeight/10*9+'px'">
        <div style="font-size: 18px; text-align: center; padding: 30px 0;"><h2>一级分类列表</h2></div>
        <mt-cell
                v-for="(item, index) in dataList"
                :key="index"
                :title="item.name"
                is-link
                :to="'/admin/type-edit?id='+item.id">
        </mt-cell>
    </div>
</template>

<script>
    export default {
        name: "TypeChoose1",
        data () {
            return {
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
                dataList: []
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
            },
        },
        created () {
            this.getData()
        }
    }
</script>

<style scoped>

</style>