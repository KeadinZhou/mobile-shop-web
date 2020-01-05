<template>
    <div>
        <div v-if="!imgList.length" style="height: 200px; display: flex; justify-content: center;align-items: center">
            <div style="width: 100%;text-align: center;font-size: 14px;color: #656b79">暂无图片</div>
        </div>
        <mt-cell-swipe
                v-for="(item,index) in imgList"
                :key="index"
                title="👈 左滑删除该图片"
                :right="[{
                  content: '删除',
                  style: { background: 'red', color: '#fff' },
                  handler: () => {
                    $messagebox('确认后删除')
                    .then(() => {
                        $emit('delImg', index)
                    })
                  }
                 }]">
            <img :src="item" alt="" :height="clientHeight/10+'px'">
        </mt-cell-swipe>
    </div>
</template>

<script>
    export default {
        name: "img-list-frame",
        props: {
            imgList: Array
        },
        data() {
            return {
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
            }
        },
    }
</script>

<style scoped>

</style>