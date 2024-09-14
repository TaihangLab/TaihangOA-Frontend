<template>
  <div>
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :inline="true" :model="queryParams">
            <el-form-item label="项目名称">
              <el-input v-model="form.assignedSubjectName" clearable placeholder="请输入项目名称" @keyup.enter="handleQuery"></el-input>
            </el-form-item>
            <el-form-item label="负责课题">
              <el-input v-model="form.assignedSubjectSection" clearable placeholder="请输入负责课题名称" @keyup.enter="handleQuery"></el-input>
            </el-form-item>
            <el-form-item label="项目成员">
              <el-cascader
                v-model="form.userId"
                :options="userOptions"
                :props="{ value: 'id', label: 'label', children: 'children', emitPath: false }"
                clearable
                :show-all-levels="false"
                placeholder="请选择项目成员"
                @keyup.enter="handleQuery"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="合作单位">
              <el-select v-model="form.hasCooperativeUnit" placeholder="请选择项目级别" clearable>
                <el-option v-for="dict in pro_cocompany_type" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="立项时间">
              <el-date-picker
                v-model="establishDateRange"
                type="daterange"
                unlink-panels
                clearable
                start-placeholder="请输入查询范围"
                end-placeholder="如：2000-01-01"
                value-format="YYYY-MM-DD"
                range-separator="至"
                @keyup.enter="handleQuery"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="项目计划验收时间" label-width="125px">
              <el-date-picker
                v-model="scheduledCompletionDateRange"
                type="daterange"
                unlink-panels
                clearable
                start-placeholder="请输入查询范围"
                end-placeholder="如：2000-01-01"
                value-format="YYYY-MM-DD"
                range-separator="至"
                @keyup.enter="handleQuery"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="项目级别">
              <el-select v-model="form.projectLevel" placeholder="请选择项目级别" clearable>
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
    <div>
      <el-card shadow="hover">
        <template #header>
          <el-row :gutter="10">
            <el-col :span="1.5">
              <el-button type="primary" plain icon="Plus" @click="showAddDialog">新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button disabled type="warning" plain icon="Download" @click="handleExport">导出</el-button>
            </el-col>
            <right-toolbar v-model:showSearch="showSearch" @query-table="resetQuery"></right-toolbar>
          </el-row>
        </template>
        <el-table ref="multipleTable" v-loading="loading" :data="projectList" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="项目名称" :resizable="false" prop="assignedSubjectName" width="150" :show-overflow-tooltip="true" fixed="left">
          </el-table-column>
          <el-table-column label="项目牵头单位" :resizable="false" prop="leadingUnit" width="180" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="项目来源" :resizable="false" prop="projectSource" width="180" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="项目负责人" :resizable="false" prop="projectLeader" width="150" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="项目级别" :resizable="false" prop="projectLevel" width="110" :show-overflow-tooltip="true">
            <template #default="scope">
              {{ pro_level_type[scope.row.projectLevel]?.label || '未知' }}
            </template>
          </el-table-column>
          <el-table-column label="是否牵头单位" :resizable="false" prop="hasLeadingRole" width="110" :show-overflow-tooltip="true">
            <template #default="scope">
              {{ pro_cooperative_unit[scope.row.hasLeadingRole]?.label || '未知' }}
            </template>
          </el-table-column>
          <el-table-column label="负责课题" :resizable="false" prop="assignedSubjectSection" width="150" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="公司负责人" :resizable="false" prop="companyLeader" width="150" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="部门负责人" :resizable="false" prop="departmentLeader" width="150" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="科研项目管理人" :resizable="false" prop="researchManager" width="150" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="立项时间" :resizable="false" prop="projectEstablishTime" width="130" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="项目计划验收时间"
            :resizable="false"
            prop="projectScheduledCompletionTime"
            width="150"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="项目推进情况" :resizable="false" prop="projectProgressStatus" width="130" :show-overflow-tooltip="true">
            <template #default="scope">
              {{ pro_progress_status[scope.row.hasLeadingRole]?.label || '未知' }}
            </template>
          </el-table-column>
          <el-table-column label="合作单位" :resizable="false" prop="collaboratingUnit" width="150" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="经费总额" :resizable="false" prop="totalFundsAll" width="150" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="专项经费总额" :resizable="false" prop="totalFundsZx" width="150" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="专项到款总额" :resizable="false" prop="totalFundsZxDk" width="150" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="已完成自筹投资" :resizable="false" prop="zctzDone" width="150" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="已完成专项投资" :resizable="false" prop="zxtzDone" width="150" :show-overflow-tooltip="true"> </el-table-column>、
          <el-table-column label="自筹经费公司配套" :resizable="false" prop="zcGspt" width="150" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column label="专项经费公司留存（计划）" :resizable="false" prop="zxGslc" width="150" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="更新时间" :resizable="false" prop="updateTime" width="170" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template #default="scope">
              <el-tooltip content="查看大事记" placement="top">
                <el-button link type="primary" icon="Notebook" @click="showMilestoneDetailDialog(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="新增大事记" placement="top">
                <el-button link type="primary" icon="DocumentAdd" @click="showMilestoneAddDialog(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="详情" placement="top">
                <el-button link type="primary" icon="Reading" @click="showDetailDialog(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 详情打开的界面 -->
        <ProjectDetailDialog
          v-if="isDetailDialogVisible"
          :visible="isDetailDialogVisible"
          :project-id="projectId"
          @update:visible="isDetailDialogVisible = $event"
        />
        <!-- 大事记查看打开的界面 -->
        <MilestoneDetailDialog
          v-if="isMilestoneDetailDialogVisible"
          :visible="isMilestoneDetailDialogVisible"
          :project-id="projectId"
          :update-id="projectId"
          @update:visible="isMilestoneDetailDialogVisible = $event"
        />
        <!--新增大事记-->
        <MilestoneAddDialog :visible="isAddMilestoneDialogVisible" :project-id="projectId" @update:visible="isAddMilestoneDialogVisible = $event" />
        <!-- 修改项目弹出的对话框-->
        <ProjectUpdateDialog
          :visible="isUpdateDialogVisible"
          :update-id="updateId"
          @update:visible="isUpdateDialogVisible = $event"
          @reload-project-list="getProjectList"
        />
        <ProjectAddDialog
          :visible="isAddDialogVisible"
          update-id=""
          @update:visible="isAddDialogVisible = $event"
          @reload-project-list="getProjectList"
        />
        <pagination
          v-if="total > 0"
          v-model:total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getProjectList"
        />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
