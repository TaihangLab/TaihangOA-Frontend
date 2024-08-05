<template>
  <el-dialog :model-value="visible" width="50%" @close="handleClose">
    <template #title>
      <span style="font-weight: bold; font-size: large">大事记-详情</span>
    </template>
    <div class="search-bar">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键字">
          <el-input v-model="searchForm.searchKeyword" placeholder="请输入关键字" style="width: 150px"></el-input>
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
          <el-select v-model="selectedTag" placeholder="选择标签" style="width: 150px" clearable @change="handleTagChange">
            <el-option v-for="tag in tagOptions" :key="tag.value" :label="tag.label" :value="tag.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-timeline v-show="showTimeline" class="timeline">
      <el-timeline-item
        v-for="item in timelineItems"
        :key="item.milestoneId"
        center
        type="primary"
        hollow
        placement="top"
        :timestamp="item.milestoneDate"
        :icon="item.icon"
        :style="{ '--icon-color': '#0bbd87' }"
      >
        <el-card>
          <h4>名称：{{ item.milestoneTitle }}</h4>
          <el-tag
            v-for="(type, index) in item.categoryTypeSet"
            :key="index"
            :type="getLabelType(type)"
            effect="light"
            plain
            size="small"
            :style="{ color: getTextColor(type), marginRight: '8px' }"
          >
            {{ getLabel(type) }}
          </el-tag>
          <p>详情：{{ item.milestoneRemark }}</p>
          <div class="attachments-container">
            <el-button v-for="(oss, ossIndex) in item.sysOsses" :key="ossIndex" size="small" type="text" icon="Download" @click="handleDownload(oss)">
              {{ oss.originalName }}</el-button
            >
          </div>
          <div style="margin-top: 10px">
            <el-button
              v-hasPermi="['project:my:milestoneedit']"
              type="success"
              icon="EditPen"
              size="small"
              circle
              @click="editMilestone(item)"
            ></el-button>
            <el-button
              v-hasPermi="['project:my:milestonedelete']"
              type="danger"
              icon="DeleteFilled"
              size="small"
              circle
              @click="confirmDeleteMilestone(item)"
            ></el-button>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div v-show="!showTimeline" class="no-data-message" style="color: #909399; font-size: 14px; text-align: center">暂无大事记数据</div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, watch } from 'vue';
import request from '@/utils/request';
import fujian from '@/components/FileUpload/index.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import {
  queryMilestoneList,
  queryMilestoneCategorySelectSetList,
  getMilestoneCategorySelectList,
  milestoneDelete
} from '@/api/project/myProject/index';

const props = defineProps<{
  visible: boolean;
  updateId: string;
  projectId: string;
}>();

const searchForm = ref({
  searchKeyword: '',
  dateRange: [] as Date[],
  milestoneCategorySelectSet: [] as string[]
});

const emits = defineEmits(['update:visible']);
const queryPara = ref({});
const eventsDialogVisibleEdit = ref(false);
const showTimeline = ref(false);
const select = ref('');
const keyword = ref('');
const milestoneType = ref('');
// const searchKeyword = ref('');
const milestoneStaTime = ref('');
const milestoneEndTime = ref('');
const projectEstablishTime = ref('');
const projectLevel = ref<string[]>([]);
// const dateRange = ref<Date[]>([]);
const timelineItems = ref<any[]>([]);
const milestoneIds = ref<string[]>([]);
const title = ref(''); // 初始化 title
const ossids = ref<string[]>([]);
const categoryTypeSet = ref<any[]>([]);
// const milestoneCategorySelectSet = ref<any[]>([]);
const categorySelect = ref<any[]>([]);
const tagOptions = ref<any[]>([]); // 标签选项从 milestoneCategorySelectList 方法中获取
const selectedTag = ref(''); // 用户选择的标签（中文文字）
const projectMilestoneTypes = ref<string[]>([]); // 用于存储用户选择的标签（中文文字）
const params = reactive<{ projectId: string | null }>({
  projectId: null
});
const form = reactive({
  projectId: props.projectId,
  milestoneTitle: '',
  milestoneRemark: '',
  milestoneDate: '',
  ossIds: [] as string[],
  projectMilestoneTypes: [] as string[],
  milestoneId: '',
  sysOsses: [] as any[]
});

