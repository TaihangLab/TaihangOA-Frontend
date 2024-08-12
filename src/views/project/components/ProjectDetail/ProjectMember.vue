<template>
  <el-card header="项目成员" shadow="hover">
    <el-form ref="form" :model="form" label-position="left">
      <el-row
        v-for="(item, index) in form.items"
        :key="index"
        justify="center"
        type="flex"
        @mouseover="Mousedata(index, true)"
        @mouseout="Mousedata(index, false)"
      >
        <el-col :span="1" class="text-center">
          <el-button
            v-show="index === form.items.length - 1 && data.isButtonShowList[index]"
            icon="CirclePlus"
            circle
            type="success"
            plain
            @click="add"
          ></el-button>
        </el-col>

        <el-col :span="12">
          <el-form-item label-width="80px" label="项目成员" prop="id">
            <el-cascader
              v-model="item.id"
              :options="cascaderOptions"
              clearable
              :props="{ expandTrigger: 'hover', emitPath: false }"
              placeholder="请选择项目成员"
              style="width: 25vw"
            ></el-cascader>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label-width="80px" label="成员角色" prop="role">
            <el-select v-model="item.role" multiple placeholder="请选择" style="width: 27vw" @change="$forceUpdate()">
              <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="1" style="text-align: center">
          <el-button
            v-show="form.items.length !== 1 && data.isButtonShowList[index]"
            icon="RemoveFilled"
            circle
            type="danger"
            plain
            @click="remove(index)"
          ></el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { listUser, deptTreeSelect } from '@/api/system/user';

const { proxy } = getCurrentInstance();
const props = defineProps(['form']);
defineExpose({
  reset
});

const roleOptions = [
  { label: '项目负责人', value: '0' },
  { label: '公司负责人', value: '1' },
  { label: '部门负责人', value: '2' },
  { label: '科研管理负责人', value: '3' },
  { label: '普通成员', value: '4' }
];

function initForm() {
  if (!props.form.items.length) {
    props.form.items = [{ id: '', role: '' }];
  }
}

onMounted(() => {
  initForm();
});

const data = reactive({
  isButtonShowList: [] as boolean[]
});

// 新增一条
function add() {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items.push({
    id: '',
    role: ''
  });
  data.isButtonShowList.push(false);
}
// 删除一条
function remove(index) {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items.splice(index, 1);
  data.isButtonShowList.splice(index, 1);
}

// 重置表单
function reset() {
  // eslint-disable-next-line vue/no-mutating-props
  props.form.items = [{ id: undefined, role: [] }];
  // props.form.items = [{id: undefined, role: []}];
  proxy.$forceUpdate();
}

// 用户级联下拉框
const member = ref('');
const cascaderOptions = ref([]);
const deptData = ref({});
const userList = ref([]);

// 分页查询接口
interface PageQuery {
  pageNum: number;
  pageSize: number;
}

// 用户查询参数接口
export interface UserQuery extends PageQuery {
  userName?: string;
  phonenumber?: string;
  status?: string;
  deptId?: string | number;
  roleId?: string | number;
}

const userQuery: UserQuery = {
  pageNum: 1, // 页码
  pageSize: 100, // 页面大小，调整以获取更多用户
  userName: '', // 无用户名过滤
  phonenumber: '', // 无电话号码过滤
  status: '', // 无状态过滤
  deptId: '', // 无部门过滤
  roleId: '' // 无角色过滤
};

async function getDeptAndUserList() {
  // 等待部门数据加载完成
  const deptResp = await deptTreeSelect();
  let deptData = deptResp.data;

  //  等待用户数据加载完成
  const userResp = await listUser(userQuery);
  userList.value = userResp.rows;

  cascaderOptions.value = adaptData(deptData);
}
getDeptAndUserList();
function adaptData(data) {
  return data.map((item) => {
    const newItem = {
      value: item.id,
      label: item.label,
      children: []
    };
    if (item.children && item.children.length > 0) {
      newItem.children = adaptData(item.children);
    } else {
      const usersInDept = userList.value.filter((user) => user.deptId === item.id);
      newItem.children = adaptUserData(usersInDept);
    }
    return newItem;
  });
}
function adaptUserData(data) {
  return data.map((item) => {
    return {
      value: item.userId,
      label: item.nickName
    };
  });
}

function Mousedata(index: number, show: boolean) {
  data.isButtonShowList[index] = show;
}
</script>

<style scoped>
.el-button {
  border: none;
  padding: 0;
  font-size: 2rem;
}

:deep(i) {
}
</style>
