<template>
  <el-card header="项目申报附件" shadow="hover">
    <el-row type="flex" justify="center">
      <FileUpload ref="fileUpload" :file-size="500" :id-list="form.uploadList" :value="form.value"></FileUpload>
    </el-row>
  </el-card>
</template>

<script>
import FileUpload from '@/views/project/components/ProjectDetail/FileUpload.vue';

export default {
  components: {
    FileUpload
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['form'],
  data() {
    return {};
  },
  created() {
    this.$props.form.uploadList = [];
    this.$props.form.value = [];
  },
  methods: {}
};
</script>
