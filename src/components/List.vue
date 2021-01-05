<template>
    <div class="list">
        <el-tabs v-model="activeNav" @tab-click="handleClick">
            <el-tab-pane label="全部" name="All"></el-tab-pane>
            <el-tab-pane label="未完成" name="Unsucc"></el-tab-pane>
            <el-tab-pane label="已完成" name="Succ"></el-tab-pane>
        </el-tabs>
        <div class="cont">
            <template v-if="data.length">
                <div
                    class="item"
                    :class="{ succ: todo.type == Type.Complete }"
                    v-for="todo in data"
                    :key="todo.id"
                    @click="clickItem(todo.id)"
                >
                    <div class="icon">
                        <i
                            class="el-icon-circle-check"
                            v-if="todo.type != Type.Complete"
                        ></i>
                        <i
                            class="el-icon-success"
                            style="color: green"
                            v-else
                        ></i>
                    </div>
                    <div class="msg">
                        <span
                            class="title"
                            :class="{ del: todo.type == Type.Complete }"
                            >{{ todo.title }}</span
                        >
                        <span class="detail" v-if="todo.detail">{{
                            todo.detail
                        }}</span>
                    </div>
                    <div class="date">
                        <div>
                            <i class="el-icon-alarm-clock"></i>
                            {{ todo.create_date }}
                        </div>
                        <div v-if="todo.complete_date" style="color: green; margin-top: 4px;">
                            <i
                                class="el-icon-alarm-clock"
                                style="color: green"
                            ></i>
                            {{ todo.complete_date }}
                        </div>
                    </div>
                    <div class="delete">
                        <i class="el-icon-circle-close del" @click.stop="delItem(todo.id)"></i>
                        <i
                            class="el-icon-edit edit"
                            @click.stop="modifyDetail(todo)"
                        ></i>
                    </div>
                </div>
            </template>
            <template v-else>
                <span class="nomsg">空空如也</span>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { $c, Type, NavType, ITodoItem } from "@/util/common";
import {ElMessageBox} from 'element-plus';

export default defineComponent({
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    setup(props, context) {
        const activeNav = ref("All");

        function handleClick() {
            context.emit("toggleNav", activeNav.value);
        }

        function clickItem(id: string) {
            context.emit("toggleState", id);
        }

        function delItem(id: string) {
            ElMessageBox.confirm('此操作将删除选中项，是否确认?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=> {
                context.emit("delTodoItem", id);
            });
        }

        function modifyDetail(todo: ITodoItem) {
            ElMessageBox.prompt('', '请输入备注',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: todo.detail
            }).then(({value}) => {
                todo.detail = value;
                context.emit('editDetail', todo);
            });
        }

        return {
            activeNav,
            handleClick,
            clickItem,
            Type,
            delItem,
            modifyDetail
        };
    },
});
</script>

<style scoped>
.list {
    padding: 0 30px;
}
.list .cont {
    max-height: 400px;
    overflow: auto;
    padding: 0 10px;
}
.cont .item {
    width: 100%;
    min-height: 60px;
    margin: 10px 0 10px;
    padding: 0 15px;
    border-radius: 8px;
    background-color: #fff;
    color: #333;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid #eee;
}
.cont .item.succ {
    background-color: #f7f7f7;
}
.cont .item:hover {
    border: 1px solid #66b1ff;
}
.cont .item .icon {
    margin-right: 5px;
}
.cont .item .msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.cont .item .msg .title {
    font-size: 16px;
}
.cont .item .msg .detail{
    font-size: 12px;
    margin-top: 4px;
    color: #555;
}
.cont .item .msg .title.del {
    text-decoration: line-through;
}
.cont .date {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 13.5px;
}
.cont .item .delete {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
}
.cont .item .delete .del:hover {
    color: red;
}
.cont .item .delete .edit{
    margin-top: 4px;
}
.cont .item .delete .edit:hover {
    color: #66b1ff;
}
.cont .nomsg {
    width: 100%;
    display: inline-block;
    padding: 20px 0;
    color: #555;
}
::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px !important; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px !important;
    background: #ffffff !important;
    cursor: pointer !important;
}

::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px !important;
    -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, 0.5) !important;
    background: #ccc !important;
    cursor: pointer !important;
}

::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, 0.5) !important;
    border-radius: 0 !important;
    background: rgba(240, 240, 240, 0.5) !important;
    cursor: pointer !important;
}
</style>