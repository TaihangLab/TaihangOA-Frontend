<template>
  <div>
    <el-table ref="multipleTable" :key="tableKey" :data="projectList" border style="width: 100%">
      <el-table-column label="项目名称" :resizable="false" prop="assignedSubjectName" width="150" fixed="left"> </el-table-column>
      <el-table-column label="项目牵头单位" :resizable="false" prop="leadingUnit" width="180"> </el-table-column>
      <el-table-column label="项目来源" :resizable="false" prop="projectSource" width="180"> </el-table-column>
      <el-table-column label="项目负责人" :resizable="false" prop="projectLeader" width="180"> </el-table-column>
      <el-table-column label="项目级别" :resizable="false" prop="projectLevel" :formatter="projectLevelss" width="110"> </el-table-column>
      <el-table-column label="是否牵头单位" :resizable="false" prop="hasLeadingRole" :formatter="hasLeadingRoles" width="150"> </el-table-column>
      <el-table-column label="负责课题" :resizable="false" prop="assignedSubjectSection" width="150"> </el-table-column>
      <el-table-column label="公司负责人" :resizable="false" prop="companyLeader" width="180"> </el-table-column>
      <el-table-column label="部门负责人" :resizable="false" prop="departmentLeader" width="180"> </el-table-column>
      <el-table-column label="科研项目管理人" :resizable="false" prop="researchManager" width="180"> </el-table-column>
      <el-table-column label="立项时间" :resizable="false" prop="projectEstablishTime" width="170"> </el-table-column>
      <el-table-column label="项目计划验收时间" :resizable="false" prop="projectScheduledCompletionTime" width="170"> </el-table-column>
      <el-table-column label="项目推进情况" :resizable="false" prop="projectProgressStatus" :formatter="projectProgressStatuss" width="150">
      </el-table-column>
      <el-table-column label="合作单位" :resizable="false" prop="collaboratingUnit" width="150"> </el-table-column>
      <el-table-column label="经费总额" :resizable="false" prop="totalFundsAll" width="150"> </el-table-column>
      <el-table-column label="专项经费总额" :resizable="false" prop="totalFundsZx" width="150"> </el-table-column>
      <el-table-column label="专项到款总额" :resizable="false" prop="totalFundsZxDk" width="150"> </el-table-column>
      <el-table-column label="已完成自筹投资" :resizable="false" prop="zctzDone" width="150"> </el-table-column>
      <el-table-column label="已完成专项投资" :resizable="false" prop="zxtzDone" width="150"> </el-table-column>、
      <el-table-column label="自筹经费公司配套" :resizable="false" prop="zcGspt" width="150"> </el-table-column>
      <el-table-column label="专项经费公司留存（计划）" :resizable="false" prop="zxGslc" width="150"> </el-table-column>
      <el-table-column label="更新时间" :resizable="false" prop="updateTime" width="170"> </el-table-column>
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
      :project-id="projectId.toString()"
      @update:visible="isDetailDialogVisible = $event"
    />
    <!-- 大事记查看打开的界面 -->
    <MilestoneDetailDialog
      v-if="isMilestoneDetailDialogVisible"
      :visible="isMilestoneDetailDialogVisible"
      :project-id="projectId.toString()"
      :update-id="projectId.toString()"
      @update:visible="isMilestoneDetailDialogVisible = $event"
    />
    <!--新增大事记-->
    <MilestoneAddDialog
      :visible="isAddMilestoneDialogVisible"
      :project-id="projectId.toString()"
      @update:visible="isAddMilestoneDialogVisible = $event"
    />
    <!-- 修改项目弹出的对话框-->
    <ProjectUpdateDialog
      :visible="isUpdateDialogVisible"
      :update-id="updateId"
      @update:visible="isUpdateDialogVisible = $event"
      @reload-project-list="getProjectList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { deleteProject } from '@/api/project/myProject/project';
