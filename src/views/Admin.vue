<template>
    <div :style="'min-height: '+clientHeight/10*9+'px'">
        <div style="font-size: 18px; text-align: center; padding: 30px 0;"><h2>管理后台</h2></div>
        <mt-cell title="首页轮播图设置" is-link to="/admin/home"></mt-cell>
        <mt-cell title="一级分类编辑" is-link to="/admin/type1"></mt-cell>
        <mt-cell title="二级分类编辑" is-link to="/admin/type2"></mt-cell>
        <mt-cell title="新增分类" is-link to="/admin/type-add"></mt-cell>
        <mt-cell title="新增产品" is-link to="/admin/item/add"></mt-cell>
        <mt-button type="danger" size="large" :style="'margin-top: '+clientHeight/2+'px'">退出登录</mt-button>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        data () {
            return {
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
            }
        },
        created () {
        }
    }
</script>

<style scoped>

</style>