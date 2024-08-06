<template>
  <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
    <div v-show="showSearch" class="mb-[10px]">
      <el-card shadow="hover">
        <el-form ref="queryFormRef" :inline="true" :model="queryParams">
          <el-form-item label="项目名称">
            <el-input v-model="queryParams.assignedSubjectName" clearable placeholder="请输入项目名称" @keyup.enter="handleQuery"></el-input>
          </el-form-item>
          <el-form-item label="负责课题">
            <el-input v-model="queryParams.assignedSubjectSection" clearable placeholder="请输入负责课题名称" @keyup.enter="handleQuery"></el-input>
          </el-form-item>
          <el-form-item label="项目成员">
            <el-cascader
              v-model:value="responsiblePerson"
              :options="cascaderOptions"
              clearable
              :show-all-levels="false"
              placeholder="请选择项目成员"
              @keyup.enter="handleQuery"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="合作单位">
            <el-cascader
              v-model:value="CoCompany"
              :options="cocompanyOptions"
              clearable
              placeholder="请选择有无合作单位"
              @keyup.enter="handleQuery"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="立项时间">
            <el-date-picker
              v-model="projectEstablishTime"
              type="daterange"
              unlink-panels
              clearable
              start-placeholder="请输入查询范围"
              end-placeholder="如：2000-01-01"
              value-format="YYYY-MM-DD"
              range-separator="至"
              :picker-options="pickerOptions"
              @keyup.enter="handleQuery"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="项目计划验收时间" label-width="125px">
            <el-date-picker
              v-model="projectScheduledCompletionTime"
              type="daterange"
              unlink-panels
              clearable
              start-placeholder="请输入查询范围"
              end-placeholder="如：2000-01-01"
              value-format="YYYY-MM-DD"
              range-separator="至"
              :picker-options="pickerOptions"
              @keyup.enter="handleQuery"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="项目级别">
            <el-cascader
              v-model:value="projectLevel"
              :options="levelOptions"
              clearable
              placeholder="请选择项目级别"
              @keyup.enter="handleQuery"
            ></el-cascader>
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
            <el-button type="warning" disabled plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getProjectList"></right-toolbar>
        </el-row>
      </template>
      <ProjectAddDialog :visible="isAddDialogVisible" update-id="" @update:visible="isAddDialogVisible = $event" />
      <ProjectDetailDialog :visible="isDetailDialogVisible" @update:visible="isDetailDialogVisible = $event" />
      <MilestoneAddDialog :visible="isAddMilestoneDialogVisible" project-id="2" @update:visible="isAddMilestoneDialogVisible = $event" />
      <MilestoneDetailDialog
        v-if="isMilestoneDetailDialogVisible"
        :visible="isMilestoneDetailDialogVisible"
        project-id="2"
        update-id="2"
        @update:visible="isMilestoneDetailDialogVisible = $event"
      />
    </el-card>
  </div>
  <el-table ref="roleTableRef" v-loading="loading" :data="projectList" border @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column label="项目名称" fixed="left" prop="roleName" :show-overflow-tooltip="true" width="150" />
    <el-table-column label="项目牵头单位" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="项目来源" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="项目负责人" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="项目级别" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="是否牵头单位" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="负责课题" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="公司负责人" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="部门负责人" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="科研项目管理人" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="立项时间" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="项目计划验收时间" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="项目推进情况" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="合作单位" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="经费总额" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="专项经费总额" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="专项到款总额" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="已完成自筹投资" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="已完成专项投资" prop="roleKey" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="自筹经费公司配套" prop="roleSort" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="专项经费公司留存（计划）" prop="roleSort" :show-overflow-tooltip="true" width="200" />
    <el-table-column label="更新时间" align="center" prop="createTime">
      <template #default="scope">
        <span>{{ parseTime(scope.row.createTime) }}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="180">
      <template #default="scope">
        <el-tooltip content="查看大事记" placement="top">
          <el-button link type="primary" icon="Notebook" @click="showMilestoneDetailDialog()"></el-button>
        </el-tooltip>
        <el-tooltip content="新增大事记" placement="top">
          <el-button link type="primary" icon="DocumentAdd" @click="showMilestoneAddDialog()"></el-button>
        </el-tooltip>
        <el-tooltip content="详情" placement="top">
          <el-button link type="primary" icon="Reading" @click="showDetailDialog()"></el-button>
        </el-tooltip>
        <el-tooltip content="修改" placement="top">
          <el-button link type="primary" icon="Edit" @click="handleDelete(scope.row)"></el-button>
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
          <el-button link type="primary" icon="Delete" @click="handleDataScope(scope.row)"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { parseTime } from '@/utils/ruoyi';
import { ref } from 'vue';
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
import request from '@/utils/request';
import ProjectDetailDialog from '@/views/project/components/ProjectDetail/ProjectDetails.vue';
import ProjectAddDialog from '../components/ProjectDetail/ProjectAdd.vue';
import MilestoneAddDialog from '@/views/project/components/Milestone/MilestoneAdd.vue';
import MilestoneDetailDialog from '@/views/project/components/Milestone/MilestoneDetail.vue';

interface Project {
  roleId: any;
  roleName: string;
  roleKey: string;
  createTime: string;
}

// 定义 props
const props = defineProps<{
  projectListLook: Array<any>;
  myProjectLook: Array<any>;
  buttonType?: number;
  total: number;
}>();

interface Option {
  value: number;
  label: string;
  children?: Option[];
}

