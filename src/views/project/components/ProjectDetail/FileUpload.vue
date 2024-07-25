<template>
  <div id="app">
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      :auto-upload="false"
      list-type="picture-card"
      accept="image/*"
    >
      <i class="el-icon-plus"></i>
      <div class="el-upload__text">上传文件</div>
    </el-upload>
    <el-dialog v-model:visible="dialogVisible" width="30%">
      <img :src="imageUrl" class="img-preview" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElUpload, ElDialog } from 'element-plus';

const dialogVisible = ref(false);
const imageUrl = ref('');

// 预览处理
const handlePreview = (file) => {
  imageUrl.value = URL.createObjectURL(file.raw);
  dialogVisible.value = true;
};

// 删除处理
const handleRemove = (file, fileList) => {
  console.log('文件删除:', file, fileList);
};

// 上传成功处理
const handleSuccess = (response, file, fileList) => {
  console.log('上传成功:', response, file, fileList);
};

// 上传失败处理
const handleError = (error, file, fileList) => {
  console.log('上传失败:', error, file, fileList);
};

// 上传前检查
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    alert('只能上传图片文件!');
  }
  return isImage;
};
</script>

<style>
.upload-demo i {
  font-size: 28px;
  color: #409eff;
}
.upload-demo .el-upload__text {
  font-size: 14px;
  color: #999;
}
.img-preview {
  width: 100%;
}
</style>