const labelMappings: Record<number, string> = {
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

const labelIdMappings: Record<string, number> = {
  '其他': 0,
  '申报书': 1,
  '任务书': 2,
  '科研协作合同': 3,
  '专项经费文件': 4,
  '经费管理表': 5,
  '中期文件': 6,
  '验收文件': 7,
  '结题文件': 8,
  '知识产权': 9,
  '论文': 10,
  '专利': 11,
  '软著': 12,
  '标准': 13,
  '示范应用': 14,
  '获奖': 15,
  '报告': 16,
  '专家咨询': 17,
  '经费变更': 18,
  '人员变更': 19,
  '批复文件': 20,
  '通知': 21,
  '合同': 22
};

const rules = {
  milestoneTitle: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  milestoneDate: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
  milestoneRemark: [{ required: true, message: '请填写详情', trigger: 'blur' }]
};

const pickerOptions = {
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
};

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

// 初始化 Form Project Milestone Types 为 Project Milestone Types 的副本
form.projectMilestoneTypes = [...projectMilestoneTypes.value];

// 下载按钮操作
function handleDownload(row: any) {
  proxy?.$download.oss(row.ossId);
}

// 处理标签选择变化
function handleTagChange(value: string | null) {
  if (value) {
    searchForm.value.milestoneCategorySelectSet = [value]; // 将选中的标签放入数组中
  } else {
    searchForm.value.milestoneCategorySelectSet = []; // 如果没有选择，清空数组
  }
}

function addTag() {
  const selectdId = getLabelId(selectedTag.value);
  projectMilestoneTypes.value = [...projectMilestoneTypes.value, selectdId];
}

// 辅助方法，根据标签获取对应的数字 ID
function getLabelId(label: string): number {
  return labelIdMappings[label] !== undefined ? labelIdMappings[label] : -1;
}

function editMilestone(item: any) {
  form.milestoneId = item.milestoneId;
  form.milestoneTitle = item.milestoneTitle;
  form.milestoneRemark = item.milestoneRemark;
  form.milestoneDate = item.milestoneDate;
  eventsDialogVisibleEdit.value = true;
  form.sysOsses = item.sysOsses;
  // 获取已有的ossids
  ossids.value = item.sysOsses.map((item: any) => item.ossId);
  // 将对应的标签数据存储到 projectMilestoneTypes 中，并保留原有标签信息
  projectMilestoneTypes.value = [...item.categoryTypeSet]; // 保存原有标签信息
}

async function deleteMilestone(item: any) {
  const milestoneId = item.milestoneId;
  // request({
  //   url: `/project/my/milestonedelete`,
  //   method: 'delete',
  //   params: {
  //     milestoneId: milestoneId
  //   }
  // })
  await milestoneDelete({ milestoneId: milestoneId }).then(() => {
    fetchMilestoneList();
  });
}

function confirmDeleteMilestone(item: any) {
  ElMessageBox.confirm('确定删除该大事记吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 用户点击确定按钮时执行删除逻辑
      deleteMilestone(item);
    })
    .catch(() => {
      // 用户点击取消按钮时不执行任何操作
    });
}

function editMilestoneBtn() {
  // 验证关键字段是否为空
  if (!form.milestoneTitle || !form.milestoneDate || !form.milestoneRemark) {
    ElMessage.error('请填写完整的信息');
    return;
  }
  form.projectMilestoneTypes = projectMilestoneTypes.value;
  form.ossIds = ossids.value;
  // 请求修改接口
  request({
    url: '/project/my/milestoneedit',
    method: 'put',
    data: form
  })
    .then(() => {
      ElMessage.success('修改成功');
      eventsDialogVisibleEdit.value = false;
      fetchMilestoneList();
    })
    .catch(() => {
      ElMessage.error('修改失败');
    });
}

function handleSizeChange(val: number) {
  console.log(`每页 ${val} 条`);
}

function handleCurrentChange(val: number) {
  console.log(`当前页: ${val}`);
}

