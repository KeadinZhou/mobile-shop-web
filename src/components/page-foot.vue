<template>
    <div class="page-foot">
        <span><router-link to="/">店铺首页</router-link></span>
        &nbsp;&nbsp;|&nbsp;&nbsp;<span @click="about">技术支持</span>
        <template v-if="this.$store.state.user.id===-9">
            &nbsp;&nbsp;|&nbsp;&nbsp;<span><router-link to="/login">后台登录</router-link></span>
        </template>
        <template v-else>
            &nbsp;&nbsp;|&nbsp;&nbsp;<span><router-link to="/admin">管理后台</router-link></span>
            &nbsp;&nbsp;|&nbsp;&nbsp;<span @click="logout">退出登录</span>
        </template>
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
            },
            logout () {
                this.$store.commit('logoutUser')
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
    *{
        color: #5a5a5a;
    }
</style>