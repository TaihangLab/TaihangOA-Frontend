<template>
  <el-dialog :model-value="visible" @update:model-value="updateVisible" width="50%">
    <div class="sticky-container">
      <el-tabs>
        <el-tab-pane label="基本信息" name="first">
          <div style="margin-top: 10px"></div>
          <el-descriptions-item label="基本信息" :span="2"></el-descriptions-item>
          <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '25%' }" :content-style="{ width: '25%' }" border>
            <el-descriptions-item label="项目名称">{{}} </el-descriptions-item>
            <el-descriptions-item label="项目任务书编号">{{}} </el-descriptions-item>
            <el-descriptions-item label="负责课题">{{}} </el-descriptions-item>
            <el-descriptions-item label="课题任务书编号">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目牵头单位">{{}}</el-descriptions-item>
            <el-descriptions-item label="是否牵头单位">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目负责人">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目专员/联系人">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目级别">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目来源">{{}}</el-descriptions-item>
            <el-descriptions-item label="立项时间">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目计划验收时间">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目执行时间（年）">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目推进情况">{{}}</el-descriptions-item>
            <el-descriptions-item label="合作单位">{{}}</el-descriptions-item>
            <el-descriptions-item label="涉及专家、团队">{{}}</el-descriptions-item>
            <el-descriptions-item label="项目经费总额">{{}}</el-descriptions-item>
            <el-descriptions-item label="专项经费">{{}}</el-descriptions-item>
            <el-descriptions-item label="自筹经费">{{}}</el-descriptions-item>
          </el-descriptions>
          <el-collapse>
            <el-collapse-item style="font-size: 20px" name="2">
              <template #title>
                <span style="font-size: 14px">项目简介</span>
              </template>
              <div class="unselectable-textbox" style="font-size: 14px; color: #606266"></div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="项目计划" name="second">
          <ProjectPlan></ProjectPlan>
        </el-tab-pane>
        <el-tab-pane label="项目指标" name="third">
          <ProjectIndicators></ProjectIndicators>
        </el-tab-pane>
        <el-tab-pane label="项目成员" name="fourth">
          <Member />
        </el-tab-pane>
        <el-tab-pane label="项目经费" name="fifth">
          <FundsDetail></FundsDetail>
        </el-tab-pane>
        <el-tab-pane label="项目申报附件" name="sixth">
          <Projectfile></Projectfile>
        </el-tab-pane>
        <el-tab-pane label="项目推进情况" name="seventh">
          <ProjectProgress></ProjectProgress>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(['update:visible']);

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const closeDialog = () => {
  emits('update:visible', false);
};

const confirmDialog = () => {
  // 处理确定逻辑
  emits('update:visible', false);
};
</script>