// 方法：获取里程碑列表
const fetchMilestoneList = async () => {
  const combinedSearchData = {
    projectId: form.projectId,
    keyword: searchForm.value.searchKeyword,
    milestoneStaTime: milestoneStaTime.value,
    milestoneEndTime: milestoneEndTime.value,
    milestoneType: searchForm.value.milestoneCategorySelectSet.join(',')
  };
  // request({
  //   url: '/project/list/milestonequery',
  //   method: 'post',
  //   data: combinedSearchData,
  //   params: queryPara.value
  // })
  await queryMilestoneList(combinedSearchData, queryPara.value)
    .then((resp) => {
      // 根据 milestoneDate 对 timelineItems 进行排序
      timelineItems.value = resp.data.sort((a: any, b: any) => {
        return new Date(a.milestoneDate).getTime() - new Date(b.milestoneDate).getTime();
      });

      // 清空 milestoneIds 和 categoryTypeSet 数组
      milestoneIds.value = [];
      categoryTypeSet.value = [];

      // 获取标签数据
      timelineItems.value.forEach((item: any) => {
        milestoneIds.value.push(item.milestoneId);
        const types = Array.from(item.categoryTypeSet);
        types.forEach((type) => {
          if (!categoryTypeSet.value.includes(type)) {
            categoryTypeSet.value.push(type);
          }
        });
      });

      updateTimelineDisplay();
    })
    .catch((error) => {
      console.error('获取数据时出错：', error);
    });
};

// 方法：获取里程碑类别选择集列表
const milestoneCategorySelectSetList = async () => {
  const combinedSearchData = {
    projectId: form.projectId,
    keyword: searchForm.value.searchKeyword,
    milestoneStaTime: milestoneStaTime.value,
    milestoneEndTime: milestoneEndTime.value
  };

  // request({
  //   url: '/project/list/milestoneCategorySelectSet',
  //   method: 'get',
  //   data: combinedSearchData,
  //   params: queryPara.value
  // })
  await queryMilestoneCategorySelectSetList(combinedSearchData, queryPara.value)
    .then((resp) => {
      // 将数字值转换为 labelMappings 中的文字描述
      categorySelect.value = resp.data.map((item: any) => ({
        label: getLabel(item),
        value: item
      }));
    })
    .catch((error) => {
      console.error('获取数据时出错：', error);
    });
};

// 方法：获取里程碑类别选择列表
const milestoneCategorySelectList = async () => {
  // request({
  //   url: '/project/list/milestoneCategorySelect',
  //   method: 'get',
  //   data: queryPara.value // 假设 this.data 是从 queryPara 获取的
  // })
  await getMilestoneCategorySelectList(queryPara.value)
    .then((resp) => {
      // 将数字值转换为 labelMappings 中的文字描述
      tagOptions.value = resp.data.map((item: any) => ({
        label: getLabel(item),
        value: item
      }));
    })
    .catch((error) => {
      console.error('获取数据时出错：', error);
    });
};

function getLabel(typeId: number) {
  // 如果标签值在labelMappings中有对应的文字描述，则返回对应的描述，否则返回标签值本身
  return labelMappings[typeId] || typeId.toString();
}

function getLabelType(typeId: number) {
  // 根据标签类型返回不同的颜色标签类型
  switch (typeId) {
    case 0:
      return 'default'; // 其他
    case 1:
      return 'danger'; // 大事记标签
    case 2:
      return 'primary'; // 申报书
    case 3:
      return 'success'; // 任务书
    case 4:
      return 'info'; // 科研协作合同
    case 5:
      return 'warning'; // 专项经费文件
    case 6:
      return 'purple'; // 经费管理表
    case 7:
      return 'deep-blue'; // 中期文件
    case 8:
      return 'teal'; // 验收文件
    case 9:
      return 'amber'; // 结题文件
    case 10:
      return 'cyan'; // 知识产权
    case 11:
      return 'flame'; // 论文
    case 12:
      return 'purple'; // 专利
    case 13:
      return 'amber'; // 软著
    case 14:
      return 'blue'; // 标准
    case 15:
      return 'success'; // 示范应用
    case 16:
      return 'danger'; // 获奖
    case 17:
      return 'purple'; // 报告
    case 18:
      return 'info'; // 专家咨询
    case 19:
      return 'cyan'; // 经费变更
    case 20:
      return 'deep-blue'; // 人员变更
    case 21:
      return 'teal'; // 批复文件
    case 22:
      return 'flame'; // 通知
    case 23:
      return 'default'; // 合同
    default:
      return 'default';
  }
}

