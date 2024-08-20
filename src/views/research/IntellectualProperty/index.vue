<template>
  <div>
      <el-form ref="dataForm" :inline="true" class="demo-form-inline" style="margin-left: 30px; margin-top: 20px;">
          <el-form-item label="项目名称">
              <el-cascader v-model="responsibleproject" :options="projecttree" clearable :show-all-levels="false"
                           placeholder="请选择项目" @keyup.enter="handleQuery"></el-cascader>
          </el-form-item>
          <el-form-item label="知识产权名">
              <el-input
                  v-model="responsibleIp"
                  clearable
                  placeholder="请输入知识产权名"
                  @keyup.enter="handleQuery"
              ></el-input>
          </el-form-item>
          <el-form-item label="知识产权类别">
              <el-select v-model="responsibleType" placeholder="请选择知识产权类别">
                  <el-option v-for="(label, value) in ipType" :label="label" :value="value" :key="value"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="知识产权状态">
              <el-select v-model="responsibleJobTitle" placeholder="请选择知识产权状态">
                  <el-option v-for="(label, value) in ipStatus" :label="label" :value="value" :key="value"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="项目成员">
              <el-cascader
                  v-model="responsiblePerson"
                  :options="cascaderOptions"
                  clearable
                  :show-all-levels="false"
                  placeholder="请选择项目成员"
                  @keyup.enter="handleQuery"
              ></el-cascader>
          </el-form-item>
          <el-form-item label="获得日期">
              <el-date-picker
                  v-model="projectEstablishTime"
                  type="daterange"
                  unlink-panels
                  clearable
                  start-placeholder="请输入查询范围"
                  end-placeholder="如：2000-01-01"
                  value-format="YYYY-MM-DD"
                  @change="getList"
                  :picker-options="pickerOptions"
                  @keyup.enter="handleQuery"
              ></el-date-picker>
          </el-form-item>

          <el-form-item>
              <el-button type="primary" icon="el-icon-search"  @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh"  @click="resetQuery">重置</el-button>
          </el-form-item>
      </el-form>
      
      <el-row :gutter="10" class="mb8" style="margin-left: 20px;margin-top: 10px;">
          <el-col :span="1.5">
              <el-button type="primary" plain icon="el-icon-plus"  @click="handleAdd" v-hasPermi="['project:ip:add']">新增
              </el-button>
          </el-col>
      </el-row>

      <el-card class="box-card" style="margin: auto;">
          <div>
              <el-table ref="multipleTable" :data="iplist" border style="width: 100%" :row-style="{ height: '50px' }"
                        :cell-style="{ padding: '0px' }">
                  <!--                <el-table-column type="selection" :resizable="false" align="center" width="40"></el-table-column>-->
                  <el-table-column label="关联项目名称" :resizable="false" align="center" prop="assignedSubjectName"
                                   width="300">
                  </el-table-column>
                  <el-table-column label="知识产权名" :resizable="false" align="center" prop="ipName"
                                   width="300">
                  </el-table-column>
                  <el-table-column label="知识产权类别" :resizable="false" align="center" prop="ipType" :formatter="allIpType"
                                   width="200">
                  </el-table-column>
                  <el-table-column label="知识产权状态" :resizable="false" align="center" prop="ipStatus" :formatter="allJobTitle" width="200">
                  </el-table-column>
                  <el-table-column label="获得日期" :resizable="false" align="center" prop="ipDate" width="150">
                  </el-table-column>
                  <el-table-column label="操作" :resizable="false" align="center" min-width="200px" fixed="right">
                      <template v-slot="scope">
                          <el-button  type="text" icon="el-icon-tickets"
                                     @click="lookIntellectual(scope.row.ipId)"
                                     v-hasPermi="['project:ip:getDetails']"
                          >详情</el-button>
                          <el-button  type="text" icon="el-icon-edit" @click="handleUpdate(scope.row.ipId)" v-hasPermi="['project:ip:update']">修改
                          </el-button>
                          <el-button  type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['project:ip:delete']">删除
                          </el-button>
                      </template>
                  </el-table-column>
              </el-table>
 
              <!-- 详情打开的界面 -->
              <el-dialog title="详情" v-model = "dialogIntellectualLook" width="50%">
                  <CheckIntellectual :ipId="Number(ipId)" @close-dialog="closeIntellectualDialogLook"></CheckIntellectual>
              </el-dialog>
              <!--新增知识产权-->
              <el-dialog title="新增知识产权" v-model = "intellectualDialogVisibleAdd" width="700px">
                  <AddIntellectual @close-dialog="closeIntellectualDialog"></AddIntellectual>
              </el-dialog>
              
              <!--修改知识产权-->
              <el-dialog title="修改知识产权" v-model = "intellectualDialogVisibleEdit" width="700px">
                  <EditIntellectual :ipId="Number(ipId)" @close-dialog="closeIntellectualDialogs"></EditIntellectual>
              </el-dialog>
          </div>
          <el-pagination  :current-page="queryParam.pageNum" :page-size="queryParam.pageSize"
                          :page-sizes="[5, 10, 20, 50, 100]" :total="total" layout="total ,sizes,prev,pager,next,jumper"
                          style="margin-top: 30px" @size-change="sizeChangeHandle" @current-change="CurrentChangeHandle">
          </el-pagination>
      </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { listUser, deptTreeSelect } from "@/api/system/user";
