<template>
  <el-card header="经费来源" shadow="hover">
    <el-form ref="form" :model="form" label-position="left">
      <el-collapse v-model="data.return.activeNames">
        <el-collapse-item name="1">
          <template #title><span :class="data.return.activeClass">申请从专项经费获得的资助</span></template>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="125px" label="专项经费资助" prop="zxjfzz">
                <el-input v-model.number="$props.form.zxjfzz" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>

        <el-collapse-item name="2">
          <template #title><span :class="data.return.activeClass">自筹经费来源</span></template>
          <el-row>
            <el-col>
              <el-form-item label-width="125px" label="自筹经费" prop="zcjf">
                <el-input v-model.number="$props.form.zcjf" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label-width="125px" label="其他财政拨款" prop="qtczbk">
                <el-input v-model.number="$props.form.qtczbk" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="125px" label="自有货币资金" prop="zyhbzj">
                <el-input v-model.number="$props.form.zyhbzj" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="125px" label="其他资金" prop="qtzj">
                <el-input v-model.number="$props.form.qtzj" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps(['form']);
const data = {
  return: {
    activeNames: ['1', '2'],
    activeClass: 'el-icon-edit'
  }
};
</script>

<style scoped>
:deep(.el-collapse-item__header) {
  color: #409eff;
  font-size: 0.95em;

  border-radius: 1%;
}
</style>
