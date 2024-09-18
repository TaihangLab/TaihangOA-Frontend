<template>
  <el-drawer
    :model-value="visible"
    :title="`${props.projectName || ''}推进情况`"
    @update:model-value="updateVisible"
    @close="closeTargetDetail"
    v-loading="loading"
  >
    <el-collapse v-model="activeNames" accordion @change="handleCollapseChange" style="margin-top: -15px">
      <el-collapse-item v-for="item in targetList" :key="item.targetId" :name="item.targetId">
        <template #title>
          <span style="font-weight: bold; font-size: 16px">{{ item.targetName }}</span>
        </template>
        <el-card style="margin-bottom: 6px">
          <div class="content">
            <p><strong>中期目标: </strong> {{ item.midtermTarget }}</p>
            <p><strong>最终目标: </strong> {{ item.endTarget }}</p>
          </div>
        </el-card>
        <el-card v-if="progressData[item.targetId] && progressData[item.targetId].length > 0" style="margin-bottom: 6px" shadow="hover">
          <el-timeline style="margin-left: -30px">
            <el-timeline-item
              v-for="progress in progressData[item.targetId]"
              :key="progress.progressId"
              :timestamp="progress.completionTime"
              color="#5081D9FF"
              placement="top"
            >
              <el-card>
                <h4>
                  <span style="font-weight: bold">{{ progress.completionStatus }}</span>
                </h4>
                <p>
                  <span>{{ progress.detailedDescription }}</span>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </el-drawer>
</template>

<script setup lang="ts" Name="TargetDetail">
import { defineEmits, defineProps, ref, watch } from 'vue';
import { ProjectTargetBO, ProjectTargetProgressBO, ProjectTargetProgressVO, ProjectTargetVO } from '@/api/project/target/types';
import { getAllProjectTargetList, getProjectTargetDetail } from '@/api/project/target';

const emits = defineEmits(['update:visible', 'close:visible']);
const targetList = ref<ProjectTargetVO[]>([]);
const activeNames = ref<number | string>('');
const progressData = ref<Record<number, ProjectTargetProgressVO[]>>({});
const loading = ref(true);
const props = defineProps<{
  projectId: number | undefined;
  visible: boolean;
  projectName: string;
}>();

const initForm: ProjectTargetBO = {
  projectId: props.projectId
};

const initProgressForm: ProjectTargetProgressBO = {
  progressId: undefined,
  targetId: undefined,
  completionStatus: '',
  completionTime: '',
  detailedDescription: ''
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
// 更新 visible 的方法
const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

// 关闭 drawer 的方法
const closeTargetDetail = () => {
  emits('update:visible', false);
};

const getProjectTargetList = async () => {
  await getAllProjectTargetList(data.form, data.queryParams).then((res) => {
    targetList.value = res.rows;
  });
};

// 处理折叠面板展开事件
const handleCollapseChange = (activeName: number | string | (number | string)[]) => {
  const targetId = Array.isArray(activeName) ? activeName[0] : activeName;
  if (targetId && !progressData[targetId]) {
    getProjectTargetProgress(Number(targetId));
  }
};

const getProjectTargetProgress = async (targetId: number) => {
  loading.value = true;
  progressFrom.value.targetId = targetId;
  await getProjectTargetDetail(data.progressFrom, data.queryParams)
    .then((res) => {
      progressData.value[targetId] = res.rows; // 将每个指标的推进情况存储在 progressData 中
      console.log(progressData.value);
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(
  () => props.projectId,
  (newDetailProjectId) => {
    if (newDetailProjectId !== undefined) {
      form.value.projectId = newDetailProjectId;
      getProjectTargetList();
    }
  },
  { immediate: true }
);

watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      activeNames.value = ''; // 抽屉打开时将 activeNames 重置为空，所有面板折叠
    }
  }
);
</script>

<style scoped lang="scss"></style>
