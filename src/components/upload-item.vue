<template>
    <div style="width: 100%">
        <input type="file" id="realUpload" @change="uploadFile" name="file" accept="image/*">
        <mt-button type="primary" size="large" @click.native="uploadUp">上传图片</mt-button>
    </div>
</template>

<script>
    import { Indicator,Toast } from 'mint-ui';
    export default {
        name: "upload-item",
        data () {
            return {

            }
        },
        methods: {
            uploadUp () {
                document.getElementById("realUpload").click()
            },
            uploadOK (url) {
                Indicator.close()
                Toast({
                    message: '上传成功'
                });
                console.log(url)
                this.$emit('uploadOK',url)
            },
            uploadFile (e) {
                const that = this
                console.log(e.target.files[0])
                var sendData = new FormData()
                sendData.append('file',e.target.files[0])
                Indicator.open({
                    text: '上传中',
                    spinnerType: 'fading-circle'
                });
                that.$http.post(that.$store.state.api + '/file', sendData)
                    .then(data => {
                        const Data = data.data.data
                        console.log(Data)
                        that.uploadOK(Data)
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
    #realUpload{
        display: none;
    }
</style>