<template>
  <el-dialog :model-value="visible" title="查看支出" width="90%" @update:model-value="updateVisible" @close="closeExpenselCheckDialog">
    <div>
      <el-form ref="dataForm" :inline="true" :model="filters" class="demo-form-inline" style="margin-left: 30px; margin-top: 20px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="一级科目" style="width: 80%">
              <el-select v-model="filters.firstLevelSubject" placeholder="请选择一级科目" clearable style="width: 100%">
                <el-option v-for="item in subjectData.firstLevelSubjects" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="二级科目" style="width: 80%">
              <el-select v-model="filters.secondLevelSubject" placeholder="请选择二级科目" clearable style="width: 100%">
                <el-option v-for="item in subjectData.secondLevelSubjects" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="三级科目" style="width: 80%">
              <el-select v-model="filters.thirdLevelSubject" placeholder="请选择三级科目" clearable style="width: 100%">
                <el-option v-for="item in subjectData.thirdLevelSubjects" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col :span="8">
            <el-form-item label="起始时间" style="width: 80%">
              <el-date-picker
                v-model="filters.startDate"
                type="date"
                placeholder="请选择起始时间"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间" style="width: 80%">
              <el-date-picker
                v-model="filters.endDate"
                type="date"
                placeholder="请选择结束时间"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="width: 80%">
              <el-button type="primary" icon="search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button icon="refresh" size="mini" @click="resetQuery">重置</el-button>
              <el-button type="success" icon="download" size="mini" @click="handleExport">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="expenditureEntry"
        border
        border
        style="width: 100%; max-height: 800px; overflow-y: auto"
        :row-style="{ height: '50px' }"
        :cell-style="{ padding: '0px' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="日期" :resizable="false" align="center" width="100px">
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
          :formatter="subjectFormatter('firstLevelSubjects')"
        >
        </el-table-column>
        <el-table-column
          label="二级科目"
          :resizable="false"
          align="center"
          prop="secondLevelSubject"
          width="150px"
          :formatter="subjectFormatter('secondLevelSubjects')"
        >
        </el-table-column>
        <el-table-column
          label="三级科目"
          :resizable="false"
          align="center"
          prop="thirdLevelSubject"
          width="150px"
          :formatter="subjectFormatter('thirdLevelSubjects')"
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
        <el-table-column label="导入时间" :resizable="false" align="center" prop="createTime" width="160px"> </el-table-column>
        <el-table-column label="操作" :resizable="false" align="center" min-width="80px" fixed="right">
          <template #default="scope">
            <el-button
              v-hasPermi="['project:expense:cancel']"
              size="mini"
              type="text"
              icon="el-icon-refresh-left"
              @click="confirmDeleteExpenditure(scope.row.expenditureId)"
              >撤销
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryParam.pageNum"
        :page-size="queryParam.pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 30px"
        @size-change="sizeChangeHandle"
        @current-change="CurrentChangeHandle"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { exportExpenditure, fundsAndBalance, getExpenditure, rollbackExpenditure } from '@/api/project/funds';
import { formatDate } from '@/utils';
import { getDicts } from '@/api/system/dict/data';

const props = defineProps<{
  projectId: number | string;
  visible: boolean;
}>();
const emits = defineEmits(['update:visible']);
const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};
const closeExpenselCheckDialog = () => {
  emits('close:visible', false);
  resetQuery();
};

const loading = ref(true);
const expenditureEntry = ref<any[]>([]);
const total = ref(0); // 总条数
const queryParam = ref({
  pageNum: 1,
  pageSize: 10
});
const filters = ref({
  firstLevelSubject: '',
  secondLevelSubject: '',
  thirdLevelSubject: '',
  startDate: '',
  endDate: ''
});
const subjectData = ref({
  firstLevelSubjects: [],
  secondLevelSubjects: [],
  thirdLevelSubjects: []
});
const selectedExpenditures = ref<any[]>([]);

watch(
  () => props.projectId,
  () => {
    handleQuery();
  },
  { immediate: true }
);

