<template>
    <mt-swipe :auto="2000" :style="'height: '+this.$store.state.realHeight(750,400,width) +'px'">
<!--        <mt-swipe-item><img src="https://img.yzcdn.cn/upload_files/2019/07/04/FmrN1qwDxFX6vOD1mPvouJdDTyrP.jpg!large.jpg" alt="" width="100%"></mt-swipe-item>-->
<!--        <mt-swipe-item><img src="https://img.yzcdn.cn/upload_files/2019/07/04/FvbhZ88B_r7tE7lek-efAOFDcDkt.jpg!large.jpg" alt="" width="100%"></mt-swipe-item>-->
<!--        <mt-swipe-item><img src="https://img.yzcdn.cn/upload_files/2019/07/04/Fh8HS3UjpuDKgZyh95e9aU9dGTf-.jpg!large.jpg" alt="" width="100%"></mt-swipe-item>-->
<!--        <mt-swipe-item><img src="https://img.yzcdn.cn/upload_files/2019/07/04/FvAaQ5c-bXd4att5_u8OGFcpw0tx.jpg!large.jpg" alt="" width="100%"></mt-swipe-item>-->
<!--        <mt-swipe-item><img src="https://img.yzcdn.cn/upload_files/2019/07/04/FkHLFNMHECRY3GrzRfb36bibIWS6.jpg!large.jpg" alt="" width="100%"></mt-swipe-item>-->
        <mt-swipe-item v-for="(item, index) in imgList" :key="index"><img :src="item" alt="" width="100%"></mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        name: "index-swipe",
        props: {
            width: Number
        },
        data () {
            return {
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
            }
        },
        created () {
            this.getData()
        }
    }
</script>

<style scoped>

</style>