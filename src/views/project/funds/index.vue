<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="项目成员" prop="roleName">
              <el-input v-model="queryParams.roleName" placeholder="请输入项目名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="课题名称" prop="roleKey">
              <el-input v-model="queryParams.roleKey" placeholder="请输入课题名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="项目级别" prop="roleKey">
              <el-input v-model="queryParams.roleKey" placeholder="请输入项目级别" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="hover">
      <template #header>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd()">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button disabled type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table ref="roleTableRef" v-loading="loading" :data="roleList" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="项目名称" fixed="left" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="课题名称" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="项目级别" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="项目经费总额（万元）" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="专项经费预算（万元）" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="专项经费已支付（万元）" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="专项经费未支付（万元）" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="自筹经费预算（万元）" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="自筹经费已支付（万元）" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="自筹经费未支付（万元）" prop="roleName" :show-overflow-tooltip="true" min-width="10%" />

        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-tooltip v-if="scope.row.roleId !== 1" content="详情" placement="top">
              <el-button v-hasPermi="['system:role:edit']" link type="primary" icon="Reading" @click="showFundsDetailDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.roleId !== 1" content="查看支出" placement="top">
              <el-button v-hasPermi="['system:role:edit']" link type="primary" icon="view" @click="showExpenditureCheckDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.roleId !== 1" content="支出录入" placement="top">
              <el-button
                v-hasPermi="['system:role:edit']"
                link
                type="primary"
                icon="document-add"
                @click="showExpenditureEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.roleId !== 1" content="经费到账" placement="top">
              <el-button v-hasPermi="['system:role:edit']" link type="primary" icon="Money" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <DetailDialog :visible="isDetailDialogVisible" @update:visible="isDetailDialogVisible = $event" />
      <ExpenditureCheck
        :projectId="Number(projectId)"
        :visible="isExpenditureCheckDialogVisible"
        @close:visible="isExpenditureCheckDialogVisible = $event"
        @update:visible="isExpenditureCheckDialogVisible = $event"
      />
      <ExpenditureEntry
        :projectId="Number(projectId)"
        :visible="isExpenditureEditDialogVisible"
        @close:visible="isExpenditureEditDialogVisible = $event"
        @update:visible="isExpenditureEditDialogVisible = $event"
      />
      <FundsDetail :visible="isFundsDetailVisible" @update:visible="isFundsDetailVisible = $event" />

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </el-card>
  </div>
</template>

<script setup name="Role" lang="ts">
import { addRole, changeRoleStatus, dataScope, delRole, getRole, listRole, updateRole, deptTreeSelect } from '@/api/system/role';
import { roleMenuTreeselect, treeselect as menuTreeselect } from '@/api/system/menu/index';
import { RoleVO, RoleForm, RoleQuery, DeptTreeOption } from '@/api/system/role/types';
import { MenuTreeOption, RoleMenuTree } from '@/api/system/menu/types';
import { ref } from 'vue';
import FundsDetail from '@/views/project/components/Funds/FundsDetails.vue';
import ExpenditureCheck from '../components/Funds/ExpenditureCheck.vue';
import ExpenditureEntry from '../components/Funds/ExpenditureEntry.vue';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const roleList = ref<RoleVO[]>();
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
const menuOptions = ref<MenuTreeOption[]>([]);
const menuExpand = ref(false);
const menuNodeAll = ref(false);
const deptExpand = ref(true);
const deptNodeAll = ref(false);
const deptOptions = ref<DeptTreeOption[]>([]);

const isDetailDialogVisible = ref(false);
const isExpenditureCheckDialogVisible = ref(false);
const isExpenditureEditDialogVisible = ref(false);

const isFundsDetailVisible = ref(false);

/** 数据范围选项*/
const queryFormRef = ref<ElFormInstance>();
const roleFormRef = ref<ElFormInstance>();
const dataScopeRef = ref<ElFormInstance>();
const menuRef = ref<ElTreeInstance>();
const deptRef = ref<ElTreeInstance>();

const showFundsDetailDialog = (row: RoleVO) => {
  // 在这里可以设置要显示的详情内容
  isFundsDetailVisible.value = true;
  console.log(isFundsDetailVisible.value);
};

const showExpenditureCheckDialog = (row: RoleVO) => {
  isExpenditureCheckDialogVisible.value = true;
};

