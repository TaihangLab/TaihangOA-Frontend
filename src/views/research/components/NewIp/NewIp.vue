<template>
  <el-dialog :model-value="visible" title="新增知识产权" width="42%" @update:model-value="updateVisible">
    <el-form ref="form1" :rules="rules" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="知识产权名" prop="ipName">
            <el-input v-model="form.ipName" style="width: 192px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关联项目名称" prop="responseProject">
            <el-cascader
              v-model="responseProject"
              :options="projectTree"
              clearable
              :show-all-levels="false"
              placeholder="请选择关联项目名称"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="知识产权类别" prop="ipType">
            <el-select v-model="form.ipType" clearable placeholder="请选择类别" style="width: 192px">
              <el-option v-for="(item, index) in ipTypes" :key="index" :label="item.ipTypeName" :value="item.ipTypeId"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="知识产权状态" prop="ipStatus">
            <el-select v-model="form.ipStatus" clearable placeholder="请选择状态" style="width: 221px">
              <el-option v-for="(item, index) in ipStatuses" :key="index" :label="item.ipStatusName" :value="item.ipStatusId"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="获得日期" prop="ipDate">
            <el-col :span="11">
              <el-date-picker
                v-model="form.ipDate"
                type="date"
                placeholder="选择日期"
                style="width: 192px"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="知识产权成员" prop="responsePerson">
            <el-cascader
              v-model="responsePerson"
              :options="cascadeOptions"
              :props="props"
              collapse-tags
              clearable
              :show-all-levels="false"
              placeholder="请选择成员"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="附件">
        <FileUpload ref="fileUpload" :file-size="500"></FileUpload>
      </el-form-item>
      <el-form-item style="text-align: center; margin-left: -100px">
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import { getDicts } from '@/api/system/dict/data';
import request from '@/utils/request';

const props = defineProps<{ visible: boolean; ipId: string }>();
const emits = defineEmits(['update:visible']);

const form = ref({
  ipId: null as null | string,
  projectId: undefined as undefined | number,
  ipName: '',
  ipType: '',
  ipStatus: '',
  ipDate: '',
  userIdList: [] as number[]
});

const rules = {
  ipName: [{ required: true, message: '请输入知识产权名', trigger: 'blur' }]
};

let responsePerson: any[] = [];
let responseProject: any[] = [];
let projectId: undefined | number = undefined;
let cascadeOptions: any[] = [];
let projectTree: any[] = [];

const ipTypes = ref([]);

const ipStatuses = ref([]);

const ossIds: number[] = [];
const fileList: any[] = [];

const findPathByValue = (data: any[], targetValue: number, path: number[] = []): number[] | null => {
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

const adaptData = (data: any[]) => {
  return data.map((item) => {
    const newItem = {
      value: item.id,
      label: item.label,
      children: item.children ? adaptData(item.children) : adaptUserData(userList.filter((user) => user.deptId === item.id))
    };
    return newItem;
  });
};

const adaptUserData = (data: any[]) => {
  return data.map((item) => ({
    value: item.userId,
    label: item.nickName
  }));
};

const onSubmit = () => {
  if (responseProject && responseProject.length > 0) {
    form.value.projectId = responseProject[responseProject.length - 1];
  }
  if (responsePerson && responsePerson.length > 0) {
    form.value.userIdList = responsePerson.map((subArray) => subArray[subArray.length - 1]);
  }
  form.value.ossIdList = ossIds;

  request({
    url: '/ip/add',
    method: 'post',
    data: form.value
  })
    .then((resp) => {
      console.log(resp);
      console.log('this.form.', form.value.ossIds);
    })
    .catch((error) => {
      console.error('新增失败', error);
      // Handle error, show error message, etc.
    });

  reset();
};

const reset = () => {
  form.value = {
    ipId: null,
    projectId: undefined,
    ipName: '',
    ipType: '',
    ipStatus: '',
    ipDate: '',
    userIdList: []
  };
  ossIds.length = 0;
  fileList.length = 0;
  responseProject = [];
  responsePerson = [];
};

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const getIpTypeOptions = () => {
  getDicts('ip_type').then((resp) => {
    resp.data.forEach((item) => {
      ipTypes.value.push({
        ipTypeId: item.dictValue,
        ipTypeName: item.dictLabel
      });
    });
  });
};
const getIpStatusOptions = () => {
  getDicts('ip_status').then((resp) => {
    resp.data.forEach((item) => {
      ipStatuses.value.push({
        ipStatusId: item.dictValue,
        ipStatusName: item.dictLabel
      });
    });
  });
};

onMounted(() => {
  getIpTypeOptions();
  getIpStatusOptions();
});
</script>

<style scoped>
/* 你的样式 */
</style>
