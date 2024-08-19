<template>
  <el-dialog :model-value="visible" title="信息录入" width="750px" @close="closeExpenselAddDialog">
    <div>
      <el-form :rules="rules" :model="form" label-width="100px" ref="expenditureForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName" style="width: 300px">
              <el-input v-model="form.projectName" with="400px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专项/自筹" prop="zxzc" style="width: 300px">
              <el-select v-model="form.zxzc" placeholder="请选择支出类别" clearable>
                <el-option v-for="item in zxzcOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="直接/间接" prop="zjjj" style="width: 300px">
              <el-select v-model="form.zjjj" placeholder="请选择支出类别">
                <el-option v-for="item in zjjjOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="一级科目" prop="firstLevelSubject" style="width: 300px">
              <el-select v-model="form.firstLevelSubject" placeholder="请选择一级科目">
                <el-option
                  v-for="item in firstLevelSubjectOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="凭证号" prop="voucherNo">
              <el-input v-model="form.voucherNo" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="二级科目" prop="secondLevelSubject" style="width: 300px">
              <el-select v-model="form.secondLevelSubject" placeholder="请选择二级科目">
                <el-option
                  v-for="item in secondLevelSubjectOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
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
                  style="width: 200px"
                  value-format="YYYY-MM-DD"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="三级科目" prop="thirdLevelSubject" style="width: 300px">
              <el-select v-model="form.thirdLevelSubject" placeholder="请选择三级科目">
                <el-option
                  v-for="item in thirdLevelSubjectOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额" prop="amount">
              <el-input v-model="form.amount" style="width: 200px"></el-input>
              <span style="font-size: 12px; color: #f56c6c">（元）</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="摘要" style="width: 645px">
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
const expenditureForm = ref(); // 为表单添加 ref
const zxzcOptions = ref([]);
const zjjjOptions = ref([]);
const firstLevelSubjectOptions = ref([]);
const secondLevelSubjectOptions = ref([]);
const thirdLevelSubjectOptions = ref([]);

const initFormData = () => ({
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

const reset = () => {
  form.value = initFormData();
};

const initOptions = () => {
  const dicts = [
    { key: 'pro_zxzc_options', ref: zxzcOptions },
    { key: 'pro_zjjj_options', ref: zjjjOptions },
    { key: 'pro_first_subject', ref: firstLevelSubjectOptions },
    { key: 'pro_second_subject', ref: secondLevelSubjectOptions },
    { key: 'pro_third_subject', ref: thirdLevelSubjectOptions }
  ];

  dicts.forEach(({ key, ref }) => {
    getDicts(key).then((resp) => {
      resp.data.forEach((item: any) => {
        ref.value.push({
          id: item.dictValue,
          name: item.dictLabel
        });
      });
    });
  });
};

const rules = ref({
  projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  zjjj: [{ required: true, message: '请输入资金类型', trigger: 'blur' }],
  zxzc: [{ required: true, message: '请输入资金类型', trigger: 'blur' }],
  firstLevelSubject: [{ required: true, message: '请输入一级科目', trigger: 'blur' }],
  secondLevelSubject: [{ required: true, message: '请输入二级科目，若不存在，请选“无”', trigger: 'blur' }],
  thirdLevelSubject: [{ required: true, message: '请输入三级科目，若不存在，请选“无”', trigger: 'blur' }],
  expenditureDate: [{ required: true, message: '请输入日期', trigger: 'blur' }],
  voucherNo: [{ required: true, message: '请输入凭证号', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入金额', trigger: 'blur' }]
});

const onSubmit = () => {
  if (expenditureForm.value) {
    expenditureForm.value.validate((valid) => {
      if (valid) {
        const formDataArray = [{ ...form.value }];
        closeExpenselAddDialog();
        emits('new-data', formDataArray);
        reset();
      }
    });
  }
};

onMounted(() => {
  initOptions();
});
</script>
