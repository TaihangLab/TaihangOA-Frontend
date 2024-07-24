<template>
  <el-dialog :model-value="visible" width="50%" @close="handleClose">
    <el-page-header :icon="ArrowLeft" class="page-header">
      <template #content>
        <span class="text-large font-600 mr-3"> 项目名称 </span>
      </template>
    </el-page-header>
    <el-timeline class="timeline">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        center
        type="primary"
        hollow
        placement="top"
        :timestamp="activity.timestamp"
      >
        <el-card>
          <h4 class="card-title">{{ activity.title }}</h4>
          <div class="tags">
            <el-tag v-for="item in activity.tags" :key="item.label" :type="item.type" effect="light">
              {{ item.label }}
            </el-tag>
          </div>
          <p>{{ activity.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, watch } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import type { TagProps } from 'element-plus';

const props = defineProps<{ visible: boolean; updateId: string }>();
const emits = defineEmits(['update:visible']);
const activities = [
  {
    title: 'Update Github template',
    content: 'Tom committed 2018/4/12 20:46',
    tags: [
      { type: 'primary', label: 'Tag 1' },
      { type: 'success', label: 'Tag 2' }
    ],
    timestamp: '2018/4/12'
  },
  {
    title: 'Update Github template',
    content: 'Tom committed 2018/4/3 20:46',
    tags: [
      { type: 'info', label: 'Tag 3' },
      { type: 'warning', label: 'Tag 4' }
    ],
    timestamp: '2018/4/3'
  }
];

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      // 执行打开对话框时的逻辑
    }
  }
);

const handleClose = () => {
  emits('update:visible', false);
};
</script>

<style scoped lang="scss">
.page-header {
  margin-bottom: 20px; /* 调整为你想要的距离 */
}

.timeline {
  max-width: 80%;
}

.card-title {
  font-weight: bold; /* 字体加粗 */
}

.tags {
  margin-bottom: 10px; /* 调整为你想要的距离 */
}

.el-tag {
  margin-right: 5px; /* 标签之间的间距 */
}
</style>
