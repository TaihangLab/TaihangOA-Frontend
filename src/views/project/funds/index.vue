<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="form" :inline="true">
            <el-form-item label="项目名称" prop="roleName">
              <el-input v-model="form.assignedSubjectName" placeholder="请输入项目名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="课题名称" prop="roleKey">
              <el-input v-model="form.assignedSubjectSection" placeholder="请输入课题名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="项目级别" prop="roleKey">
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

    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button disabled type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getAllProjectList"></right-toolbar>
        </el-row>
      </template>

      <el-table ref="fundsTableRef" v-loading="loading" :data="projectList" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="项目名称" fixed="left" prop="assignedSubjectName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="课题名称" prop="assignedSubjectSection" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="项目级别" prop="projectLevel" :show-overflow-tooltip="true" min-width="10%" >
          <template #default="scope">
            {{ pro_level_type[scope.row.projectLevel]?.label || '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="项目经费总额（万元）" prop="totalFundsAll" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="专项经费预算（万元）" prop="totalFundsZx" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="专项经费已支付（万元）" prop="totalFundsZxPaid" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="专项经费未支付（万元）" prop="totalFundsZxUnpaid" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="自筹经费预算（万元）" prop="totalFundsZc" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="自筹经费已支付（万元）" prop="totalFundsZcPaid" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="自筹经费未支付（万元）" prop="totalFundsZcUnpaid" :show-overflow-tooltip="true" min-width="10%" />

        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button v-hasPermi="['system:role:edit']" link type="primary" icon="Reading" @click="showFundsDetailDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="查看支出" placement="top">
              <el-button v-hasPermi="['system:role:edit']" link type="primary" icon="view" @click="showExpenditureCheckDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="支出录入" placement="top">
              <el-button
                v-hasPermi="['system:role:edit']"
                link
                type="primary"
                icon="document-add"
                @click="showExpenditureEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="经费到账" placement="top">
              <el-button v-hasPermi="['system:role:edit']" link type="primary" icon="Money" @click="showFundsReceivedDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <DetailDialog :visible="isDetailDialogVisible" @update:visible="isDetailDialogVisible = $event" />
<!--      <ExpenditureCheck-->
<!--        :projectId="Number(projectId)"-->
<!--        :visible="isExpenditureCheckDialogVisible"-->
<!--        @close:visible="isExpenditureCheckDialogVisible = $event"-->
<!--        @update:visible="isExpenditureCheckDialogVisible = $event"-->
<!--      />-->
<!--      <ExpenditureEntry-->
<!--        :projectId="Number(projectId)"-->
<!--        :visible="isExpenditureEditDialogVisible"-->
<!--        @close:visible="isExpenditureEditDialogVisible = $event"-->
<!--        @update:visible="isExpenditureEditDialogVisible = $event"-->
<!--      />-->
<!--      <FundsReceived-->
<!--        :project-id="Number(projectId)"-->
<!--        :visible="isFundsReceivedVisible"-->
<!--        @close:visible="isFundsReceivedVisible = $event"-->
<!--        @update:visible="isFundsReceivedVisible = $event"-->
<!--      />-->
<!--      <FundsDetail :visible="isFundsDetailVisible" @update:visible="isFundsDetailVisible = $event" />-->

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getAllProjectList"
      />
    </el-card>
  </div>
</template>

<script setup name="Funds" lang="ts">
import { ref } from 'vue';
import FundsDetail from '@/views/project/components/Funds/FundsDetails.vue';
import ExpenditureCheck from '../components/Funds/ExpenditureCheck.vue';
import ExpenditureEntry from '../components/Funds/ExpenditureEntry.vue';
import FundsReceived from '@/views/project/components/Funds/FundsReceived.vue';
import { ProjectBaseInfoBO, ProjectFundsManagementVO } from '@/api/project/funds/types';
import { getProjectList } from '@/api/project/funds';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { pro_level_type } = toRefs<any>(
  proxy?.useDict('pro_level_type')
);
const projectList = ref<ProjectFundsManagementVO[]>([])
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const fundsTableRef = ref<ElTableInstance>();
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
const projectId = ref<number | string>();
const isDetailDialogVisible = ref(false);
const isExpenditureCheckDialogVisible = ref(false);
const isExpenditureEditDialogVisible = ref(false);
const isFundsReceivedVisible = ref(false);
const isFundsDetailVisible = ref(false);

/** 数据范围选项*/
const queryFormRef = ref<ElFormInstance>();


const showFundsDetailDialog = (projectId: number) => {
  // 在这里可以设置要显示的详情内容
  isFundsDetailVisible.value = true;
  console.log(isFundsDetailVisible.value);
};

const showExpenditureCheckDialog = (projectId: number) => {
  isExpenditureCheckDialogVisible.value = true;
};

const showExpenditureEditDialog = (projectId: number) => {
  isExpenditureEditDialogVisible.value = true;
};

const showFundsReceivedDialog = (projectId: number) => {
  isFundsReceivedVisible.value = true;
};

const initForm: ProjectBaseInfoBO = {
  awardDetails: '',
  collaboratingUnit: '',
  completionProgress: '',
  expertTeam: '',
  hasCooperativeUnit: undefined,
  hasLeadingRole: undefined,
  leadingUnit: '',
  patentDetails: '',
  projectAssignmentSerialNo: '',
  projectContact: '',
  projectDescription: '',
  projectDuration: '',
  projectEstablishTime: '',
  projectId: undefined,
  projectProgressStatus: undefined,
  projectScheduledCompletionTime: '',
  projectScheduledCompletionTimeEnd: '',
  projectScheduledCompletionTimeSta: '',
  projectSource: '',
  publicationDetails: '',
  significanceAndNecessity: '',
  softwareCopyrightDetails: '',
  standardDetails: '',
  subjectAssignmentSerialNo: undefined,
  userId: undefined,
  assignedSubjectName: undefined,
  assignedSubjectSection: undefined,
  projectLevel: undefined
};

const data = reactive({
  form: { ...initForm },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  }
});
const { form, queryParams} = toRefs(data);

/** 获取项目列表 */
const getAllProjectList = async () => {
  loading.value = true;
  const res = await getProjectList(data.queryParams,data.form);
  projectList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/**
 * 搜索按钮操作
 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getAllProjectList();
};

/** 重置 */
const resetQuery = () => {
  dateRange.value = ['', ''];
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'system/role/export',
    {
      ...queryParams.value
    },
    `role_${new Date().getTime()}.xlsx`
  );
};
/** 多选框选中数据 */
const handleSelectionChange = (selection: number[]) => {
  // ids.value = selection.map((item: number) => item.projectId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

onMounted(() => {
  getAllProjectList();
});
</script>
