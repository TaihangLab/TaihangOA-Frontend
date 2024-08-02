<template>
  <el-dialog :model-value="visible" title="经费到账" width="60%" @update:model-value="updateVisible"
             @close="closeFundsReceivedDialog">
    <div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button v-hasPermi="['project:expense:receivedAdd']" type="primary" plain icon="plus" @click="handleAdd">
            新增
          </el-button>
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
        <el-table-column label="到账类型" align="center" prop="receivedType" :show-overflow-tooltip="true"
                         width="120px" />
        <el-table-column label="来款单位" align="center" prop="receivedFrom" :show-overflow-tooltip="true"
                         width="180px" />
        <el-table-column label="到账时间" align="center" prop="receivedDate" :show-overflow-tooltip="true"
                         width="150px" />
        <el-table-column label="附件" align="center" :show-overflow-tooltip="true" width="280">
          <template #default="{ row }">
            <div v-for="file in row.sysOsses" :key="file.ossId">
              <el-button type="text" href="#">{{ file.originalName }}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="'操作'" :resizable="false" align="center" min-width="80px" fixed="right">
          <template #default="{ row }">
            <el-button v-hasPermi="['project:expense:receivedEdit']" type="text" icon="edit" @click="handleEdit(row)">
              修改
            </el-button>
            <el-button v-hasPermi="['project:expense:receivedDelete']" type="text" icon="delete"
                       @click="handleDelete(row.receivedId)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>

  <el-dialog :model-value="isExpenditureAddDialogVisible" title="新增经费到账" width="700px"
             @update:model-value="updateAddDialogVisible">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="拨款金额" prop="amountReceived">
            <el-input v-model="form.amountReceived" style="width: 192px">
              <template v-slot:append>
                <span style="font-size: 12px; color: #F56C6C;">万元</span>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到账类型" prop="receivedType">
            <el-select v-model="form.receivedType" placeholder="请选择类型" style="width: 192px" clearable>
              <el-option v-for="item in receivedTypes" :key="item.receivedTypeId" :label="item.receivedTypeName"
                         :value="item.receivedTypeId" :disabled="item.status === 1" style="width: 192px"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="来款单位" prop="receivedFrom">
            <el-input v-model="form.receivedFrom" style="width: 192px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到账日期" prop="receivedDate">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.receivedDate" style="width: 192px"
                              value-format="YYYY-MM-DD"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="附件">
        <FileUpload ref="fujian" :idList="form.ossIds" />
      </el-form-item>
      <el-form-item style="display: flex; justify-content: center;">
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, defineEmits, onMounted } from 'vue';
import { ElForm } from 'element-plus';
import request from '@/utils/request';
import { fundsAndBalance } from '@/api/project/funds';
import { getDicts } from '@/api/system/dict/data';

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

// 表单数据
const form = ref({
  projectId: undefined as number | undefined,
  amountReceived: '',
  receivedType: '',
  receivedFrom: '',
  receivedDate: '',
  ossIds: [] as number[]
});

const receivedTypes = ref([]);
// 表单验证规则
const rules = {
  amountReceived: [
    { required: true, message: '请输入金额数', trigger: 'blur' }
  ]
};

// 表单引用
const formRef = ref<InstanceType<typeof ElForm> | null>(null);

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

const updateAddDialogVisible = (value: boolean) => {
  isExpenditureAddDialogVisible.value = value;
};

const getReceivedTypes = () => {
  getDicts('pro_received_type').then((resp) => {
    resp.data.forEach((item) => {
      receivedTypes.value.push({
        receivedTypeId: item.dictValue,
        receivedTypeName: item.dictLabel
      })
    })
  })
}

const submitNewFund = () => {
  if (formRef.value) {
    formRef.value.validate((valid) => {
      if (valid) {
        // 提交新增经费到账表单
        console.log('提交新增经费到账表单', form.value);
        isExpenditureAddDialogVisible.value = false; // 关闭对话框
      } else {
        console.log('表单验证失败');
      }
    });
  }
};

const onSubmit = () => {
  console.log('提交新增经费到账表单', form.value);
}

onMounted(() => {
  getReceivedTypes()
});
</script>

<style scoped></style>
