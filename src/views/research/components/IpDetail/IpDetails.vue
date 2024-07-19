<template>
  <el-dialog :model-value="visible" title="详情" width="50%" @update:model-value="updateVisible">
    <el-collapse v-model="activeNames[0]" accordion>
      <el-collapse-item name="1">
        <template #title>
          <span>知识产权成员列表</span>
        </template>
        <el-table ref="multipleTable" border style="width: 100%" :row-style="{ height: '50px' }" :cell-style="{ padding: '0px' }">
          <el-table-column label="姓名" :resizable="false" align="center" prop="nickName"> </el-table-column>
          <el-table-column label="职称" :resizable="false" align="center" prop="jobTitle"> </el-table-column>
          <el-table-column label="学历" :resizable="false" align="center" prop="diploma"> </el-table-column>
          <el-table-column label="邮箱" :resizable="false" align="center" prop="email"> </el-table-column>
          <el-table-column label="手机号码" :resizable="false" align="center" prop="phonenumber"> </el-table-column>
          <el-table-column label="部门名称" :resizable="false" align="center" prop="deptName"> </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="activeNames[1]" accordion>
      <el-collapse-item name="2">
        <template #title>
          <span>知识产权附件列表</span>
        </template>
        <el-table ref="multipleTable" border style="width: 100%" :row-style="{ height: '50px' }" :cell-style="{ padding: '0px' }">
          <el-table-column label="文件名称" :resizable="false" align="center" :show-overflow-tooltip="true" width="450">
            <template> {{}} </template>
          </el-table-column>
          <el-table-column :label="'文件格式'" align="center" prop="fileSuffix" :show-overflow-tooltip="true" width="120">
            <template #default="scope">
              <div width="120">
                <el-tag v-if="scope.row.fileSuffix === '.pdf'" type="success" size="small">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.docx'" type="warning" size="small">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.doc'" type="warning" size="small">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.xls'" size="small">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.xlsx'" size="small">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.ppt'" type="danger" size="small">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else-if="scope.row.fileSuffix === '.pptx'" type="danger" size="small">{{ scope.row.fileSuffix }}</el-tag>
                <el-tag v-else type="info" size="small">{{ scope.row.fileSuffix }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上传人" :resizable="false" align="center" prop="createBy"> </el-table-column>
          <el-table-column :label="'操作'" :resizable="false" align="center" min-width="100px">
            <template> </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';

let activeNames = ['1', '2'];

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

watch(
  () => props.visible,
  (newValue, oldValue) => {
    activeNames = ['1', '2'];
  }
);
</script>

<style scoped>
/* 你的样式 */
</style>