function getTextColor(typeId: number) {
  // 根据标签类型返回不同的字体颜色
  switch (typeId) {
    case 0:
      return '#999'; // 其他 - 灰色
    case 1:
      return '#f50'; // 大事记标签 - 红色
    case 2:
      return '#2db7f5'; // 申报书 - 蓝色
    case 3:
      return '#87d068'; // 任务书 - 绿色
    case 4:
      return '#eb2f96'; // 科研协作合同 - 紫红色
    case 5:
      return '#ff6600'; // 专项经费文件 - 橙色
    case 6:
      return '#722ed1'; // 经费管理表 - 紫色
    case 7:
      return '#1890ff'; // 中期文件 - 深蓝色
    case 8:
      return '#52c41a'; // 验收文件 - 青绿色
    case 9:
      return '#fa8c16'; // 结题文件 - 琥珀色
    case 10:
      return '#13c2c2'; // 知识产权 - 青色
    case 11:
      return '#fa541c'; // 论文 - 火焰色
    case 12:
      return '#722ed1'; // 专利 - 紫色
    case 13:
      return '#fa8c16'; // 软著 - 琥珀色
    case 14:
      return '#2db7f5'; // 标准 - 蓝色
    case 15:
      return '#87d068'; // 示范应用 - 绿色
    case 16:
      return '#f50'; // 获奖 - 红色
    case 17:
      return '#722ed1'; // 报告 - 紫色
    case 18:
      return '#eb2f96'; // 专家咨询 - 紫红色
    case 19:
      return '#13c2c2'; // 经费变更 - 青色
    case 20:
      return '#1890ff'; // 人员变更 - 深蓝色
    case 21:
      return '#52c41a'; // 批复文件 - 青绿色
    case 22:
      return '#fa541c'; // 通知 - 火焰色
    case 23:
      return '#108ee9'; // 合同 - 默认蓝色
  }
}

function handleQuery() {
  // 处理milestoneType为非数组的情况
  let milestoneType = '';

  if (Array.isArray(searchForm.value.milestoneCategorySelectSet)) {
    milestoneType = searchForm.value.milestoneCategorySelectSet.join(',');
  } else {
    console.log(typeof searchForm.value.milestoneCategorySelectSet);
    console.error('milestoneCategorySelectSet is not an array', searchForm.value.milestoneCategorySelectSet);
  }
  // 设置搜索参数
  const searchData = {
    projectId: params.projectId,
    keyword: searchForm.value.searchKeyword,
    milestoneStaTime: '',
    milestoneEndTime: '',
    milestoneType: milestoneType
  };
  console.log('Search data:', searchData);
  // 判断是否选择了时间范围
  if (searchForm.value.dateRange && searchForm.value.dateRange.length === 2) {
    // milestoneStaTime.value = dateRange.value[0];
    // milestoneEndTime.value = dateRange.value[1];

    // 将日期转换为字符串格式
    milestoneStaTime.value = searchForm.value.dateRange[0].toISOString().split('T')[0]; // yyyy-mm-dd 格式
    milestoneEndTime.value = searchForm.value.dateRange[1].toISOString().split('T')[0]; // yyyy-mm-dd 格式
  } else {
    milestoneStaTime.value = undefined;
    milestoneEndTime.value = undefined;
  }
  // 发起请求，获取符合搜索条件的数据
  // fetchMilestoneList(searchData);
  fetchMilestoneList();
  // 显示搜索框
  updateTimelineDisplay();
}

function updateTimelineDisplay() {
  // 检查是否有大事记项
  const hasMilestones = timelineItems.value.length > 0;
  // 根据是否有大事记项确定是否显示大事记时间轴
  showTimeline.value = hasMilestones;
}

function close() {
  const eventsDialogEdit = ref(null);
  if (eventsDialogEdit.value) {
    eventsDialogEdit.value.close();
  }
}

function handleClose(typeId: string | null) {
  // 从 projectMilestoneTypes 数组中移除被关闭的标签
  if (typeId !== null) {
    const index = projectMilestoneTypes.value.indexOf(typeId);
    if (index !== -1) {
      projectMilestoneTypes.value.splice(index, 1); // 使用splice方法删除标签
    }
  }
  emits('update:visible', false);
}

const handleReset = () => {
  searchForm.value.searchKeyword = '';
  searchForm.value.dateRange = [];
  searchForm.value.milestoneCategorySelectSet = [];
  selectedTag.value = null; // 清空选中的标签
  milestoneStaTime.value = '';
  milestoneEndTime.value = '';
  fetchMilestoneList();
};

onMounted(() => {
  fetchMilestoneList();
  milestoneCategorySelectSetList();
  milestoneCategorySelectList();
});
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
.fixed-container {
  position: fixed;
  left: 49%;
  width: 40%;
  margin-top: -25px;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  align-items: center;
}

.input-with-select {
  width: 150px;
}

.attachments-container {
  display: flex;
}
</style>