import ProjectDetailDialog from '@/views/project/components/ProjectDetail/ProjectDetails.vue';
import MilestoneDetailDialog from '@/views/project/components/Milestone/MilestoneDetail.vue';
import MilestoneAddDialog from '@/views/project/components/Milestone/MilestoneAdd.vue';
import ProjectUpdateDialog from '@/views/project/components/ProjectDetail/ProjectUpdate.vue';

interface Project {
  projectId: string;
  assignedSubjectSection: string;
  [key: string]: any;
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const isDetailDialogVisible = ref(false);
const isMilestoneDetailDialogVisible = ref(false);
const isAddMilestoneDialogVisible = ref(false);
const isUpdateDialogVisible = ref(false);
const emit = defineEmits(['reloadProjectList']);

async function getProjectList() {
  emit('reloadProjectList');
}

const showDetailDialog = (row: Project) => {
  isDetailDialogVisible.value = true;
  projectId.value = row.projectId;
};

const showMilestoneDetailDialog = (row: Project) => {
  isMilestoneDetailDialogVisible.value = true;
  projectId.value = row.projectId;
};

const showMilestoneAddDialog = (row: Project) => {
  isAddMilestoneDialogVisible.value = true;
  projectId.value = row.projectId;
};

const props = defineProps<{
  projectListLook: Project[];
  myProjectLook: Project[];
  buttonType?: number;
  total: number;
}>();

// 定义组件
const router = useRouter();

const tableKey = ref(true);
const hasCooperativeUnit = ref({
  0: '有',
  1: '无'
});
const hasLeadingRole = ref({
  0: '否',
  1: '是'
});
const projectLevel = ref({
  0: '国家级',
  1: '省部级',
  2: '企业级'
});
const projectProgressStatus = ref({
  0: '正在需求申报',
  1: '已完成需求申报',
  2: '正在项目申报',
  3: '已完成项目申报',
  4: '已签订任务书并推进中',
  5: '已完成中期评审',
  6: '已完成验收',
  7: '未通过评审'
});

const updateId = ref('');
const queryParam = ref({
  pageNum: 1,
  pageSize: 10
});
const projectId = ref('');
const size = ref('');
const border = ref(true);
const visible = ref(true);
const form = ref({});
const projectList = ref<Project[]>([]);
const pageSize = ref(5);
const end = computed(() => pageSize.value - 1);

// 监控属性变化
watch(
  () => props.projectListLook,
  (newVal) => {
    projectList.value = [...newVal];
  },
  { deep: true }
);

watch(
  () => props.myProjectLook,
  (newVal) => {
    projectList.value = [...newVal];
  },
  { deep: true }
);

watch(
  () => queryParam.value,
  (newVal, oldVal) => {
    const pageSizeChanged = newVal.pageSize !== oldVal.pageSize;
    const pageNumChanged = newVal.pageNum !== oldVal.pageNum;
  },
  { deep: true }
);

function projectLevelss(row: Project, column: any, cellValue: number) {
  return projectLevel.value[cellValue] || cellValue;
}

function hasLeadingRoles(row: Project, column: any, cellValue: number) {
  return hasLeadingRole.value[cellValue] || cellValue;
}

function projectProgressStatuss(row: Project, column: any, cellValue: number) {
  return projectProgressStatus.value[cellValue] || cellValue;
}

function handleUpdate(row: Project) {
  updateId.value = null; // 暂时清空 updateId
  setTimeout(() => {
    updateId.value = row.projectId;
    isUpdateDialogVisible.value = true;
  }, 0);
}

function handleDelete(row: Project) {
  const projectId = row.projectId;
  const assignedSubjectSection = row.assignedSubjectSection;
  proxy?.$modal
    .confirm(`负责课题：${assignedSubjectSection}，确认删除该数据项？`)
    .then(() => {
      return deleteProject(projectId);
    })
    .then(() => {
      emit('reloadProjectList');
      proxy?.$modal.msgSuccess('删除成功');
    })
    .catch(() => {
      console.error('删除失败');
    });
}
</script>