const queryParams = reactive({
  pageNum: 2,
  pageSize: 5,
  assignedSubjectName: undefined, // 项目名称
  projectLevel: undefined, // 项目级别
  assignedSubjectSection: undefined, // 负责课题
  hasCooperativeUnit: undefined, // 合作单位
  userId: undefined, // 项目成员
  projectEstablishTimeSta: undefined, // 立项时间开始时间
  projectEstablishTimeEnd: undefined, // 立项时间结束时间
  projectScheduledCompletionTimeSta: undefined, // 项目计划验收时间开始时间
  projectScheduledCompletionTimeEnd: undefined // 项目计划验收时间结束时间
});

const queryParam = reactive({
  pageNum: 1,
  pageSize: 10
});

const projectId = ref('');

const levelOptions = ref<Option[]>([
  { value: 0, label: '国家级' },
  { value: 1, label: '省级' },
  { value: 2, label: '企业级' }
]);

const cocompanyOptions = ref<Option[]>([
  { value: 0, label: '无' },
  { value: 1, label: '有' }
]);

const cascaderOptions = ref<Option[]>([]);

const pickerOptions = ref({
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker: any) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近一个月',
      onClick(picker: any) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近三个月',
      onClick(picker: any) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近半年',
      onClick(picker: any) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近一年',
      onClick(picker: any) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
        picker.$emit('pick', [start, end]);
      }
    }
  ]
});

const showResponsiblePersonData = ref(false);
const CoCompany = ref<number[]>([]);
const projectLevel = ref<number[]>([]);
const responsiblePerson = ref<number[]>([]);
const projectEstablishTime = ref<(Date | undefined)[]>([]);
const projectScheduledCompletionTime = ref<(Date | undefined)[]>([]);

// const projectListLook = ref<any[]>([]);
// const myProjectLook = ref<any[]>([]);
// const total = ref(0);

const showSearch = ref(true);
const loading = ref(false);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// const loading = ref(true);
const isDetailDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const isAddMilestoneDialogVisible = ref(false);
const isMilestoneDetailDialogVisible = ref(false);

const projectList = ref<Project[]>([
  {
    roleId: 2,
    roleName: '项目A',
    roleKey: '单位A',
    createTime: '2024-07-01'
  },
  {
    roleId: 3,
    roleName: '项目B',
    roleKey: '单位B',
    createTime: '2024-07-02'
  }
]);

const showDetailDialog = () => {
  isDetailDialogVisible.value = true;
};

const showAddDialog = () => {
  isAddDialogVisible.value = true;
};

const handleDelete = (row: Project) => {
  console.log('删除项目:', row);
};

const handleDataScope = (row: Project) => {
  console.log('数据范围:', row);
};

const handleSelectionChange = (selection: Project[]) => {
  console.log('选中的项目:', selection);
};

const handleExport = () => {
  console.log('导出数据');
};

function handleQueryRequest(queryParams: { [key: string]: any }) {
  // 执行后端查询等操作
  if (queryParams && Object.keys(queryParams).length > 0) {
    Object.assign(queryParams, queryParams); // 更新查询参数
  }
  queryParam.pageNum = 1;
  getProjectList();
}

function getProjectList() {
  request({
    url: '/project/my/getMyList',
    method: 'post',
    data: queryParams,
    params: queryParam
  })
    .then((resp) => {
      projectListLook.value = resp.rows;
      total.value = resp.total;
    })
    .catch((error) => {
      ElMessage.error('获取数据时出错：' + error.message);
      console.error('获取数据时出错：', error);
    });
}

const showMilestoneAddDialog = () => {
  isAddMilestoneDialogVisible.value = true;
  console.log('显示里程碑弹窗', isAddMilestoneDialogVisible.value);
};

const showMilestoneDetailDialog = () => {
  isMilestoneDetailDialogVisible.value = true;
};

// 处理按钮点击事件
function handleQuery() {
  queryParams.userId = responsiblePerson.value[responsiblePerson.value.length - 1];
  queryParams.projectEstablishTimeSta = projectEstablishTime.value[0];
  queryParams.projectEstablishTimeEnd = projectEstablishTime.value[1];

  if (projectScheduledCompletionTime.value) {
    queryParams.projectScheduledCompletionTimeSta = projectScheduledCompletionTime.value[0];
    queryParams.projectScheduledCompletionTimeEnd = projectScheduledCompletionTime.value[1];
  } else {
    queryParams.projectScheduledCompletionTimeSta = undefined;
    queryParams.projectScheduledCompletionTimeEnd = undefined;
  }

  queryParams.hasCooperativeUnit = CoCompany.value[0];
  queryParams.projectLevel = projectLevel.value[0];
  handleQueryRequest(queryParams);
}

function resetQuery() {
  // queryParams.pageNum = 1;
  // queryParams.pageSize = 5;
  // queryParams.assignedSubjectName = undefined;
  // queryParams.projectLevel = undefined;
  // queryParams.assignedSubjectSection = undefined;
  // queryParams.hasCooperativeUnit = undefined;
  // queryParams.userId = undefined;
  // queryParams.projectEstablishTimeSta = undefined;
  // queryParams.projectEstablishTimeEnd = undefined;
  // queryParams.projectScheduledCompletionTimeSta = undefined;
  // queryParams.projectScheduledCompletionTimeEnd = undefined;
  //
  // emit('query-request', queryParams);
  //
  // responsiblePerson.value = [];
  // CoCompany.value = [];
  // projectLevel.value = [];
  // projectEstablishTime.value = [];
  // projectScheduledCompletionTime.value = [];
}

onMounted(() => {
  getProjectList();
});
</script>

<style scoped lang="scss"></style>