import request from '@/utils/request';
import AddIntellectual from '../components/AddIntellectual.vue';
import EditIntellectual from '../components/EditIntellectual.vue';
import CheckIntellectual from '../components/CheckIntellectual.vue';

//interface ProjectTree {
//  value: string;
 // label: string;
 //children?: ProjectTree[];
//}

interface IpType {
  [key: string]: string;
}

interface IpStatus {
  [key: string]: string;
}

interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
}

interface User {
  userId: string;
  nickName: string;
  deptId: string;
}

interface IpList {
  ipId: number;
  assignedSubjectName: string;
  ipName: string;
  ipType: string;
  ipStatus: string;
  ipDate: string;
}

interface QueryParam {
  pageNum: number;
  pageSize: number;
}

interface Data {
  projectId?: string;
  ipName?: string;
  ipType?: string;
  ipStatus?: string;
  userId?: string;
  ipDateSta?: string;
  ipDateEnd?: string;
}

const projecttree = ref([]);
const ipStatus = reactive<IpStatus>({
  0: '专利受理',
  1: '专利授权',
  2: '软著已获取',
  3: '标准正在申报',
  4: '标准已通过',
  5: '论文已发表',
});
const ipType = reactive<IpType>({
  0: '国内发明专利',
  1: '软件著作权',
  2: '论文',
  3: '标准',
});
const total = ref<number>(0);
const projectEstablishTime = ref<string[]>([]);
const responsibleIp = ref<string | undefined>(undefined);
const responsibleType = ref<string | undefined>(undefined);
const responsibleJobTitle = ref<string | undefined>(undefined);
const responsiblePerson = ref<string[]>([]);
const responsibleproject = ref<string[]>([]);
const cascaderOptions = ref<CascaderOption[]>([]);
const ipId = ref(0);
const iplist = ref<IpList[] | undefined>(undefined);
const dialogIntellectualLook = ref(false);
const intellectualDialogVisibleAdd = ref(false);
const intellectualDialogVisibleEdit = ref(false);
const datas = reactive<Data>({});
const queryParam = reactive<QueryParam>({
  pageNum: 1,
  pageSize: 10,
});
const myProjectFrom = ref({});
const formLook = ref({});
const pickerOptions = ref({});
const deptOptions = ref<CascaderOption[]>([]);
const userList = ref<User[]>([]);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
onMounted(() => {
  checkIp();
});

const checkIp = async () => {
  await getDeptAndUserList();
  await getProjectTree();
  await checkmembers();
};

const getProjectTree = async () => {
  try {
    const resp = await request({
      url: '/ip/getProjectMapping',
      method: 'get',
      params: {},
    });
    projecttree.value = resp.data;
  } catch (error) {
    console.error('获取用户数据时出错：', error);
  }
};

const getDeptAndUserList = async () => {
  await getDeptTree();
  await getList();
  cascaderOptions.value = adaptData(deptOptions.value);
};

const getDeptTree = async () => {
  const response = await deptTreeSelect();
  deptOptions.value = response.data;
};

