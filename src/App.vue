<template>
    <div id="content">
        <Header @addTodo="addTodo" />
        <List class="list" :data="state.filterList" @toggleNav="toggleNav" @toggleState="toggleState" @delTodoItem="delTodoItem" @editDetail="editDetail"/>
    </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import List from "@/components/List.vue";
import { $c, Type, NavType, ITodoItem, IState } from "@/util/common.ts";
import { reactive, watchEffect } from "vue";

export default {
    components: {
        Header,
        List,
    },
    setup() {
        const state: IState = reactive({
            todoList: $c.getStorage("todo") || [],
            filterList: $c.getStorage("todo") || [],
            navKey: NavType.All
        });

        function addTodo(title: string) {
            state.todoList.push({
                id: $c.getRandomStr(10),
                title: title,
                type: Type.Todo,
                create_date: $c.getDate(),
            });
        }

        function toggleNav(key: NavType) {
            state.navKey = key;
            switch (key) {
                case NavType.All:
                    state.filterList = state.todoList;
                    break;
                case NavType.Unsucc:
                    state.filterList = state.todoList.filter((todo) => {
                        return todo.type == Type.Todo;
                    });
                    break;
                case NavType.Succ:
                    state.filterList = state.todoList.filter((todo) => {
                        return todo.type == Type.Complete;
                    });
                    break;
                default:
                    state.filterList = state.todoList;
                    break;
            }
        }

        function toggleState(id: string) {
            const todo = state.todoList.find(todo => {
                return todo.id == id;
            });
            if(todo) {
                if(todo.type == Type.Todo) {
                    todo.type = Type.Complete;
                    todo.complete_date = $c.getDate();
                } else {
                    todo.type = Type.Todo;
                    todo.complete_date = '';
                }
            }
        }

        function delTodoItem(id: string) {
            const index = state.todoList.findIndex(todo => {
                return todo.id == id;
            });
            if(index != -1) {
                state .todoList.splice(index, 1);
            }
        }

        function editDetail(todo: ITodoItem) {
            const todoItem = state.todoList.find(item => {
                return item.id == todo.id;
            });
            if(todoItem) {
                todoItem.detail = todo.detail;
            }
        }

        watchEffect(() => {
            $c.setStorage("todo", state.todoList);
            toggleNav(state.navKey);
        });

        return {
            state,
            addTodo,
            toggleNav,
            toggleState,
            delTodoItem,
            editDetail,
        };
    },
};
</script>

<style scoped>
#content {
    width: 600px;
    max-width: 600px;
    min-height: 300px;
    border-radius: 4px;
    margin-top: 6rem;
    padding-bottom: 1rem;
    background-color: #eee;
}
.list {
    margin-top: 35px;
}
::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px !important;; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px !important;;
    background: #ffffff !important;;
    cursor: pointer !important;

}

::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px !important;
    -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, .5) !important;;
    background: #ccc !important;;
    cursor: pointer !important;
}

::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, .5) !important;;
    border-radius: 0 !important;;
    background: rgba(240, 240, 240, 0.5) !important;;
    cursor: pointer !important;
}
</style>
