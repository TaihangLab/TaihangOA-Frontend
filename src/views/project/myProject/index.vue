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
                :options="userOptions"
                :props="{ value: 'id', label: 'label', children: 'children' }"
                clearable
                :show-all-levels="false"
                placeholder="请选择项目成员"
                @keyup.enter="handleQuery"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="合作单位">
              <el-select v-model="CoCompany" placeholder="请选择项目级别" clearable>
                <el-option v-for="dict in pro_cocompany_type" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
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
              <el-select v-model="projectLevel" placeholder="请选择项目级别" clearable>
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
import { userTreeSelect } from '@/api/system/user';

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

const userOptions = ref<any[]>([]);
const CoCompany = ref<number>(undefined);
const projectLevel = ref<number>(undefined);
const responsiblePerson = ref<number[]>([]);
const projectEstablishTime = ref<(Date | undefined)[]>([]);
const projectScheduledCompletionTime = ref<(Date | undefined)[]>([]);
const projectListLook = ref<any[]>([]);
const myProjectLook = ref<any[]>([]);
const total = ref(0);
const showSearch = ref(true);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { pro_level_type, pro_cocompany_type } = toRefs<any>(proxy?.useDict('pro_level_type', 'pro_cocompany_type'));
const isAddDialogVisible = ref(false);

/** 查询用户下拉树结构 */
const getUserTreeSelect = async () => {
  const resp = await userTreeSelect();
  userOptions.value = resp.data;
};

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

  queryParams.hasCooperativeUnit = CoCompany.value;
  queryParams.projectLevel = projectLevel.value;
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
  CoCompany.value = undefined;
  projectLevel.value = undefined;
  projectEstablishTime.value = [];
  projectScheduledCompletionTime.value = [];
  handleQueryRequest(queryParams);
}

onMounted(() => {
  getProjectList();
  getUserTreeSelect();
});
</script>

<style scoped lang="scss"></style>
