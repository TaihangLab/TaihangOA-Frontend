<template>
  <div class="p-3">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryForm" :inline="true">
            <el-form-item label="项目名称" prop="assignedSubjectName">
              <el-input v-model="queryForm.assignedSubjectName" placeholder="请输入项目名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="项目级别" prop="projectLevel">
              <el-select v-model="queryForm.projectLevel" placeholder="请选择项目级别" clearable>
                <el-option v-for="dict in pro_level_type" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
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
          <right-toolbar v-model:showSearch="showSearch" @query-table="getProjectList"></right-toolbar>
        </el-row>
      </template>
    <el-table ref="targetTableRef" v-loading="loading" :data="projectList" border @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="项目名称" :resizable="false" prop="assignedSubjectName" width="200px" :show-overflow-tooltip="true" fixed="left"> </el-table-column>
      <el-table-column label="项目牵头单位" :resizable="false" prop="leadingUnit" :show-overflow-tooltip="true" width="190"> </el-table-column>
      <el-table-column label="项目来源" :resizable="false" prop="projectSource" :show-overflow-tooltip="true" width="190"> </el-table-column>
      <el-table-column label="项目负责人" :resizable="false" prop="projectLeader" :show-overflow-tooltip="true" width="180"> </el-table-column>
      <el-table-column label="项目级别" :resizable="false" prop="projectLevel" :show-overflow-tooltip="true" width="110">
        <template #default="scope">
          {{ pro_level_type[scope.row.projectLevel]?.label || '未知' }}
        </template>
      </el-table-column>
      <el-table-column label="是否牵头单位" :resizable="false" prop="hasLeadingRole" :show-overflow-tooltip="true" width="140">
        <template #default="scope">
          {{ pro_cooperative_unit[scope.row.projectLevel]?.label || '未知' }}
        </template>
      </el-table-column>
      <el-table-column label="负责课题" :resizable="false" prop="assignedSubjectSection" :show-overflow-tooltip="true" width="150"> </el-table-column>
      <el-table-column label="公司负责人" :resizable="false" prop="companyLeader" :show-overflow-tooltip="true" width="130"> </el-table-column>
      <el-table-column label="部门负责人" :resizable="false" prop="departmentLeader" :show-overflow-tooltip="true" width="130"> </el-table-column>
      <el-table-column label="科研项目管理人" :resizable="false" prop="researchManager" :show-overflow-tooltip="true" width="180"> </el-table-column>
      <el-table-column label="立项时间" :resizable="false" prop="projectEstablishTime" width="170"> </el-table-column>
      <el-table-column label="项目计划验收时间" :resizable="false" prop="projectScheduledCompletionTime" :show-overflow-tooltip="true" width="170"> </el-table-column>
      <el-table-column label="项目推进情况" :resizable="false" prop="projectProgressStatus" :show-overflow-tooltip="true" width="150">
        <template #default="scope">
          {{ pro_progress_status[scope.row.projectLevel]?.label || '未知' }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-tooltip content="指标详情" placement="top">
            <el-button
              v-hasPermi="['system:role:edit']"
              link
              type="primary"
              icon="Reading"
              @click="showTargetDetailDialog(scope.row.projectId)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="添加指标" placement="top">
            <el-button
              v-hasPermi="['system:role:edit']"
              link
              type="primary"
              icon="Plus"
              @click="showTargetEditDialog(scope.row.projectId)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getProjectList"
      />
    </el-card>
    <TargetEdit :visible="targetEditDialog" :project-id="editProjectId" @update:visible="targetEditDialog = $event"></TargetEdit>
    <TargetDetail :visible="targetDetailDialog" :project-id="detailProjectId" @update:visible="targetDetailDialog = $event"></TargetDetail>
  </div>
</template>

<script setup Name="target" lang="ts">
import { ref } from 'vue';
import { getAllProjectList } from '@/api/project/myProject';
import { ProjectBaseInfoVO, queryProjectData } from '@/api/project/myProject/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const total = ref(0);
const projectList = ref<ProjectBaseInfoVO[]>([]);
const showSearch = ref(true);
const { pro_level_type, pro_cooperative_unit, pro_progress_status } = toRefs<any>(proxy?.useDict('pro_level_type','pro_cooperative_unit','pro_progress_status'));
const loading = ref(true);
const queryFormRef = ref<ElFormInstance>();
const targetTableRef = ref<ElTableInstance>();
const targetEditDialog = ref(false);
const targetDetailDialog = ref(false);
const detailProjectId = ref<number>();
const editProjectId = ref<number>();


const initQueryForm: queryProjectData = {
  assignedSubjectName: undefined,
  projectLevel: undefined,
}

const data = reactive({
  queryForm: { ...initQueryForm },
  queryParams: {
    pageNum: 1,
    pageSize: 10
  }
});

const { queryForm, queryParams } = toRefs(data);

const getProjectList = async () => {
  const resp = await getAllProjectList(data.queryForm, data.queryParams,);
  total.value = resp.total;
  projectList.value = resp.rows;
  loading.value = false;
}

const resetQuery = () => {
  queryFormRef.value?.resetFields();
  queryForm.value = { ...initQueryForm };
  handleQuery();
};

const handleQuery = () => {
  loading.value = true;
  queryParams.value.pageNum = 1;
  getProjectList();
};

const showTargetEditDialog = (projectId: number) => {
  targetEditDialog.value = true;
  editProjectId.value = projectId;
};

const showTargetDetailDialog = (projectId: number) => {
  targetDetailDialog.value = true;
  detailProjectId.value = projectId;
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: number[]) => {
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

onMounted(() => {
  getProjectList();
})
</script>

<style scoped lang="scss">

</style>
