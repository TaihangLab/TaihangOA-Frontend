<template>
  <div>
    <el-card header="项目推进情况" shadow="hover">
      <el-form ref="form" :model="form" label-position="left">
        <el-row :gutter="20" type="flex">
          <el-col :span="8">
            <el-form-item label-width="125px" label="推进情况" prop="progressStatus">
              <el-select v-model="$props.form.projectProgressStatus" clearable placeholder="请选择">
                <el-option v-for="(item, index) in data.progressStatus" :key="index" :label="item.name" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label-width="125px" label="完成进度" prop="completionProgress">
              <el-input
                v-model="$props.form.completionProgress"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4 }"
                maxlength="1000"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card header="项目经费情况" shadow="hover">
      <el-form ref="form" :model="form" label-position="left">
        <el-row :gutter="10">
          <!--          <el-col :span="8">-->
          <!--            <el-form-item label-width="125px" label="专项到款总额">-->
          <!--              <el-input v-model.number="$props.form.totalFundsZxDk" type="number"></el-input>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <el-col :span="8">
            <el-form-item label-width="125px" label="已完成自筹投资">
              <el-input v-model.number="$props.form.zctzDone" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="125px" label="已完成专项投资">
              <el-input v-model.number="$props.form.zxtzDone" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label-width="125px" label="自筹经费公司配套">
              <el-input v-model.number="$props.form.zcGspt" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="200px" label="专项经费公司留存（计划）">
              <el-input v-model.number="$props.form.zxGslc" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card header="项目成果情况" shadow="hover">
      <el-form ref="form" :model="form" label-position="left">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label-width="125px" label="获奖情况（项）">
              <el-input v-model="$props.form.awardDetails" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" maxlength="500" show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="125px" label="论文情况（项）">
              <el-input
                v-model="$props.form.publicationDetails"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4 }"
                maxlength="500"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="125px" label="专利情况">
              <el-input v-model="$props.form.patentDetails" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" maxlength="500" show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label-width="125px" label="软著情况">
              <el-input
                v-model="$props.form.softwareCopyrightDetails"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4 }"
                maxlength="500"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="125px" label="标准情况">
              <el-input v-model="$props.form.standardDetails" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" maxlength="500" show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line vue/require-prop-types
import { getDicts } from '@/api/system/dict/data';
import { reactive } from 'vue';

const props = defineProps(['form']);
const data = reactive({
  progressStatus: []
});

const getProgressStatusOptions = () => {
  getDicts('pro_progress_status').then((resp) => {
    resp.data.forEach((item) => {
      data.progressStatus.push({
        name: item.dictLabel,
        value: Number(item.dictValue)
      });
    });
  });
};

onMounted(() => {
  getProgressStatusOptions();
});
</script>
