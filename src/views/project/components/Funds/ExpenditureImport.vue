<template>
  <el-dialog :model-value="visible" title="信息导入" width="400px" append-to-body @close="closeExpenselImportDialog">
    <div style="padding: 20px">
      <!-- 显示已选择的文件 -->
      <div v-if="fileTemp" class="selected-file">已选择文件：{{ fileTemp.name }}</div>
      <el-upload
        ref="upload"
        class="upload-demo"
        action=""
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :limit="1"
        list-type="text"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false"
        drag
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          <em>上传文件</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">仅允许导入xls、xlsx格式文件。</div>
        </template>
      </el-upload>
      <div style="margin-top: 5px">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button size="small" type="primary" :disabled="!fileTemp" @click="confirmUpload">确认</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(['update:visible', 'close:visible']);
const fileTemp = ref(null); // 存储用户选择的文件

const closeExpenselImportDialog = () => {
  emits('close:visible', false);
};

// 超出最大上传文件数量处理方法
const handleExceed = () => {
  // 提示超出最大上传文件数量
};

// 移除文件操作方法
const handleRemove = (file: any, fileList: any[]) => {
  fileTemp.value = null;
  // 删除已上传的文件
};

// 文件选择变化操作方法
const handleChange = (file: any, fileList: any[]) => {
  fileTemp.value = file.raw;
  // 处理文件变化，如预览等
};

// 取消上传操作方法
const handleCancel = () => {
  fileTemp.value = null;
  // 关闭导入对话框
  emits('close:visible', false);
};

// 确认上传操作方法
const confirmUpload = () => {
  if (fileTemp.value) {
    const formData = new FormData();
    formData.append('file', fileTemp.value);
    request
      .post('/project/funds/importData', formData)
      .then((response) => {
        // 处理上传成功的响应
      })
      .catch((error) => {
        // 处理上传失败的情况
      });
  } else {
    // 提示未选择文件
  }
};
</script>
