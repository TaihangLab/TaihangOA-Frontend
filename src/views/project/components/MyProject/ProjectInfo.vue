<template>
  <el-card header="项目信息" shadow="hover">
    <el-form ref="form" :model="form" label-position="left">
      <el-row :gutter="20" type="flex" justify="start">
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="项目牵头单位"
            prop="leadingUnit"
            :rules="[{ required: true, message: '请输入 项目牵头单位', trigger: 'blur' }]"
          >
            <el-input v-model="form.leadingUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="120px" label="项目名称" prop="name" :rules="[{ required: true, message: '请输入 项目名称', trigger: 'blur' }]">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="项目任务书编号"
            prop="projectNumber"
            :rules="[{ required: true, message: '请输入 项目任务书编号', trigger: 'blur' }]"
          >
            <el-input v-model="form.projectNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex" justify="start">
        <el-col :span="8">
          <el-form-item label-width="120px" label="项目来源" prop="source" :rules="[{ required: true, message: '请输入 项目来源', trigger: 'blur' }]">
            <el-input v-model="form.source"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="负责课题"
            prop="subjectName"
            :rules="[{ required: true, message: '请输入 负责课题名称', trigger: 'blur' }]"
          >
            <el-input v-model="form.subjectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="课题任务书编号"
            prop="subjectNumber"
            :rules="[{ required: true, message: '请输入 课题任务书编号', trigger: 'blur' }]"
          >
            <el-input v-model="form.subjectNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex" justify="start">
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="项目专员"
            prop="contact"
            :rules="[{ required: true, message: '请输入 项目专员', trigger: 'blur' }]"
          >
            <el-input v-model="form.contact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="项目级别"
            prop="level"
            :rules="[{ required: true, message: '请输 入项目级别', trigger: 'change' }]"
          >
            <el-select v-model="form.level" clearable placeholder="请选择">
              <el-option v-for="(item, index) in data.projectLevels" :key="index" :label="item.name" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="执行时间"
            prop="duration"
            :rules="[{ required: true, message: '请输入 执行时间', trigger: 'blur' }]"
          >
            <el-input v-model="form.duration"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex" justify="start">
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="立项时间"
            prop="startTime"
            :rules="[{ required: true, message: '请输入 立项时间', trigger: 'blur' }]"
          >
            <el-date-picker v-model="form.startTime" placeholder="立项时间" type="date" value-format="YYYY-MM-DD"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="验收时间"
            prop="endTime"
            :rules="[{ required: true, message: '请选择 验收时间', trigger: 'change' }]"
          >
            <el-date-picker v-model="form.endTime" placeholder="验收时间" type="date" value-format="YYYY-MM-DD"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="120px"
            label="是否为牵头单位"
            prop="isLeadingUnit"
            :rules="[{ required: true, message: '请选择 是否为牵头单位', trigger: 'change' }]"
          >
            <el-radio-group v-model="form.isLeadingUnit">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex" justify="start">
        <el-col :span="12">
          <el-form-item label-width="120px" label="合作单位" prop="coopUnit">
            <el-input v-model="form.coopUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="120px" label="涉及专家团队" prop="expertTeam">
            <el-input v-model="form.expertTeam"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex" justify="start">
        <el-col :span="24">
          <el-form-item label-width="120px" label="项目简介" prop="description">
            <el-input v-model="form.description" type="textarea"  :autosize="{ minRows: 3, maxRows: 6 }"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive } from 'vue';
import { ElForm } from 'element-plus';
import { getDicts } from '@/api/system/dict/data';

const props = defineProps<{ form: any }>();
const emits = defineEmits(['update:visible']);
const formRef = ref<InstanceType<typeof ElForm>>();

// 暴露方法供父组件调用
defineExpose({
  validateForm() {
    return formRef.value?.validate();
  }
});

const data = reactive({
  projectLevels: [
    // { name: '国家', value: 0 },
    // { name: '省部', value: 1 },
    // { name: '企业', value: 2 }
  ]
});

const getProjectLevelsOptions = () => {
  getDicts('pro_level_type').then((resp) => {
    resp.data.forEach((item) => {
      data.projectLevels.push({
        name: item.dictLabel,
        value: Number(item.dictValue)
      });
    });
  });
};

onMounted(() => {
  getProjectLevelsOptions();
});
</script>
