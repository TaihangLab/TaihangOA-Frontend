<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearchRef" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="ipParams" :inline="true">
            <el-form-item label="项目名称" prop="projectId">
              <el-cascader
                v-model="responseProject"
                :options="projectOptions"
                clearable
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
            <el-form-item label="项目成员" prop="userIdList">
              <el-cascader
                v-model="responseUser"
                :options="userOptions"
                :props="{ value: 'id', label: 'label', children: 'children' }"
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
            <el-button disabled type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearchRef" @query-table="resetQuery"></right-toolbar>
        </el-row>
      </template>
      <div>
        <el-table ref="multipleTable" :data="iplist" border style="width: 100%">
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
                <el-button v-hasPermi="['project:ip:getDetails']" type="text" icon="Reading" @click="lookIntellectual(scope.row.ipId)"></el-button>
              </el-tooltip>
              <!-- 修改 -->
              <el-tooltip content="修改" placement="top">
                <el-button v-hasPermi="['project:ip:update']" type="text" icon="Edit" @click="handleUpdate(scope.row.ipId)"> </el-button>
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
          <IntellectualDetails :ip-id="ipId" @close-dialog="closeIntellectualDialogLook"></IntellectualDetails>
        </el-dialog>
        <!--新增知识产权-->
        <el-dialog v-model="intellectualDialogVisibleAdd" title="新增知识产权" destroy-on-close width="700px">
          <AddIntellectual @close-dialog="closeIntellectualDialog"></AddIntellectual>
        </el-dialog>
        <!--修改知识产权-->
        <el-dialog v-model="intellectualDialogVisibleEdit" title="修改知识产权" destroy-on-close width="700px">
          <EditIntellectual :ip-id="ipId" @close-dialog="closeIntellectualDialogs"></EditIntellectual>
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
import { ref, onMounted } from 'vue';
import AddIntellectual from '../components/IntellectualProperty/AddIntellectual.vue';
import EditIntellectual from '../components/IntellectualProperty/EditIntellectual.vue';
import IntellectualDetails from '../components/IntellectualProperty/IntellectualDetail.vue';
import api from '@/api/research/IntellectualProperty/index';
import { Option } from 'element-plus/es/components/segmented/src/types';
import { getProjectTree } from '@/api/research/IntellectualProperty';
import { userTreeSelect } from '@/api/system/user';
import { IntellectualPropertyBO, IntellectualPropertyDetailVO, IntellectualPropertyVO } from '@/api/research/IntellectualProperty/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { ip_type, ip_status } = toRefs<any>(proxy?.useDict('ip_type', 'ip_status'));

// 组件绑定的消息
const responseProject = ref([]);
const responseUser = ref([]);
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
const intellectualDialogVisibleAdd = ref(false);
const intellectualDialogVisibleEdit = ref(false);

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

// 组件挂载时执行
onMounted(() => {
  getProjectTreeSelect();
  getUserTreeSelect();
  getList();
});

/** 查询项目树 */
const getProjectTreeSelect = async () => {
  const resp = await getProjectTree();
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
  data.ipParams.ipDateSta = String(dateRange.value[0]);
  data.ipParams.ipDateEnd = String(dateRange.value[1]);
  data.ipParams.projectId = Array.isArray(responseProject.value) ? responseProject.value[1] : undefined;
  data.ipParams.userId = Array.isArray(responseUser.value) ? responseUser.value[responseUser.value.length - 1] : undefined;
  data.queryParams.pageNum = 1;
  getList();
};

/** 重置参数 */
const resetQuery = () => {
  responseProject.value = [];
  responseUser.value = [];
  dateRange.value = ['', ''];
  ipParams.value = { ...initIpParams };
  queryFormRef.value?.resetFields();
  getList();
};

/** 打开新增对话框 */
const handleAdd = () => {
  intellectualDialogVisibleAdd.value = true;
};
/** 关闭新增对话框 */
const closeIntellectualDialog = () => {
  intellectualDialogVisibleAdd.value = false;
  intellectualDialogVisibleEdit.value = false;
  resetQuery();
};
/** 打开详情对话框 */
const lookIntellectual = (ipIdRef: number) => {
  IntellectualDetail.value = true;
  ipId.value = Number(ipIdRef);
};
/** 关闭详情对话框 */
const closeIntellectualDialogLook = () => {
  resetQuery();
  ipId.value = 0;
  IntellectualDetail.value = false;
};
/** 打开修改对话框 */
const handleUpdate = (ipIdRef: number) => {
  intellectualDialogVisibleEdit.value = true;
  ipId.value = ipIdRef;
};
/** 关闭修改对话框 */
const closeIntellectualDialogs = () => {
  intellectualDialogVisibleEdit.value = false;
  resetQuery();
};
/** 删除按钮操作 */
const handleDelete = async (row?: IntellectualPropertyDetailVO) => {
  const ipId = row.ipId;
  await proxy.$modal.confirm('确认删除编号为' + ipId + '的数据项？');
  await api.deleteIntellectualProperty(ipId);
  await getList();
  proxy?.$modal.msgSuccess('删除成功');
};

const handleExport = () => {
  proxy.$modal.msgError('导出功能未实现');
};
</script>
