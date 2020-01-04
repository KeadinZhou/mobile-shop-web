<template>
    <div :style="'width: 100%;height:' +clientHeight+ 'px'">
        <div :style="'width: 100%;height:' +clientHeight/3*2+ 'px'" class="login-img-box">
            <img src="@/assets/login.png" alt="" width="200px" height="200px">
        </div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div :style="'width: 100%;height:' +clientHeight/11+ 'px'"></div>
        <mt-button type="primary" size="large" @click.native="login">登录</mt-button>
    </div>
</template>

<script>
    import { Indicator,Toast } from 'mint-ui';
    export default {
        name: "Login",
        data () {
            return {
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
                username: '',
                password: ''
            }
        },
        methods: {
            login_ok () {
                const that = this
                Indicator.close()
                Toast({
                    message: '登录成功'
                });
                that.$router.push('/')
            },
            login () {
                const that = this
                Indicator.open({
                    text: '登录中',
                    spinnerType: 'fading-circle'
                });
                that.$http.post(that.$store.state.api + '/session', {
                    username: that.username,
                    password: that.password
                })
                    .then(data => {
                        const Data = data.data.data
                        console.log(Data)
                        that.$store.commit('updateUser')
                        that.login_ok()
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
        }
    }
</script>

<style scoped>
    .login-img-box{
        display: flex;
        justify-content: center;
        justify-items: center;
        align-items: center;
    }
</style>