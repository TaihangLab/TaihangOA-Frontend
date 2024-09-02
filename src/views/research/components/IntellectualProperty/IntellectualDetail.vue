<template>
  <div>
    <div style="margin-top: 10px"></div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template #title>
          <span>知识产权成员列表</span>
        </template>
        <el-table ref="table1" :data="intellectualDetail.ipUserVOList" v-loading="loading" border style="width: 100%">
          <el-table-column label="姓名" :resizable="false" align="center" prop="nickName"> </el-table-column>
          <el-table-column label="职称" :resizable="false" align="center" prop="jobTitle">
            <template #default="scope">
              {{ sys_jobtitle_type[scope.row.jobTitle]?.label || '未知' }}
            </template>
          </el-table-column>
          <el-table-column label="学历" :resizable="false" align="center" prop="diploma">
            <template #default="scope">
              {{ sys_diploma_type[scope.row.diploma]?.label || '未知' }}
            </template>
          </el-table-column>
          <el-table-column label="邮箱" :resizable="false" align="center" prop="email"> </el-table-column>
          <el-table-column label="手机号码" :resizable="false" align="center" prop="phonenumber"> </el-table-column>
          <el-table-column label="部门名称" :resizable="false" align="center" prop="deptName"> </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <span>知识产权附件列表</span>
        </template>
        <el-table ref="table2" :data="intellectualDetail.sysOssVoList" border v-loading="loading" style="width: 100%">
          <el-table-column label="文件名称" :resizable="false" align="center" :show-overflow-tooltip="true" width="150px">
            <template #default="scope">
              {{ truncatedName(scope.row.originalName) }}
            </template>
          </el-table-column>
          <el-table-column :label="'文件格式'" align="center" prop="fileSuffix" :show-overflow-tooltip="true" width="120">
            <template #default="scope">
              <el-tag v-if="scope.row.fileSuffix === '.pdf'" type="success">{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.docx'" type="warning">{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.doc'" type="warning">{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.xls'">{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.xlsx'">{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.ppt'" type="danger">{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.pptx'" type="danger">{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else type="info">{{ scope.row.fileSuffix }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="上传人" :resizable="false" align="center" prop="createByName"> </el-table-column>
          <el-table-column :label="'操作'" :resizable="false" align="center" min-width="100px">
            <template #default="scope">
              <el-button type="text" icon="download" size="small" @click="handleDownload(scope.row.ossId)">下载 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts" name="GetIntellectualDetails">
import { ref, reactive, watch } from 'vue';
import api from '@/api/research/IntellectualProperty';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_diploma_type, sys_jobtitle_type } = toRefs<any>(proxy?.useDict('sys_diploma_type', 'sys_jobtitle_type'));
const emit = defineEmits(['close-dialog']);
const activeNames = ref(['1', '2']);
const loading = ref(true);
const props = defineProps<{
  ipId: number;
}>();

const params = reactive({
  ipId: null
});

const intellectualDetail = reactive({
  ipUserVOList: [],
  sysOssVoList: []
});

const reset = () => {
  intellectualDetail.ipUserVOList = [];
  intellectualDetail.sysOssVoList = [];
};

/** 获取知识产权详情 */
const getIntellectualDetails = async () => {
  reset();
  params.ipId = props.ipId;
  const resp = await api.getIntellectualPropertyDetails(params.ipId);
  intellectualDetail.ipUserVOList = resp.data.ipUserVOList;
  intellectualDetail.sysOssVoList = resp.data.sysOssVoList;
  loading.value = false;
};

/** 下载附件 */
const handleDownload = (ossId) => {
  proxy?.$download.oss(ossId);
};

/** 截断附件名称 */
const truncatedName = (originalName) => {
  const lastDotIndex = originalName.lastIndexOf('.');
  return lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
};

/** 根据点击的id刷新详情 */
watch(
  () => props.ipId,
  (newVal) => {
    params.ipId = newVal;
    activeNames.value = ['1', '2'];
    getIntellectualDetails();
  },
  { immediate: true }
);
</script>
