<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="form" :inline="true">
            <el-form-item label="项目成员" prop="userName">
              <el-input v-model="form.userId" placeholder="请输入角色名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="项目名称" prop="roleKey">
              <el-input v-model="form.projectId" placeholder="请输入权限字符" clearable @keyup.enter="handleQuery" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>
    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button disabled type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="resetQuery"></right-toolbar>
        </el-row>
      </template>

      <el-table ref="roleTableRef" v-loading="loading" border :data="memberList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="姓名" fixed="left" prop="nickName" :show-overflow-tooltip="true" width="200" />
        <el-table-column label="所属公司" prop="deptName" :show-overflow-tooltip="true" width="200" />
        <el-table-column label="所属部门" prop="deptName" :show-overflow-tooltip="true" width="180" />
        <el-table-column label="职称" prop="jobTitle" :show-overflow-tooltip="true" width="160px">
          <template #default="scope">
            {{ sys_jobtitle_type[scope.row.jobTitle]?.label || '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="学历" prop="diploma" :show-overflow-tooltip="true" width="160px">
          <template #default="scope">
            {{ sys_diploma_type[scope.row.diploma]?.label || '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="当前参与项目数" prop="userProjectNumNow" :show-overflow-tooltip="true" width="160" />
        <el-table-column label="当前参与国家级项目数" prop="userNationNumNow" :show-overflow-tooltip="true" width="160" />
        <el-table-column label="当前参与省部级项目数" prop="userProvincialNumNow" :show-overflow-tooltip="true" width="160" />
        <el-table-column label="当前参与自研项目数" prop="userEnterpriseNumNow" :show-overflow-tooltip="true" width="160" />
        <el-table-column label="参与项目总数" prop="userProjectNum" :show-overflow-tooltip="true" width="160" />
        <el-table-column label="参与国家级项目总数" prop="userNationNumNow" :show-overflow-tooltip="true" width="160" />
        <el-table-column label="参与省部级项目总数" prop="userProvincialNumNow" :show-overflow-tooltip="true" width="160" />
        <el-table-column label="参与自研项目总数" prop="userEnterpriseNumNow" :show-overflow-tooltip="true" width="160" />

        <el-table-column fixed="right" label="操作" width="70px">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button v-hasPermi="['system:role:edit']" link type="primary" icon="Reading" @click="showDetailDialog(scope.row.userId)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <MemberDetail :visible="isDetailDialogVisible" :member-id="memberId" @update:visible="isDetailDialogVisible = $event"></MemberDetail>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getMemberList"
      />
    </el-card>
  </div>
</template>

<script setup name="Members" lang="ts">
import { ref } from 'vue';
import MemberDetail from '@/views/project/components/MemberDetails/MemberDetails.vue';
import { getAllList } from '@/api/project/members';
import { ProjectUserBo, ProjectUserVo } from '@/api/project/members/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_jobtitle_type, sys_diploma_type } = toRefs<any>(proxy?.useDict('sys_jobtitle_type', 'sys_diploma_type'));
const showSearch = ref(true);
const isDetailDialogVisible = ref(false);
const memberId = ref<number>();
const memberList = ref<ProjectUserVo[]>([]);
const queryFormRef = ref<ElFormInstance>();

const loading = ref(true);
const total = ref(0);

const showDetailDialog = (userId: number) => {
  isDetailDialogVisible.value = true;
  memberId.value = userId;
};

const initFormData: ProjectUserBo = {
  projectId: undefined,
  userId: undefined
};

const data = reactive({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10
  }
});

const { queryParams, form } = toRefs(data);

const getMemberList = async () => {
  const response = await getAllList(data.queryParams, data.form);
  memberList.value = response.rows;
  total.value = response.total;
  loading.value = false;
};

/**
 * 搜索按钮操作
 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getMemberList();
};

/** 重置 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  form.value = { ...initFormData };
  handleQuery();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'project/members/export',
    {
      ...queryParams.value
    },
    `members_${new Date().getTime()}.xlsx`
  );
};

const handleSelectionChange = () => {
  console.log('handleSelectionChange');
};

onMounted(() => {
  getMemberList();
});
</script>
