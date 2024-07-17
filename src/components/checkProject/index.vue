<template>
  <el-form ref="queryFormRef" :inline="true" :model="myProjectFrom">
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
        v-model:value="projectEstablishTime"
        type="daterange"
        unlink-panels
        clearable
        start-placeholder="请输入查询范围"
        end-placeholder="如：2000-01-01"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
        @change="getList"
        @keyup.enter="handleQuery"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="项目计划验收时间" label-width="125px">
      <el-date-picker
        v-model:value="projectScheduledCompletionTime"
        type="daterange"
        unlink-panels
        clearable
        start-placeholder="请输入查询范围"
        end-placeholder="如：2000-01-01"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
        @change="getList"
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
</template>

<script setup lang="ts">
// 数据
import { deptTreeSelect } from '@/api/system/role';
import { listUser } from '@/api/system/user';

// 定义 emit
const emit = defineEmits(['query-request']);
const showResponsiblePersonData = ref(false);
const CoCompany = ref([]);
const projectLevel = ref([]);
const responsiblePerson = ref([]);
const projectEstablishTime = ref<[DateModelType, DateModelType]>(['', '']);
const projectScheduledCompletionTime = ref<[DateModelType, DateModelType]>(['', '']);
const myProjectFrom = reactive({});
const myProjectLook = reactive({});
const projectListLook = reactive({});
const queryFormRef = ref<ElFormInstance>();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const queryParams = reactive({
  pageNum: 1,
  pageSize: 5,
  assignedSubjectName: undefined,
  projectLevel: undefined,
  assignedSubjectSection: undefined,
  hasCooperativeUnit: undefined,
  userId: undefined,
  projectEstablishTimeSta: undefined,
  projectEstablishTimeEnd: undefined,
  projectScheduledCompletionTimeSta: undefined,
  projectScheduledCompletionTimeEnd: undefined
});

const levelOptions = ref([
  { value: 0, label: '国家级' },
  { value: 1, label: '省级' },
  { value: 2, label: '企业级' }
]);

const cocompanyOptions = ref([
  { value: 0, label: '无' },
  { value: 1, label: '有' }
]);

const cascaderOptions = ref([]);

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

// 方法
const handleQuery = () => {
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
  // 触发查询事件
  emit('query-request', queryParams);
};

const resetQuery = () => {
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
  // 触发重置事件
  emit('query-request', queryParams);
  resetForm(queryParams);
  responsiblePerson.value = [];
  CoCompany.value = [];
  projectLevel.value = [];
  projectEstablishTime.value = [];
  projectScheduledCompletionTime.value = [];
};

const getDeptAndUserList = async () => {
  await getDeptTree(); // 等待部门数据加载完成
  await getList(); // 等待用户数据加载完成
  cascaderOptions.value = adaptData(deptOptions.value);
};

const getDeptTree = async () => {
  const response = await deptTreeSelect();
  deptOptions.value = response.data;
};

const getList = async () => {
  const response = await listUser();
  userList.value = response.rows;
  total.value = response.total;
};

const adaptData = (data: any) => {
  return data.map((item: any) => {
    const newItem = {
      value: item.id,
      label: item.label,
      children: []
    };
    if (item.children && item.children.length > 0) {
      newItem.children = adaptData(item.children);
    } else {
      const usersInDept = userList.value.filter((user: any) => user.deptId === item.id);
      newItem.children = adaptUserData(usersInDept);
    }
    return newItem;
  });
};

const adaptUserData = (data: any) => {
  return data.map((item: any) => {
    return {
      value: item.userId,
      label: item.nickName
    };
  });
};

// 在组件挂载时获取数据
onMounted(() => {
  getDeptAndUserList();
});
</script>

<style scoped lang="scss"></style>
