<template>
  <el-dialog :model-value="visible" title="支出录入" width="90%" :before-close="clearDataOnPageClose" @update:model-value="updateVisible">
    <div style="max-height: 700px">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:add']" type="primary" plain icon="plus" @click="handleAdd(props.projectId)">新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:import']" type="info" plain icon="upload" @click="handleImport">导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:import']" type="success" icon="Check" plain @click="addFunds">提交</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:import']" type="warning" icon="Refresh" plain @click="refreshData">重置</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" :data="expenditureData" border style="width: 100%; max-height: 500px; overflow-y: auto">
        <el-table-column label="日期" :resizable="false" align="center" width="100px">
          <!-- 使用 slot-scope 定制显示日期 -->
          <template #default="scope">
            {{ formatDate(scope.row.expenditureDate) }}
          </template>
        </el-table-column>
        <el-table-column label="项目名称" :resizable="false" align="center" prop="projectName" width="250px"> </el-table-column>
        <el-table-column label="凭证号" :resizable="false" align="center" prop="voucherNo" width="100px"> </el-table-column>
        <el-table-column label="摘要" :resizable="false" align="center" prop="expenditureAbstract" min-width="200px"> </el-table-column>
        <el-table-column label="专项/自筹" :resizable="false" align="center" prop="zxzc" width="100px">
          <template #default="scope">
            {{ pro_zxzc_options[scope.row.thirdLevelSubject]?.label || '无' }}
          </template>
        </el-table-column>
        <el-table-column label="直接/间接" :resizable="false" align="center" prop="zjjj" width="100px">
          <template #default="scope">
            {{ pro_zjjj_options[scope.row.thirdLevelSubject]?.label || '无' }}
          </template>
        </el-table-column>
        <el-table-column label="一级科目" :resizable="false" align="center" prop="firstLevelSubject" width="150px">
          <template #default="scope">
            {{ pro_first_subject[scope.row.thirdLevelSubject]?.label || '无' }}
          </template>
        </el-table-column>
        <el-table-column label="二级科目" :resizable="false" align="center" prop="secondLevelSubject" width="150px">
          <template #default="scope">
            {{ pro_second_subject[scope.row.thirdLevelSubject]?.label || '无' }}
          </template>
        </el-table-column>
        <el-table-column label="三级科目" :resizable="false" align="center" prop="thirdLevelSubject" width="150px">
          <template #default="scope">
            {{ pro_third_subject[scope.row.thirdLevelSubject]?.label || '无' }}
          </template>
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
        :project-id="projectId"
        :visible="isExpenditureAddDialogVisible"
        @new-data="handleNewData"
        @close:visible="isExpenditureAddDialogVisible = $event"
        @update:visible="isExpenditureAddDialogVisible = $event"
      ></ExpenditureAdd>
      <!--导入支出录入表-->
      <ExpenditureImport
        :project-id="props.projectId"
        :visible="isExpenditureImportDialogVisible"
        @new-data="handleNewData"
        @close:visible="isExpenditureImportDialogVisible = $event"
        @update:visible="isExpenditureImportDialogVisible = $event"
      >
      </ExpenditureImport>
    </div>
  </el-dialog>
</template>

<script setup Name="ExpenditureEntry" lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue';
import ExpenditureAdd from './ExpenditureAdd.vue';
import ExpenditureImport from './ExpenditureImport.vue';
import { addProjectExpenditure } from '@/api/project/funds';
import { formatDate } from '../../../../utils';

const props = defineProps<{
  projectId: number | null;
  visible: boolean;
}>();
const emits = defineEmits(['update:visible', 'close:visible']);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { pro_first_subject, pro_second_subject, pro_third_subject, pro_zxzc_options, pro_zjjj_options } = toRefs<any>(
  proxy?.useDict('pro_first_subject', 'pro_second_subject', 'pro_third_subject', 'pro_zxzc_options', 'pro_zjjj_options')
);
const params = ref({
  projectId: null as null | number
});

const loading = ref(true);
const isExpenditureAddDialogVisible = ref(false);
const isExpenditureImportDialogVisible = ref(false);
const expenditureData = ref<any[]>([]);
const projectId = ref<number>();
// 监听 projectId 变化
watch(
  () => props.projectId,
  (newVal) => {
    params.value.projectId = newVal;
  },
  { immediate: true }
);

const initFormData = (item: any) => ({
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
});

// 新增按钮操作
const handleAdd = (id: number) => {
  projectId.value = id;
  isExpenditureAddDialogVisible.value = true;
};

// 导入按钮操作
const handleImport = () => {
  isExpenditureImportDialogVisible.value = true;
};

// 提交按钮操作
const addFunds = () => {
  if (expenditureData.value.length === 0) {
    ElMessage.warning('请先填写或导入数据');
    return;
  }
  const requestData = expenditureData.value.map(initFormData);
  addProjectExpenditure(requestData).then((res) => {
    if (res.code === 200) {
      ElMessage.success('新增支出录入成功');
      updateVisible(false);
      refreshData();
    } else {
      ElMessage.error(res.msg);
    }
  });
};
const refreshData = () => {
  loading.value = true;
  expenditureData.value = [];
  loading.value = false;
};
// 处理新增数据
const handleNewData = (newData: any[]) => {
  expenditureData.value = expenditureData.value.concat(newData);
  ExpenditureAdd.value = false;
};

// 页面关闭时清空数据列表
const clearDataOnPageClose = () => {
  if (expenditureData.value.length > 0) {
    ElMessageBox.confirm('对话框关闭后，本次添加的数据将自动清空，确认关闭？', '关闭确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        expenditureData.value = [];
        updateVisible(false);
      })
      .catch(() => {});
  } else {
    // 如果支出数据为空，直接关闭弹窗
    updateVisible(false);
  }
};

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};
</script>

<style scoped></style>
