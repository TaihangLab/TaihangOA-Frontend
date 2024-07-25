<template>
  <el-card header="项目申报附件" shadow="hover">
    <el-row type="flex" justify="center">
      <FileUpload ref="fileUpload" :file-size="500" :id-list="form.uploadList" :value="form.value"></FileUpload>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import FileUpload from '@/views/project/components/ProjectDetail/FileUpload.vue';

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['form']);
const data = {
  return: {}
};

function created() {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.uploadList = [];
  // eslint-disable-next-line vue/no-mutating-props
  props.form.value = [];
}
</script>
