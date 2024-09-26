<template>
  <el-dialog :model-value="visible" width="1550px" @update:model-value="updateVisible">
    <template #default>
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息" name="基本信息">
          <div style="margin-top: 5px"></div>
          <el-descriptions border v-loading="loading">
            <el-descriptions-item label="项目名称" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.assignedSubjectName }}
            </el-descriptions-item>
            <el-descriptions-item label="项目任务书编号" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.projectAssignmentSerialNo }}
            </el-descriptions-item>
            <el-descriptions-item label="负责课题" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.assignedSubjectSection }}
            </el-descriptions-item>
            <el-descriptions-item label="课题任务书编号" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.subjectAssignmentSerialNo }}
            </el-descriptions-item>
            <el-descriptions-item label="项目牵头单位" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.leadingUnit }}
            </el-descriptions-item>
            <el-descriptions-item label="是否牵头单位" width="120px" :span="1">
              {{ pro_cooperative_unit[projectDetails.projectInfoVO.hasCooperativeUnit]?.label || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="项目专员/联系人" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.projectContact }}
            </el-descriptions-item>
            <el-descriptions-item label="项目级别" width="120px" :span="1">
              {{ pro_level_type[projectDetails.projectInfoVO.projectLevel]?.label || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="项目来源" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.projectSource }}
            </el-descriptions-item>
            <el-descriptions-item label="立项时间" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.projectEstablishTime }}
            </el-descriptions-item>
            <el-descriptions-item label="项目计划验收时间" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.projectScheduledCompletionTime }}
            </el-descriptions-item>
            <el-descriptions-item label="项目执行时间（年）" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.projectDuration }}
            </el-descriptions-item>
            <el-descriptions-item label="项目推进情况" width="120px" :span="1">
              {{ pro_progress_status[projectDetails.projectInfoVO.projectProgressStatus]?.label || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="合作单位" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.collaboratingUnit }}
            </el-descriptions-item>
            <el-descriptions-item label="涉及专家、团队" width="120px" :span="1">
              {{ projectDetails.projectInfoVO.expertTeam }}
            </el-descriptions-item>
            <el-descriptions-item label="项目经费总额" width="120px" :span="1">
              {{ projectDetails.projectFundsVO.totalFundsAll }}
            </el-descriptions-item>
            <el-descriptions-item label="专项经费" width="120px" :span="1">
              {{ projectDetails.projectFundsVO.totalFundsZx }}
            </el-descriptions-item>
            <el-descriptions-item label="自筹经费" width="120px" :span="1">
              {{ projectDetails.projectFundsVO.totalFundsZc }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <!-- 经费到账 -->
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

        <!-- 支出明细 -->
        <el-tab-pane label="支出明细" name="支出明细">
          <div style="margin-top: 5px"></div>
          <el-table ref="multipleTable" border style="width: 100%; max-height: 500px; overflow-y: auto" :data="expenditureList">
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

        <!-- 经费明细汇总 -->
        <el-tab-pane label="经费明细汇总" name="经费明细汇总" class="budget-summary-tab">
          <div style="margin-top: 5px"></div>
          <el-watermark :font="font" :content="userInfo ? [userInfo.user.nickName, userInfo.user.phonenumber] : []">
            <el-table
              :row-class-name="getRowClassName"
              :data="tableDataList"
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
          </el-watermark>
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
import { ProjectExpenditureBO, ProjectExpenditureVO, ProjectFundsReceivedVo } from '@/api/project/funds/types';
import { categoryOptions3 } from '@/api/project/funds/fundkeys';
import { UserInfo, UserInfoVO } from '@/api/system/user/types';
import { getInfo } from '@/api/login';

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
const tableDataList = ref<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>(categoryOptions3);
const hoverRowIndex = ref<number | null>(null);
const font = reactive({
  color: 'rgba(0, 0, 0, .15)'
});
const userInfo = ref<UserInfo | null>({ permissions: [], roles: [], user: null });
const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const getRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  return rowIndex === hoverRowIndex.value ? 'row-hover' : '';
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

const getCurrentUserInfo = async () => {
  try {
    const resp = await getInfo();
    console.log('获取用户信息成功:', resp);
    userInfo.value.user = resp.data.user; // 直接赋值
    console.log('userInfo.value:', userInfo.value);
  } catch (error) {
    console.error('获取用户信息失败:', error); // 错误处理
  }
};

function handleDownload(row: any) {
  proxy?.$download.oss(row.ossId);
}

const columnStyle = ({ columnIndex }) => {
  if (columnIndex === 0) {
    return { background: '#f3f5f8' };
  } else if (columnIndex === 1) {
    return { background: '#e2e280' };
  } else if (columnIndex === 2 || columnIndex === 3) {
    return { background: '#c9db7e' };
  } else if (columnIndex === 4 || columnIndex === 5) {
    return { background: '#aed37f' };
  } else if (columnIndex === 6 || columnIndex === 7) {
    return { background: '#96cb7e' };
  } else if (columnIndex === 8 || columnIndex === 9) {
    return { background: '#7bc37b' };
  }
};

const getProjectDetail = async (projectId: number | string) => {
  await getProjectDetails(projectId).then((resp) => {
    projectDetails.projectInfoVO = resp.data.projectInfoVO;
    projectDetails.projectPlanVOList = resp.data.projectPlanVOList;
    projectDetails.projectTargetVOList = resp.data.projectTargetVOList;
    projectDetails.projectUserVoList = resp.data.projectUserVoList;
    projectDetails.projectFundsVO = resp.data.projectFundsVO;
    projectDetails.projectAttachmentVOList = resp.data.projectAttachmentVOList;
    loading.value = false;
  });
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
  await getFundsAndBalanceByProjectId(projectId).then((resp) => {
    fundsAndBalance.value.projectBalance = resp.data.projectBalance;
    fundsAndBalance.value.projectFunds = resp.data.projectFunds;
    handleData(fundsAndBalance.value.projectFunds, fundsAndBalance.value.projectBalance);
  });
};

const handleData = async (projectFunds, projectBalance) => {
  /* 一、经费支出 */
  tableDataList.value[0].budget = projectFunds.totalFundsAll;
  tableDataList.value[0].specialBudget = projectFunds.totalFundsZx;
  tableDataList.value[0].selfBudget = projectFunds.totalFundsZc;
  tableDataList.value[0].specialPaid = projectBalance.totalFundsZxPaid;
  tableDataList.value[0].specialUnpaid = projectBalance.totalFundsZxUnpaid;
  tableDataList.value[0].selfPaid = projectBalance.totalFundsZcPaid;
  tableDataList.value[0].selfUnpaid = projectBalance.totalFundsZcUnpaid;
  tableDataList.value[0].totalPaid = projectBalance.totalFundsAllPaid;
  tableDataList.value[0].totalUnpaid = projectBalance.totalFundsAllUnpaid;

  /* （一）直接费用 */
  tableDataList.value[1].budget = projectFunds.totalFundsZj;
  tableDataList.value[1].specialBudget = projectFunds.totalFundsZxZj;
  tableDataList.value[1].selfBudget = projectFunds.totalFundsZcZj;
  tableDataList.value[1].specialPaid = projectBalance.totalFundsZxZjPaid;
  tableDataList.value[1].specialUnpaid = projectBalance.totalFundsZxZjUnpaid;
  tableDataList.value[1].selfPaid = projectBalance.totalFundsZcZjPaid;
  tableDataList.value[1].selfUnpaid = projectBalance.totalFundsZcZjUnpaid;
  tableDataList.value[1].totalPaid = projectBalance.totalFundsZjPaid;
  tableDataList.value[1].totalUnpaid = projectBalance.totalFundsZjUnpaid;

  /* 设备费 */
  tableDataList.value[2].budget = projectFunds.sbfZj;
  tableDataList.value[2].specialBudget = projectFunds.sbfZxZj;
  tableDataList.value[2].selfBudget = projectFunds.sbfZcZj;
  tableDataList.value[2].specialPaid = projectBalance.sbfZxZjPaid;
  tableDataList.value[2].specialUnpaid = projectBalance.sbfZxZjUnpaid;
  tableDataList.value[2].selfPaid = projectBalance.sbfZcZjPaid;
  tableDataList.value[2].selfUnpaid = projectBalance.sbfZcZjUnpaid;
  tableDataList.value[2].totalPaid = projectBalance.sbfZjPaid;
  tableDataList.value[2].totalUnpaid = projectBalance.sbfZjUnpaid;
  /* 设备费_购置设备费 */
  tableDataList.value[2].children[0].specialBudget = projectFunds.sbfGzsbZxZj;
  tableDataList.value[2].children[0].selfBudget = projectFunds.sbfGzsbZcZj;
  tableDataList.value[2].children[0].specialPaid = projectBalance.sbfGzsbZxZjPaid;
  tableDataList.value[2].children[0].specialUnpaid = projectBalance.sbfGzsbZxZjUnpaid;
  tableDataList.value[2].children[0].selfPaid = projectBalance.sbfGzsbZcZjPaid;
  tableDataList.value[2].children[0].selfUnpaid = projectBalance.sbfGzsbZcZjUnpaid;
  tableDataList.value[2].children[0].totalPaid = projectBalance.sbfGzsbZjPaid;
  tableDataList.value[2].children[0].totalUnpaid = projectBalance.sbfGzsbZjUnpaid;
  /* 设备费_试制设备费 */
  tableDataList.value[2].children[1].specialBudget = projectFunds.sbfSzsbZxZj;
  tableDataList.value[2].children[1].selfBudget = projectFunds.sbfSzsbZcZj;
  tableDataList.value[2].children[1].specialPaid = projectBalance.sbfSzsbZxZjPaid;
  tableDataList.value[2].children[1].specialUnpaid = projectBalance.sbfSzsbZxZjUnpaid;
  tableDataList.value[2].children[1].selfPaid = projectBalance.sbfSzsbZcZjPaid;
  tableDataList.value[2].children[1].selfUnpaid = projectBalance.sbfSzsbZcZjUnpaid;
  tableDataList.value[2].children[1].totalPaid = projectBalance.sbfSzsbZjPaid;
  tableDataList.value[2].children[1].totalUnpaid = projectBalance.sbfSzsbZjUnpaid;
  /* 设备费_设备升级改造费 */
  tableDataList.value[2].children[2].specialBudget = projectFunds.sbfSbsjgzZxZj;
  tableDataList.value[2].children[2].selfBudget = projectFunds.sbfSbsjgzZcZj;
  tableDataList.value[2].children[2].specialPaid = projectBalance.sbfSbsjgzZxZjPaid;
  tableDataList.value[2].children[2].specialUnpaid = projectBalance.sbfSbsjgzZxZjUnpaid;
  tableDataList.value[2].children[2].selfPaid = projectBalance.sbfSbsjgzZcZjPaid;
  tableDataList.value[2].children[2].selfUnpaid = projectBalance.sbfSbsjgzZcZjUnpaid;
  tableDataList.value[2].children[2].totalPaid = projectBalance.sbfSbsjgzZjPaid;
  tableDataList.value[2].children[2].totalUnpaid = projectBalance.sbfSbsjgzZjUnpaid;
  /* 设备费_设备租赁费 */
  tableDataList.value[2].children[3].specialBudget = projectFunds.sbfSbzlZxZj;
  tableDataList.value[2].children[3].selfBudget = projectFunds.sbfSbzlZcZj;
  tableDataList.value[2].children[3].specialPaid = projectBalance.sbfSbzlZxZjPaid;
  tableDataList.value[2].children[3].specialUnpaid = projectBalance.sbfSbzlZxZjUnpaid;
  tableDataList.value[2].children[3].selfPaid = projectBalance.sbfSbzlZcZjPaid;
  tableDataList.value[2].children[3].selfUnpaid = projectBalance.sbfSbzlZcZjUnpaid;
  tableDataList.value[2].children[3].totalPaid = projectBalance.sbfSbzlZjPaid;
  tableDataList.value[2].children[3].totalUnpaid = projectBalance.sbfSbzlZjUnpaid;

  /* 业务费 */
  tableDataList.value[3].budget = projectFunds.ywfZj;
  tableDataList.value[3].specialBudget = projectFunds.ywfZxZj;
  tableDataList.value[3].selfBudget = projectFunds.ywfZcZj;
  tableDataList.value[3].specialPaid = projectBalance.ywfZxZjPaid;
  tableDataList.value[3].specialUnpaid = projectBalance.ywfZxZjUnpaid;
  tableDataList.value[3].selfPaid = projectBalance.ywfZcZjPaid;
  tableDataList.value[3].selfUnpaid = projectBalance.ywfZcZjUnpaid;
  tableDataList.value[3].totalPaid = projectBalance.ywfZjPaid;
  tableDataList.value[3].totalUnpaid = projectBalance.ywfZjUnpaid;
  /* 业务费_材料费 */
  tableDataList.value[3].children[0].specialBudget = projectFunds.ywfClfZxZj;
  tableDataList.value[3].children[0].selfBudget = projectFunds.ywfClfZcZj;
  tableDataList.value[3].children[0].specialPaid = projectBalance.ywfClfZxZjPaid;
  tableDataList.value[3].children[0].specialUnpaid = projectBalance.ywfClfZxZjUnpaid;
  tableDataList.value[3].children[0].selfPaid = projectBalance.ywfClfZcZjPaid;
  tableDataList.value[3].children[0].selfUnpaid = projectBalance.ywfClfZcZjUnpaid;
  tableDataList.value[3].children[0].totalPaid = projectBalance.ywfClfZjPaid;
  tableDataList.value[3].children[0].totalUnpaid = projectBalance.ywfClfZjUnpaid;
  /* 业务费_资料费 */
  tableDataList.value[3].children[1].specialBudget = projectFunds.ywfZlfZxZj;
  tableDataList.value[3].children[1].selfBudget = projectFunds.ywfZlfZcZj;
  tableDataList.value[3].children[1].specialPaid = projectBalance.ywfZlfZxZjPaid;
  tableDataList.value[3].children[1].specialUnpaid = projectBalance.ywfZlfZxZjUnpaid;
  tableDataList.value[3].children[1].selfPaid = projectBalance.ywfZlfZcZjPaid;
  tableDataList.value[3].children[1].selfUnpaid = projectBalance.ywfZlfZcZjUnpaid;
  tableDataList.value[3].children[1].totalPaid = projectBalance.ywfZlfZjPaid;
  tableDataList.value[3].children[1].totalUnpaid = projectBalance.ywfZlfZjUnpaid;
  /* 业务费_数据/样本采集费 */
  tableDataList.value[3].children[2].specialBudget = projectFunds.ywfSjybcjfZxZj;
  tableDataList.value[3].children[2].selfBudget = projectFunds.ywfSjybcjfZcZj;
  tableDataList.value[3].children[2].specialPaid = projectBalance.ywfSjybcjfZxZjPaid;
  tableDataList.value[3].children[2].specialUnpaid = projectBalance.ywfSjybcjfZxZjUnpaid;
  tableDataList.value[3].children[2].selfPaid = projectBalance.ywfSjybcjfZcZjPaid;
  tableDataList.value[3].children[2].selfUnpaid = projectBalance.ywfSjybcjfZcZjUnpaid;
  tableDataList.value[3].children[2].totalPaid = projectBalance.ywfSjybcjfZjPaid;
  tableDataList.value[3].children[2].totalUnpaid = projectBalance.ywfSjybcjfZjUnpaid;
  /* 业务费_测试化验加工费 */
  tableDataList.value[3].children[3].specialBudget = projectFunds.ywfCshyjgfZxZj;
  tableDataList.value[3].children[3].selfBudget = projectFunds.ywfCshyjgfZcZj;
  tableDataList.value[3].children[3].specialPaid = projectBalance.ywfCshyjgfZxZjPaid;
  tableDataList.value[3].children[3].specialUnpaid = projectBalance.ywfCshyjgfZxZjUnpaid;
  tableDataList.value[3].children[3].selfPaid = projectBalance.ywfCshyjgfZcZjPaid;
  tableDataList.value[3].children[3].selfUnpaid = projectBalance.ywfCshyjgfZcZjUnpaid;
  tableDataList.value[3].children[3].totalPaid = projectBalance.ywfCshyjgfZjPaid;
  tableDataList.value[3].children[3].totalUnpaid = projectBalance.ywfCshyjgfZjUnpaid;
  /* 业务费_燃料动力费 */
  tableDataList.value[3].children[4].specialBudget = projectFunds.ywfRldlfZxZj;
  tableDataList.value[3].children[4].selfBudget = projectFunds.ywfRldlfZcZj;
  tableDataList.value[3].children[4].specialPaid = projectBalance.ywfRldlfZxZjPaid;
  tableDataList.value[3].children[4].specialUnpaid = projectBalance.ywfRldlfZxZjUnpaid;
  tableDataList.value[3].children[4].selfPaid = projectBalance.ywfRldlfZcZjPaid;
  tableDataList.value[3].children[4].selfUnpaid = projectBalance.ywfRldlfZcZjUnpaid;
  tableDataList.value[3].children[4].totalPaid = projectBalance.ywfRldlfZjPaid;
  tableDataList.value[3].children[4].totalUnpaid = projectBalance.ywfRldlfZjUnpaid;
  /* 业务费_办公费 */
  tableDataList.value[3].children[5].specialBudget = projectFunds.ywfBgfZxZj;
  tableDataList.value[3].children[5].selfBudget = projectFunds.ywfBgfZcZj;
  tableDataList.value[3].children[5].specialPaid = projectBalance.ywfBgfZxZjPaid;
  tableDataList.value[3].children[5].specialUnpaid = projectBalance.ywfBgfZxZjUnpaid;
  tableDataList.value[3].children[5].selfPaid = projectBalance.ywfBgfZcZjPaid;
  tableDataList.value[3].children[5].selfUnpaid = projectBalance.ywfBgfZcZjUnpaid;
  tableDataList.value[3].children[5].totalPaid = projectBalance.ywfBgfZjPaid;
  tableDataList.value[3].children[5].totalUnpaid = projectBalance.ywfBgfZjUnpaid;
  /* 业务费_印刷/出版费 */
  tableDataList.value[3].children[6].specialBudget = projectFunds.ywfYscbfZxZj;
  tableDataList.value[3].children[6].selfBudget = projectFunds.ywfYscbfZcZj;
  tableDataList.value[3].children[6].specialPaid = projectBalance.ywfYscbfZxZjPaid;
  tableDataList.value[3].children[6].specialUnpaid = projectBalance.ywfYscbfZxZjUnpaid;
  tableDataList.value[3].children[6].selfPaid = projectBalance.ywfYscbfZcZjPaid;
  tableDataList.value[3].children[6].selfUnpaid = projectBalance.ywfYscbfZcZjUnpaid;
  tableDataList.value[3].children[6].totalPaid = projectBalance.ywfYscbfZjPaid;
  tableDataList.value[3].children[6].totalUnpaid = projectBalance.ywfYscbfZjUnpaid;
  /* 业务费_知识产权事务费 */
  tableDataList.value[3].children[7].specialBudget = projectFunds.ywfZscqswfZxZj;
  tableDataList.value[3].children[7].selfBudget = projectFunds.ywfZscqswfZcZj;
  tableDataList.value[3].children[7].specialPaid = projectBalance.ywfZscqswfZxZjPaid;
  tableDataList.value[3].children[7].specialUnpaid = projectBalance.ywfZscqswfZxZjUnpaid;
  tableDataList.value[3].children[7].selfPaid = projectBalance.ywfZscqswfZcZjPaid;
  tableDataList.value[3].children[7].selfUnpaid = projectBalance.ywfZscqswfZcZjUnpaid;
  tableDataList.value[3].children[7].totalPaid = projectBalance.ywfZscqswfZjPaid;
  tableDataList.value[3].children[7].totalUnpaid = projectBalance.ywfZscqswfZjUnpaid;
  /* 业务费_车辆使用费 */
  tableDataList.value[3].children[8].specialBudget = projectFunds.ywfClsyfZxZj;
  tableDataList.value[3].children[8].selfBudget = projectFunds.ywfClsyfZcZj;
  tableDataList.value[3].children[8].specialPaid = projectBalance.ywfClsyfZxZjPaid;
  tableDataList.value[3].children[8].specialUnpaid = projectBalance.ywfClsyfZxZjUnpaid;
  tableDataList.value[3].children[8].selfPaid = projectBalance.ywfClsyfZcZjPaid;
  tableDataList.value[3].children[8].selfUnpaid = projectBalance.ywfClsyfZcZjUnpaid;
  tableDataList.value[3].children[8].totalPaid = projectBalance.ywfClsyfZjPaid;
  tableDataList.value[3].children[8].totalUnpaid = projectBalance.ywfClsyfZjUnpaid;
  /* 业务费_出版/文献费 */
  tableDataList.value[3].children[9].specialBudget = projectFunds.ywfCbwxxxcbzscqswfZxZj;
  tableDataList.value[3].children[9].selfBudget = projectFunds.ywfCbwxxxcbzscqswfZcZj;
  tableDataList.value[3].children[9].specialPaid = projectBalance.ywfCbwxxxcbzscqswfZxZjPaid;
  tableDataList.value[3].children[9].specialUnpaid = projectBalance.ywfCbwxxxcbzscqswfZxZjUnpaid;
  tableDataList.value[3].children[9].selfPaid = projectBalance.ywfCbwxxxcbzscqswfZcZjPaid;
  tableDataList.value[3].children[9].selfUnpaid = projectBalance.ywfCbwxxxcbzscqswfZcZjUnpaid;
  tableDataList.value[3].children[9].totalPaid = projectBalance.ywfCbwxxxcbzscqswfZjPaid;
  tableDataList.value[3].children[9].totalUnpaid = projectBalance.ywfCbwxxxcbzscqswfZjUnpaid;
  /* 业务费_差旅费 */
  tableDataList.value[3].children[10].specialBudget = projectFunds.ywfChlfZxZj;
  tableDataList.value[3].children[10].selfBudget = projectFunds.ywfChlfZcZj;
  tableDataList.value[3].children[10].specialPaid = projectBalance.ywfChlfZxZjPaid;
  tableDataList.value[3].children[10].specialUnpaid = projectBalance.ywfChlfZxZjUnpaid;
  tableDataList.value[3].children[10].selfPaid = projectBalance.ywfChlfZcZjPaid;
  tableDataList.value[3].children[10].selfUnpaid = projectBalance.ywfChlfZcZjUnpaid;
  tableDataList.value[3].children[10].totalPaid = projectBalance.ywfChlfZjPaid;
  tableDataList.value[3].children[10].totalUnpaid = projectBalance.ywfChlfZjUnpaid;
  /* 业务费_会议会务费费 */
  tableDataList.value[3].children[11].specialBudget = projectFunds.ywfHyhwfZxZj;
  tableDataList.value[3].children[11].selfBudget = projectFunds.ywfHyhwfZcZj;
  tableDataList.value[3].children[11].specialPaid = projectBalance.ywfHyhwfZxZjPaid;
  tableDataList.value[3].children[11].specialUnpaid = projectBalance.ywfHyhwfZxZjUnpaid;
  tableDataList.value[3].children[11].selfPaid = projectBalance.ywfHyhwfZcZjPaid;
  tableDataList.value[3].children[11].selfUnpaid = projectBalance.ywfHyhwfZcZjUnpaid;
  tableDataList.value[3].children[11].totalPaid = projectBalance.ywfHyhwfZjPaid;
  tableDataList.value[3].children[11].totalUnpaid = projectBalance.ywfHyhwfZjUnpaid;
  /* 业务费_国内协作费 */
  tableDataList.value[3].children[12].specialBudget = projectFunds.ywfGnxzfZxZj;
  tableDataList.value[3].children[12].selfBudget = projectFunds.ywfGnxzfZcZj;
  tableDataList.value[3].children[12].specialPaid = projectBalance.ywfGnxzfZxZjPaid;
  tableDataList.value[3].children[12].specialUnpaid = projectBalance.ywfGnxzfZxZjUnpaid;
  tableDataList.value[3].children[12].selfPaid = projectBalance.ywfGnxzfZcZjPaid;
  tableDataList.value[3].children[12].selfUnpaid = projectBalance.ywfGnxzfZcZjUnpaid;
  tableDataList.value[3].children[12].totalPaid = projectBalance.ywfGnxzfZjPaid;
  tableDataList.value[3].children[12].totalUnpaid = projectBalance.ywfGnxzfZjUnpaid;
  /* 业务费_国际合作交流费 */
  tableDataList.value[3].children[13].specialBudget = projectFunds.ywfGjhzjlfZxZj;
  tableDataList.value[3].children[13].selfBudget = projectFunds.ywfGjhzjlfZcZj;
  tableDataList.value[3].children[13].specialPaid = projectBalance.ywfGjhzjlfZxZjPaid;
  tableDataList.value[3].children[13].specialUnpaid = projectBalance.ywfGjhzjlfZxZjUnpaid;
  tableDataList.value[3].children[13].selfPaid = projectBalance.ywfGjhzjlfZcZjPaid;
  tableDataList.value[3].children[13].selfUnpaid = projectBalance.ywfGjhzjlfZcZjUnpaid;
  tableDataList.value[3].children[13].totalPaid = projectBalance.ywfGjhzjlfZjPaid;
  tableDataList.value[3].children[13].totalUnpaid = projectBalance.ywfGjhzjlfZjUnpaid;
  /* 业务费_会议/差旅/国际合作与交流费 */
  tableDataList.value[3].children[14].specialBudget = projectFunds.ywfHyclgjhzyjlfZxZj;
  tableDataList.value[3].children[14].selfBudget = projectFunds.ywfHyclgjhzyjlfZcZj;
  tableDataList.value[3].children[14].specialPaid = projectBalance.ywfHyclgjhzyjlfZxZjPaid;
  tableDataList.value[3].children[14].specialUnpaid = projectBalance.ywfHyclgjhzyjlfZxZjUnpaid;
  tableDataList.value[3].children[14].selfPaid = projectBalance.ywfHyclgjhzyjlfZcZjPaid;
  tableDataList.value[3].children[14].selfUnpaid = projectBalance.ywfHyclgjhzyjlfZcZjUnpaid;
  tableDataList.value[3].children[14].totalPaid = projectBalance.ywfHyclgjhzyjlfZjPaid;
  tableDataList.value[3].children[14].totalUnpaid = projectBalance.ywfHyclgjhzyjlfZjUnpaid;

  /* 劳务费 */
  tableDataList.value[4].budget = projectFunds.lwfZj;
  tableDataList.value[4].specialBudget = projectFunds.lwfZxZj;
  tableDataList.value[4].selfBudget = projectFunds.lwfZcZj;
  tableDataList.value[4].specialPaid = projectBalance.lwfZxZjPaid;
  tableDataList.value[4].specialUnpaid = projectBalance.lwfZxZjUnpaid;
  tableDataList.value[4].selfPaid = projectBalance.lwfZcZjPaid;
  tableDataList.value[4].selfUnpaid = projectBalance.lwfZcZjUnpaid;
  tableDataList.value[4].totalPaid = projectBalance.lwfZjPaid;
  tableDataList.value[4].totalUnpaid = projectBalance.lwfZjUnpaid;
  /* 劳务费_专家咨询费 */
  tableDataList.value[4].children[0].specialBudget = projectFunds.lwfZjzxfZxZj;
  tableDataList.value[4].children[0].selfBudget = projectFunds.lwfZjzxfZcZj;
  tableDataList.value[4].children[0].specialPaid = projectBalance.lwfZjzxfZxZjPaid;
  tableDataList.value[4].children[0].specialUnpaid = projectBalance.lwfZjzxfZxZjUnpaid;
  tableDataList.value[4].children[0].selfPaid = projectBalance.lwfZjzxfZcZjPaid;
  tableDataList.value[4].children[0].selfUnpaid = projectBalance.lwfZjzxfZcZjUnpaid;
  tableDataList.value[4].children[0].totalPaid = projectBalance.lwfZjzxfZjPaid;
  tableDataList.value[4].children[0].totalUnpaid = projectBalance.lwfZjzxfZjUnpaid;
  /* 劳务费_人员劳务费 */
  tableDataList.value[4].children[1].specialBudget = projectFunds.lwfRylwfZxZj;
  tableDataList.value[4].children[1].selfBudget = projectFunds.lwfRylwfZcZj;
  tableDataList.value[4].children[1].specialPaid = projectBalance.lwfRylwfZxZjPaid;
  tableDataList.value[4].children[1].specialUnpaid = projectBalance.lwfRylwfZxZjUnpaid;
  tableDataList.value[4].children[1].selfPaid = projectBalance.lwfRylwfZcZjPaid;
  tableDataList.value[4].children[1].selfUnpaid = projectBalance.lwfRylwfZcZjUnpaid;
  tableDataList.value[4].children[1].totalPaid = projectBalance.lwfRylwfZjPaid;
  tableDataList.value[4].children[1].totalUnpaid = projectBalance.lwfRylwfZjUnpaid;

  /* 材料费 */
  tableDataList.value[5].budget = projectFunds.clfZj;
  tableDataList.value[5].specialBudget = projectFunds.clfZxZj;
  tableDataList.value[5].selfBudget = projectFunds.clfZcZj;
  tableDataList.value[5].specialPaid = projectBalance.clfZxZjPaid;
  tableDataList.value[5].specialUnpaid = projectBalance.clfZxZjUnpaid;
  tableDataList.value[5].selfPaid = projectBalance.clfZcZjPaid;
  tableDataList.value[5].selfUnpaid = projectBalance.clfZcZjUnpaid;
  tableDataList.value[5].totalPaid = projectBalance.clfZjPaid;
  tableDataList.value[5].totalUnpaid = projectBalance.clfZjUnpaid;
  /* 材料费_材料费 */
  tableDataList.value[5].children[0].specialBudget = projectFunds.clfClfZxZj;
  tableDataList.value[5].children[0].selfBudget = projectFunds.clfClfZcZj;
  tableDataList.value[5].children[0].specialPaid = projectBalance.clfClfZxZjPaid;
  tableDataList.value[5].children[0].specialUnpaid = projectBalance.clfClfZxZjUnpaid;
  tableDataList.value[5].children[0].selfPaid = projectBalance.clfClfZcZjPaid;
  tableDataList.value[5].children[0].selfUnpaid = projectBalance.clfClfZcZjUnpaid;
  tableDataList.value[5].children[0].totalPaid = projectBalance.clfClfZjPaid;
  tableDataList.value[5].children[0].totalUnpaid = projectBalance.clfClfZjUnpaid;

  /* 科研活动费 */
  tableDataList.value[6].budget = projectFunds.kyhdfZj;
  tableDataList.value[6].specialBudget = projectFunds.kyhdfZxZj;
  tableDataList.value[6].selfBudget = projectFunds.kyhdfZcZj;
  tableDataList.value[6].specialPaid = projectBalance.kyhdfZxZjPaid;
  tableDataList.value[6].specialUnpaid = projectBalance.kyhdfZxZjUnpaid;
  tableDataList.value[6].selfPaid = projectBalance.kyhdfZcZjPaid;
  tableDataList.value[6].selfUnpaid = projectBalance.kyhdfZcZjUnpaid;
  tableDataList.value[6].totalPaid = projectBalance.kyhdfZjPaid;
  tableDataList.value[6].totalUnpaid = projectBalance.kyhdfZjUnpaid;
  /* 科研活动费_资料费 */
  tableDataList.value[6].children[0].specialBudget = projectFunds.kyhdfZlZxZj;
  tableDataList.value[6].children[0].selfBudget = projectFunds.kyhdfZlZcZj;
  tableDataList.value[6].children[0].specialPaid = projectBalance.kyhdfZlZxZjPaid;
  tableDataList.value[6].children[0].specialUnpaid = projectBalance.kyhdfZlZxZjUnpaid;
  tableDataList.value[6].children[0].selfPaid = projectBalance.kyhdfZlZcZjPaid;
  tableDataList.value[6].children[0].selfUnpaid = projectBalance.kyhdfZlZcZjUnpaid;
  tableDataList.value[6].children[0].totalPaid = projectBalance.kyhdfZlZjPaid;
  tableDataList.value[6].children[0].totalUnpaid = projectBalance.kyhdfZlZjUnpaid;
  /* 科研活动费_数据/样本采集费 */
  tableDataList.value[6].children[1].specialBudget = projectFunds.kyhdfSjybcjZxZj;
  tableDataList.value[6].children[1].selfBudget = projectFunds.kyhdfSjybcjZcZj;
  tableDataList.value[6].children[1].specialPaid = projectBalance.kyhdfSjybcjZxZjPaid;
  tableDataList.value[6].children[1].specialUnpaid = projectBalance.kyhdfSjybcjZxZjUnpaid;
  tableDataList.value[6].children[1].selfPaid = projectBalance.kyhdfSjybcjZcZjPaid;
  tableDataList.value[6].children[1].selfUnpaid = projectBalance.kyhdfSjybcjZcZjUnpaid;
  tableDataList.value[6].children[1].totalPaid = projectBalance.kyhdfSjybcjZjPaid;
  tableDataList.value[6].children[1].totalUnpaid = projectBalance.kyhdfSjybcjZjUnpaid;
  /* 科研活动费_测试化验加工费 */
  tableDataList.value[6].children[2].specialBudget = projectFunds.kyhdfSjybcjZxZj;
  tableDataList.value[6].children[2].selfBudget = projectFunds.kyhdfSjybcjZcZj;
  tableDataList.value[6].children[2].specialPaid = projectBalance.kyhdfCshyjgZxZjPaid;
  tableDataList.value[6].children[2].specialUnpaid = projectBalance.kyhdfCshyjgZxZjUnpaid;
  tableDataList.value[6].children[2].selfPaid = projectBalance.kyhdfCshyjgZcZjPaid;
  tableDataList.value[6].children[2].selfUnpaid = projectBalance.kyhdfCshyjgZcZjUnpaid;
  tableDataList.value[6].children[2].totalPaid = projectBalance.kyhdfCshyjgZjPaid;
  tableDataList.value[6].children[2].totalUnpaid = projectBalance.kyhdfCshyjgZjUnpaid;
  /* 科研活动费_燃料动力费 */
  tableDataList.value[6].children[3].specialBudget = projectFunds.kyhdfRldlZxZj;
  tableDataList.value[6].children[3].selfBudget = projectFunds.kyhdfRldlZcZj;
  tableDataList.value[6].children[3].specialPaid = projectBalance.kyhdfRldlZxZjPaid;
  tableDataList.value[6].children[3].specialUnpaid = projectBalance.kyhdfRldlZxZjUnpaid;
  tableDataList.value[6].children[3].selfPaid = projectBalance.kyhdfRldlZcZjPaid;
  tableDataList.value[6].children[3].selfUnpaid = projectBalance.kyhdfRldlZcZjUnpaid;
  tableDataList.value[6].children[3].totalPaid = projectBalance.kyhdfRldlZjPaid;
  tableDataList.value[6].children[3].totalUnpaid = projectBalance.kyhdfRldlZjUnpaid;
  /* 科研活动费_办公费 */
  tableDataList.value[6].children[4].specialBudget = projectFunds.kyhdfBgZxZj;
  tableDataList.value[6].children[4].selfBudget = projectFunds.kyhdfBgZcZj;
  tableDataList.value[6].children[4].specialPaid = projectBalance.kyhdfBgZxZjPaid;
  tableDataList.value[6].children[4].specialUnpaid = projectBalance.kyhdfBgZxZjUnpaid;
  tableDataList.value[6].children[4].selfPaid = projectBalance.kyhdfBgZcZjUnpaid;
  tableDataList.value[6].children[4].selfUnpaid = projectBalance.kyhdfBgZcZjUnpaid;
  tableDataList.value[6].children[4].totalPaid = projectBalance.kyhdfBgZjPaid;
  tableDataList.value[6].children[4].totalUnpaid = projectBalance.kyhdfBgZjUnpaid;
  /* 科研活动费_印刷/出版费 */
  tableDataList.value[6].children[5].specialBudget = projectFunds.kyhdfYscbZxZj;
  tableDataList.value[6].children[5].selfBudget = projectFunds.kyhdfYscbZcZj;
  tableDataList.value[6].children[5].specialPaid = projectBalance.kyhdfYscbZxZjPaid;
  tableDataList.value[6].children[5].specialUnpaid = projectBalance.kyhdfYscbZxZjUnpaid;
  tableDataList.value[6].children[5].selfPaid = projectBalance.kyhdfYscbZcZjPaid;
  tableDataList.value[6].children[5].selfUnpaid = projectBalance.kyhdfYscbZcZjUnpaid;
  tableDataList.value[6].children[5].totalPaid = projectBalance.kyhdfYscbZjPaid;
  tableDataList.value[6].children[5].totalUnpaid = projectBalance.kyhdfYscbZjUnpaid;
  /* 科研活动费_知识产权事务费 */
  tableDataList.value[6].children[6].specialBudget = projectFunds.kyhdfZscqswZxZj;
  tableDataList.value[6].children[6].selfBudget = projectFunds.kyhdfZscqswZcZj;
  tableDataList.value[6].children[6].specialPaid = projectBalance.kyhdfZscqswZxZjPaid;
  tableDataList.value[6].children[6].specialUnpaid = projectBalance.kyhdfZscqswZxZjUnpaid;
  tableDataList.value[6].children[6].selfPaid = projectBalance.kyhdfZscqswZcZjPaid;
  tableDataList.value[6].children[6].selfUnpaid = projectBalance.kyhdfZscqswZcZjUnpaid;
  tableDataList.value[6].children[6].totalPaid = projectBalance.kyhdfZscqswZjPaid;
  tableDataList.value[6].children[6].totalUnpaid = projectBalance.kyhdfZscqswZjUnpaid;
  /* 科研活动费_车辆使用费 */
  tableDataList.value[6].children[7].specialBudget = projectFunds.kyhdfClsyZxZj;
  tableDataList.value[6].children[7].selfBudget = projectFunds.kyhdfClsyZcZj;
  tableDataList.value[6].children[7].specialPaid = projectBalance.kyhdfClsyZxZjPaid;
  tableDataList.value[6].children[7].specialUnpaid = projectBalance.kyhdfClsyZxZjUnpaid;
  tableDataList.value[6].children[7].selfPaid = projectBalance.kyhdfClsyZcZjPaid;
  tableDataList.value[6].children[7].selfUnpaid = projectBalance.kyhdfClsyZcZjUnpaid;
  tableDataList.value[6].children[7].totalPaid = projectBalance.kyhdfClsyZjPaid;
  tableDataList.value[6].children[7].totalUnpaid = projectBalance.kyhdfClsyZjUnpaid;

  /* 科研服务费 */
  tableDataList.value[7].budget = projectFunds.kyfwfZj;
  tableDataList.value[7].specialBudget = projectFunds.kyfwfZxZj;
  tableDataList.value[7].selfBudget = projectFunds.kyfwfZcZj;
  tableDataList.value[7].specialPaid = projectBalance.kyfwfZxZjPaid;
  tableDataList.value[7].specialUnpaid = projectBalance.kyfwfZxZjUnpaid;
  tableDataList.value[7].selfPaid = projectBalance.kyfwfZcZjPaid;
  tableDataList.value[7].selfUnpaid = projectBalance.kyfwfZcZjUnpaid;
  tableDataList.value[7].totalPaid = projectBalance.kyfwfZjPaid;
  tableDataList.value[7].totalUnpaid = projectBalance.kyfwfZjUnpaid;
  /* 科研服务费_会议/会务费 */
  tableDataList.value[7].children[0].specialBudget = projectFunds.kyfwfHyhwZxZj;
  tableDataList.value[7].children[0].selfBudget = projectFunds.kyfwfHyhwZcZj;
  tableDataList.value[7].children[0].specialPaid = projectBalance.kyfwfHyhwZxZjPaid;
  tableDataList.value[7].children[0].specialUnpaid = projectBalance.kyfwfHyhwZxZjUnpaid;
  tableDataList.value[7].children[0].selfPaid = projectBalance.kyfwfHyhwZcZjPaid;
  tableDataList.value[7].children[0].selfUnpaid = projectBalance.kyfwfHyhwZcZjUnpaid;
  tableDataList.value[7].children[0].totalPaid = projectBalance.kyfwfHyhwZjPaid;
  tableDataList.value[7].children[0].totalUnpaid = projectBalance.kyfwfHyhwZjUnpaid;
  /* 科研服务费_差旅费*/
  tableDataList.value[7].children[1].specialBudget = projectFunds.kyfwfClZxZj;
  tableDataList.value[7].children[1].selfBudget = projectFunds.kyfwfClZcZj;
  tableDataList.value[7].children[1].specialPaid = projectBalance.kyfwfClZxZjPaid;
  tableDataList.value[7].children[1].specialUnpaid = projectBalance.kyfwfClZxZjUnpaid;
  tableDataList.value[7].children[1].selfPaid = projectBalance.kyfwfClZcZjPaid;
  tableDataList.value[7].children[1].selfUnpaid = projectBalance.kyfwfClZcZjUnpaid;
  tableDataList.value[7].children[1].totalPaid = projectBalance.kyfwfClZjPaid;
  tableDataList.value[7].children[1].totalUnpaid = projectBalance.kyfwfClZjUnpaid;
  /* 科研服务费_国内协作费*/
  tableDataList.value[7].children[2].specialBudget = projectFunds.kyfwfGnxzZxZj;
  tableDataList.value[7].children[2].selfBudget = projectFunds.kyfwfGnxzZcZj;
  tableDataList.value[7].children[2].specialPaid = projectBalance.kyfwfGnxzZxZjPaid;
  tableDataList.value[7].children[2].specialUnpaid = projectBalance.kyfwfGnxzZxZjUnpaid;
  tableDataList.value[7].children[2].selfPaid = projectBalance.kyfwfGnxzZcZjPaid;
  tableDataList.value[7].children[2].selfUnpaid = projectBalance.kyfwfGnxzZcZjUnpaid;
  tableDataList.value[7].children[2].totalPaid = projectBalance.kyfwfGnxzZjPaid;
  tableDataList.value[7].children[2].totalUnpaid = projectBalance.kyfwfGnxzZjUnpaid;
  /* 科研服务费_国际合作交流*/
  tableDataList.value[7].children[3].specialBudget = projectFunds.kyfwfGjhzjlZxZj;
  tableDataList.value[7].children[3].selfBudget = projectFunds.kyfwfGjhzjlZcZj;
  tableDataList.value[7].children[3].specialPaid = projectBalance.kyfwfGjhzjlZxZjPaid;
  tableDataList.value[7].children[3].specialUnpaid = projectBalance.kyfwfGjhzjlZxZjUnpaid;
  tableDataList.value[7].children[3].selfPaid = projectBalance.kyfwfGjhzjlZcZjPaid;
  tableDataList.value[7].children[3].selfUnpaid = projectBalance.kyfwfGjhzjlZcZjUnpaid;
  tableDataList.value[7].children[3].totalPaid = projectBalance.kyfwfGjhzjlZjPaid;
  tableDataList.value[7].children[3].totalUnpaid = projectBalance.kyfwfGjhzjlZjUnpaid;
  /* 科研服务费_专家咨询费*/
  tableDataList.value[7].children[4].specialBudget = projectFunds.kyfwfZjzxZxZj;
  tableDataList.value[7].children[4].selfBudget = projectFunds.kyfwfZjzxZcZj;
  tableDataList.value[7].children[4].specialPaid = projectBalance.kyfwfZjzxZxZjPaid;
  tableDataList.value[7].children[4].specialUnpaid = projectBalance.kyfwfZjzxZxZjUnpaid;
  tableDataList.value[7].children[4].selfPaid = projectBalance.kyfwfZjzxZcZjPaid;
  tableDataList.value[7].children[4].selfUnpaid = projectBalance.kyfwfZjzxZcZjUnpaid;
  tableDataList.value[7].children[4].totalPaid = projectBalance.kyfwfZjzxZjPaid;
  tableDataList.value[7].children[4].totalUnpaid = projectBalance.kyfwfZjzxZjUnpaid;

  /* 人员和劳务补助费 */
  tableDataList.value[8].budget = projectFunds.ryhlwbzfZj;
  tableDataList.value[8].specialBudget = projectFunds.ryhlwbzfZxZj;
  tableDataList.value[8].selfBudget = projectFunds.ryhlwbzfZcZj;
  tableDataList.value[8].specialPaid = projectBalance.ryhlwbzfZxZjPaid;
  tableDataList.value[8].specialUnpaid = projectBalance.ryhlwbzfZxZjUnpaid;
  tableDataList.value[8].selfPaid = projectBalance.ryhlwbzfZcZjPaid;
  tableDataList.value[8].selfUnpaid = projectBalance.ryhlwbzfZcZjUnpaid;
  tableDataList.value[8].totalPaid = projectBalance.ryhlwbzfZjPaid;
  tableDataList.value[8].totalUnpaid = projectBalance.ryhlwbzfZjUnpaid;
  /* 人员和劳务补助费_人员劳务费 */
  tableDataList.value[8].children[0].specialBudget = projectFunds.ryhlwbzfRylwZxZj;
  tableDataList.value[8].children[0].selfBudget = projectFunds.ryhlwbzfRylwZcZj;
  tableDataList.value[8].children[0].specialPaid = projectBalance.ryhlwbzfRylwZxZjPaid;
  tableDataList.value[8].children[0].specialUnpaid = projectBalance.ryhlwbzfRylwZxZjUnpaid;
  tableDataList.value[8].children[0].selfPaid = projectBalance.ryhlwbzfRylwZcZjPaid;
  tableDataList.value[8].children[0].selfUnpaid = projectBalance.ryhlwbzfRylwZcZjUnpaid;
  tableDataList.value[8].children[0].totalPaid = projectBalance.ryhlwbzfRylwZjPaid;
  tableDataList.value[8].children[0].totalUnpaid = projectBalance.ryhlwbzfRylwZjUnpaid;

  /* （二）间接费用 */
  tableDataList.value[9].budget = projectFunds.totalFundsJj;
  tableDataList.value[9].specialBudget = projectFunds.totalFundsZxJj;
  tableDataList.value[9].selfBudget = projectFunds.totalFundsZcJj;
  tableDataList.value[9].specialPaid = projectBalance.totalFundsZxJjPaid;
  tableDataList.value[9].specialUnpaid = projectBalance.totalFundsZxJjUnpaid;
  tableDataList.value[9].selfPaid = projectBalance.totalFundsZcJjPaid;
  tableDataList.value[9].selfUnpaid = projectBalance.totalFundsZcJjUnpaid;
  tableDataList.value[9].totalPaid = projectBalance.totalFundsJjPaid;
  tableDataList.value[9].totalUnpaid = projectBalance.totalFundsJjUnpaid;
  /* 绩效支出 */
  tableDataList.value[9].children[0].budget = projectFunds.jxzcJj;
  tableDataList.value[9].children[0].specialBudget = projectFunds.jxzcZxJj;
  tableDataList.value[9].children[0].selfBudget = projectFunds.jxzcZcJj;
  tableDataList.value[9].children[0].specialPaid = projectBalance.jxzcZxJjPaid;
  tableDataList.value[9].children[0].specialUnpaid = projectBalance.jxzcZxJjUnpaid;
  tableDataList.value[9].children[0].selfPaid = projectBalance.jxzcZcJjPaid;
  tableDataList.value[9].children[0].selfUnpaid = projectBalance.jxzcZcJjUnpaid;
  tableDataList.value[9].children[0].totalPaid = projectBalance.jxzcJjPaid;
  tableDataList.value[9].children[0].totalUnpaid = projectBalance.jxzcJjUnpaid;
  /* 管理费 */
  tableDataList.value[9].children[1].budget = projectFunds.glfJj;
  tableDataList.value[9].children[1].specialBudget = projectFunds.glfZxJj;
  tableDataList.value[9].children[1].selfBudget = projectFunds.glfZcJj;
  tableDataList.value[9].children[1].specialPaid = projectBalance.glfZxJjPaid;
  tableDataList.value[9].children[1].specialUnpaid = projectBalance.glfZxJjUnpaid;
  tableDataList.value[9].children[1].selfPaid = projectBalance.glfZcJjPaid;
  tableDataList.value[9].children[1].selfUnpaid = projectBalance.glfZcJjUnpaid;
  tableDataList.value[9].children[1].totalPaid = projectBalance.glfJjPaid;
  tableDataList.value[9].children[1].totalUnpaid = projectBalance.glfJjUnpaid;
  /* 房屋租赁费 */
  tableDataList.value[9].children[2].budget = projectFunds.fwzjfJj;
  tableDataList.value[9].children[2].specialBudget = projectFunds.fwzjfZxJj;
  tableDataList.value[9].children[2].selfBudget = projectFunds.fwzjfZcJj;
  tableDataList.value[9].children[2].specialPaid = projectBalance.fwzjfZxJjPaid;
  tableDataList.value[9].children[2].specialUnpaid = projectBalance.fwzjfZxJjUnpaid;
  tableDataList.value[9].children[2].selfPaid = projectBalance.fwzjfZcJjPaid;
  tableDataList.value[9].children[2].selfUnpaid = projectBalance.fwzjfZcJjUnpaid;
  tableDataList.value[9].children[2].totalPaid = projectBalance.fwzjfJjPaid;
  tableDataList.value[9].children[2].totalUnpaid = projectBalance.fwzjfJjUnpaid;
  /* 日常水、电、暖费 */
  tableDataList.value[9].children[3].budget = projectFunds.rcsdnfJj;
  tableDataList.value[9].children[3].specialBudget = projectFunds.rcsdnfZxJj;
  tableDataList.value[9].children[3].selfBudget = projectFunds.rcsdnfZcJj;
  tableDataList.value[9].children[3].specialPaid = projectBalance.rcsdnfZxJjPaid;
  tableDataList.value[9].children[3].specialUnpaid = projectBalance.rcsdnfZxJjUnpaid;
  tableDataList.value[9].children[3].selfPaid = projectBalance.rcsdnfZcJjPaid;
  tableDataList.value[9].children[3].selfUnpaid = projectBalance.rcsdnfZcJjUnpaid;
  tableDataList.value[9].children[3].totalPaid = projectBalance.rcsdnfJjPaid;
  tableDataList.value[9].children[3].totalUnpaid = projectBalance.rcsdnfJjUnpaid;
  /* 设备费 */
  tableDataList.value[9].children[4].budget = projectFunds.sbfJj;
  tableDataList.value[9].children[4].specialBudget = projectFunds.sbfZxJj;
  tableDataList.value[9].children[4].selfBudget = projectFunds.sbfZcJj;
  tableDataList.value[9].children[4].specialPaid = projectBalance.sbfZxJjPaid;
  tableDataList.value[9].children[4].specialUnpaid = projectBalance.sbfZxJjUnpaid;
  tableDataList.value[9].children[4].selfPaid = projectBalance.sbfZcJjPaid;
  tableDataList.value[9].children[4].selfUnpaid = projectBalance.sbfZcJjUnpaid;
  tableDataList.value[9].children[4].totalPaid = projectBalance.sbfJjPaid;
  tableDataList.value[9].children[4].totalUnpaid = projectBalance.sbfJjUnpaid;
  /* 材料费 */
  tableDataList.value[9].children[5].budget = projectFunds.clfJj;
  tableDataList.value[9].children[5].specialBudget = projectFunds.clfZxJj;
  tableDataList.value[9].children[5].selfBudget = projectFunds.clfZcJj;
  tableDataList.value[9].children[5].specialPaid = projectBalance.clfZxJjPaid;
  tableDataList.value[9].children[5].specialUnpaid = projectBalance.clfZxJjUnpaid;
  tableDataList.value[9].children[5].selfPaid = projectBalance.clfZcJjPaid;
  tableDataList.value[9].children[5].selfUnpaid = projectBalance.clfZcJjUnpaid;
  tableDataList.value[9].children[5].totalPaid = projectBalance.clfJjPaid;
  tableDataList.value[9].children[5].totalUnpaid = projectBalance.clfJjUnpaid;
  /* 资料费 */
  tableDataList.value[9].children[6].budget = projectFunds.zlfJj;
  tableDataList.value[9].children[6].specialBudget = projectFunds.zlfZxJj;
  tableDataList.value[9].children[6].selfBudget = projectFunds.zlfZcJj;
  tableDataList.value[9].children[6].specialPaid = projectBalance.zlfZxJjPaid;
  tableDataList.value[9].children[6].specialUnpaid = projectBalance.zlfZxJjUnpaid;
  tableDataList.value[9].children[6].selfPaid = projectBalance.zlfZcJjPaid;
  tableDataList.value[9].children[6].selfUnpaid = projectBalance.zlfZcJjUnpaid;
  tableDataList.value[9].children[6].totalPaid = projectBalance.zlfJjPaid;
  tableDataList.value[9].children[6].totalUnpaid = projectBalance.zlfJjUnpaid;
  /* 数据/样本采集费 */
  tableDataList.value[9].children[7].budget = projectFunds.sjybcjfJj;
  tableDataList.value[9].children[7].specialBudget = projectFunds.sjybcjfZxJj;
  tableDataList.value[9].children[7].selfBudget = projectFunds.sjybcjfZcJj;
  tableDataList.value[9].children[7].specialPaid = projectBalance.sjybcjfZxJjPaid;
  tableDataList.value[9].children[7].specialUnpaid = projectBalance.sjybcjfZxJjUnpaid;
  tableDataList.value[9].children[7].selfPaid = projectBalance.sjybcjfZcJjPaid;
  tableDataList.value[9].children[7].selfUnpaid = projectBalance.sjybcjfZcJjUnpaid;
  tableDataList.value[9].children[7].totalPaid = projectBalance.sjybcjfJjPaid;
  tableDataList.value[9].children[7].totalUnpaid = projectBalance.sjybcjfJjUnpaid;
  /* 测试化验加工费 */
  tableDataList.value[9].children[8].budget = projectFunds.cshyjgfJj;
  tableDataList.value[9].children[8].specialBudget = projectFunds.cshyjgfZxJj;
  tableDataList.value[9].children[8].selfBudget = projectFunds.cshyjgfZcJj;
  tableDataList.value[9].children[8].specialPaid = projectBalance.cshyjgfZxJjPaid;
  tableDataList.value[9].children[8].specialUnpaid = projectBalance.cshyjgfZxJjUnpaid;
  tableDataList.value[9].children[8].selfPaid = projectBalance.cshyjgfZcJjPaid;
  tableDataList.value[9].children[8].selfUnpaid = projectBalance.cshyjgfZcJjUnpaid;
  tableDataList.value[9].children[8].totalPaid = projectBalance.cshyjgfJjPaid;
  tableDataList.value[9].children[8].totalUnpaid = projectBalance.cshyjgfJjUnpaid;
  /* 燃料动力费 */
  tableDataList.value[9].children[9].budget = projectFunds.rldlfJj;
  tableDataList.value[9].children[9].specialBudget = projectFunds.rldlfZxJj;
  tableDataList.value[9].children[9].selfBudget = projectFunds.rldlfZcJj;
  tableDataList.value[9].children[9].specialPaid = projectBalance.rldlfZxJjPaid;
  tableDataList.value[9].children[9].specialUnpaid = projectBalance.rldlfZxJjUnpaid;
  tableDataList.value[9].children[9].selfPaid = projectBalance.rldlfZcJjPaid;
  tableDataList.value[9].children[9].selfUnpaid = projectBalance.rldlfZcJjUnpaid;
  tableDataList.value[9].children[9].totalPaid = projectBalance.rldlfJjPaid;
  tableDataList.value[9].children[9].totalUnpaid = projectBalance.rldlfJjUnpaid;
  /* 办公费 */
  tableDataList.value[9].children[10].budget = projectFunds.bgfJj;
  tableDataList.value[9].children[10].specialBudget = projectFunds.bgfZxJj;
  tableDataList.value[9].children[10].selfBudget = projectFunds.bgfZcJj;
  tableDataList.value[9].children[10].specialPaid = projectBalance.bgfZxJjPaid;
  tableDataList.value[9].children[10].specialUnpaid = projectBalance.bgfZxJjUnpaid;
  tableDataList.value[9].children[10].selfPaid = projectBalance.bgfZcJjPaid;
  tableDataList.value[9].children[10].selfUnpaid = projectBalance.bgfZcJjUnpaid;
  tableDataList.value[9].children[10].totalPaid = projectBalance.bgfJjPaid;
  tableDataList.value[9].children[10].totalUnpaid = projectBalance.bgfJjUnpaid;
  /* 印刷/出版费 */
  tableDataList.value[9].children[11].budget = projectFunds.yscbfJj;
  tableDataList.value[9].children[11].specialBudget = projectFunds.yscbfZxJj;
  tableDataList.value[9].children[11].selfBudget = projectFunds.yscbfZcJj;
  tableDataList.value[9].children[11].specialPaid = projectBalance.yscbfZxJjPaid;
  tableDataList.value[9].children[11].specialUnpaid = projectBalance.yscbfZxJjUnpaid;
  tableDataList.value[9].children[11].selfPaid = projectBalance.yscbfZcJjPaid;
  tableDataList.value[9].children[11].selfUnpaid = projectBalance.yscbfZcJjUnpaid;
  tableDataList.value[9].children[11].totalPaid = projectBalance.yscbfJjPaid;
  tableDataList.value[9].children[11].totalUnpaid = projectBalance.yscbfJjUnpaid;
  /* 知识产权事务费 */
  tableDataList.value[9].children[12].budget = projectFunds.zscqswfJj;
  tableDataList.value[9].children[12].specialBudget = projectFunds.zscqswfZxJj;
  tableDataList.value[9].children[12].selfBudget = projectFunds.zscqswfZcJj;
  tableDataList.value[9].children[12].specialPaid = projectBalance.zscqswfZxJjPaid;
  tableDataList.value[9].children[12].specialUnpaid = projectBalance.zscqswfZxJjUnpaid;
  tableDataList.value[9].children[12].selfPaid = projectBalance.zscqswfZcJjPaid;
  tableDataList.value[9].children[12].selfUnpaid = projectBalance.zscqswfZcJjUnpaid;
  tableDataList.value[9].children[12].totalPaid = projectBalance.zscqswfJjPaid;
  tableDataList.value[9].children[12].totalUnpaid = projectBalance.zscqswfJjUnpaid;
  /* 车辆使用费 */
  tableDataList.value[9].children[13].budget = projectFunds.clsyfJj;
  tableDataList.value[9].children[13].specialBudget = projectFunds.clsyfZxJj;
  tableDataList.value[9].children[13].selfBudget = projectFunds.clsyfZcJj;
  tableDataList.value[9].children[13].specialPaid = projectBalance.clsyfZxJjPaid;
  tableDataList.value[9].children[13].specialUnpaid = projectBalance.clsyfZxJjUnpaid;
  tableDataList.value[9].children[13].selfPaid = projectBalance.clsyfZcJjPaid;
  tableDataList.value[9].children[13].selfUnpaid = projectBalance.clsyfZcJjUnpaid;
  tableDataList.value[9].children[13].totalPaid = projectBalance.clsyfJjPaid;
  tableDataList.value[9].children[13].totalUnpaid = projectBalance.clsyfJjUnpaid;
  /* 差旅费 */
  tableDataList.value[9].children[14].budget = projectFunds.chlfJj;
  tableDataList.value[9].children[14].specialBudget = projectFunds.chlfZxJj;
  tableDataList.value[9].children[14].selfBudget = projectFunds.chlfZcJj;
  tableDataList.value[9].children[14].specialPaid = projectBalance.chlfZxJjPaid;
  tableDataList.value[9].children[14].specialUnpaid = projectBalance.chlfZxJjUnpaid;
  tableDataList.value[9].children[14].selfPaid = projectBalance.chlfZcJjPaid;
  tableDataList.value[9].children[14].selfUnpaid = projectBalance.chlfZcJjUnpaid;
  tableDataList.value[9].children[14].totalPaid = projectBalance.chlfJjPaid;
  tableDataList.value[9].children[14].totalUnpaid = projectBalance.chlfJjUnpaid;
  /* 会议/会务费 */
  tableDataList.value[9].children[15].budget = projectFunds.hyhwfJj;
  tableDataList.value[9].children[15].specialBudget = projectFunds.hyhwfZxJj;
  tableDataList.value[9].children[15].selfBudget = projectFunds.hyhwfZcJj;
  tableDataList.value[9].children[15].specialPaid = projectBalance.hyhwfZxJjPaid;
  tableDataList.value[9].children[15].specialUnpaid = projectBalance.hyhwfZxJjUnpaid;
  tableDataList.value[9].children[15].selfPaid = projectBalance.hyhwfZcJjPaid;
  tableDataList.value[9].children[15].selfUnpaid = projectBalance.hyhwfZcJjUnpaid;
  tableDataList.value[9].children[15].totalPaid = projectBalance.hyhwfJjPaid;
  tableDataList.value[9].children[15].totalUnpaid = projectBalance.hyhwfJjUnpaid;
  /* 专家咨询费 */
  tableDataList.value[9].children[16].budget = projectFunds.zjzxfJj;
  tableDataList.value[9].children[16].specialBudget = projectFunds.zjzxfZxJj;
  tableDataList.value[9].children[16].selfBudget = projectFunds.zjzxfZcJj;
  tableDataList.value[9].children[16].specialPaid = projectBalance.zjzxfZxJjPaid;
  tableDataList.value[9].children[16].specialUnpaid = projectBalance.zjzxfZxJjUnpaid;
  tableDataList.value[9].children[16].selfPaid = projectBalance.zjzxfZcJjPaid;
  tableDataList.value[9].children[16].selfUnpaid = projectBalance.zjzxfZcJjUnpaid;
  tableDataList.value[9].children[16].totalPaid = projectBalance.zjzxfJjPaid;
  tableDataList.value[9].children[16].totalUnpaid = projectBalance.zjzxfJjUnpaid;
  /* 其他 */
  tableDataList.value[9].children[17].budget = projectFunds.othersJj;
  tableDataList.value[9].children[17].specialBudget = projectFunds.othersZxJj;
  tableDataList.value[9].children[17].selfBudget = projectFunds.othersZcJj;
  tableDataList.value[9].children[17].specialPaid = projectBalance.othersZxPaid;
  tableDataList.value[9].children[17].specialUnpaid = projectBalance.othersZxUnpaid;
  tableDataList.value[9].children[17].selfPaid = projectBalance.othersZcPaid;
  tableDataList.value[9].children[17].selfUnpaid = projectBalance.othersZcUnpaid;
  tableDataList.value[9].children[17].totalPaid = projectBalance.othersJjPaid;
  tableDataList.value[9].children[17].totalUnpaid = projectBalance.othersJjUnpaid;
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

onMounted(() => {
  getCurrentUserInfo();
  console.log('userInfo', userInfo);
});
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