const getList = async () => {
  const response = await listUser();
  console.log(response);
  userList.value = response.rows;

};

const adaptData = (data: CascaderOption[]): CascaderOption[] => {
  return data.map(item => {
    const newItem: CascaderOption = {
      value: item.id,
      label: item.label,
      children: []
    };
    if (item.children && item.children.length > 0) {
      newItem.children = adaptData(item.children);
    } else {
      const usersInDept = userList.value.filter(user => user.deptId === item.id);
      newItem.children = adaptUserData(usersInDept);
    }
    return newItem;
  });
};

const adaptUserData = (data: User[]): CascaderOption[] => {
  return data.map(item => {
    const newItem: CascaderOption = {
      value: item.userId,
      label: item.nickName,
    };
    return newItem;
  });
};

const handleQuery = () => {
  datas.ipName = responsibleIp.value;
  datas.projectId = responsibleproject.value[responsibleproject.value.length - 1];
  datas.userId = responsiblePerson.value[responsiblePerson.value.length - 1];
  datas.ipType = responsibleType.value;
  datas.ipStatus = responsibleJobTitle.value;
  if (projectEstablishTime.value) {
    console.log(projectEstablishTime.value);
    datas.ipDateSta = projectEstablishTime.value[0];
    datas.ipDateEnd = projectEstablishTime.value[1];
  } else {
    datas.ipDateSta = undefined;
    datas.ipDateEnd = undefined;
  }
  checkmembers();
};

const resetQuery = () => {
  datas.projectId = undefined;
  datas.ipName = undefined;
  datas.ipType = undefined;
  datas.ipStatus = undefined;
  datas.userId = undefined;
  datas.ipDateSta = undefined;
  datas.ipDateEnd = undefined;
  projectEstablishTime.value = [];
  responsibleIp.value = undefined;
  responsibleType.value = undefined;
  responsibleJobTitle.value = undefined;
  responsiblePerson.value = [];
  responsibleproject.value = [];
  ipId.value = 0;
  checkmembers();
};

const allJobTitle = (row: IpList, column: any, cellValue: string) => {
  return ipStatus[cellValue] || cellValue;
};

const allIpType = (row: IpList, column: any, cellValue: string) => {
  return ipType[cellValue] || cellValue;
};

const lookIntellectual = (ipIdRef:number) => {
  dialogIntellectualLook.value = true;
  ipId.value = Number(ipIdRef);

};


const handleAdd = () => {
  intellectualDialogVisibleAdd.value = true;
};

const closeIntellectualDialogLook = () => {
  resetQuery();
};

const closeIntellectualDialog = () => {
  intellectualDialogVisibleAdd.value = false;
  intellectualDialogVisibleEdit.value = false;
  resetQuery();
};

const closeIntellectualDialogs = () => {
  intellectualDialogVisibleEdit.value = false;
  resetQuery();
};

const handleUpdate = (ipIdRef:number) => {
  intellectualDialogVisibleEdit.value = true;
  ipId.value = Number(ipIdRef);
};

const checkmembers = async () => {
  try {
    const resp = await request({
      url: '/ip/list',
      method: 'post',
      data: datas,
      params: queryParam,
    });
    iplist.value = resp.rows;
    total.value = resp.total;
  } catch (error) {
    console.error('获取用户数据时出错：', error);
  }
};

const handleDelete = (row: IpList) => {
  const ipId = row.ipId;
  proxy.$modal.confirm('确认删除该数据项？').then(() => {
    console.log(ipId);
    return deleteIp(ipId);
  }).then(() => {
    checkmembers();
  }).catch(() => {
    console.error('删除失败');
  });
};

const deleteIp = (ipId: any) => {
  return request({
    url: '/ip/delete',
    method: 'get',
    params: {
      ipId: ipId,
    },
  });
};

const sizeChangeHandle = (val: number) => {
  queryParam.pageSize = val;
  queryParam.pageNum = 1;
  fetchData();
};

const CurrentChangeHandle = (val: number) => {
  queryParam.pageNum = val;
  fetchData();
};

const fetchData = () => {
  checkmembers();
};

</script>

<style>
.box-card {
  width: 100%;
  margin-bottom: 20px;
}
</style>
