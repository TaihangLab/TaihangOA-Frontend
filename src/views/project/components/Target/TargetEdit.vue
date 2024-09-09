<template>
  <el-dialog :model-value="visible" title="指标推进" width="1000px" @update:model-value="updateVisible" @close="closeTargetEditDialog">
    <div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button v-hasPermi="['project:expense:receivedAdd']" type="primary" plain icon="plus" @click="handleAdd"> 新增推进情况 </el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 10px"></div>
      <el-collapse v-model="activeNames" accordion @change="handleCollapseChange">
        <el-collapse-item v-for="item in targetList" :key="item.targetId" :name="item.targetId">
          <template #title>
            <span style="font-weight: bold; font-size: 16px">{{ item.targetName }}</span>
          </template>
          <div class="content">
            <p><strong>中期目标:</strong> {{ item.midtermTarget }}</p>
            <p><strong>最终目标:</strong> {{ item.endTarget }}</p>
          </div>
          <el-table v-loading="loading" :data="progressData[item.targetId] || []" border style="width: 100%">
            <el-table-column label="指标完成情况" :resizable="false" align="center" prop="completionStatus" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="进度详细描述" :resizable="false" align="center" prop="detailedDescription" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="进度完成时间" :resizable="false" align="center" prop="completionTime" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="操作" :resizable="false" align="center" width="165px" fixed="right">
              <template #default="{ row }">
                <el-button v-hasPermi="['project:expense:receivedEdit']" type="text" icon="edit" size="small" @click="handleEdit(row)"
                  >修改</el-button
                >
                <el-button v-hasPermi="['project:expense:receivedDelete']" type="text" icon="delete" size="small" @click="handleDelete(row)"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog
      :model-value="isProgressAddDialogVisible"
      :title="dialogTitle"
      width="600px"
      @update:model-value="updateAddDialogVisible"
      @close="closeAddProgressDialog"
    >
      <el-form ref="progressFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="对应指标" prop="targetId">
          <el-select v-model="progressFrom.targetId" placeholder="请选择指标" style="width: 340px" :disabled="isEdit" clearable>
            <el-option
              v-for="item in targetList"
              :key="item.targetId"
              :label="item.targetName"
              :value="item.targetId"
              style="width: 240px"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推进情况" prop="completionStatus">
          <el-input v-model="progressFrom.completionStatus" style="width: 340px" placeholder="请填写推进情况"></el-input>
        </el-form-item>
        <el-form-item label="推进日期" prop="completionTime">
          <el-date-picker
            v-model="progressFrom.completionTime"
            type="date"
            placeholder="选择日期"
            style="width: 340px"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="详细描述" prop="detailedDescription">
          <el-input
            v-model="progressFrom.detailedDescription"
            style="width: 340px"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder="请填写详细情况"
          ></el-input>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: center">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-dialog>
</template>

<script setup lang="ts" Name="TargetEdit">
import { defineEmits, defineProps, ref, watch } from 'vue';
import {
  addProjectTargetProgress,
  deleteProjectTargetProgress,
  getAllProjectTargetList,
  getProjectTargetDetail,
  updateProjectTargetProgress
} from '@/api/project/target';
import { ProjectTargetBO, ProjectTargetProgressBO, ProjectTargetProgressVO, ProjectTargetVO } from '@/api/project/target/types';
import { ElForm } from 'element-plus';

const targetList = ref<ProjectTargetVO[]>([]);
const progressData = ref<Record<number, ProjectTargetProgressVO[]>>({});
const loading = ref(true);
const isProgressAddDialogVisible = ref(false);
const dialogTitle = ref('新增指标推进');
const progressFormRef = ref<InstanceType<typeof ElForm>>();
const activeNames = ref<number | string>('');
const isEdit = ref(false);
const props = defineProps<{
  projectId: string | number | undefined;
  visible: boolean;
}>();

const initForm: ProjectTargetBO = {
  projectId: props.projectId
};

const initProgressForm: ProjectTargetProgressBO = {
  progressId: undefined,
  targetId: undefined,
  completionStatus: '',
  completionTime: '',
  detailedDescription: ''
};

const data = reactive({
  form: { ...initForm },
  progressFrom: { ...initProgressForm },
  queryParams: {
    pageNum: 1,
    pageSize: 100
  }
});
const rules = {
  // targetId: [{ required: true, message: '请输入对应指标', trigger: 'blur' }],
  // completionStatus: [{ required: true, message: '请输入推进情况', trigger: 'blur' }],
  // completionTime: [{ required: true, message: '请输入推进时间', trigger: 'blur' }]
};

