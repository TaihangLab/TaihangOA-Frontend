<template>
  <el-dialog :model-value="visible" width="50%" @close="handleClose">
    <!--ref="form" 更改为了 ref="form1"，否则前端显示会出BUG-->
    <el-form ref="form1" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="标题" prop="milestoneTitle">
        <el-input v-model="form.milestoneTitle"></el-input>
      </el-form-item>
      <!-- 标签选择 -->
      <el-form-item label="标签" prop="tags">
        <div class="tag-container">
          <el-tag
            v-for="(tag, index) in form.projectMilestoneTypes"
            :key="index"
            closable
            @close="handleCloseTag(tag)"
            :type="getTagType(tag)"
            :style="{ color: getTextColor(tag) }"
            style="height: 30px; margin: 2px; /* 设置每个标签的外边距 */"
          >
            {{ tag }}
          </el-tag>
          <el-select v-model="selectedTag" placeholder="请选择标签" style="flex: 1; width: 140px" clearable @change="addTag">
            <el-option
              v-for="tag in projectMilestoneType"
              :key="tag.projectMilestoneTypeId"
              :label="tag.projectMilestoneTypeName"
              :value="tag.projectMilestoneTypeName"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="时间" prop="milestoneDate">
        <el-col :span="11">
          <el-date-picker
            v-model="form.milestoneDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="描述" prop="milestoneRemark">
        <el-input v-model="form.milestoneRemark" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <FileUpload ref="fujian" :id-list="ossids" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMilestone"> 确定 </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, reactive, ref, watch } from 'vue';
import FileUpload from '@/components/FileUpload/index.vue';
import { getDicts } from '@/api/system/dict/data';

const props = defineProps<{ visible: boolean; updateId: string }>();
const emits = defineEmits(['update:visible', 'close-dialog']);

const form = reactive({
  projectId: props.updateId,
  milestoneTitle: '',
  milestoneRemark: '',
  milestoneDate: '',
  ossIds: [],
  projectMilestoneTypes: [] as string[]
});
const ossids = ref<string[]>([]);
const tagOptions = ref<{ label: string; value: number }[]>([]);
const selectedTag = ref<string>('');
const projectMilestoneType = ref([]);

const rules = {
  milestoneTitle: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  milestoneDate: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
  milestoneRemark: [{ required: true, message: '请填写详情', trigger: 'blur' }]
};

const labelMappings: { [key: number]: string } = {
  0: '其他',
  1: '申报书',
  2: '任务书',
  3: '科研协作合同',
  4: '专项经费文件',
  5: '经费管理表',
  6: '中期文件',
  7: '验收文件',
  8: '结题文件',
  9: '知识产权',
  10: '论文',
  11: '专利',
  12: '软著',
  13: '标准',
  14: '示范应用',
  15: '获奖',
  16: '报告',
  17: '专家咨询',
  18: '经费变更',
  19: '人员变更',
  20: '批复文件',
  21: '通知',
  22: '合同'
};

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      milestoneCategorySelectList();
      // Reset the form fields
      Object.assign(form, {
        projectId: props.updateId,
        milestoneTitle: '',
        milestoneRemark: '',
        milestoneDate: '',
        ossIds: [],
        projectMilestoneTypes: []
      });
      ossids.value = [];
      selectedTag.value = '';
    }
  }
);

const handleClose = () => {
  emits('update:visible', false);
};

const addTag = () => {
  if (selectedTag.value && !form.projectMilestoneTypes.includes(selectedTag.value)) {
    form.projectMilestoneTypes.push(selectedTag.value);
    // selectedTag.value = '';
  }
};

const handleCloseTag = (tag: string) => {
  form.projectMilestoneTypes.splice(form.projectMilestoneTypes.indexOf(tag), 1);
};

const milestoneCategorySelectList = async () => {
  console.log('选择标签');
};

const getMilestoneTagOptions = () => {
  getDicts('pro_milestone_type').then((resp) => {
    resp.data.forEach((item) => {
      projectMilestoneType.value.push({
        projectMilestoneTypeId: item.dictValue,
        projectMilestoneTypeName: item.dictLabel
      });
    });
  });
};

const getTagType = (tag: string) => {
  switch (tag) {
    case '其他':
      return 'info';
    case '申报书':
      return 'danger';
    case '任务书':
      return 'primary';
    case '科研协作合同':
      return 'success';
    case '专项经费文件':
      return 'warning';
    case '经费管理表':
      return 'purple';
    case '中期文件':
      return 'deep-blue';
    case '验收文件':
      return 'teal';
    case '结题文件':
      return 'amber';
    case '知识产权':
      return 'cyan';
    case '论文':
      return 'flame';
    case '专利':
      return 'purple';
    case '软著':
      return 'amber';
    case '标准':
      return 'blue';
    case '示范应用':
      return 'success';
    case '获奖':
      return 'danger';
    case '报告':
      return 'purple';
    case '专家咨询':
      return 'info';
    case '经费变更':
      return 'cyan';
    case '人员变更':
      return 'deep-blue';
    case '批复文件':
      return 'teal';
    case '通知':
      return 'flame';
    case '合同':
      return 'default';
    default:
      return 'default';
  }
};

const getTextColor = (tag: string) => {
  switch (tag) {
    case '其他':
      return '#999';
    case '申报书':
      return '#f50';
    case '任务书':
      return '#2db7f5';
    case '科研协作合同':
      return '#87d068';
    case '专项经费文件':
      return '#eb2f96';
    case '经费管理表':
      return '#ff6600';
    case '中期文件':
      return '#722ed1';
    case '验收文件':
      return '#1890ff';
    case '结题文件':
      return '#52c41a';
    case '知识产权':
      return '#fa8c16';
    case '论文':
      return '#13c2c2';
    case '专利':
      return '#fa541c';
    case '软著':
      return '#722ed1';
    case '标准':
      return '#fa8c16';
    case '示范应用':
      return '#2db7f5';
    case '获奖':
      return '#87d068';
    case '报告':
      return '#f50';
    case '专家咨询':
      return '#722ed1';
    case '经费变更':
      return '#eb2f96';
    case '人员变更':
      return '#13c2c2';
    case '批复文件':
      return '#1890ff';
    case '通知':
      return '#52c41a';
    case '合同':
      return '#108ee9';
    default:
      return '#999';
  }
};

const addMilestone = async () => {
  // 验证关键字段是否为空
  if (!form.milestoneTitle || !form.milestoneDate || !form.milestoneRemark) {
    return;
  }
// 重置函数
const reset = () => {
  form.projectId = props.updateId;
  form.milestoneTitle = '';
  form.milestoneRemark = '';
  form.milestoneDate = '';
  form.ossIds = [];

  ossids.value = [];
  fileList.value = [];
  selectedTag.value = ''; // 重置选择的标签
  projectMilestoneTypes.value = []; // 重置动态标签列表
};
onMounted(() => {
  getMilestoneTagOptions();
});
</script>

<style scoped lang="scss">
.el-tag + .el-tag {
  margin-left: 10px;
  margin-right: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 设置标签之间的间距 */
}

.selected-tags {
  margin-left: -80px;
  margin-top: -1px;
}
</style>
