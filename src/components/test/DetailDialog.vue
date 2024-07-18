<!-- src/components/DetailDialog.vue -->
<template>
  <el-dialog :model-value="visible" @update:model-value="updateVisible" title="详情" width="50%">
    <p>详情内容</p>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="confirmDialog">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(['update:visible']);

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const closeDialog = () => {
  emits('update:visible', false);
};

const confirmDialog = () => {
  // 处理确定逻辑
  emits('update:visible', false);
};
// 使用 watch 监听 updateVisible 变化并打印到控制台
watch(
  () => props.visible,
  (newValue, oldValue) => {
    console.log('Visible changed:', newValue);
  }
);
</script>

<style scoped>
/* 你的样式 */
</style>
