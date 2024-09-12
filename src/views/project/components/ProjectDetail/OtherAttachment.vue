<template>
  <el-card header="项目申报附件" shadow="hover">
    <el-row type="flex" justify="center">
      <FileUpload ref="fileUpload" :file-size="500" :id-list="form.uploadList" :model-value="form.value"></FileUpload>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import FileUpload from '@/components/FileUpload/index.vue';

const props = defineProps(['form']);
const data = {
  return: {}
};

// 获取 FileUpload 组件的实例
const fileUpload = ref();

// 暴露 FileUpload 的 reset 方法
defineExpose({
  reset() {
    fileUpload.value?.reset();
  }
});
</script>
