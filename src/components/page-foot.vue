<template>
    <div class="page-foot">
        <span><router-link to="/">店铺首页</router-link></span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span @click="about">关于我们</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span><router-link to="/login">后台登录</router-link></span>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "page-foot",
        methods: {
            about () {
                Toast({
                    message: 'Powered by Keadin & taoting'
                });
            }
        }
    }
</script>

<style scoped>
    .page-foot{
        padding: 50px 0;
        font-size: 12px;
        text-align: center;
        color: #5a5a5a;
    }
    router-link{
        color: #5a5a5a;
    }
</style>