const getFirstLevelSubject = () => {
  getDicts('pro_first_subject').then((resp) => {
    resp.data.forEach((item) => {
      subjectData.value.firstLevelSubjects.push({
        value: item.dictValue,
        label: item.dictLabel
      });
    });
  });
};

const getSecondLevelSubject = () => {
  getDicts('pro_second_subject').then((resp) => {
    resp.data.forEach((item) => {
      subjectData.value.secondLevelSubjects.push({
        value: item.dictValue,
        label: item.dictLabel
      });
    });
  });
};

const getThirdLevelSubjects = () => {
  getDicts('pro_third_subject').then((resp) => {
    resp.data.forEach((item) => {
      subjectData.value.thirdLevelSubjects.push({
        value: item.dictValue,
        label: item.dictLabel
      });
    });
  });
};

function formatDateFn(date: string): string {
  const parts = date.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${year}-${month}-${day}`;
  }
  return date;
}

function subjectFormatter(level: 'firstLevelSubjects' | 'secondLevelSubjects' | 'thirdLevelSubjects') {
  return (row: any, column: any, value: any) => {
    const subject = subjectData.value[level].find((item) => item.value === value.toString());
    return subject ? subject.label : '';
  };
}

function zxzcFormatter(row: any) {
  const zxzc = {
    0: '专项',
    1: '自筹'
  };
  return zxzc[row.zxzc];
}

function zjjjFormatter(row: any) {
  const zjjj = {
    0: '直接',
    1: '间接'
  };
  return zjjj[row.zjjj];
}

function handleQuery() {
  const bodyData = {
    projectId: props.projectId,
    firstLevelSubject: filters.value.firstLevelSubject,
    secondLevelSubject: filters.value.secondLevelSubject,
    thirdLevelSubject: filters.value.thirdLevelSubject,
    expenditureDateSta: filters.value.startDate,
    expenditureDateEnd: filters.value.endDate
  };
  getExpenditure(bodyData, queryParam.value)
    .then((resp: any) => {
      expenditureEntry.value = resp.rows;
      total.value = resp.total;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

function confirmDeleteExpenditure(expenditureId: string) {
  ElMessageBox.confirm('确定撤销该录入信息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteExpenditure(expenditureId);
  });
}

function deleteExpenditure(expenditureId: string) {
  rollbackExpenditure(expenditureId)
    .then(() => {
      handleQuery();
    })
    .catch(() => {
      ElMessage.error('删除支出信息失败，请稍后重试！');
    });
}

function sizeChangeHandle(size: number) {
  queryParam.value.pageSize = size;
  handleQuery();
}

function CurrentChangeHandle(page: number) {
  queryParam.value.pageNum = page;
  handleQuery();
}

function resetQuery() {
  // 重置所有过滤字段为默认值
  filters.value.firstLevelSubject = '';
  filters.value.secondLevelSubject = '';
  filters.value.thirdLevelSubject = '';
  filters.value.startDate = '';
  filters.value.endDate = '';

  // 重置分页参数
  queryParam.value.pageNum = 1;
  queryParam.value.pageSize = 10;

  // 使用重置的过滤条件和分页参数重新获取数据
  handleQuery();
}

function handleSelectionChange(selection: any[]) {
  selectedExpenditures.value = selection;
}

function handleExport() {
  const selectedIds = selectedExpenditures.value.map((expenditure) => expenditure.expenditureId);
  const projectExpenditureBO = {
    expenditureIds: selectedIds
  };
  const formattedDate = formatDate(new Date());
  exportExpenditure(projectExpenditureBO)
    .then(() => {
      const downloadUrl = `/project/funds/exportData?filename=支出明细数据_${formattedDate}.xlsx`;
      window.open(downloadUrl);
    })
    .catch(() => {
      ElMessage.error('导出支出信息失败，请稍后重试！');
    });
}

onMounted(() => {
  getFirstLevelSubject();
  getSecondLevelSubject();
  getThirdLevelSubjects();
});
</script>

<style scoped>
/* 你的样式 */
</style>
