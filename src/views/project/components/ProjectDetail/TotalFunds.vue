<template>
  <el-card header="项目信息" shadow="hover">
    <el-form ref="form" :model="form" label-position="left">
      <el-divider content-position="left" class="divider-sum">
        <span class="divider-span"
          >(参考)经费总额：
          <el-tag effect="plain" type="warning">{{ jfze }}</el-tag>
          万元</span
        >
      </el-divider>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label-width="100px" label="经费总额">
            <el-input v-model.number="$props.form.jfze"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">
        <span class="divider-span"
          >(参考)专项直接：
          <el-tag effect="plain" type="warning">{{ zxXY[0] }}</el-tag>
          万元</span
        >
        <span class="divider-span"
          >专项间接：
          <el-tag effect="plain" type="warning">{{ zxXY[1] }}</el-tag>
          万元</span
        >
      </el-divider>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label-width="100px" label="专项直接">
            <el-input v-model.number="$props.form.zxzjx"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="100px" label="专项间接">
            <el-input v-model.number="$props.form.zxjjy"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label-width="100px" label="专项经费总额">
            <el-input v-model.number="$props.form.zxjfze"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="100px" label="专项设备费">
            <el-input v-model.number="$props.form.zxsbf"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">
        <span class="divider-span"
          >(参考)自筹直接：
          <el-tag effect="plain" type="warning">{{ zcXY[0] }}</el-tag>
          万元</span
        >
        <span class="divider-span"
          >自筹间接：
          <el-tag effect="plain" type="warning">{{ zcXY[1] }}</el-tag>
          万元</span
        >
      </el-divider>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label-width="100px" label="自筹直接">
            <el-input v-model.number="$props.form.zczjx"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="100px" label="自筹间接">
            <el-input v-model.number="$props.form.zcjjy"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label-width="100px" label="自筹经费总额">
            <el-input v-model.number="$props.form.zcjfze"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="100px" label="自筹设备费">
            <el-input v-model.number="$props.form.zcsbf"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['form']);
const data = {
  return: {}
};

interface Form {
  zcjfze?: number;
  zxjfze?: number;
  zxsbf?: number;
  zcsbf?: number;
}

function mounted() {}

let number1 = ref<number>(100);
const number2 = ref<number>(200);
let testComputed = computed<number>(() => {
  return number1.value + number2.value;
});
function computeXY(ze: number, sbf: number): [number, number] {
  const RANGE1 = 500;
  const RANGE2 = 1000;
  const FACTOR1 = 0.3;
  const FACTOR2 = 0.25;
  const FACTOR3 = 0.2;
  const FACTOR4 = 1.3;
  const FACTOR5 = 1.25;
  const FACTOR6 = 1.2;

  let res: [number, number] = [0, 0];
  if (ze - sbf <= RANGE1) {
    res[0] = (ze + sbf * FACTOR1) / FACTOR4;
    res[1] = (res[0] - sbf) * FACTOR1;
  } else if (ze - sbf <= RANGE2) {
    res[0] = (ze - RANGE1 * FACTOR1 + RANGE1 * FACTOR2 + FACTOR2 * sbf) / FACTOR5;
    res[1] = RANGE1 * FACTOR1 + (res[0] - sbf - RANGE1) * FACTOR2;
  } else {
    res[0] = (ze - RANGE1 * FACTOR1 - RANGE1 * FACTOR2 + FACTOR3 * sbf + FACTOR3 * RANGE2) / FACTOR6;
    res[1] = RANGE1 * FACTOR1 + RANGE1 * FACTOR2 + (res[0] - sbf - RANGE2) * FACTOR3;
  }
  return res;
}
let jfze = computed<number>(() => {
  const { zcjfze = 0, zxjfze = 0 } = props.form;
  if (!zcjfze || !zxjfze) return 0;
  return zcjfze + zxjfze;
});

let zxXY = computed<[number, number]>(() => {
  const { zxjfze, zxsbf } = props.form;
  return zxjfze !== undefined && zxsbf !== undefined ? computeXY(zxjfze, zxsbf) : [0, 0];
});

let zcXY = computed<[number, number]>(() => {
  const { zcjfze, zcsbf } = props.form;
  return zcjfze !== undefined && zcsbf !== undefined ? computeXY(zcjfze, zcsbf) : [0, 0];
});
</script>

<style scoped>
.divider-sum {
  margin-bottom: 20px;
}

.divider-span {
  margin-right: 20px;
  color: #3e8ee0;
}
</style>
