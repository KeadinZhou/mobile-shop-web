<template>
    <div class="img-box" :style="'width: '+size+'px;height:'+size+'px; background: url(\''+imgUrl+'\') no-repeat;background-size:contain;background-position: center;background-color: white;'" @click="gotoUrl">
        <div class="img-title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: "img-box",
        props: {
            imgUrl: String,
            url: String,
            title: String,
            size: Number
        },
        methods: {
            gotoUrl () {
                this.$router.push(this.url)
            }
        }
    }
</script>

<style scoped>
    .img-box{
        display: inline-block;
        overflow: hidden;
        cursor: pointer;
        margin-bottom: 5px;
    }
    .img-title{
        text-align: center;
        width: 100%;
        height: 20px;
        font-size: 14px;
        background: rgba(0,0,0,0.5);
        color: white;
        margin-top: calc(100% - 20px);
    }
</style>