import ProjectAddDialog from '@/views/project/components/MyProject/ProjectAdd.vue';
import { deleteProject, getAllProjectList } from '@/api/project/myProject';
import { userTreeSelect } from '@/api/system/user';
import { ProjectBaseInfoBO } from '@/api/project/funds/types';
import MilestoneAddDialog from '@/views/project/components/Milestone/MilestoneAdd.vue';
import ProjectUpdateDialog from '@/views/project/components/MyProject/ProjectUpdate.vue';
import ProjectDetailDialog from '@/views/project/components/MyProject/ProjectDetails.vue';
import MilestoneDetailDialog from '@/views/project/components/Milestone/MilestoneDetail.vue';
import { ProjectBaseInfoVO } from '@/api/project/myProject/types';

const loading = ref(true);
const projectList = ref<ProjectBaseInfoVO[]>([]);
const queryFormRef = ref<ElFormInstance>();
const establishDateRange = ref<[DateModelType, DateModelType]>(['', '']);
const scheduledCompletionDateRange = ref<[DateModelType, DateModelType]>(['', '']);
const userOptions = ref<any[]>([]);
const total = ref(0);
const showSearch = ref(true);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { pro_level_type, pro_cocompany_type, pro_cooperative_unit, pro_progress_status } = toRefs<any>(
  proxy?.useDict('pro_level_type', 'pro_cocompany_type', 'pro_cooperative_unit', 'pro_progress_status')
);
const isAddDialogVisible = ref(false);
const isDetailDialogVisible = ref(false);
const isMilestoneDetailDialogVisible = ref(false);
const isAddMilestoneDialogVisible = ref(false);
const isUpdateDialogVisible = ref(false);
const projectId = ref<number>(undefined);
const updateId = ref<number>(undefined);

