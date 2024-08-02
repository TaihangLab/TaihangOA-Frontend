<template>
  <el-dialog :model-value="visible" title="经费到账" width="60%" @update:model-value="updateVisible" @close="closeFundsReceivedDialog">
    <div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button v-hasPermi="['project:expense:receivedAdd']" type="primary" plain icon="plus" @click="handleAdd">新增</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 10px"></div>
      <el-table style="width: 100%; max-height: 500px; overflow-y: auto" border>
        <el-table-column align="center" prop="amountReceived" :show-overflow-tooltip="true" width="150px">
          <template #header>
            <div style="text-align: center">
              <span>拨款金额</span>
              <span style="font-size: 12px; color: #f56c6c">（万元）</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="到账类型" align="center" prop="receivedType" :show-overflow-tooltip="true" width="120" />
        <el-table-column label="来款单位" align="center" prop="receivedFrom" :show-overflow-tooltip="true" width="180" />
        <el-table-column label="到账时间" align="center" prop="receivedDate" :show-overflow-tooltip="true" width="150" />
        <el-table-column label="附件" align="center" :show-overflow-tooltip="true" width="280">
          <template #default="{ row }">
            <div v-for="file in row.sysOsses" :key="file.ossId">
              <el-button type="text" href="#">{{ file.originalName }}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="'操作'" :resizable="false" align="center" min-width="80px" fixed="right">
          <template #default="{ row }">
            <el-button v-hasPermi="['project:expense:receivedEdit']" type="text" icon="edit" @click="handleEdit(row)">修改</el-button>
            <el-button v-hasPermi="['project:expense:receivedDelete']" type="text" icon="delete" @click="handleDelete(row.receivedId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--      <el-dialog title="新增经费到账" :visible.sync="appropriationAccountDialogVisibleAdd" width="700px" append-to-body>-->
      <!--        <AddAppropriationAccount @close-dialog="closeAppropriationAccountDialog" :projectId="Number(projectId)" />-->
      <!--      </el-dialog>-->
      <!--      <el-dialog title="修改经费到账" :visible.sync="appropriationAccountDialogVisibleEdit" width="700px" append-to-body>-->
      <!--        <EditAppropriationAccount @close-dialog="closeAppropriationAccountDialog" :formData="formData" />-->
      <!--      </el-dialog>-->
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue';
import request from '@/utils/request';
import { fundsAndBalance } from '@/api/project/funds';

const props = defineProps<{
  projectId: number | null;
  visible: boolean;
}>();
const emits = defineEmits(['update:visible', 'close:visible']);
const closeFundsReceivedDialog = () => {
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

// 监听 projectId 变化
watch(
  () => props.projectId,
  (newVal) => {
    params.value.projectId = newVal;
    // 如果需要，可以执行 checkExpenditure();
  },
  { immediate: true }
);

// 格式化日期方法
const formatDate = (date: string) => {
  const parts = date.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${year}-${month}-${day}`;
  }
  return date;
};

const handleEdit = (row: any) => {
  console.log(row);
};

const handleDelete = (id: number) => {
  console.log(id);
};
// 新增按钮操作
const handleAdd = () => {
  isExpenditureAddDialogVisible.value = true;
};
// 查看预算及支出汇总
const checkOther = () => {
  fundsAndBalance(props.projectId).then((resp) => {
    // 处理获取到的数据
  });
};

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

onMounted(() => {
  console.log('pro_first_subject');
});
</script>

<style scoped></style>
