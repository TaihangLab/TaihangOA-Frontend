<template>
    <div>
      <el-form ref="formAdd" :model="ipParams" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="知识产权名" :rules="[{ required: true, message: '请输入知识产权名', trigger: 'blur' }]">
              <el-input v-model="ipParams.ipName" placeholder="请输入知识产权名" clearable style="width: 192px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联项目名称" prop="responseProject">
              <el-cascader v-model="responseProject" 
              :options="projectOptions" 
      
              clearable 
              :show-all-levels="false" 
              placeholder="请选择关联项目"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="知识产权类别" prop="ipType">
              <el-select 
              v-model="ipParams.ipType" 
              clearable 
              placeholder="请选择知识产权类别">
              <el-option 
              v-for="dict in ip_type" 
              :label="dict.label" 
              :value="dict.value" 
              :key="dict.value" ></el-option>
              </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="12">
             <!-- 知识产权状态 -->
          <el-form-item label="知识产权状态" prop="ipStatus" >
              <el-select 
              v-model="ipParams.ipStatus" 
              placeholder="请选择知识产权状态"
              clearable >
                  <el-option 
                  v-for="dict in ip_status" 
                  :label="dict.label" 
                  :value="dict.value" 
                  :key="dict.value">
                </el-option>
              </el-select>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="获得日期" prop="ipDate">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="ipParams.ipDate" style="width: 192px" value-format="YYYY-MM-DD"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="知识产权成员" prop="responsePerson">
              <el-cascader 
              v-model="responsePerson" 
              :options="userOptions" 
              :props="{ 
                multiple:true,
                checkStrictly: true,
                emitPath: false,
                value: 'id', 
                label: 'label', 
                children: 'children' }"
               collapse-tags 
               collapse-tags-tooltip
               clearable 
               :show-all-levels="false" 
               placeholder="请选择成员"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件">
          <fileUpload ref="fileUpload" :id-list="ossIds" />
        </el-form-item>
        <el-form-item style="text-align: center;margin-left: 180px;">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts" name="AddIntellectual">
  import { ref, onMounted } from 'vue';
  import FileUpload from '@/components/FileUpload/index.vue';
  import { ElForm } from 'element-plus'; 
  import api from '@/api/research/IntellectualProperty/index';
  import { IntellectualPropertyBO } from '@/api/research/IntellectualProperty/types';
  import { defineEmits } from 'vue';
  import { userTreeSelect } from '@/api/system/user';
  import { Option } from 'element-plus/es/components/segmented/src/types';
  import { getProjectTree } from '@/api/research/IntellectualProperty';
  
  
  const fileUpload = ref();
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  const responsePerson = ref([]);
  const responseProject = ref(0);
  const ossIds = ref([]);
  const emit = defineEmits(['close']);//提交给父组件的关闭按钮
  const userOptions=ref<any>([]);
  const projectOptions=ref<Option[]>([]);

  const initIpParams:IntellectualPropertyBO={
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
  ossIdList:[] ,
}
const data = reactive({
  ipParams: { ...initIpParams },
});
const { ipParams} = toRefs(data);

const {ip_type, ip_status} = toRefs<any>(proxy?.useDict('ip_type', 'ip_status'));

  onMounted(() => {
    createdData();
  });
  
  const createdData = async () => {
    await getProjectTreeSelect();
    await getUserTreeSelect();
  };

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

//提交按钮
const onSubmit = () => {
  data.ipParams.userIdList = responsePerson.value;
  data.ipParams.ossIdList = ossIds.value;
  data.ipParams.projectId = responseProject.value[1];
  api.addIntellectualProperty(data.ipParams)
    .then(() => {
      fileUpload.value?.reset();
      proxy.$emit('close-dialog');
      emit('close');
      resetIpParams();
    })
    .catch(error => {
      console.error('Error adding intellectual property:', error);
    });
}

  //重置新增对话框的一系列参数
  const resetIpParams = () => {
    data.ipParams.ipName = '';
    data.ipParams.ipType = '';
    data.ipParams.ipStatus = '';
    data.ipParams.ipDate = '';
    data.ipParams.userIdList = [];
    data.ipParams.ossIdList = [];
    responseProject.value = undefined;
    responsePerson.value = undefined;
    ossIds.value = [];
  };
  </script>
  
  <style>
  .box-card {
    width: 100%;
    margin-bottom: 20px;
  }
  </style>
  