<template>
    <div>
      <el-form ref="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="知识产权名" :rules="[{ required: true, message: '请输入知识产权名', trigger: 'blur' }]">
              <el-input v-model="ipName" placeholder="请输入知识产权名" clearable style="width: 192px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联项目名称" prop="responseProject">
              <el-cascader v-model="responseProject" :options="projectTree" clearable :show-all-levels="false" placeholder="请选择关联项目名称"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="知识产权类别" prop="ipType">
              <el-select v-model="ipType" placeholder="请选择类别">
                <el-option v-for="item in ipTypeOptions" :key="item.ipTypeId" :label="item.ipTypeName" :value="item.ipTypeId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="知识产权状态" prop="ipStatus">
              <el-select v-model="ipStatus" placeholder="请选择状态">
                <el-option v-for="item in ipStatusOptions" :key="item.ipStatusId" :label="item.ipStatusName" :value="item.ipStatusId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="获得日期" prop="ipDate">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="ipDate" style="width: 192px" value-format="YYYY-MM-DD"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
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
        <el-form-item label="附件">
          <fujian ref="fujian" :idList="ossIds" />
        </el-form-item>
        <el-form-item style="text-align: center;margin-left: -100px;">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { listUser, deptTreeSelect } from "@/api/system/user";
  import fujian from "./../../../components/FileUpload/index.vue";
  import request from '@/utils/request';
  import { ElForm } from 'element-plus'; 
  
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  const deptOptions = ref([]);
  const responsePerson = ref([]);
  const projectId = ref(undefined);
  const responseProject = ref([]);
  const cascadeOptions = ref([]);
  const projectTree = ref([]);
  const userList = ref([]);
  const ossIds = ref([]);
  const ipName = ref('');
  const ipType = ref('');
  const ipStatus = ref('');
  const ipDate = ref('');
  const userIdList = ref([]);
  const ossIdList = ref([]);
  
  const ipTypeOptions = reactive([
    { ipTypeId: '0', ipTypeName: '国内发明专利' },
    { ipTypeId: '1', ipTypeName: '软件著作权' },
    { ipTypeId: '2', ipTypeName: '论文' },
    { ipTypeId: '3', ipTypeName: '标准' },
  ]);
  const ipStatusOptions = reactive([
    { ipStatusId: '0', ipStatusName: '专利受理' },
    { ipStatusId: '1', ipStatusName: '专利授权' },
    { ipStatusId: '2', ipStatusName: '软著已获取' },
    { ipStatusId: '3', ipStatusName: '标准正在申报' },
    { ipStatusId: '4', ipStatusName: '标准已通过' },
    { ipStatusId: '5', ipStatusName: '论文已发表' },
  ]);
  

  
  onMounted(() => {
    createdData();
  });
  
  const createdData = async () => {
    await getProjectTree();
    await getDeptAndUserList();
  };
  
  const handleIdData = (node) => {
    projectId.value = node.projectId;
    responseProject.value = findPathByValue(projectTree.value, projectId.value);
  };
  
  const findPathByValue = (data, targetValue, path = []) => {
    for (const item of data) {
      const currentPath = [...path, item.value];
      if (item.value === targetValue) {
        return currentPath;
      }
      if (item.children) {
        const result = findPathByValue(item.children, targetValue, currentPath);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };
  
  const getProjectTree = async () => {
    try {
      const resp = await request({
        url: '/ip/getProjectMapping',
        method: 'get',
        params: {},
      });
      projectTree.value = resp.data;
    } catch (error) {
      console.error('获取用户数据时出错：', error);
    }
  };
  
  const getDeptAndUserList = async () => {
    await getDeptTree();
    await getList();
    cascadeOptions.value = adaptData(deptOptions.value);
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
  
  const adaptData = (data) => {
    return data.map(item => {
      const newItem = {
        value: item.id,
        label: item.label,
        children: [],
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
  
  const adaptUserData = (data) => {
    return data.map(item => {
      const newItem = {
        value: item.userId,
        label: item.nickName,
      };
      return newItem;
    });
  };
  
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
  
        request({
          url: '/ip/add',
          method: 'post',
          data: data,
        }).then((resp) => {
          console.log(resp);
          proxy.$modal.msgSuccess("新增成功");
          proxy.$refs.fujian.reset();
          proxy.$emit('close-dialog');
          reset();
        }).catch(error => {
          console.error("新增失败", error);
          // 处理错误情况，例如显示错误提示
        });
      }
  
  const reset = () => {
    ipName.value = '';
    ipType.value = '';
    ipStatus.value = '';
    ipDate.value = '';
    userIdList.value = [];
    ossIds.value = [];
    responseProject.value = undefined;
    responsePerson.value = undefined;
  };
  </script>
  
  <style>
  .box-card {
    width: 100%;
    margin-bottom: 20px;
  }
  </style>
  