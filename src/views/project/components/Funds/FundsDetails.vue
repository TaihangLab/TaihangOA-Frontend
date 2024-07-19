<template>
  <el-dialog :model-value="visible" width="85%" @update:model-value="updateVisible">
    <template #footer>
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="基本信息" name="基本信息">
          <div style="margin-top: 5px"></div>
          <el-descriptions-item label="基本信息" :span="2"></el-descriptions-item>
          <el-descriptions class="margin-top" title="" :column="3" :label-style="{ width: '15%' }" :content-style="{ width: '20%' }" border>
            <el-descriptions-item label="项目名称">{{ 'lookDetail.projectInfoVO.assignedSubjectName' }} </el-descriptions-item>
            <el-descriptions-item label="项目任务书编号">{{ 'lookDetail.projectInfoVO.assignedSubjectName' }} </el-descriptions-item>
            <el-descriptions-item label="负责课题">{{ 'lookDetail.projectInfoVO.assignedSubjectName' }} </el-descriptions-item>
            <el-descriptions-item label="课题任务书编号">{{ 'lookDetail.projectInfoVO.subjectAssignmentSerialNo' }} </el-descriptions-item>
            <el-descriptions-item label="项目牵头单位">{{ 'lookDetail.projectInfoVO.leadingUnit' }} </el-descriptions-item>
            <el-descriptions-item label="是否牵头单位">{{ 'hasLeading[lookDetail.projectInfoVO.hasLeadingRole]' }} </el-descriptions-item>
            <el-descriptions-item label="项目专员/联系人">{{ 'lookDetail.projectInfoVO.projectContact' }} </el-descriptions-item>
            <el-descriptions-item label="项目级别">{{ 'projectLevel[lookDetail.projectInfoVO.projectLevel]' }} </el-descriptions-item>
            <el-descriptions-item label="项目来源">{{ 'lookDetail.projectInfoVO.projectSource' }} </el-descriptions-item>
            <el-descriptions-item label="立项时间">{{ 'lookDetail.projectInfoVO.projectEstablishTime' }} </el-descriptions-item>
            <el-descriptions-item label="项目计划验收时间">{{ 'lookDetail.projectInfoVO.projectScheduledCompletionTime' }} </el-descriptions-item>
            <el-descriptions-item label="项目执行时间（年）">{{ 'lookDetail.projectInfoVO.projectDuration' }} </el-descriptions-item>
            <el-descriptions-item label="项目推进情况">{{ 'lookDetail.projectInfoVO.assignedSubjectName]' }} </el-descriptions-item>
            <el-descriptions-item label="合作单位">{{ 'lookDetail.projectInfoVO.assignedSubjectName' }} </el-descriptions-item>
            <el-descriptions-item label="涉及专家、团队">{{ 'lookDetail.projectInfoVO.assignedSubjectName' }} </el-descriptions-item>
            <el-descriptions-item label="项目经费总额">{{ 'lookDetail.projectInfoVO.assignedSubjectName' }} </el-descriptions-item>
            <el-descriptions-item label="专项经费">{{ 'lookDetail.projectInfoVO.assignedSubjectName' }} </el-descriptions-item>
            <el-descriptions-item label="自筹经费">{{ 'lookDetail.projectInfoVO.assignedSubjectName' }} </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="经费到账" name="经费到账">
          <div style="margin-top: 5px"></div>
          <el-table style="margin: 0; padding: 0">
            <el-table-column align="center" prop="amountReceived" :show-overflow-tooltip="true">
              <template #header>
                <div style="text-align: center">
                  <span>拨款金额</span>
                  <span style="font-size: 12px; color: #f56c6c">（万元）</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="到账类型" align="center" prop="receivedType" :show-overflow-tooltip="true" />
            <el-table-column label="来款单位" align="center" prop="receivedFrom" :show-overflow-tooltip="true" />
            <el-table-column label="到账时间" align="center" prop="receivedDate" :show-overflow-tooltip="true" />
            <el-table-column label="附件" align="center" :show-overflow-tooltip="true">
              <template #default="scope">
                <div v-for="file in scope.row.sysOsses" :key="file.ossId">
                  <el-button size="small" type="text" href="#">{{ file.originalName }}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="支出明细" name="支出明细">
          <div style="margin-top: 5px"></div>
          <el-table
            ref="multipleTable"
            border
            style="width: 100%; max-height: 500px; overflow-y: auto"
            :row-style="{ height: '50px' }"
            :cell-style="{ padding: '0px' }"
          >
            <el-table-column label="日期" :resizable="false" align="center" width="100px"> </el-table-column>
            <el-table-column label="项目名称" :resizable="false" align="center" prop="projectName" width="250px"> </el-table-column>
            <el-table-column label="凭证号" :resizable="false" align="center" prop="voucherNo" width="100px"> </el-table-column>
            <el-table-column label="摘要" :resizable="false" align="center" prop="expenditureAbstract" min-width="200px"> </el-table-column>
            <el-table-column label="专项/自筹" :resizable="false" align="center" prop="zxzc"> </el-table-column>
            <el-table-column label="直接/间接" :resizable="false" align="center" prop="zjjj"> </el-table-column>
            <el-table-column label="一级科目" :resizable="false" align="center" prop="firstLevelSubject" width="150px"> </el-table-column>
            <el-table-column label="二级科目" :resizable="false" align="center" prop="secondLevelSubject" width="150px"> </el-table-column>
            <el-table-column label="三级科目" :resizable="false" align="center" prop="thirdLevelSubject" width="150px"> </el-table-column>
            <el-table-column :resizable="false" align="center" prop="amount" width="150px">
              <template #header>
                <div style="text-align: center">
                  <span>金额</span>
                  <span style="font-size: 12px; color: #f56c6c">（元）</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="经费明细汇总" name="经费明细汇总">经费明细汇总</el-tab-pane>
      </el-tabs>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(['update:visible']);
const activeTab = ref('基本信息');

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

// 使用 watch 监听 updateVisible 变化并打印到控制台
watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      activeTab.value = '基本信息'; // 每次打开对话框时设置默认标签
    }
  }
);
</script>

<style scoped>
/* 你的样式 */
</style>
