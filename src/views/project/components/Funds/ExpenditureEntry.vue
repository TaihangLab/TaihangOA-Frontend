<template>
  <el-dialog :model-value="visible" title="支出录入" width="90%" @update:model-value="updateVisible" @close="closeExpenselEditDialog">
    <div style="max-height: 700px">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:add']" type="primary" plain icon="plus" @click="handleAdd">新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:import']" type="info" plain icon="upload" @click="handleImport">导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:import']" type="success" icon="Check" plain @click="addFunds">提交</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="da"
        border
        style="width: 100%; max-height: 500px; overflow-y: auto"
        :row-style="{ height: '50px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column label="日期" :resizable="false" align="center" width="100px">
          <!-- 使用 slot-scope 定制显示日期 -->
          <template #default="scope">
            {{ formatDate(scope.row.expenditureDate) }}
          </template>
        </el-table-column>
        <el-table-column label="项目名称" :resizable="false" align="center" prop="projectName" width="250px"> </el-table-column>
        <el-table-column label="凭证号" :resizable="false" align="center" prop="voucherNo" width="100px"> </el-table-column>
        <el-table-column label="摘要" :resizable="false" align="center" prop="expenditureAbstract" min-width="200px"> </el-table-column>
        <el-table-column label="专项/自筹" :resizable="false" align="center" prop="zxzc" :formatter="zxzcFormatter" width="100px"> </el-table-column>
        <el-table-column label="直接/间接" :resizable="false" align="center" prop="zjjj" :formatter="zjjjFormatter" width="100px"> </el-table-column>
        <el-table-column
          label="一级科目"
          :resizable="false"
          align="center"
          prop="firstLevelSubject"
          width="150px"
          :formatter="firstLevelSubjectFormatter"
        >
        </el-table-column>
        <el-table-column
          label="二级科目"
          :resizable="false"
          align="center"
          prop="secondLevelSubject"
          width="150px"
          :formatter="secondLevelSubjectFormatter"
        >
        </el-table-column>
        <el-table-column
          label="三级科目"
          :resizable="false"
          align="center"
          prop="thirdLevelSubject"
          width="150px"
          :formatter="thirdLevelSubjectFormatter"
        >
        </el-table-column>
        <el-table-column :resizable="false" align="center" prop="amount" width="150px">
          <template #header>
            <div style="text-align: center">
              <span>金额</span>
              <span style="font-size: 12px; color: #f56c6c">（元）</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--新增支出录入-->
      <ExpenditureAdd
        :project-id="Number(projectId)"
        :visible="isExpenditureAddDialogVisible"
        @new-data="handleNewData"
        @close:visible="isExpenditureAddDialogVisible = $event"
        @update:visible="isExpenditureAddDialogVisible = $event"
      ></ExpenditureAdd>
      <!--导入支出录入表-->
      <ExpenditureImport :visible="isExpenditureImportDialogVisible" @close:visible="isExpenditureImportDialogVisible = $event" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue';
import request from '@/utils/request';
import ExpenditureAdd from './ExpenditureAdd.vue';
import { fundsAndBalance } from '@/api/project/funds';
import ExpenditureImport from './ExpenditureImport.vue';

const props = defineProps<{
  projectId: number | null;
  visible: boolean;
}>();
const emits = defineEmits(['update:visible', 'close:visible']);
const closeExpenselEditDialog = () => {
  emits('close:visible', false);
};

const contentStyle = ref({
  'text-align': 'center',
  'width': '60%'
});

const params = ref({
  projectId: null as null | number
});

// 数据变量
const loading = ref(true);
const isExpenditureAddDialogVisible = ref(false);
const isExpenditureImportDialogVisible = ref(false);
const expenditureLook = ref([]);
const importedData = ref([]);
const da = ref<any[]>([]); // 存储上传的数据

// 监听 projectId 变化
watch(
  () => props.projectId,
  (newVal) => {
    params.value.projectId = newVal;
    // 如果需要，可以执行 checkExpenditure();
  },
  { immediate: true }
);

// 截取文件名以供显示
const truncatedName = (originalName: string) => {
  const lastDotIndex = originalName.lastIndexOf('.');
  return lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
};

