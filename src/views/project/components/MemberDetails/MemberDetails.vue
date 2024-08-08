<template>
  <el-dialog :model-value="visible" title="详情" width="50%" @update:model-value="updateVisible" @close="closeDialog">
    <div style="margin-top: 10px"></div>
    <el-collapse :model-value="activeNames">
      <el-collapse-item name="1" title="当前参与的国家级项目详情">
        <el-table
          :data="projectList.nationProjectBaseInfos"
          border
          style="width: 100%"
          :row-style="{ height: '50px' }"
          :cell-style="{ padding: '0px' }"
        >
          <el-table-column label="项目任务书编号" :resizable="false" align="center" prop="projectAssignmentSerialNo"> </el-table-column>
          <el-table-column label="项目名称" :resizable="false" align="center" prop="assignedSubjectName"> </el-table-column>
          <el-table-column label="负责课题" :resizable="false" align="center" prop="assignedSubjectSection"> </el-table-column>
          <el-table-column label="项目牵头单位" :resizable="false" align="center" prop="leadingUnit"> </el-table-column>
          <el-table-column label="立项时间" :resizable="false" align="center" prop="projectEstablishTime"> </el-table-column>
          <el-table-column label="项目计划验收时间" :resizable="false" align="center" prop="projectScheduledCompletionTime"> </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="2" title="当前参与的省部级项目详情">
        <el-table
          :data="projectList.provincialProjectBaseInfos"
          border
          style="width: 100%"
          :row-style="{ height: '50px' }"
          :cell-style="{ padding: '0px' }"
        >
          <el-table-column label="项目任务书编号" :resizable="false" align="center" prop="projectAssignmentSerialNo"> </el-table-column>
          <el-table-column label="项目名称" :resizable="false" align="center" prop="assignedSubjectName"> </el-table-column>
          <el-table-column label="负责课题" :resizable="false" align="center" prop="assignedSubjectSection"> </el-table-column>
          <el-table-column label="项目牵头单位" :resizable="false" align="center" prop="leadingUnit"> </el-table-column>
          <el-table-column label="立项时间" :resizable="false" align="center" prop="projectEstablishTime"> </el-table-column>
          <el-table-column label="项目计划验收时间" :resizable="false" align="center" prop="projectScheduledCompletionTime"> </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="3" title="当前参与的自研项目详情">
        <el-table
          :data="projectList.enterpriseProjectBaseInfos"
          border
          style="width: 100%"
          :row-style="{ height: '50px' }"
          :cell-style="{ padding: '0px' }"
        >
          <el-table-column label="项目任务书编号" :resizable="false" align="center" prop="projectAssignmentSerialNo"> </el-table-column>
          <el-table-column label="项目名称" :resizable="false" align="center" prop="assignedSubjectName"> </el-table-column>
          <el-table-column label="负责课题" :resizable="false" align="center" prop="assignedSubjectSection"> </el-table-column>
          <el-table-column label="项目牵头单位" :resizable="false" align="center" prop="leadingUnit"> </el-table-column>
          <el-table-column label="立项时间" :resizable="false" align="center" prop="projectEstablishTime"> </el-table-column>
          <el-table-column label="项目计划验收时间" :resizable="false" align="center" prop="projectScheduledCompletionTime"> </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { ref, watch } from 'vue';
import { getDetails } from '@/api/project/members';
import { ProjectUserDetailVo } from '@/api/project/members/types';

const props = defineProps<{
  memberId: string | number | undefined;
  visible: boolean;
}>();

const projectList = ref<ProjectUserDetailVo>({
  nationProjectBaseInfos: [],
  provincialProjectBaseInfos: [],
  enterpriseProjectBaseInfos: []
});

const activeNames = ref<string[]>(['1', '2', '3']);

const projectDetail = () => {
  if (props.memberId !== undefined) {
    getDetails(props.memberId).then((resp) => {
      projectList.value = resp.data;
    });
  }
};

watch(
  () => [props.memberId, props.visible],
  ([newMemberId, newVisible]) => {
    if (newMemberId !== undefined) {
      // console.log('memberId changed:', newMemberId);
      projectDetail();
    }
  },
  { immediate: true }
);

const emits = defineEmits(['update:visible']);

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
  if (!value) {
    activeNames.value = ['1', '2', '3'];
  }
};
const resetProjectList = () => {
  projectList.value = {
    nationProjectBaseInfos: [],
    provincialProjectBaseInfos: [],
    enterpriseProjectBaseInfos: []
  };
};

const closeDialog = () => {
  emits('update:visible', false);
  resetProjectList();
};
</script>

<style scoped>
/* 你的样式 */
</style>
