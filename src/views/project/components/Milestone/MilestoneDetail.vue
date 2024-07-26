<template>
  <el-dialog :model-value="visible" width="50%" @close="handleClose">
    <template #title>
      <span style="font-weight: bold; font-size: large">项目名称</span>
    </template>
    <div class="search-bar">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键字">
          <el-input v-model="searchForm.keyword" placeholder="请输入关键字" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            style="width: 300px"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="searchForm.tag" placeholder="选择标签" style="width: 150px">
            <el-option v-for="tag in allTags" :key="tag" :label="tag" :value="tag"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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

const allTags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'];
const searchForm = ref({
  keyword: '',
  dateRange: [],
  tag: ''
});

const handleSearch = () => {
  // 执行搜索逻辑
};

const handleReset = () => {
  searchForm.value = {
    keyword: '',
    dateRange: [],
    tag: ''
  };
};

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
