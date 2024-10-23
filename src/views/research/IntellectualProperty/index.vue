<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearchRef" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="ipParams" :inline="true">
            <el-form-item label="项目名称" prop="projectId">
              <el-cascader
                v-model="ipParams.projectId"
                :options="projectOptions"
                clearable
                :props="{ emitPath: false }"
                :show-all-levels="false"
                placeholder="请选择项目"
                @keyup.enter="handleQuery"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="知识产权名" prop="ipName" label-width="auto">
              <el-input v-model="ipParams.ipName" clearable placeholder="请输入知识产权名" @keyup.enter="handleQuery"></el-input>
            </el-form-item>
            <el-form-item label="知识产权类别" prop="ipType" label-width="auto">
              <el-select v-model="ipParams.ipType" clearable placeholder="请选择知识产权类别">
                <el-option v-for="dict in ip_type" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="知识产权状态" prop="ipStatus" label-width="auto">
              <el-select v-model="ipParams.ipStatus" placeholder="请选择知识产权状态" clearable>
                <el-option v-for="dict in ip_status" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目成员" prop="userId">
              <el-cascader
                v-model="ipParams.userId"
                :options="userOptions"
                :props="{ value: 'id', label: 'label', children: 'children', emitPath: false }"
                clearable
                :show-all-levels="false"
                placeholder="请选择项目成员"
                @keyup.enter="handleQuery"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="获得日期">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                unlink-panels
                clearable
                start-placeholder="请输入查询范围"
                end-placeholder="如：2000-01-01"
                :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
                value-format="YYYY-MM-DD"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>

            <!-- 搜索和重置按钮 -->
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>
    <el-card class="box-card" style="margin: auto">
      <!-- 新增 -->
      <template #header>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button v-hasPermi="['project:ip:add']" type="primary" plain icon="Plus" @click="handleAdd">新增 </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearchRef" @query-table="resetQuery"></right-toolbar>
        </el-row>
      </template>
      <div>
        <el-table ref="multipleTable" :data="iplist" border style="width: 100%">
          <el-table-column type="selection" width="55" align="center" />
          <!-- 关联项目名称 -->
          <el-table-column label="关联项目名称" :resizable="false" prop="assignedSubjectName" width="300"> </el-table-column>
          <!-- 知识产权名 -->
          <el-table-column label="知识产权名" :resizable="false" prop="ipName" width="300"> </el-table-column>
          <!-- 知识产权类别 -->
          <el-table-column label="知识产权类别" :resizable="false" prop="ipType" width="200">
            <template #default="scope">
              {{ ip_type[scope.row.ipType]?.label || '未知' }}
            </template>
          </el-table-column>
          <!-- 知识产权状态 -->
          <el-table-column label="知识产权状态" :resizable="false" prop="ipStatus" width="200">
            <template #default="scope">
              {{ ip_status[scope.row.ipStatus]?.label || '未知' }}
            </template>
          </el-table-column>
          <!-- 获得日期 -->
          <el-table-column label="获得日期" :resizable="false" prop="ipDate" width="150"> </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" :resizable="false" min-width="200px" fixed="right">
            <template #default="scope">
              <!-- 详情 -->
              <el-tooltip content="详情" placement="top">
                <el-button v-hasPermi="['project:ip:getDetails']" type="text" icon="Reading" @click="intellectualDetail(scope.row.ipId)"></el-button>
              </el-tooltip>
              <!-- 修改 -->
              <el-tooltip content="修改" placement="top">
                <el-button v-hasPermi="['project:ip:update']" type="text" icon="Edit" @click="handleUpdate(scope.row)"> </el-button>
              </el-tooltip>
              <!-- 删除 -->
              <el-tooltip content="删除" placement="top">
                <el-button v-hasPermi="['project:ip:delete']" type="text" icon="Delete" @click="handleDelete(scope.row)"> </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- 详情打开的界面 -->
        <el-dialog v-model="IntellectualDetail" title="详情" destroy-on-close width="1200px">
          <IntellectualDetails :ip-id="ipId" @close-dialog="closeIntellectualDetailDialog"></IntellectualDetails>
        </el-dialog>
        <!-- 新增/修改界面 -->
        <el-dialog v-model="IntellectualEdit" :model-value="isIPAddDialogVisible" :title="dialogTitle" width="700px" @close="closeAddIPDialog">
          <el-form ref="ipFormRef" :model="ipParams" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="知识产权名" :rules="[{ required: true, message: '请输入知识产权名', trigger: 'blur' }]" style="width: 300px">
                  <el-input v-model="ipParams.ipName" placeholder="请输入知识产权名" clearable style="width: 192px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="关联项目名称" style="width: 300px">
                  <el-cascader
                    v-model="ipParams.projectId"
                    :options="projectOptions"
                    clearable
                    :props="{ emitPath: false }"
                    :show-all-levels="false"
                    placeholder="请选择关联项目"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="知识产权类别" prop="ipType" style="width: 300px">
                  <el-select v-model="ipParams.ipType" clearable placeholder="请选择知识产权类别">
                    <el-option v-for="item in ipTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- 知识产权状态 -->
                <el-form-item label="知识产权状态" prop="ipStatus" style="width: 300px">
                  <el-select v-model="ipParams.ipStatus" placeholder="请选择知识产权状态" clearable>
                    <el-option v-for="item in ipStatusOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="获得日期" prop="ipDate" style="width: 300px">
                  <el-date-picker v-model="ipParams.ipDate" type="date" placeholder="选择日期" style="width: 192px" value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="知识产权成员" prop="responsePerson" style="width: 300px">
                  <el-cascader
                    v-model="ipParams.userIdList"
                    :options="userOptions"
                    :props="{
                      multiple: true,
                      checkStrictly: false,
                      emitPath: false,
                      value: 'id',
                      label: 'label',
                      children: 'children'
                    }"
                    collapse-tags
                    collapse-tags-tooltip
                    clearable
                    :show-all-levels="false"
                    placeholder="请选择成员"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="附件">
              <fileUpload ref="fileUpload" :id-list="ipParams.ossIdList" :model-value="sysOssVoList" />
            </el-form-item>
            <el-form-item style="text-align: center; margin-left: 180px">
              <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <!-- 分页 -->
      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      >
      </pagination>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="IntellectualProperty">
