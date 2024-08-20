<template>
  <div>
    <!-- 表单 -->
    <el-form ref="form" label-width="120px">
      <!-- 第一行 -->
      <el-row>
        <!-- 知识产权名 -->
        <el-col :span="12">
          <el-form-item label="知识产权名" prop="ipName">
            <el-input v-model="ipName" style="width: 192px"></el-input>
          </el-form-item>
        </el-col>
        <!-- 关联项目名称 -->
        <el-col :span="12">
          <el-form-item label="关联项目名称" prop="responseProject">
            <el-cascader v-model="responseProject" :options="projectTree" clearable :show-all-levels="false"
              placeholder="请选择关联项目名称"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row>
        <!-- 知识产权类别 -->
        <el-col :span="12">
          <el-form-item label="知识产权类别" prop="ipType">
            <el-select v-model="ipType" placeholder="请选择类别">
              <el-option v-for="item in ipTypeOptions" :key="item.ipTypeId" :label="item.ipTypeName"
                :value="item.ipTypeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 知识产权状态 -->
        <el-col :span="12">
          <el-form-item label="知识产权状态" prop="ipStatus">
            <el-select v-model="ipStatus" placeholder="请选择状态">
              <el-option v-for="item in ipStatusOptions" :key="item.ipStatusId" :label="item.ipStatusName"
                :value="item.ipStatusId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第三行 -->
      <el-row>
        <!-- 获得日期 -->
        <el-col :span="12">
          <el-form-item label="获得日期" prop="ipDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="ipDate" style="width: 192px"
              value-format="YYYY-MM-DD"></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 知识产权成员 -->
        <el-col :span="12">
          <el-form-item label="知识产权成员" prop="responsePerson">
            <el-cascader v-model="responsePerson" :options="cascadeOptions" :props="{
              multiple: true,
              checkStrictly: true,
              emitPath: false,
              value: 'value',
              label: 'label',
              children: 'children'
            }" collapse-tags clearable :show-all-levels="false" placeholder="请选择成员"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 附件 -->
      <el-form-item label="附件">
        <fujian ref="fujian" :idList="ossIds" />
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, defineProps, defineEmits } from 'vue';
import { listUser, deptTreeSelect } from "@/api/system/user";
import fujian from "./../../../components/FileUpload/index.vue";
import request from '@/utils/request';

// 定义props
const props = defineProps<{
  ipId: string;
}>();
// 定义emit
const emit = defineEmits(['close-dialog']);

// 获取部门和用户列表
const getDeptAndUserList = async () => {
  await getDeptTree();
  await getList();
  cascadeOptions.value = adaptData(deptOptions.value);
};

// 获取当前实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// 部门选项
const deptOptions = ref([]);
// 知识产权成员
const responsePerson = ref([]);
// 项目id
const projectId = ref(undefined);
// 关联项目名称
const responseProject = ref([]);
// 级联选项
const cascadeOptions = ref([]);
// 项目树
const projectTree = ref([]);
// 知识产权名
const ipName = ref('');
// 知识产权类别
const ipType = ref('');
// 知识产权状态
const ipStatus = ref('');
// 获得日期
const ipDate = ref('');
const { ip_type, ip_status} = toRefs<any>(proxy?.useDict('ip_type', 'ip_status')
);
// 知识产权类别选项
const ipTypeOptions = reactive([
  { ipTypeId: '0', ipTypeName: '国内发明专利' },
  { ipTypeId: '1', ipTypeName: '软件著作权' },
  { ipTypeId: '2', ipTypeName: '论文' },
  { ipTypeId: '3', ipTypeName: '标准' },
]);

// 知识产权状态选项
const ipStatusOptions = reactive([
  { ipStatusId: '0', ipStatusName: '专利受理' },
  { ipStatusId: '1', ipStatusName: '专利授权' },
  { ipStatusId: '2', ipStatusName: '软著已获取' },
  { ipStatusId: '3', ipStatusName: '标准正在申报' },
  { ipStatusId: '4', ipStatusName: '标准已通过' },
  { ipStatusId: '5', ipStatusName: '论文已发表' },
]);

// ossIds
const ossIds = ref([]);
// params
const params = reactive({
  ipId: null,
});


// fujian组件
const fujianRef = ref<typeof fujian>(null);
// 用户列表
const userList = ref([]);
// 创建数据
const createdData = async () => {
  params.ipId = null; // 初始化 params
  await getProjectTree();
  await getDeptAndUserList();
};

// 处理id数据
const handleIdData = (node) => {
  projectId.value = node.projectId;
  responseProject.value = node.projectPath;
};

// 获取项目树
const getProjectTree = async () => {
  const response = await request({
    url: '/ip/getProjectMapping',
    method: 'get',
    params: params,
  });
  projectTree.value = response.data;
};

// 获取部门树
const getDeptTree = async () => {
  const response = await deptTreeSelect();
  deptOptions.value = response.data;
};

// 获取用户列表
const getList = async () => {
  const response = await listUser();
  userList.value = response.rows;
};

// 适配数据
const adaptData = (data) => {
  return data.map(item => {
    const newItem = {
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

// 适配用户数据
const adaptUserData = (data) => {
  return data.map(item => {
    const newItem = {
      value: item.userId,
      label: item.nickName,
    };
    return newItem;
  });
};

// 检查知识产权
const checkIntellectual = async () => {
  const response = await request({
    url: '/ip/getDetails',
    method: 'get',
    params: {
      ipId: params.ipId,
    },
  });
  ipName.value = response.data.ipName;
  projectId.value = response.data.projectId;
  ipType.value = ip_type.value[response.data.ipType];
  ipStatus.value = ip_status.value[response.data.ipStatus];
  ipDate.value = response.data.ipDate;
  responsePerson.value = response.data.userPathList;

  handleIdData(response.data);
};

// 提交
const onSubmit = () => {
  const data = {
          ipName: ipName.value,
          projectId: responseProject.value[1],
          ipType: ipType.value,
          ipStatus: ipStatus.value,
          ipDate: ipDate.value,
          userIdList: responsePerson.value,
          ossIdList: ossIds.value,
        };
  data.projectId = parseInt(responseProject.value[responseProject.value.length - 1], 10);
  data.userIdList = responsePerson.value.map(subArray => subArray[subArray.length - 1]);
  data.ossIdList = ossIds.value;
  // 请求修改接口
  request({
    url: '/ip/update',
    method: 'post',
    data: data,
  }).then(() => {
    alert("修改成功");
    fujianRef.value.reset();
    emit('close-dialog');
  }).catch((error) => {
    console.error("修改失败", error);
  });
  reset();
};

// 重置
const reset = () => {
  ipName.value = '';
  ipType.value = '';
  ipStatus.value = '';
  ipDate.value = '';
  ossIds.value = [];
  ossIds.value = [];
  responseProject.value = undefined;
  responseProject.value = undefined;
  responsePerson.value = undefined;
};

// 监听props.ipId的变化
watch(() => props.ipId, (newVal) => {
  params.ipId = Number(newVal);
  if (!isNaN(newVal) && newVal !== undefined) {
    checkIntellectual();
  }
}, { immediate: true });

// 组件挂载时执行
onMounted(() => {
  createdData();
});
</script>