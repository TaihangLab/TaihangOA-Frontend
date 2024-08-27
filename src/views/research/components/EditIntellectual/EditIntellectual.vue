<template>
  <div>
    <!-- 表单 -->
    <el-form ref="formAdd" :model="ipParams" label-width="120px">
      <!-- 第一行 -->
      <el-row>
        <!-- 知识产权名 -->
        <el-col :span="12">
          <el-form-item label="知识产权名" prop="ipName">
            <el-input v-model="ipParams.ipName" style="width: 192px"></el-input>
          </el-form-item>
        </el-col>
        <!-- 关联项目名称 -->
        <el-col :span="12">
          <el-form-item label="关联项目名称" prop="responseProject">
            <el-cascader
              v-model="responseProject"
              :options="projectOptions"
              clearable
              :show-all-levels="false"
              placeholder="请选择关联项目名称"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row>
        <!-- 知识产权类别 -->
        <el-col :span="12">
          <el-form-item label="知识产权类别" prop="ipType">
            <el-select v-model="ipParams.ipType" clearable placeholder="请选择知识产权类别">
              <el-option v-for="dict in ip_type" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 知识产权状态 -->
        <el-col :span="12">
          <el-form-item label="知识产权状态" prop="ipStatus">
            <el-select v-model="ipParams.ipStatus" placeholder="请选择知识产权状态" clearable>
              <el-option v-for="dict in ip_status" :key="dict.value" :label="dict.label" :value="dict.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第三行 -->
      <el-row>
        <!-- 获得日期 -->
        <el-col :span="12">
          <el-form-item label="获得日期" prop="ipDate">
            <el-date-picker
              v-model="ipParams.ipDate"
              type="date"
              placeholder="选择日期"
              style="width: 192px"
              value-format="YYYY-MM-DD"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 知识产权成员 -->
        <el-col :span="12">
          <el-form-item label="知识产权成员" prop="responsePerson">
            <el-cascader
              v-model="responsePerson"
              :options="userOptions"
              :props="{
                multiple: true,
                checkStrictly: true,
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
      <!-- 附件 -->
      <el-form-item label="附件">
        <file-upload ref="fileUpload" :id-list="ossIds" />
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item style="text-align: center; margin-left: 180px">
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="EditIntellectual">
import { ref, reactive, watch, onMounted, defineProps, defineEmits } from 'vue';
import api from '@/api/research/IntellectualProperty/index';
import FileUpload from '@/components/FileUpload/index.vue';
import { IntellectualPropertyBO } from '@/api/research/IntellectualProperty/types';
import { userTreeSelect } from '@/api/system/user';
import { Option } from 'element-plus/es/components/segmented/src/types';
import { getProjectTree } from '@/api/research/IntellectualProperty';
// 定义props
const props = defineProps<{
  ipId: number;
}>();
const params = reactive({
  ipId: null
});

// 定义emit
const emit = defineEmits(['close-dialog']);
const userOptions = ref<any>([]);
const fileUpload = ref();
const responseProject = ref(0);
const responsePerson = ref([]);
const ossIds = ref([]);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { ip_type, ip_status } = toRefs<any>(proxy?.useDict('ip_type', 'ip_status'));
const projectOptions = ref<Option[]>([]);
const initIpBO: IntellectualPropertyBO = {
  ipId: undefined,
  projectId: undefined,
  ipName: '',
  ipType: '',
  ipStatus: undefined,
  ipDate: undefined,
  milestoneId: undefined,
  userIdList: [],
  ossIdList: [],
  userId: undefined,
  ipDateSta: '',
  ipDateEnd: ''
};

const data = reactive({
  ipParams: { ...initIpBO }
});
const { ipParams } = toRefs(data);

// 创建数据
const initData = async () => {
  data.ipParams.ipId = null; // 初始化 params
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

// 获取知识产权
const getIntellectualDetails = async () => {
  reset();
  params.ipId = Number(props.ipId);
  const response = await api.getIntellectualPropertyDetails(params.ipId);
  Object.assign(data.ipParams, response.data);
  //获得知识产权类型和知识产权状态的字符串
  data.ipParams.ipType = ip_type.value[data.ipParams.ipType];
  data.ipParams.ipStatus = ip_status.value[data.ipParams.ipStatus];
  responseProject.value = response.data.projectId;
  responsePerson.value = response.data.userPathList;
};

// 提交
const onSubmit = () => {
  //由于前面将get到的VO拷贝给了BO，因此BO的类型被覆盖，提交前需要整合修改后的参数
  // 通过responsePerson.value的类型，判断成员是否进行了修改，如果进行了修改，需要重置参数
  if (Array.isArray(responsePerson.value) && responsePerson.value.every((item) => Array.isArray(item))) {
    // 如果 responsePerson.value 是一个二维数组，说明没有修改，则从get到的数据获取
    data.ipParams.userIdList = responsePerson.value.map((item) => item[3]);
  } else {
    // 如果 responsePerson.value 是一个一维数组，说明进行了修改，从下拉框获取
    data.ipParams.userIdList = responsePerson.value;
  }

  // 通过projectid的类型，判断项目是否进行了修改，如果进行了修改，需要重置参数
  if (Array.isArray(responseProject.value)) {
    // 如果 responseProject.value 是数组，说明进行了修改，从下拉框获取
    data.ipParams.projectId = responseProject.value[1];
    // 如果 responseProject.value 是数字，说明没有修改，从get到的数据获取
  } else {
    data.ipParams.projectId = responseProject.value;
  }
  // 确保ipType和ipStatus是number或string类型
  data.ipParams.ipType = typeof data.ipParams.ipType === 'object' ? data.ipParams.ipType.value : data.ipParams.ipType;
  data.ipParams.ipStatus = typeof data.ipParams.ipStatus === 'object' ? data.ipParams.ipStatus.value : data.ipParams.ipStatus;
  data.ipParams.ossIdList = ossIds.value;
  //过滤多余的内容
  delete data.ipParams.assignedSubjectName;
  delete data.ipParams.ipUserVOList;
  delete data.ipParams.projectPath;
  delete data.ipParams.sysOssVoList;
  delete data.ipParams.userPathList;

  // 调用更新函数
  api
    .updateIntellectualProperty(data.ipParams)
    .then((response) => {
      console.log(response);
      fileUpload.value?.reset();
      proxy.$emit('close-dialog');
    })
    .catch((error) => {
      console.error(error);
    });
};

// 重置参数
const reset = () => {
  data.ipParams = { ...initIpBO };
  ossIds.value = [];
};

// 监听props.ipId的变化，如果变化则重新获取数据
watch(
  () => props.ipId,
  (newVal) => {
    if (!isNaN(Number(newVal)) && newVal !== undefined) {
      data.ipParams.ipId = Number(newVal);
      getIntellectualDetails();
    }
  },
  { immediate: true }
);

// 组件挂载时执行
onMounted(() => {
  initData();
});
</script>
