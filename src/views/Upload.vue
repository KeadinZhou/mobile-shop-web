<template>
    <div v-if="!loading">
        <mt-cell title="一级目录" is-link @click.native="pick1Show=true">
            {{pick1.type1}}
        </mt-cell>
        <mt-cell title="二级目录" is-link @click.native="pick2Show=true">
            {{pick2.name}}
        </mt-cell>
        <input type="file">
        <mt-popup
                v-model="pick1Show"
                position="bottom"
                style="width: 100%;">
            <mt-picker :slots="pickData1" @change="onValuesChange" :visibleItemCount="3" valueKey="type1"></mt-picker>
        </mt-popup>

        <mt-popup
                v-model="pick2Show"
                position="bottom"
                style="width: 100%;">
            <mt-picker :slots="pickData2" @change="onValuesChange" :visibleItemCount="3" valueKey="name"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    export default {
        name: "Upload",
        data() {
            return {
                loading: true,
                listData: null,
                pick1Show: false,
                pickData1: [{
                        flex: 1,
                        values: [{
                            id: 2,
                            type1:'艺术玻璃',
                        },{
                            id: 2,
                            type1:'亚克力',
                        },{
                            id: 2,
                            type1:'水晶',
                        },{
                            id: 2,
                            type1:'微景观',
                        },],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                pick1: {
                    id: -1,
                    type1: '请选择'
                },
                pick2Show: false,
                pickData2: [{
                        flex: 1,
                        values: null,
                        className: 'slot2',
                        textAlign: 'center'
                    }
                ],
                pick2: {
                    id: -1,
                    name: '请选择'
                },
            }
        },
        methods: {
            onValuesChange(picker, values) {
                const pick = picker.valueKey
                if(pick==="type1") {
                    this.pick1 = values[0]
                    this.pick2 = ''
                    this.pickData2[0].values = this.listData.get(values[0].id)
                } else {
                    this.pick2 = values[0]
                }
            },
            getData () {
                const that = this
                if(that.$store.state.types.length === 0) {
                    setTimeout( () => {
                        that.getData()
                    }, 200)
                    return
                }
                that.pickData1[0].values = []
                that.listData = new Map()
                for(const item of that.$store.state.types) {
                    if (!item.parent_id) continue
                    if (item.parent_id === 1) {
                        that.pickData1[0].values.push({
                            id: item.id,
                            type1: item.name,
                        })
                    }
                    var tmp = []
                    for(const item2 of that.$store.state.types) {
                        if(item2.parent_id === item.id) {
                            tmp.push(item2)
                        }
                    }
                    that.listData.set(item.id, tmp)
                }
                that.loading = false
            }
        },
        created () {
            this.getData()
        }
    };
</script>

<style scoped>

</style>