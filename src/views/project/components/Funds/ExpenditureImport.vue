<template>
  <el-dialog :model-value="visible" title="支出信息导入" width="350px" append-to-body @close="closeExpenselImportDialog">
    <div style="padding: 20px">
      <el-upload
        ref="uploadRef"
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
      <div style="margin-top: 20px">
        <el-button @click="handleCancel" type="warning">下载模版</el-button>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :disabled="!fileTemp" @click="confirmUpload">确认</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup Name="ExpenditureImport" lang="ts">
import { defineProps, defineEmits } from 'vue';
import { importExpenditureData } from '@/api/project/funds';

const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(['new-data', 'update:visible', 'close:visible']);
const fileTemp = ref(null); // 存储用户选择的文件
const uploadRef = ref<ElUploadInstance>();
const closeExpenselImportDialog = () => {
  emits('close:visible', false);
  uploadRef.value?.clearFiles();
};

// 超出最大上传文件数量处理方法
const handleExceed = () => {
  ElMessage.warning('只能上传一个文件');
};

// 移除文件操作方法
const handleRemove = (file: any, fileList: any[]) => {
  fileTemp.value = null;
};

// 文件选择变化操作方法
const handleChange = (file: any, fileList: any[]) => {
  fileTemp.value = file.raw;
  // 处理文件变化，如预览等
};

// 取消上传操作方法
const handleCancel = () => {
  fileTemp.value = null;
  emits('close:visible', false);
};

// 确认上传操作方法
const confirmUpload = () => {
  if (!fileTemp.value) {
    ElMessage.error('请先选择一个文件');
    return;
  }
  importExpenditureData(fileTemp.value)
    .then((response) => {
      emits('close:visible', false);
      emits('new-data', response.data)
    })
    .catch(error => {
      fileTemp.value = null;
      ElMessage.error('上传失败，请重试');
    })
    .finally(() => {
      fileTemp.value = null;
    });
};
</script>
