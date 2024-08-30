<template>
  <el-dialog :model-value="visible" width="1550px" @update:model-value="updateVisible">
    <template #default>
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="基本信息" name="基本信息">
          <div style="margin-top: 5px"></div>
          <el-descriptions-item label="基本信息" :span="2"></el-descriptions-item>
          <el-descriptions :column="3" :label-style="{ width: '15%' }" :content-style="{ width: '20%' }" border>
            <el-descriptions-item label="项目名称">
              {{ projectDetails.projectInfoVO.assignedSubjectName }}
            </el-descriptions-item>
            <el-descriptions-item label="项目任务书编号">
              {{ projectDetails.projectInfoVO.projectAssignmentSerialNo }}
            </el-descriptions-item>
            <el-descriptions-item label="负责课题">
              {{ projectDetails.projectInfoVO.assignedSubjectSection }}
            </el-descriptions-item>
            <el-descriptions-item label="课题任务书编号">
              {{ projectDetails.projectInfoVO.subjectAssignmentSerialNo }}
            </el-descriptions-item>
            <el-descriptions-item label="项目牵头单位">
              {{ projectDetails.projectInfoVO.leadingUnit }}
            </el-descriptions-item>
            <el-descriptions-item label="是否牵头单位">
              {{ pro_cooperative_unit[projectDetails.projectInfoVO.hasCooperativeUnit]?.label || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="项目专员/联系人">
              {{ projectDetails.projectInfoVO.projectContact }}
            </el-descriptions-item>
            <el-descriptions-item label="项目级别">
              {{ pro_level_type[projectDetails.projectInfoVO.projectLevel]?.label || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="项目来源">
              {{ projectDetails.projectInfoVO.projectSource }}
            </el-descriptions-item>
            <el-descriptions-item label="立项时间">
              {{ projectDetails.projectInfoVO.projectEstablishTime }}
            </el-descriptions-item>
            <el-descriptions-item label="项目计划验收时间">
              {{ projectDetails.projectInfoVO.projectScheduledCompletionTime }}
            </el-descriptions-item>
            <el-descriptions-item label="项目执行时间（年）">
              {{ projectDetails.projectInfoVO.projectDuration }}
            </el-descriptions-item>
            <el-descriptions-item label="项目推进情况">
              {{ pro_progress_status[projectDetails.projectInfoVO.projectProgressStatus]?.label || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="合作单位">
              {{ projectDetails.projectInfoVO.collaboratingUnit }}
            </el-descriptions-item>
            <el-descriptions-item label="涉及专家、团队">
              {{ projectDetails.projectInfoVO.expertTeam }}
            </el-descriptions-item>
            <el-descriptions-item label="项目经费总额">
              {{ projectDetails.projectFundsVO.totalFundsAll }}
            </el-descriptions-item>
            <el-descriptions-item label="专项经费">
              {{ projectDetails.projectFundsVO.totalFundsZx }}
            </el-descriptions-item>
            <el-descriptions-item label="自筹经费">
              {{ projectDetails.projectFundsVO.totalFundsZc }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="经费到账" name="经费到账">
          <div style="margin-top: 5px"></div>
          <el-table style="margin: 0; padding: 0" :data="fundsReceivedList" border>
            <el-table-column align="center" prop="amountReceived" :show-overflow-tooltip="true">
              <template #header>
                <div style="text-align: center">
                  <span>拨款金额</span>
                  <span style="font-size: 12px; color: #f56c6c">（万元）</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="到账类型" align="center" prop="receivedType" :show-overflow-tooltip="true">
              <template #default="scope">
                {{ pro_received_type[scope.row.receivedType]?.label || '未知' }}
              </template>
            </el-table-column>
            <el-table-column label="来款单位" align="center" prop="receivedFrom" :show-overflow-tooltip="true" />
            <el-table-column label="到账时间" align="center" prop="receivedDate" :show-overflow-tooltip="true" />
            <el-table-column label="附件" align="center" :show-overflow-tooltip="true">
              <template #default="scope">
                <div v-for="file in scope.row.sysOsses" :key="file.ossId">
                  <el-button type="text" @click="handleDownload(file)">{{ file.originalName }}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="支出明细" name="支出明细">
          <div style="margin-top: 5px"></div>
          <el-table
            ref="multipleTable"
            border
            style="width: 100%; max-height: 500px; overflow-y: auto"
            :row-style="{ height: '50px' }"
            :cell-style="{ padding: '0px' }"
            :data="expenditureList"
            height="500px"
          >
            <el-table-column label="日期" :resizable="false" align="center" width="100px" prop="expenditureDate"> </el-table-column>
            <el-table-column label="项目名称" :resizable="false" align="center" prop="projectName" width="250px"> </el-table-column>
            <el-table-column label="凭证号" :resizable="false" align="center" prop="voucherNo" width="100px"> </el-table-column>
            <el-table-column label="摘要" :resizable="false" align="center" prop="expenditureAbstract" min-width="200px"> </el-table-column>
            <el-table-column label="专项/自筹" :resizable="false" align="center" prop="zxzc">
              <template #default="scope">
                {{ pro_zxzc_options[scope.row.thirdLevelSubject]?.label || '无' }}
              </template>
            </el-table-column>
            <el-table-column label="直接/间接" :resizable="false" align="center" prop="zjjj">
              <template #default="scope">
                {{ pro_zjjj_options[scope.row.thirdLevelSubject]?.label || '无' }}
              </template>
            </el-table-column>
            <el-table-column label="一级科目" :resizable="false" align="center" prop="firstLevelSubject" width="150px">
              <template #default="scope">
                {{ pro_first_subject[scope.row.thirdLevelSubject]?.label || '无' }}
              </template>
            </el-table-column>
            <el-table-column label="二级科目" :resizable="false" align="center" prop="secondLevelSubject" width="150px">
              <template #default="scope">
                {{ pro_second_subject[scope.row.thirdLevelSubject]?.label || '无' }}
              </template>
            </el-table-column>
            <el-table-column label="三级科目" :resizable="false" align="center" prop="thirdLevelSubject" width="150px">
              <template #default="scope">
                {{ pro_third_subject[scope.row.thirdLevelSubject]?.label || '无' }}
              </template>
            </el-table-column>
            <el-table-column :resizable="false" align="center" prop="amount" width="150px">
              <template #header>
                <div style="text-align: center">
                  <span>金额</span>
                  <span style="font-size: 12px; color: #f56c6c">（元）</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="经费明细汇总" name="经费明细汇总" class="budget-summary-tab">
          <div style="margin-top: 5px"></div>
          <el-table
            style="width: 100%"
            height="525px"
            row-key="id"
            border
            :cell-style="columnStyle"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            highlight-current-row
          >
            <el-table-column prop="label" width="180">
              <template #header>
                <div style="text-align: center">
                  <span>预算科目名称</span>
                  <br />
                  <span style="font-size: 12px; color: #f56c6c">（单位：万元）</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="预算">
              <el-table-column align="center" label="合计" prop="budget"></el-table-column>
              <el-table-column align="center" label="专项经费" prop="specialBudget"></el-table-column>
              <el-table-column align="center" label="自筹经费" prop="selfBudget"></el-table-column>
            </el-table-column>
            <el-table-column align="center" label="专项已支付" prop="specialPaid"></el-table-column>
            <el-table-column align="center" label="专项未支付" prop="specialUnpaid"></el-table-column>
            <el-table-column align="center" label="自筹已支付" prop="selfPaid"></el-table-column>
            <el-table-column align="center" label="自筹未支付" prop="selfUnpaid"></el-table-column>
            <el-table-column align="center" label="已支付" prop="totalPaid"></el-table-column>
            <el-table-column align="center" label="未支付" prop="totalUnpaid"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-dialog>
</template>

<script setup Name="FundsDetails" lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { ProjectDetailsVO } from '@/api/project/myProject/types';
import { getProjectDetails } from '@/api/project/myProject';
import { getFundsAndBalanceByProjectId, getFundsReceivedList, getProjectExpenditureList } from '@/api/project/funds';
import { ProjectExpenditureBO, ProjectExpenditureVO, ProjectFundsAndBalanceVO, ProjectFundsReceivedVo } from '@/api/project/funds/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const {
  pro_first_subject,
  pro_second_subject,
  pro_third_subject,
  pro_zxzc_options,
  pro_zjjj_options,
  pro_received_type,
  pro_cocompany_type,
  pro_level_type,
  pro_progress_status,
  pro_cooperative_unit
} = toRefs<any>(
  proxy?.useDict(
    'pro_first_subject',
    'pro_second_subject',
    'pro_third_subject',
    'pro_zxzc_options',
    'pro_zjjj_options',
    'pro_received_type',
    'pro_cocompany_type',
    'pro_level_type',
    'pro_progress_status',
    'pro_cooperative_unit'
  )
);
const loading = ref(true);
const props = defineProps<{
  projectId: string | number | undefined;
  visible: boolean;
}>();
const emits = defineEmits(['update:visible']);
const activeTab = ref('基本信息');

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const projectDetails = reactive<ProjectDetailsVO>({
  projectInfoVO: {},
  projectPlanVOList: [],
  projectTargetVOList: [],
  projectUserVoList: [],
  projectFundsVO: {},
  projectAttachmentVOList: []
});
const fundsReceivedList = ref<ProjectFundsReceivedVo[]>([]);
const expenditureList = ref<ProjectExpenditureVO[]>([]);
const projectExpenditureBo = ref<ProjectExpenditureBO>({
  firstLevelSubject: '',
  secondLevelSubject: '',
  thirdLevelSubject: '',
  projectId: undefined
});
const fundsAndBalance = ref<any>({
  projectFunds: {},
  ProjectBalance: {}
});

function handleDownload(row: any) {
  proxy?.$download.oss(row.ossId);
}

// columnStyle 方法定义
const columnStyle = ({ columnIndex }) => {
  if (columnIndex === 0) {
    return 'background:#f3f5f8';
  } else if (columnIndex === 1) {
    return 'background:#e2e280';
  } else if (columnIndex === 2 || columnIndex === 3) {
    return 'background:#c9db7e';
  } else if (columnIndex === 4 || columnIndex === 5) {
    return 'background:#aed37f';
  } else if (columnIndex === 6 || columnIndex === 7) {
    return 'background:#96cb7e';
  } else if (columnIndex === 8 || columnIndex === 9) {
    return 'background:#7bc37b';
  }
};

const getProjectDetail = async (projectId: number | string) => {
  const resp = await getProjectDetails(projectId);
  projectDetails.projectInfoVO = resp.data.projectInfoVO;
  projectDetails.projectPlanVOList = resp.data.projectPlanVOList;
  projectDetails.projectTargetVOList = resp.data.projectTargetVOList;
  projectDetails.projectUserVoList = resp.data.projectUserVoList;
  projectDetails.projectFundsVO = resp.data.projectFundsVO;
  projectDetails.projectAttachmentVOList = resp.data.projectAttachmentVOList;
};

const getFundsReceive = async (projectId: number | string) => {
  const resp = await getFundsReceivedList(projectId);
  fundsReceivedList.value = resp.data;
};

const getExpenditure = async (projectId: number | string) => {
  projectExpenditureBo.value.projectId = projectId;
  const resp = await getProjectExpenditureList(projectExpenditureBo.value, { pageNum: 1, pageSize: 1000 });
  expenditureList.value = resp.rows;
};

const getFundsAndBalance = async (projectId: number | string) => {
  const resp = await getFundsAndBalanceByProjectId(projectId);
  fundsAndBalance.value.projectBalance = resp.data.projectBalance;
  fundsAndBalance.value.projectFunds = resp.data.projectFunds;
};

watch(
  () => [props.projectId, props.visible],
  ([newProjectId, newVisible]) => {
    if (newProjectId !== undefined && newVisible === true) {
      activeTab.value = '基本信息';
      getProjectDetail(props.projectId);
      getFundsReceive(props.projectId);
      getExpenditure(props.projectId);
      getFundsAndBalance(props.projectId);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.budget-summary-tab .el-table tbody tr:hover > td {
  background-color: rgb(44, 133, 44) !important;
  color: #eef1f6;
}

.budget-summary-tab .el-table__body tr.current-row > td {
  background-color: rgb(44, 133, 44) !important;
  color: #eef1f6;
}
</style>
