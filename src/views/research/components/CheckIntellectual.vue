<template>
  <div>
    <div style="margin-top: 10px;"></div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template #title>
          <span>知识产权成员列表</span>
        </template>
        <el-table ref="table1" :data="intellectualLook.ipUserVOList" border style="width: 100%"
          :row-style="{ height: '50px' }" :cell-style="{ padding: '0px' }">
          <el-table-column label="姓名" :resizable="false" align="center" prop="nickName">
          </el-table-column>
          <el-table-column label="职称" :resizable="false" align="center" prop="jobTitle" :formatter="jobTitles">
          </el-table-column>
          <el-table-column label="学历" :resizable="false" align="center" prop="diploma" :formatter="diplomas">
          </el-table-column>
          <el-table-column label="邮箱" :resizable="false" align="center" prop="email">
          </el-table-column>
          <el-table-column label="手机号码" :resizable="false" align="center" prop="phonenumber">
          </el-table-column>
          <el-table-column label="部门名称" :resizable="false" align="center" prop="deptName">
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <span>知识产权附件列表</span>
        </template>
        <el-table ref="table2" :data="intellectualLook.sysOssVoList" border style="width: 100%"
          :row-style="{ height: '50px' }" :cell-style="{ padding: '0px' }">
          <el-table-column label="文件名称" :resizable="false" align="center" :show-overflow-tooltip="true"
            width="150px">
            <template #default="scope">
              {{ truncatedName(scope.row.originalName) }}
            </template>
          </el-table-column>
          <el-table-column :label="'文件格式'" align="center" prop="fileSuffix" :show-overflow-tooltip="true"
            width="120">
            <template #default="scope">
              <el-tag v-if="scope.row.fileSuffix === '.pdf'" type="success" >{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.docx'" type="warning" >{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.doc'" type="warning" >{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.xls'" >{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.xlsx'" >{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.ppt'" type="danger" >{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else-if="scope.row.fileSuffix === '.pptx'" type="danger" >{{ scope.row.fileSuffix }}</el-tag>
              <el-tag v-else type="info" >{{ scope.row.fileSuffix }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="上传人" :resizable="false" align="center" prop="createBy">
          </el-table-column>
          <el-table-column :label="'操作'" :resizable="false" align="center" min-width="100px">
            <template #default="scope">
              <el-button  type="text" icon="el-icon-download" @click="handleDownload(scope.row)">下载
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import request from '@/utils/request';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const props = defineProps<{
  ipId: string;
}>();

const jobTitle = reactive({
  0: '正高级工程师',
  1: '副高级工程师',
  2: '中级工程师',
  3: '初级工程师',
  4: '研究员',
  5: '副研究员',
  6: '助理研究员',
  7: '研究实习员',
});
const diploma = reactive({
  0: '博士研究生',
  1: '硕士研究生',
  2: '本科',
  3: '专科',
});

const activeNames = ref(['1', '2']);
const params = reactive({
  ipId: null,
});
const intellectualLook = reactive({
  ipUserVOList: [],
  sysOssVoList: [],
});

const checkIntellectual = async () => {
  params.ipId = Number(props.ipId);
  console.log(params);
  const resp = await request({
    url: '/ip/getDetails',
    method: 'get',
    params: params,
  });
  console.log(resp);
  intellectualLook.ipUserVOList = resp.data.ipUserVOList;
  console.log(intellectualLook.ipUserVOList);
  intellectualLook.sysOssVoList = resp.data.sysOssVoList;
};

watch(() => props.ipId, (newVal) => {
  params.ipId = Number(newVal);
  console.log(props.ipId);
  console.log(newVal);
  activeNames.value = ['1', '2'];
  checkIntellectual();
}, { immediate: true });

const handleDownload = (row) => {
  proxy?.$download.oss(row.ossId);
};

const truncatedName = (originalName) => {
  const lastDotIndex = originalName.lastIndexOf('.');
  return lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
};

const jobTitles = (row, column, cellValue) => {
  return jobTitle[cellValue] || cellValue;
};

const diplomas = (row, column, cellValue) => {
  return diploma[cellValue] || cellValue;
};
</script>

<style scoped>
.box-card {
  width: 100%;
  margin-bottom: 20px;
}
</style>
