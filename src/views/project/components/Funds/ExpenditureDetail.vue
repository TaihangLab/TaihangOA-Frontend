<template>
  <el-dialog :model-value="visible" title="查看支出" width="90%" @update:model-value="updateVisible" @close="closeExpenditureDetailDialog">
    <div>
      <el-form ref="queryFormRef" :inline="true" :model="form" class="demo-form-inline" style="margin-left: 30px; margin-top: 20px">
        <el-form-item label="一级科目" style="width: 250px">
          <el-select v-model="form.firstLevelSubject" placeholder="请选择一级科目" clearable style="width: 100%">
            <el-option v-for="item in firstLevelSubjectOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级科目" style="width: 250px">
          <el-select v-model="form.secondLevelSubject" placeholder="请选择二级科目" clearable style="width: 100%">
            <el-option v-for="item in secondLevelSubjectOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级科目" style="width: 250px">
          <el-select v-model="form.thirdLevelSubject" placeholder="请选择三级科目" clearable style="width: 100%">
            <el-option v-for="item in thirdLevelSubjectOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间" style="width: 250px">
          <el-date-picker
            v-model="form.expenditureDateSta"
            type="date"
            placeholder="请选择起始时间"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" style="width: 250px">
          <el-date-picker
            v-model="form.expenditureDateEnd"
            type="date"
            placeholder="请选择结束时间"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 500px">
          <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
          <el-button icon="refresh" @click="resetQuery">重置</el-button>
          <el-button type="success" icon="download" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="expenditureDetailList"
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
        <el-table-column label="专项/自筹" :resizable="false" align="center" prop="zxzc" width="100px">
          <template #default="scope">
            {{ pro_zxzc_options[scope.row.zxzc]?.label || '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="直接/间接" :resizable="false" align="center" prop="zjjj" width="100px">
          <template #default="scope">
            {{ pro_zjjj_options[scope.row.zjjj]?.label || '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="一级科目" :resizable="false" align="center" prop="firstLevelSubject" width="150px">
          <template #default="scope">
            {{ pro_first_subject[scope.row.firstLevelSubject]?.label || '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="二级科目" :resizable="false" align="center" prop="secondLevelSubject" width="150px">
          <template #default="scope">
            {{ pro_second_subject[scope.row.secondLevelSubject]?.label || '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="三级科目" :resizable="false" align="center" prop="thirdLevelSubject" width="150px">
          <template #default="scope">
            {{ pro_third_subject[scope.row.thirdLevelSubject]?.label || '未知' }}
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
        <el-table-column label="导入时间" :resizable="false" align="center" prop="createTime" width="160px"> </el-table-column>
        <el-table-column label="操作" :resizable="false" align="center" min-width="100px" fixed="right">
          <template #default="scope">
            <el-button
              v-hasPermi="['project:expense:cancel']"
              size="small"
              type="text"
              icon="RefreshLeft"
              @click="confirmRollBackExpenditure(scope.row.expenditureId)"
              >撤销
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="fetchProjectExpenditureList"
      />
    </div>
  </el-dialog>
</template>

<script setup Name="ExpenditureDetail" lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { exportExpenditure, getProjectExpenditureList, rollBackProjectExpenditure } from '@/api/project/funds';
import { formatDate } from '@/utils';
import { getDicts } from '@/api/system/dict/data';
import { ProjectExpenditureBO, ProjectExpenditureVO } from '@/api/project/funds/types';

const queryFormRef = ref<ElFormInstance>();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { pro_zxzc_options, pro_zjjj_options, pro_first_subject, pro_second_subject, pro_third_subject } = toRefs<any>(
  proxy?.useDict('pro_zxzc_options', 'pro_zjjj_options', 'pro_first_subject', 'pro_second_subject', 'pro_third_subject')
);

const props = defineProps<{
  projectId: number | string;
  visible: boolean;
}>();
const emits = defineEmits(['update:visible', 'close:visible']);
const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};
const closeExpenditureDetailDialog = () => {
  emits('close:visible', false);
  resetQuery();
};

const loading = ref(true);
const expenditureDetailList = ref<ProjectExpenditureVO[]>([]);
const firstLevelSubjectOptions = ref([]);
const secondLevelSubjectOptions = ref([]);
const thirdLevelSubjectOptions = ref([]);
const total = ref(0);

const initFormData: ProjectExpenditureBO = {
  projectId: props.projectId,
  firstLevelSubject: undefined,
  secondLevelSubject: undefined,
  thirdLevelSubject: undefined,
  expenditureDateSta: '',
  expenditureDateEnd: ''
};
const data = reactive({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10
  }
});
const { form, queryParams } = toRefs(data);

const selectedExpenditures = ref<any[]>([]);

const initOptions = () => {
  const dicts = [
    { key: 'pro_first_subject', ref: firstLevelSubjectOptions },
    { key: 'pro_second_subject', ref: secondLevelSubjectOptions },
    { key: 'pro_third_subject', ref: thirdLevelSubjectOptions }
  ];

  dicts.forEach(({ key, ref }) => {
    getDicts(key).then((resp) => {
      resp.data.forEach((item: any) => {
        ref.value.push({
          id: item.dictValue,
          name: item.dictLabel
        });
      });
    });
  });
};

const fetchProjectExpenditureList = async () => {
  loading.value = true;
  data.form.projectId = props.projectId;
  const response = await getProjectExpenditureList(data.form, queryParams.value);
  expenditureDetailList.value = response.rows;
  total.value = response.total;
  loading.value = false;
};

const handleQuery = () => {
  fetchProjectExpenditureList();
};

const confirmRollBackExpenditure = (expenditureId: number) => {
  ElMessageBox.confirm('确定撤销该录入信息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    rollBackProjectExpenditure(expenditureId)
      .then(fetchProjectExpenditureList);
  });
};

const resetQuery = () => {
  queryFormRef.value?.resetFields();
  form.value = { ...initFormData };
  fetchProjectExpenditureList();
};

const handleSelectionChange = (selection: any[]) => {
  selectedExpenditures.value = selection;
};

function handleExport() {
  const selectedIds = selectedExpenditures.value.map((expenditure) => expenditure.expenditureId);
  proxy?.download(
    '/project/funds/exportData',
    {
      selectedIds
    },
    `支出明细数据_${new Date().getTime()}.xlsx`
  );
}
watch(
  () => props.projectId,
  (newVal) => {
    if (newVal && props.visible) {
      handleQuery();
    }
  },
  { immediate: true }
);

onMounted(() => {
  initOptions();
});
</script>

<style scoped></style>