// 格式化日期方法
const formatDate = (date: string) => {
  const parts = date.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${year}-${month}-${day}`;
  }
  return date;
};

// 一级科目格式化方法
const firstLevelSubjectFormatter = (row: { firstLevelSubject: number }) => {
  const firstLevelSubject = [
    '设备费',
    '业务费',
    '劳务费',
    '材料费',
    '科研活动费',
    '科研服务费',
    '人员和劳务补助费',
    '绩效支出',
    '管理费',
    '房屋租赁费',
    '日常水电暖费',
    '资料费',
    '数据样本采集费',
    '测试化验加工费',
    '燃料动力费',
    '办公费',
    '印刷/出版费',
    '知识产权事务费',
    '车辆使用费',
    '差旅费',
    '会议/会务费',
    '专家咨询费',
    '其他费用'
  ];
  return firstLevelSubject[row.firstLevelSubject];
};

// 二级科目格式化方法
const secondLevelSubjectFormatter = (row: { secondLevelSubject: number }) => {
  const secondLevelSubject = [
    '购置设备费',
    '试制设备费',
    '设备升级改造费',
    '设备租赁费',
    '材料费',
    '资料费',
    '数据样本采集费',
    '测试化验加工费',
    '燃料动力费',
    '办公费',
    '印刷/出版费',
    '知识产权事务费',
    '车辆使用费',
    '出版/文献/信息传播/知识产权事务费',
    '差旅费',
    '会议/会务费',
    '国内协作费',
    '国际合作交流费',
    '专家咨询费',
    '人员劳务费',
    '会议/差旅/国际合作与交流费',
    '无'
  ];
  return secondLevelSubject[row.secondLevelSubject];
};

// 三级科目格式化方法
const thirdLevelSubjectFormatter = (row: { thirdLevelSubject: number }) => {
  const thirdLevelSubject = ['无', '知识产权事务费', '印刷打印制作费', '文献数据库费', '信息传播费', '会议费', '差旅费', '国际合作费'];
  return thirdLevelSubject[row.thirdLevelSubject];
};

// 专项自筹格式化方法
const zxzcFormatter = (row: { zxzc: number }) => {
  const zxzc = ['专项', '自筹'];
  return zxzc[row.zxzc];
};

// 直接间接经费格式化方法
const zjjjFormatter = (row: { zjjj: number }) => {
  const zjjj = ['直接', '间接'];
  return zjjj[row.zjjj];
};

// 新增按钮操作
const handleAdd = () => {
  isExpenditureAddDialogVisible.value = true;
};

// 导入按钮操作
const handleImport = () => {
  isExpenditureImportDialogVisible.value = true;
};

// 提交按钮操作
const addFunds = () => {
  if (da.value.length === 0) {
    // 提示没有要上传的数据
    return;
  }
  // 构建请求数据
  const requestData = da.value.map((item) => ({
    projectId: params.value.projectId,
    expenditureDate: item.expenditureDate,
    projectName: item.projectName,
    voucherNo: item.voucherNo,
    expenditureAbstract: item.expenditureAbstract,
    zxzc: item.zxzc,
    zjjj: item.zjjj,
    firstLevelSubject: item.firstLevelSubject,
    secondLevelSubject: item.secondLevelSubject,
    thirdLevelSubject: item.thirdLevelSubject,
    amount: item.amount
  }));

  // 发送请求
  request({
    url: '/project/funds/add',
    method: 'post',
    data: requestData
  })
    .then((resp) => {
      console.log(resp);
      // 上传成功提示
    })
    .catch((error) => {
      console.error('上传失败', error);
      // 上传失败提示
    });
};

// 查看预算及支出汇总
const checkOther = () => {
  fundsAndBalance(props.projectId).then((resp) => {
    // 处理获取到的数据
  });
};

// 处理新增数据
const handleNewData = (newData: any[]) => {
  da.value = da.value.concat(newData);
  // 关闭新增窗口
  ExpenditureAdd.value = false;
};

// 页面关闭时清空数据列表
const clearDataOnPageClose = () => {
  da.value = [];
};

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const closeDialog = () => {
  emits('update:visible', false);
};
</script>

<style scoped>
/* 你的样式 */
.custom-upload-btn {
  /* 添加虚线框 */
  border: 2px dashed #dddfe0;
  border-radius: 10px;
  padding: 40px;
  /* 增加内边距 */
  cursor: pointer;
  /* 鼠标样式改为手型 */
  display: flex;
  /* 设置为flex布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  width: 300px;
  /* 设置框的宽度 */
  height: 200px;
  /* 设置框的高度 */
}

.custom-upload-btn:hover {
  /* 鼠标悬停时改变颜色 */
  border-color: #409eff;
}

.upload-text {
  font-size: 16px;
  color: #409eff;
}
</style>
