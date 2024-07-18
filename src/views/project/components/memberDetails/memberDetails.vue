<template>
  <el-dialog :model-value="visible" @update:model-value="updateVisible" title="详情" width="50%">
    <div style="margin-top: 10px;"></div>
    <el-collapse :model-value="activeNames">
      <el-collapse-item name="1" title="当前参与的国家级项目详情">
        <el-table :data="projectListLook.nationProjectBaseInfos" border style="width: 100%" :row-style="{ height: '50px' }"
                  :cell-style="{ padding: '0px' }">
          <el-table-column label="项目任务书编号" :resizable="false" align="center" prop="projectAssignmentSerialNo">
          </el-table-column>
          <el-table-column label="项目名称" :resizable="false" align="center" prop="assignedSubjectName">
          </el-table-column>
          <el-table-column label="负责课题" :resizable="false" align="center" prop="assignedSubjectSection">
          </el-table-column>
          <el-table-column label="项目牵头单位" :resizable="false" align="center" prop="leadingUnit">
          </el-table-column>
          <el-table-column label="立项时间" :resizable="false" align="center" prop="projectEstablishTime">
          </el-table-column>
          <el-table-column label="项目计划验收时间" :resizable="false" align="center" prop="projectScheduledCompletionTime">
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="2" title="当前参与的省部级项目详情">
        <el-table :data="projectListLook.provincialProjectBaseInfos" border style="width: 100%" :row-style="{ height: '50px' }"
                  :cell-style="{ padding: '0px' }">
          <el-table-column label="项目任务书编号" :resizable="false" align="center" prop="projectAssignmentSerialNo">
          </el-table-column>
          <el-table-column label="项目名称" :resizable="false" align="center" prop="assignedSubjectName">
          </el-table-column>
          <el-table-column label="负责课题" :resizable="false" align="center" prop="assignedSubjectSection">
          </el-table-column>
          <el-table-column label="项目牵头单位" :resizable="false" align="center" prop="leadingUnit">
          </el-table-column>
          <el-table-column label="立项时间" :resizable="false" align="center" prop="projectEstablishTime">
          </el-table-column>
          <el-table-column label="项目计划验收时间" :resizable="false" align="center" prop="projectScheduledCompletionTime">
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="3" title="当前参与的自研项目详情">
        <el-table :data="projectListLook.enterpriseProjectBaseInfos" border style="width: 100%" :row-style="{ height: '50px' }"
                  :cell-style="{ padding: '0px' }">
          <el-table-column label="项目任务书编号" :resizable="false" align="center" prop="projectAssignmentSerialNo">
          </el-table-column>
          <el-table-column label="项目名称" :resizable="false" align="center" prop="assignedSubjectName">
          </el-table-column>
          <el-table-column label="负责课题" :resizable="false" align="center" prop="assignedSubjectSection">
          </el-table-column>
          <el-table-column label="项目牵头单位" :resizable="false" align="center" prop="leadingUnit">
          </el-table-column>
          <el-table-column label="立项时间" :resizable="false" align="center" prop="projectEstablishTime">
          </el-table-column>
          <el-table-column label="项目计划验收时间" :resizable="false" align="center" prop="projectScheduledCompletionTime">
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import { defineComponent, Prop, ref, watch } from 'vue';
import { getDetails } from "@/api/project/members";


const props = defineProps<{
  memberId: string | undefined,
  visible: boolean
}>();

const contentStyle = ref({
  'text-align': 'center',
  width: '60%',
});

const activeNames = ref<string[]>(['1', '2', '3']);


const labelStyle = ref({
  color: '#000',
  width: '30%',
});

const params = ref({
  userId: undefined as string | undefined,
});

const projectListLook = ref([]);

const checkProject = () => {
  params.value.userId = props.memberId;
  getDetails(params.value)
    .then((resp) => {
      projectListLook.value = resp.data
    })
    .catch((error) => {
      console.error('Error fetching project details:', error);
    });
};

watch(() => props.memberId, (newVal) => {
  params.value.userId = newVal;
  checkProject();
}, { immediate: true });

onMounted(() => {
  checkProject();
});


const emits = defineEmits(['update:visible']);

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
  if (!value) {
    // 关闭对话框时重置状态
    activeNames.value = ['1', '2', '3'];
  }
};

const closeDialog = () => {
  emits('update:visible', false);
};

const confirmDialog = () => {
  // 处理确定逻辑
  emits('update:visible', false);
};
// 使用 watch 监听 updateVisible 变化并打印到控制台
watch(
  () => props.visible,
  (newValue, oldValue) => {
    console.log('Visible changed:', newValue);
  }
);
</script>

<style scoped>
/* 你的样式 */
</style>