const initFormData: ProjectBaseInfoBO = {
  assignedSubjectName: '', // 项目名称
  projectLevel: undefined, // 项目级别
  assignedSubjectSection: undefined, // 负责课题
  hasCooperativeUnit: undefined, // 合作单位
  userId: undefined, // 项目成员
  projectEstablishTimeSta: '', // 立项时间开始时间
  projectEstablishTimeEnd: '', // 立项时间结束时间
  projectScheduledCompletionTimeSta: '', // 项目计划验收时间开始时间
  projectScheduledCompletionTimeEnd: '' // 项目计划验收时间结束时间
};

const data = reactive({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10
  }
});

const { form, queryParams } = toRefs(data);

/** 查询用户下拉树结构 */
const getUserTreeSelect = async () => {
  const resp = await userTreeSelect();
  userOptions.value = resp.data;
};

const showAddDialog = () => {
  isAddDialogVisible.value = true;
};

const showDetailDialog = (row: ProjectBaseInfoVO) => {
  isDetailDialogVisible.value = true;
  projectId.value = row.projectId;
};

const showMilestoneDetailDialog = (row: ProjectBaseInfoVO) => {
  isMilestoneDetailDialogVisible.value = true;
  projectId.value = row.projectId;
};

const showMilestoneAddDialog = (row: ProjectBaseInfoVO) => {
  isAddMilestoneDialogVisible.value = true;
  projectId.value = row.projectId;
};

const handleUpdate = (row: ProjectBaseInfoVO) => {
  updateId.value = null; // 暂时清空 updateId
  setTimeout(() => {
    updateId.value = row.projectId;
    isUpdateDialogVisible.value = true;
  }, 0);
};

const handleDelete = (row: ProjectBaseInfoVO) => {
  proxy?.$modal.confirm(`负责课题：${row.assignedSubjectSection}，确认删除该数据项？`).then(() => {
    deleteProject(row.projectId).then(() => {
      resetQuery();
    });
  });
};

/** 获取项目列表 */
const getProjectList = async () => {
  loading.value = true;
  getAllProjectList(data.form, data.queryParams).then((res) => {
    projectList.value = res.rows;
    total.value = res.total;
    loading.value = false;
  });
};

const handleQuery = () => {
  // 检查 establishDateRange 是否为空
  if (establishDateRange.value && establishDateRange.value[0] && establishDateRange.value[1]) {
    form.value.projectEstablishTimeSta = <string>establishDateRange.value[0];
    form.value.projectEstablishTimeEnd = <string>establishDateRange.value[1];
  } else {
    form.value.projectEstablishTimeSta = null; // 或者 ''
    form.value.projectEstablishTimeEnd = null; // 或者 ''
  }
  // 检查 scheduledCompletionDateRange 是否为空
  if (scheduledCompletionDateRange.value && scheduledCompletionDateRange.value[0] && scheduledCompletionDateRange.value[1]) {
    form.value.projectScheduledCompletionTimeSta = <string>scheduledCompletionDateRange.value[0];
    form.value.projectScheduledCompletionTimeEnd = <string>scheduledCompletionDateRange.value[1];
  } else {
    form.value.projectScheduledCompletionTimeSta = null; // 或者 ''
    form.value.projectScheduledCompletionTimeEnd = null; // 或者 ''
  }
  queryParams.value.pageNum = 1;
  getProjectList();
};

/** 重置 */
const resetQuery = () => {
  form.value = { ...initFormData };
  queryFormRef.value?.resetFields();
  establishDateRange.value = ['', ''];
  scheduledCompletionDateRange.value = ['', ''];
  handleQuery();
};

const handleSelectionChange = (val: any) => {
  console.log(val);
};

const handleExport = () => {
  console.log('导出');
};

onMounted(() => {
  getProjectList();
  getUserTreeSelect();
});
</script>

<style scoped lang="scss"></style>
