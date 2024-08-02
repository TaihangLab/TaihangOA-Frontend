<template>
  <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
    <div v-show="showSearch" class="mb-[10px]">
      <el-card shadow="hover">
        <checkProject />
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
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>
      <ProjectAddDialog :visible="isAddDialogVisible" @update:visible="isAddDialogVisible = $event" update-id="" />
      <ProjectDetailDialog :visible="isDetailDialogVisible" @update:visible="isDetailDialogVisible = $event" />
      <MilestoneAddDialog :visible="isAddMilestoneDialogVisible" @update:visible="isAddMilestoneDialogVisible = $event" project-id="2" />
      <MilestoneDetailDialog
        :visible="isMilestoneDetailDialogVisible"
        @update:visible="isMilestoneDetailDialogVisible = $event"
        update-id="milestoneDetail"
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
        <el-tooltip v-if="scope.row.roleId !== 1" content="查看大事记" placement="top">
          <el-button link type="primary" icon="Notebook" @click="showMilestoneDetailDialog()"></el-button>
        </el-tooltip>
        <el-tooltip v-if="scope.row.roleId !== 1" content="新增大事记" placement="top">
          <el-button link type="primary" icon="DocumentAdd" @click="showMilestoneAddDialog()"></el-button>
        </el-tooltip>
        <el-tooltip v-if="scope.row.roleId !== 1" content="详情" placement="top">
          <el-button link type="primary" icon="Reading" @click="showDetailDialog()"></el-button>
        </el-tooltip>
        <el-tooltip v-if="scope.row.roleId !== 1" content="修改" placement="top">
          <el-button link type="primary" icon="Edit" @click="handleDelete(scope.row)"></el-button>
        </el-tooltip>
        <el-tooltip v-if="scope.row.roleId !== 1" content="删除" placement="top">
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

const getList = () => {
  console.log('获取项目列表');
};

const showMilestoneAddDialog = () => {
  isAddMilestoneDialogVisible.value = true;
  console.log('显示里程碑弹窗', isAddMilestoneDialogVisible.value);
};

const showMilestoneDetailDialog = () => {
  isMilestoneDetailDialogVisible.value = true;
};
</script>

<style scoped lang="scss"></style>
