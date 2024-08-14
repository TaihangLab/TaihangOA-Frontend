<template>
  <el-dialog :model-value="visible" title="经费到账" width="60%" @update:model-value="updateVisible" @close="closeFundsReceivedDialog">
    <div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button v-hasPermi="['project:expense:receivedAdd']" type="primary" plain icon="plus" @click="handleAdd"> 新增 </el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 10px"></div>
      <el-table :data="fundsReceivedList" style="width: 100%; overflow-y: auto" border>
        <el-table-column align="center" prop="amountReceived" :show-overflow-tooltip="true" width="150px">
          <template #header>
            <div style="text-align: center">
              <span>拨款金额</span>
              <span style="font-size: 12px; color: #f56c6c">（万元）</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="到账类型" align="center" prop="receivedType" :show-overflow-tooltip="true" width="120px">
          <template #default="scope">
            {{ pro_received_type[scope.row.receivedType]?.label || '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="来款单位" align="center" prop="receivedFrom" :show-overflow-tooltip="true" width="180px" />
        <el-table-column label="到账时间" align="center" prop="receivedDate" :show-overflow-tooltip="true" width="150px" />
        <el-table-column label="附件" align="center" :show-overflow-tooltip="true" width="280">
          <template #default="{ row }">
            <div v-for="file in row.sysOsses" :key="file.ossId">
              <el-button type="text" @click="handleDownload(file)">{{ file.originalName }}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="'操作'" :resizable="false" align="center" min-width="80px" fixed="right">
          <template #default="{ row }">
            <el-button v-hasPermi="['project:expense:receivedEdit']" type="text" icon="edit" @click="handleEdit(row.receivedId)">修改</el-button>
            <el-button v-hasPermi="['project:expense:receivedDelete']" type="text" icon="delete" @click="handleDelete(row.receivedId)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>

  <el-dialog
    :model-value="isExpenditureAddDialogVisible"
    title="新增经费到账"
    width="750px"
    @update:model-value="updateAddDialogVisible"
    @close="closeAddReceivedDialog"
  >
    <el-form ref="receivedFormRef" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="拨款金额" prop="amountReceived">
            <el-input v-model="form.amountReceived" style="width: 192px">
              <template #append>
                <span style="font-size: 12px; color: #f56c6c">万元</span>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到账类型" prop="receivedType">
            <el-select v-model="form.receivedType" placeholder="请选择类型" style="width: 192px" clearable>
              <el-option
                v-for="item in receivedTypes"
                :key="item.receivedTypeId"
                :label="item.receivedTypeName"
                :value="item.receivedTypeId"
                :disabled="item.status === 1"
                style="width: 192px"
              ></el-option>
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
              <el-date-picker
                v-model="form.receivedDate"
                type="date"
                placeholder="选择日期"
                style="width: 192px"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="附件">
        <FileUpload :id-list="form.ossIds" />
      </el-form-item>
      <el-form-item style="display: flex; justify-content: center">
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup name="Received" lang="ts">
import { defineProps, ref, watch, defineEmits, onMounted } from 'vue';
import { ElForm } from 'element-plus';
import { addFundsReceived, deleteFundsReceived, getFundsReceivedList } from '@/api/project/funds';
import { getDicts } from '@/api/system/dict/data';
import { ProjectFundsReceived, ProjectFundsReceivedVo } from '@/api/project/funds/types';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { pro_received_type } = toRefs<any>(proxy?.useDict('pro_received_type'));

const props = defineProps<{
  projectId: number | null;
  visible: boolean;
}>();
const emits = defineEmits(['update:visible', 'close:visible']);
const closeFundsReceivedDialog = () => {
  emits('close:visible', false);
};
const receivedFormRef = ref<InstanceType<typeof ElForm>>();
const loading = ref(true);
const isExpenditureAddDialogVisible = ref(false);
const fundsReceivedList = ref<ProjectFundsReceivedVo[]>();
const receivedTypes = ref([]);

const initFormData: ProjectFundsReceived = {
  amountReceived: undefined,
  receivedDate: '',
  receivedFrom: '',
  receivedType: undefined,
  ossIds: [],
  projectId: props.projectId
};

const data = reactive({
  form: { ...initFormData }
});

const { form } = toRefs(data);

const rules = {
  amountReceived: [{ required: true, message: '请输入金额数', trigger: 'blur' }]
};

function handleDownload(row: any) {
  proxy?.$download.oss(row.ossId);
}

const closeAddReceivedDialog = () => {
  isExpenditureAddDialogVisible.value = false;
};
/** 获取经费到账列表 */
const fetchFundsReceivedList = () => {
  if (props.projectId !== undefined) {
    getFundsReceivedList(props.projectId).then((resp) => {
      fundsReceivedList.value = resp.data;
    });
  }
};

const resetForm = () => {
  form.value = { ...initFormData };
};

// 监听 projectId 变化
watch(
  () => [props.projectId, props.visible],
  ([newProjectId, newVisible]) => {
    if (newProjectId !== undefined) {
      fetchFundsReceivedList();
    }
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

/** 删除经费到账记录 */
const handleDelete = (id: number) => {
  loading.value = true;
  // 显示确认对话框
  ElMessageBox.confirm('确认删除该项经费到账记录？', '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 用户点击“确定”按钮
      loading.value = true;
      deleteFundsReceived(id)
        .then(() => {
          ElMessage.success('删除经费到账成功');
          fetchFundsReceivedList();
        })
        .catch(() => {
          ElMessage.error('删除经费到账失败');
        })
        .finally(() => {
          loading.value = false;
        });
    })
    .catch(() => {
      // 用户点击“取消”按钮
      ElMessage.info('删除操作已取消');
    });
  fetchFundsReceivedList();
  loading.value = false;
};

// 新增按钮操作
const handleAdd = () => {
  isExpenditureAddDialogVisible.value = true;
};

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const updateAddDialogVisible = (value: boolean) => {
  isExpenditureAddDialogVisible.value = value;
};
/** 获取经费到账类型 */
const getReceivedTypes = () => {
  getDicts('pro_received_type').then((resp) => {
    resp.data.forEach((item) => {
      receivedTypes.value.push({
        receivedTypeId: item.dictValue,
        receivedTypeName: item.dictLabel
      });
    });
  });
};
/** 添加经费到账记录 */
const submitNewReceived = (formData: ProjectFundsReceived) => {
  formData.projectId = props.projectId; // Ensure projectId is set
  const formRef = receivedFormRef.value;
  if (formRef) {
    formRef.validate((valid) => {
      if (valid) {
        addFundsReceived(formData)
          .then(() => {
            ElMessage.success('新增经费到账成功');
            fetchFundsReceivedList();
          })
          .catch(() => {
            ElMessage.error('新增经费到账失败');
          })
          .finally(() => {
            isExpenditureAddDialogVisible.value = false;
            resetForm();
          });
      }
    });
  } else {
    isExpenditureAddDialogVisible.value = false;
  }
};
/** 点击确定添加按钮 */
const onSubmit = () => {
  submitNewReceived({ ...form.value }); // Pass a copy of the form data
};

onMounted(() => {
  getReceivedTypes();
});
</script>

<style scoped></style>
