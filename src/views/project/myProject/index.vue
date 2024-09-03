<template>
  <div>
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
                v-model="responsiblePerson"
                :options="cascaderOptions"
                clearable
                :show-all-levels="false"
                placeholder="请选择项目成员"
                @keyup.enter="handleQuery"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="合作单位">
              <el-cascader
                v-model="CoCompany"
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
                v-model="projectLevel"
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
            <right-toolbar v-model:showSearch="showSearch" @query-table="resetQuery"></right-toolbar>
          </el-row>
        </template>
        <Project
          :button-type="1"
          :my-project-look="myProjectLook"
          :project-list-look="projectListLook"
          :total="total"
          :query-param="queryParam"
          @reload-project-list="getProjectList"
        />
        <pagination
          v-if="total > 0"
          v-model:total="total"
          v-model:page="queryParam.pageNum"
          v-model:limit="queryParam.pageSize"
          @pagination="getProjectList"
        />
        <ProjectAddDialog
          :visible="isAddDialogVisible"
          update-id=""
          @update:visible="isAddDialogVisible = $event"
          @reload-project-list="getProjectList"
        />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
import ProjectAddDialog from '../components/ProjectDetail/ProjectAdd.vue';
import Project from '@/views/project/components/ProjectDetail/Project.vue';
import { queryProjectList } from '@/api/project/myProject';
import { listUser, deptTreeSelect } from '@/api/system/user';

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
const CoCompany = ref<number[]>([]);
const projectLevel = ref<number[]>([]);
const responsiblePerson = ref<number[]>([]);
const projectEstablishTime = ref<(Date | undefined)[]>([]);
const projectScheduledCompletionTime = ref<(Date | undefined)[]>([]);
const projectListLook = ref<any[]>([]);
const myProjectLook = ref<any[]>([]);
const deptOptions = ref<any[]>([]);
const userList = ref<any[]>([]);
const total = ref(0);
const showSearch = ref(true);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const isAddDialogVisible = ref(false);

const showAddDialog = () => {
  isAddDialogVisible.value = true;
};

function handleQueryRequest(queryParams: { [key: string]: any }) {
  // 执行后端查询等操作
  if (queryParams && Object.keys(queryParams).length > 0) {
    Object.assign(queryParams, queryParams); // 更新查询参数
  }
  queryParam.pageNum = 1;
  getProjectList();
}

async function getProjectList() {
  await queryProjectList(queryParams, queryParam)
    .then((resp) => {
      projectListLook.value = resp.rows;
      total.value = resp.total;
    })
    .catch((error) => {
      ElMessage.error('获取数据时出错：' + error.message);
      console.error('获取数据时出错：', error);
    });
}

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
  queryParams.pageNum = 1;
  queryParams.pageSize = 5;
  queryParams.assignedSubjectName = undefined;
  queryParams.projectLevel = undefined;
  queryParams.assignedSubjectSection = undefined;
  queryParams.hasCooperativeUnit = undefined;
  queryParams.userId = undefined;
  queryParams.projectEstablishTimeSta = undefined;
  queryParams.projectEstablishTimeEnd = undefined;
  queryParams.projectScheduledCompletionTimeSta = undefined;
  queryParams.projectScheduledCompletionTimeEnd = undefined;
  responsiblePerson.value = [];
  CoCompany.value = [];
  projectLevel.value = [];
  projectEstablishTime.value = [];
  projectScheduledCompletionTime.value = [];
  handleQueryRequest(queryParams);
}

// 获取部门和用户列表的方法
async function getDeptAndUserList() {
  await getDeptTree(); // 等待部门数据加载完成
  await getList(); // 等待用户数据加载完成
  cascaderOptions.value = adaptData(deptOptions.value);
}

// 查询部门下拉树结构
async function getDeptTree() {
  const response = await deptTreeSelect();
  deptOptions.value = response.data;
}

// 分页查询接口
interface PageQuery {
  pageNum: number;
  pageSize: number;
}

// 用户查询参数接口
export interface UserQuery extends PageQuery {
  userName?: string;
  phonenumber?: string;
  status?: string;
  deptId?: string | number;
  roleId?: string | number;
}

const userQuery: UserQuery = {
  pageNum: 1, // 页码
  pageSize: 100, // 页面大小，调整以获取更多用户
  userName: '', // 无用户名过滤
  phonenumber: '', // 无电话号码过滤
  status: '', // 无状态过滤
  deptId: '', // 无部门过滤
  roleId: '' // 无角色过滤
};

// 查询用户列表
async function getList() {
  const response = await listUser(userQuery);
  userList.value = response.rows;
  total.value = response.total;
}

// 适配部门和用户数据的方法
function adaptData(data: any[]): any[] {
  return data.map((item) => {
    const newItem = {
      value: item.id,
      label: item.label,
      children: []
    };
    if (item.children && item.children.length > 0) {
      newItem.children = adaptData(item.children);
    } else {
      const usersInDept = userList.value.filter((user) => user.deptId === item.id);
      newItem.children = adaptUserData(usersInDept);
    }
    return newItem;
  });
}

function adaptUserData(data: any[]): any[] {
  return data.map((item) => {
    return {
      value: item.userId,
      label: item.nickName
    };
  });
}

onMounted(() => {
  getProjectList();
  getDeptAndUserList();
});
</script>

<style scoped lang="scss"></style>
