<template>
    <div class="header">
        <h3>待办清单</h3>
        <div class="ipt">
            <el-input
                v-model="input"
                @keyup.enter="addTodo"
                placeholder="请输入待办内容，按回车键添加"
            ></el-input>
            <el-button type="primary" @click="addTodo">添加</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup(props, context) {
        const input: any = ref("");

        const addTodo = () => {
            if (!input.value) return;
            context.emit('addTodo', input.value);
            input.value = '';
        };

        return {
            input,
            addTodo,
        };
    },
});
</script>

<style scoped>
.header {
    display: flex;
    flex-direction: column;
}

h3 {
    padding-left: 30px;
}

.ipt {
    width: 90%;
    margin: 0 auto;
    display: flex;
}
.el-button {
    margin-left: 6px;
}
</style>