import { ref } from 'vue';
import IntellectualDetails from '../components/IntellectualProperty/IntellectualDetail.vue';
import api, { exportIntellectualPropertyList, getProjectIdNameMap } from '@/api/research/IntellectualProperty/index';
import { Option } from 'element-plus/es/components/segmented/src/types';
import { userTreeSelect } from '@/api/system/user';
import { IntellectualPropertyBO, IntellectualPropertyDetailVO, IntellectualPropertyVO } from '@/api/research/IntellectualProperty/types';
import { ElForm } from 'element-plus';
import { getDicts } from '@/api/system/dict/data';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { ip_type, ip_status } = toRefs<any>(proxy?.useDict('ip_type', 'ip_status'));

const pickerOptions = ref({});
const projectOptions = ref<Option[]>([]);
const userOptions = ref<any>([]);
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
const queryFormRef = ref<ElFormInstance>();
const iplist = ref<IntellectualPropertyVO[]>();
const ipId = ref<number>(0);
// 显隐参数
const total = ref<number>(0);
const showSearchRef = ref(true);
// 对话框
const IntellectualDetail = ref(false);
const IntellectualEdit = ref(false);
const isEditing = ref(false); // 用于区分新增和编辑
const dialogTitle = ref('新增知识产权');
const isIPAddDialogVisible = ref(false);
const ipFormRef = ref<InstanceType<typeof ElForm>>();
const ipTypeOptions = ref([]);
const ipStatusOptions = ref([]);
const sysOssVoList = ref([]);

const initIpParams: IntellectualPropertyBO = {
  ipId: undefined,
  projectId: undefined,
  ipName: '',
  ipType: '',
  ipStatus: undefined,
  userId: undefined,
  ipDateSta: '',
  ipDateEnd: '',
  ipDate: undefined,
  milestoneId: undefined,
  userIdList: [],
  ossIdList: []
};
const initQueryParams: PageQuery = {
  pageNum: 1,
  pageSize: 10
};

const data = reactive({
  ipParams: { ...initIpParams },
  queryParams: { ...initQueryParams }
});

const { ipParams, queryParams } = toRefs(data);

/** 查询项目树 */
const getProjectTreeSelect = async () => {
  const resp = await getProjectIdNameMap();
  projectOptions.value = resp.data;
};

/** 查询用户下拉树结构 */
const getUserTreeSelect = async () => {
  const resp = await userTreeSelect();
  userOptions.value = resp.data;
};

/** 获取知识产权数据 */
const getList = async () => {
  try {
    const resp = await api.getIntellectualPropertyList(data.queryParams, data.ipParams);
    iplist.value = resp.rows;
    total.value = resp.total;
  } catch (error) {
    console.error('获取知识产权数据时出错：', error);
  }
};

