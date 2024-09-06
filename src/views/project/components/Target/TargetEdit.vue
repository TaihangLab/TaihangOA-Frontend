<template>
  <el-dialog :model-value="visible" title="编辑指标推进" width="1000px" @update:model-value="updateVisible" @close="closeTargetEditDialog" >
    <div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button v-hasPermi="['project:expense:receivedAdd']" type="primary" plain icon="plus" @click="handleAdd"> 新增推进情况 </el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 10px"></div>
      <el-collapse v-model="activeNames" accordion @change="handleCollapseChange">
        <el-collapse-item
          v-for="(item) in targetList"
          :key="item.targetId"
          :title="item.targetName"
          :name="item.targetId"
        >
          <div class="content">
            <p><strong>中期目标:</strong> {{ item.midtermTarget }}</p>
            <p><strong>最终目标:</strong> {{ item.endTarget }}</p>
          </div>
          <el-table v-loading="loading" :data="progressData[item.targetId] || []" border style="width: 100%">
            <el-table-column label="指标完成情况" :resizable="false" align="center" prop="completionStatus"> </el-table-column>
            <el-table-column label="进度详细描述" :resizable="false" align="center" prop="detailedDescription"> </el-table-column>
            <el-table-column label="进度完成时间" :resizable="false" align="center" prop="completionTime"> </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, watch } from 'vue';
import { getAllProjectTargetList, getProjectTargetDetail } from '@/api/project/target';
import {
  ProjectTargetBO,
  ProjectTargetProgressBO,
  ProjectTargetProgressVO,
  ProjectTargetVO
} from '@/api/project/target/types';

const targetList = ref<ProjectTargetVO[]>([]);
const progressData = ref<Record<number, ProjectTargetProgressVO[]>>({});
const loading = ref(true);
const props = defineProps<{
  projectId: string | number | undefined;
  visible: boolean;
}>();

const initForm: ProjectTargetBO = {
  projectId: props.projectId,
};

const initProgressForm: ProjectTargetProgressBO = {
  targetId: undefined
};

const data = reactive({
  form: { ...initForm },
  progressFrom: { ...initProgressForm },
  queryParams: {
    pageNum: 1,
    pageSize: 100
  }
});

const { form, progressFrom, queryParams } = toRefs(data);
const emits = defineEmits(['update:visible', 'close:visible']);

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const closeTargetEditDialog = () => {
  emits('close:visible', false);
};

const getProjectTargetList = async () => {
  await getAllProjectTargetList(data.form, data.queryParams).then(res => {
    targetList.value = res.rows;
  })
}

const getProjectTargetProgress = async (targetId: number) => {
  loading.value = true;
  progressFrom.value.targetId = targetId;
  await getProjectTargetDetail(data.progressFrom, data.queryParams).then(res => {
    console.log('progressFrom.value', progressFrom.value);
    progressData[targetId] = res.data; // 将每个指标的推进情况存储在 progressData 中
  }).finally(() => {
    loading.value = false;
  });
}

// 处理折叠面板展开事件
const handleCollapseChange = ((activeName: number | string | (number | string)[]) => {
  // 通过 activeNames 获取当前激活的 targetId
  const targetId = Array.isArray(activeName) ? activeName[0] : activeName;
  console.log('handleCollapseChange', targetId);
  if (targetId && !progressData[targetId]) {
    getProjectTargetProgress(Number(targetId));
  }
})

const handleAdd = () => {
  console.log('handleAdd');
}

watch(
  () => props.projectId,
  (newEditProjectId) => {
    if (newEditProjectId !== undefined) {
      form.value.projectId = newEditProjectId;
      getProjectTargetList();
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">

</style>