const showExpenditureEditDialog = (row: RoleVO) => {
  isExpenditureEditDialogVisible.value = true;
};

const initForm: RoleForm = {
  roleId: undefined,
  roleSort: 1,
  status: '0',
  roleName: '',
  roleKey: '',
  menuCheckStrictly: true,
  deptCheckStrictly: true,
  remark: '',
  dataScope: '1',
  menuIds: [],
  deptIds: []
};

const data = reactive<PageData<RoleForm, RoleQuery>>({
  form: { ...initForm },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    roleName: '',
    roleKey: '',
    status: ''
  },
  rules: {
    roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
    roleKey: [{ required: true, message: '权限字符不能为空', trigger: 'blur' }],
    roleSort: [{ required: true, message: '角色顺序不能为空', trigger: 'blur' }]
  }
});
const { form, queryParams, rules } = toRefs(data);

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

/**
 * 查询角色列表
 */
const getList = () => {
  loading.value = true;
  listRole(proxy?.addDateRange(queryParams.value, dateRange.value)).then((res) => {
    roleList.value = res.rows;
    total.value = res.total;
    loading.value = false;
  });
};

/**
 * 搜索按钮操作
 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置 */
const resetQuery = () => {
  dateRange.value = ['', ''];
  queryFormRef.value?.resetFields();
  handleQuery();
};
/**删除按钮操作 */
const handleDelete = async (row?: RoleVO) => {
  const roleids = row?.roleId || ids.value;
  await proxy?.$modal.confirm('是否确认删除角色编号为' + roleids + '数据项目');
  await delRole(roleids);
  getList();
  proxy?.$modal.msgSuccess('删除成功');
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'system/role/export',
    {
      ...queryParams.value
    },
    `role_${new Date().getTime()}.xlsx`
  );
};
/** 多选框选中数据 */
const handleSelectionChange = (selection: RoleVO[]) => {
  ids.value = selection.map((item: RoleVO) => item.roleId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 角色状态修改 */
const handleStatusChange = async (row: RoleVO) => {
  let text = row.status === '0' ? '启用' : '停用';
  try {
    await proxy?.$modal.confirm('确认要"' + text + '""' + row.roleName + '"角色吗?');
    await changeRoleStatus(row.roleId, row.status);
    proxy?.$modal.msgSuccess(text + '成功');
  } catch {
    row.status = row.status === '0' ? '1' : '0';
  }
};

/** 查询菜单树结构 */
const getMenuTreeselect = async () => {
  const res = await menuTreeselect();
  menuOptions.value = res.data;
};
/** 重置新增的表单以及其他数据  */
const reset = () => {
  menuRef.value?.setCheckedKeys([]);
  menuExpand.value = false;
  menuNodeAll.value = false;
  deptExpand.value = true;
  deptNodeAll.value = false;
  form.value = { ...initForm };
  roleFormRef.value?.resetFields();
};

/** 添加角色 */
const handleAdd = () => {
  reset();
  getMenuTreeselect();
  dialog.visible = true;
  dialog.title = '添加角色';
};
/** 修改角色 */
const handleUpdate = async (row?: RoleVO) => {
  reset();
  const roleId = row?.roleId || ids.value[0];
  const { data } = await getRole(roleId);
  Object.assign(form.value, data);
  form.value.roleSort = Number(form.value.roleSort);
  const res = await getRoleMenuTreeselect(roleId);
  dialog.title = '修改角色';
  dialog.visible = true;
  res.checkedKeys.forEach((v) => {
    nextTick(() => {
      menuRef.value?.setChecked(v, true, false);
    });
  });
};
/** 根据角色ID查询菜单树结构 */
const getRoleMenuTreeselect = (roleId: string | number) => {
  return roleMenuTreeselect(roleId).then((res): RoleMenuTree => {
    menuOptions.value = res.data.menus;
    return res.data;
  });
};
/** 树权限（展开/折叠）*/
const handleCheckedTreeExpand = (value: boolean, type: string) => {
  if (type == 'menu') {
    let treeList = menuOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      if (menuRef.value) {
        menuRef.value.store.nodesMap[treeList[i].id].expanded = value;
      }
    }
  } else if (type == 'dept') {
    let treeList = deptOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      if (deptRef.value) {
        deptRef.value.store.nodesMap[treeList[i].id].expanded = value;
      }
    }
  }
};

onMounted(() => {
  getList();
});
</script>