/** 查询按钮 */
const handleQuery = () => {
  // 检查 dateRange 是否为 null 或不符合预期
  if (!dateRange.value || !dateRange.value[0] || !dateRange.value[1]) {
    // 处理清空情况
    data.ipParams.ipDateSta = null; // 这里也可以用 '' 或其他表示空的值
    data.ipParams.ipDateEnd = null;
  } else {
    // 正常情况下赋值
    data.ipParams.ipDateSta = <string>dateRange.value[0];
    data.ipParams.ipDateEnd = <string>dateRange.value[1];
  }
  data.queryParams.pageNum = 1;
  getList();
};

/** 重置参数 */
const resetQuery = () => {
  dateRange.value = ['', ''];
  ipParams.value = { ...initIpParams };
  queryFormRef.value?.resetFields();
  getList();
};

/** 打开新增对话框 */
const handleAdd = () => {
  isEditing.value = false;
  isIPAddDialogVisible.value = true;
  sysOssVoList.value = [];
};

/** 打开详情对话框 */
const intellectualDetail = (ipIdRef: number) => {
  IntellectualDetail.value = true;
  ipId.value = ipIdRef;
};
/** 关闭详情对话框 */
const closeIntellectualDetailDialog = () => {
  resetQuery();
  IntellectualDetail.value = false;
};

/** 初始化字典 */
const initOptions = () => {
  const dicts = [
    { key: 'ip_type', ref: ipTypeOptions },
    { key: 'ip_status', ref: ipStatusOptions }
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

/** 打开修改对话框 */
const handleUpdate = async (row: IntellectualPropertyDetailVO) => {
  const resp = await api.getIntellectualPropertyDetails(row.ipId);
  sysOssVoList.value = resp.data.sysOssVoList;
  ipParams.value = {
    ...row, // 将行数据复制到表单中
    ipStatus: String(row.ipStatus),
    ipType: String(row.ipType),
    ossIdList: Array.isArray(resp.data.sysOssVoList) ? resp.data.sysOssVoList.map((item: any) => item.ossId) : [],
    userIdList: Array.isArray(resp.data.userPathList) ? resp.data.userPathList.map((item: any) => item[item.length - 1]) : []
  };
  isEditing.value = true;
  isIPAddDialogVisible.value = true;
  dialogTitle.value = '修改知识产权';
};

/** 删除按钮操作 */
const handleDelete = async (row?: IntellectualPropertyDetailVO) => {
  const ipId = row.ipId;
  await proxy.$modal.confirm('确认删除名为为' + row.ipName + '的数据项？');
  await api.deleteIntellectualProperty(ipId);
  await getList();
  proxy?.$modal.msgSuccess('删除成功');
};

/** 关闭新增对话框 */
const closeAddIPDialog = () => {
  isIPAddDialogVisible.value = false;
  ipParams.value = { ...initIpParams };
};

/** 新增知识产权 */
const submitNewIP = (formData: IntellectualPropertyBO) => {
  const formRef = ipFormRef.value;
  if (formRef) {
    formRef.validate((valid) => {
      api
        .addIntellectualProperty(data.ipParams)
        .then(() => {
          ElMessage.success('新增知识产权成功');
        })
        .catch(() => {
          ElMessage.error('新增知识产权失败');
        })
        .finally(() => {
          closeAddIPDialog();
          getList();
        });
    });
  }
};

/** 修改知识产权 */
const updateIP = (formData: IntellectualPropertyBO) => {
  api
    .updateIntellectualProperty(data.ipParams)
    .then(() => {
      ElMessage.success('修改知识产权成功');
    })
    .catch(() => {
      ElMessage.error('修改知识产权失败');
    })
    .finally(() => {
      closeAddIPDialog();
      getList();
    });
};

/** 新增按钮操作 */
const onSubmit = () => {
  if (isEditing.value) {
    updateIP({ ...ipParams.value });
  } else {
    submitNewIP({ ...ipParams.value });
  }
};

const handleExport = () => {
  exportIntellectualPropertyList(data.ipParams).then((response) => {
    const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `知识产权_${new Date().getTime()}.xlsx`; // 设置下载文件名
    link.click();
    window.URL.revokeObjectURL(url);
  });
};

// 组件挂载时执行
onMounted(() => {
  getProjectTreeSelect();
  getUserTreeSelect();
  getList();
  initOptions();
});
</script>
