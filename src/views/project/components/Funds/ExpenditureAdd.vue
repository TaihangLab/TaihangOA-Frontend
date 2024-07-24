<template>
  <el-dialog :model-value="visible" title="信息录入" width="50%" @close="closeExpenselAddDialog">
    <div>
      <el-form :rules="rules" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="form.projectName" style="width: 520px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专项/自筹" prop="zxzc">
              <el-select v-model="form.zxzc" placeholder="请选择项目类别" clearable>
                <el-option v-for="item in zxzcOptions" :key="item.zxzcId" :label="item.zxzcName" :value="item.zxzcId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="直接/间接" prop="zjjj">
              <el-select v-model="form.zjjj" placeholder="请选择项目类别">
                <el-option v-for="item in zjjjOptions" :key="item.zjjjId" :label="item.zjjjName" :value="item.zjjjId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="一级科目" prop="firstLevelSubject">
              <el-select v-model="form.firstLevelSubject" placeholder="请选择一级科目">
                <el-option
                  v-for="item in firstLevelSubjectOptions"
                  :key="item.firstLevelSubjectId"
                  :label="item.firstLevelSubjectName"
                  :value="item.firstLevelSubjectId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="凭证号" prop="voucherNo">
              <el-input v-model="form.voucherNo" style="width: 192px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="二级科目" prop="secondLevelSubject">
              <el-select v-model="form.secondLevelSubject" placeholder="请选择二级科目">
                <el-option
                  v-for="item in secondLevelSubjectOptions"
                  :key="item.secondLevelSubjectId"
                  :label="item.secondLevelSubjectName"
                  :value="item.secondLevelSubjectId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="expenditureDate">
              <el-col :span="11">
                <el-date-picker
                  v-model="form.expenditureDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 192px"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="三级科目" prop="thirdLevelSubject">
              <el-select v-model="form.thirdLevelSubject" placeholder="请选择三级科目">
                <el-option
                  v-for="item in thirdLevelSubjectOptions"
                  :key="item.thirdLevelSubjectId"
                  :label="item.thirdLevelSubjectName"
                  :value="item.thirdLevelSubjectId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额" prop="amount">
              <el-input v-model="form.amount" style="width: 160px"></el-input>
              <span style="font-size: 12px; color: #f56c6c">（元）</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="摘要">
          <el-input v-model="form.expenditureAbstract" type="textarea"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center; margin-left: 240px">
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';
import { getDicts } from '@/api/system/dict/data';

const props = defineProps<{
  projectId: number | null;
  visible: boolean;
}>();

const emits = defineEmits(['new-data', 'close:visible']);

const closeExpenselAddDialog = () => {
  emits('close:visible', false);
  reset();
};

const form = ref({
  amount: '',
  zxzc: '',
  zjjj: '',
  projectName: '',
  voucherNo: '',
  expenditureAbstract: '',
  expenditureDate: '',
  firstLevelSubject: '',
  secondLevelSubject: '',
  thirdLevelSubject: ''
});

const zxzcOptions = ref([]);

const getZxzcOptions = () => {
  getDicts('pro_zxzc_options').then((resp) => {
    resp.data.forEach((item) => {
      zxzcOptions.value.push({
        zxzcId: item.dictValue,
        zxzcName: item.dictLabel
      });
    });
  });
};

const zjjjOptions = ref([]);

const getZjjjOptions = () => {
  getDicts('pro_zjjj_options').then((resp) => {
    resp.data.forEach((item) => {
      zjjjOptions.value.push({
        zjjjId: item.dictValue,
        zjjjName: item.dictLabel
      });
    });
  });
};

const firstLevelSubjectOptions = ref([]);

const getFirstLevelSubjectOptions = () => {
  getDicts('pro_first_subject').then((resp) => {
    resp.data.forEach((item) => {
      firstLevelSubjectOptions.value.push({
        firstLevelSubjectId: item.dictValue,
        firstLevelSubjectName: item.dictLabel
      });
    });
  });
};

const secondLevelSubjectOptions = ref([]);

const getSecondLevelSubjectOptions = () => {
  getDicts('pro_second_subject').then((resp) => {
    resp.data.forEach((item) => {
      secondLevelSubjectOptions.value.push({
        secondLevelSubjectId: item.dictValue,
        secondLevelSubjectName: item.dictLabel
      });
    });
  });
};

const thirdLevelSubjectOptions = ref([]);

const getThirdLevelSubjectOptions = () => {
  getDicts('pro_third_subject').then((resp) => {
    resp.data.forEach((item) => {
      thirdLevelSubjectOptions.value.push({
        thirdLevelSubjectId: item.dictValue,
        thirdLevelSubjectName: item.dictLabel
      });
    });
  });
};

const rules = ref({
  projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }]
});

const onSubmit = () => {
  const formDataArray = [
    {
      amount: form.value.amount,
      zxzc: form.value.zxzc,
      zjjj: form.value.zjjj,
      projectName: form.value.projectName,
      voucherNo: form.value.voucherNo,
      expenditureAbstract: form.value.expenditureAbstract,
      expenditureDate: form.value.expenditureDate,
      firstLevelSubject: form.value.firstLevelSubject,
      secondLevelSubject: form.value.secondLevelSubject,
      thirdLevelSubject: form.value.thirdLevelSubject
    }
  ];

  emits('new-data', formDataArray);
  reset();
};

const reset = () => {
  form.value = {
    amount: '',
    zxzc: '',
    zjjj: '',
    projectName: '',
    voucherNo: '',
    expenditureAbstract: '',
    expenditureDate: '',
    firstLevelSubject: '',
    secondLevelSubject: '',
    thirdLevelSubject: ''
  };
};

onMounted(() => {
  getZxzcOptions();
  getZjjjOptions();
  getFirstLevelSubjectOptions();
  getSecondLevelSubjectOptions();
  getThirdLevelSubjectOptions();
});
</script>
