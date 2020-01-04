<template>
    <div>
        <mt-cell title="一级目录" is-link @click.native="pick1Show=true">
            {{pick1}}
        </mt-cell>
        <mt-cell title="二级目录" is-link @click.native="pick2Show=true">
            {{pick2}}
        </mt-cell>
        <mt-popup
                v-model="pick1Show"
                position="bottom"
                style="width: 100%;">
            <mt-picker :slots="pickData1" @change="onValuesChange" :visibleItemCount="3" valueKey="1"></mt-picker>
        </mt-popup>

        <mt-popup
                v-model="pick2Show"
                position="bottom"
                style="width: 100%;">
            <mt-picker :slots="pickData2" @change="onValuesChange" :visibleItemCount="3" valueKey="2"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    export default {
        name: "Upload",
        data() {
            return {
                listData: {
                    '艺术玻璃': ['玻璃原片', '夹丝玻璃', '玻璃砖', '热熔玻璃', '玻璃艺术装置', '隔断玻璃'],
                    '亚克力': ['亚克力1', '亚克力2', '亚克力3', '亚克力4', '亚克力5', '亚克力6'],
                    '水晶': ['精抛水晶砖', '热熔水晶砖', '多面立体水晶砖', '波纹气泡水晶砖', '异型水晶砖', '夹钻水晶砖'],
                    '微景观': ['微景观1', '微景观2', '微景观3', '微景观4', '微景观5', '微景观6']
                },
                pick1Show: false,
                pickData1: [{
                        flex: 1,
                        values: ['艺术玻璃', '亚克力', '水晶', '微景观',],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                pick1: '',
                pick2Show: false,
                pickData2: [{
                        flex: 1,
                        values: ['玻璃原片', '夹丝玻璃', '玻璃砖', '热熔玻璃', '玻璃艺术装置', '隔断玻璃'],
                        className: 'slot2',
                        textAlign: 'center'
                    }
                ],
                pick2: '',
            }
        },
        methods: {
            onValuesChange(picker, values) {
                const pick = picker.valueKey
                if(pick==="1") {
                    this.pick1 = values[0]
                    this.pick2 = ''
                    this.pickData2[0].values = this.listData[values[0]]
                } else {
                    this.pick2 = values[0]
                }
            }
        },
    };
</script>

<style scoped>

</style>