const { form, progressFrom, queryParams } = toRefs(data);
const emits = defineEmits(['update:visible', 'close:visible']);

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const closeTargetEditDialog = () => {
  emits('close:visible', false);
};

const getProjectTargetList = async () => {
  await getAllProjectTargetList(data.form, data.queryParams).then((res) => {
    targetList.value = res.rows;
  });
};

const getProjectTargetProgress = async (targetId: number) => {
  loading.value = true;
  progressFrom.value.targetId = targetId;
  await getProjectTargetDetail(data.progressFrom, data.queryParams)
    .then((res) => {
      progressData.value[targetId] = res.rows; // 将每个指标的推进情况存储在 progressData 中
    })
    .finally(() => {
      loading.value = false;
    });
};

// 处理折叠面板展开事件
const handleCollapseChange = (activeName: number | string | (number | string)[]) => {
  // 通过 activeNames 获取当前激活的 targetId
  const targetId = Array.isArray(activeName) ? activeName[0] : activeName;
  console.log('handleCollapseChange', targetId);
  if (targetId && !progressData[targetId]) {
    getProjectTargetProgress(Number(targetId));
  }
};

// 打开对话框时，默认展开第一个折叠项
const expandFirstCollapseItem = () => {
  if (targetList.value.length > 0) {
    activeNames.value = targetList.value[0].targetId; // 默认展开第一个折叠项
    getProjectTargetProgress(Number(activeNames.value)); // 加载第一个折叠项的内容
  }
};

const handleAdd = () => {
  resetForm();
  isEdit.value = false;
  isProgressAddDialogVisible.value = true;
  dialogTitle.value = '新增指标推进';
};

const handleEdit = (row: ProjectTargetProgressVO) => {
  isEdit.value = true;
  isProgressAddDialogVisible.value = true;
  dialogTitle.value = '编辑指标推进';
  progressFrom.value = { ...row };
};

const updateAddDialogVisible = (value: boolean) => {
  isProgressAddDialogVisible.value = value;
};

/** 重置表单 */
const resetForm = () => {
  progressFrom.value = { ...initProgressForm };
};

/** 关闭新增指标推进对话框 */
const closeAddProgressDialog = () => {
  isProgressAddDialogVisible.value = false;
  resetForm();
};

/** 添加指标推进情况 */
const submitNewProgress = (formData: ProjectTargetProgressBO) => {
  const formRef = progressFormRef.value;
  if (formRef) {
    formRef.validate((valid) => {
      if (valid) {
        addProjectTargetProgress(formData)
          .then(() => {
            ElMessage.success('新增指标推进成功');
            getProjectTargetList();
          })
          .catch(() => {
            ElMessage.error('新增指标推进失败');
          })
          .finally(() => {
            isProgressAddDialogVisible.value = false;
            resetForm();
          });
      }
    });
  } else {
    isExpenditureAddDialogVisible.value = false;
  }
};

const updateProgress = (formData: ProjectTargetProgressBO) => {
  updateProjectTargetProgress(formData)
    .then(() => {
      ElMessage.success('编辑指标推进成功');
      getProjectTargetProgress(formData.targetId);
    })
    .catch(() => {
      ElMessage.error('编辑指标推进失败');
    })
    .finally(() => {
      isProgressAddDialogVisible.value = false;
      resetForm();
    });
};

/** 删除指标推进情况 */
const handleDelete = (row: ProjectTargetProgressVO) => {
  ElMessageBox.confirm('确定删除该条数据吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteProjectTargetProgress(row.progressId)
      .then(() => {
        ElMessage.success('删除成功');
        getProjectTargetProgress(row.targetId);
      })
      .catch(() => {
        ElMessage.error('删除失败');
      });
  });
};

const onSubmit = () => {
  if (dialogTitle.value === '新增指标推进') {
    submitNewProgress({ ...progressFrom.value });
  } else if (dialogTitle.value === '编辑指标推进') {
    updateProgress({ ...progressFrom.value });
  }
};

// 监听 visible 属性，当对话框打开时，展开第一个折叠项
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      expandFirstCollapseItem();
    }
  },
  { immediate: true }
);

watch(
  () => props.projectId,
  (newEditProjectId) => {
    if (newEditProjectId !== undefined) {
      form.value.projectId = newEditProjectId;
      getProjectTargetList().then(() => {
        expandFirstCollapseItem();
      });
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss"></style>
