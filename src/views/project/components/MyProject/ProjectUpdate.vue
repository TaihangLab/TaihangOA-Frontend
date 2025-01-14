<template>
  <el-dialog :model-value="visible" fullscreen title="修改项目" @update:model-value="updateVisible" @close="reset()">
    <el-container>
      <el-header>
        <el-card shadow="hover">
          <el-steps :active="stepID" finish-status="success" simple>
            <el-step v-for="(t, index) in titles" :key="index" :title="t" @click="stepID = index"></el-step>
          </el-steps>
        </el-card>
      </el-header>

      <el-main style="margin-top: 20px">
        <el-collapse-transition>
          <ProjectInfo v-show="stepID === 0" ref="projectInfoRef" :form="projectInfoForm"></ProjectInfo>
        </el-collapse-transition>

        <el-collapse-transition>
          <ProjectMember v-show="stepID === 1" ref="projectMemberRef" :form="projectMemberForm"></ProjectMember>
        </el-collapse-transition>

        <el-collapse-transition>
          <TotalFunds v-show="stepID === 2" ref="totalFunds" :form="projectFundsForm"></TotalFunds>
        </el-collapse-transition>

        <el-collapse-transition>
          <ProjectSpecialFund
            v-show="stepID === 3"
            ref="projectSpecialFundRef"
            :cards1="cards1Form"
            :cards2="cards2Form"
            :table-data="tableDataForm"
            :cards3="cards3Form"
            visible
          ></ProjectSpecialFund>
        </el-collapse-transition>

        <el-collapse-transition>
          <ProjectSelfFund
            v-show="stepID === 4"
            ref="projectSelfFundRef"
            :cards1="zcCards1Form"
            :cards2="zcCards2Form"
            :table-data="zcTableDataForm"
            :cards3="zcCards3Form"
            visible
          ></ProjectSelfFund>
        </el-collapse-transition>

        <el-collapse-transition>
          <FundsSource v-show="stepID === 5" ref="fundsSource" :form="fundsSourceForm"></FundsSource>
        </el-collapse-transition>

        <el-collapse-transition>
          <ProjectIndicator v-show="stepID === 6" ref="projectIndicatorRef" :form="projectIndicatorForm"></ProjectIndicator>
        </el-collapse-transition>

        <el-collapse-transition>
          <ProjectPlan v-show="stepID === 7" ref="projectPlanRef" :form="projectPlanForm"></ProjectPlan>
        </el-collapse-transition>

        <el-collapse-transition>
          <OtherAttachment v-show="stepID === 8" ref="otherAttachmentRef" :form="otherAttachmentForm"></OtherAttachment>
        </el-collapse-transition>
        <el-collapse-transition>
          <ProjectProgress v-show="stepID === 9" ref="projectProgress" :form="projectProgressForm"></ProjectProgress>
        </el-collapse-transition>
      </el-main>

      <el-footer>
        <el-button v-show="stepID > 0" style="margin-top: 12px" @click="previous">上一步</el-button>
        <el-button style="margin-top: 12px" type="primary" @click="next">{{ nextButtonText }}</el-button>
        <el-button v-show="stepID < 10" style="margin-top: 12px" type="success" @click="submit">现在提交</el-button>
      </el-footer>
    </el-container>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';
import { resetObject } from '@/api/project/funds/utils';
import {
  categoryOptions1,
  categoryOptions2,
  categoryOptions4,
  categoryOptions5,
  reorganizeData,
  reorganizeJJData,
  clearCategories,
  clearContent
} from '@/api/project/funds/fundkeys';
import ProjectInfo from '@/views/project/components/MyProject/ProjectInfo.vue';
import ProjectSpecialFund from '@/views/project/components/MyProject/ProjectSpecialFund.vue';
import ProjectSelfFund from '@/views/project/components/MyProject/ProjectSelfFund.vue';
import ProjectMember from '@/views/project/components/MyProject/ProjectMember.vue';
import TotalFunds from '@/views/project/components/MyProject/TotalFunds.vue';
import FundsSource from '@/views/project/components/MyProject/FundSource.vue';
import ProjectIndicator from '@/views/project/components/MyProject/ProjectIndicator.vue';
import ProjectPlan from '@/views/project/components/MyProject/ProjectPlans.vue';
import OtherAttachment from '@/views/project/components/MyProject/OtherAttachment.vue';
import ProjectProgress from '@/views/project/components/MyProject/ProjectProgress.vue';
import { ElMessage, ElLoading } from 'element-plus';
import { addProject, getProject, updateProject } from '@/api/project/myProject/project';
import { nextTick } from 'vue';
import { OssForm, OssVO } from '@/api/system/oss/types';

const TOTAL_STEPS = 9;
const props = defineProps<{ visible: boolean; updateId: number }>();
const emits = defineEmits(['update:visible', 'reloadProjectList']);

const stepID = ref(0);
const nextButtonText = ref('下一步');
const titles = ref(['项目信息', '项目成员', '项目经费', '专项经费', '自筹经费', '经费来源', '项目指标', '项目计划', '项目申报附件', '项目推进情况']);

const projectInfoForm = ref({});
const projectMemberForm = ref({ items: [] });
const projectFundsForm = ref({});
const zxFundsDetailForm = ref({}); // 弃用
const zcFundsDetailForm = ref({}); // 弃用
const projectIndicatorForm = ref({});
const projectPlanForm = ref({});
const fundsSourceForm = ref({});
const otherAttachmentForm = ref({ uploadList: [] });
const projectProgressForm = ref({});
const cards1Form = ref([]);
const cards2Form = ref([]);
const cards3Form = ref([]);
const tableDataForm = ref([]);
const zcCards1Form = ref([]);
const zcCards2Form = ref([]);
const zcCards3Form = ref([]);
const zcTableDataForm = ref([]);
const projectSpecialFundForm = ref([]);
const categoryOption1 = ref(categoryOptions1);
const categoryOption2 = ref([]);
const categoryOption4 = ref([]);
const categoryOption5 = ref([]);

const next = () => {
  if (stepID.value++ > TOTAL_STEPS - 1) {
    submit();
  }
};

const previous = () => {
  if (stepID.value > 0) {
    stepID.value--;
  }
};

const projectInfoRef = ref();
const projectSpecialFundRef = ref();
const projectSelfFundRef = ref();
const projectMemberRef = ref();
const projectPlanRef = ref();
const projectIndicatorRef = ref();
const otherAttachmentRef = ref();

const reset = () => {
  resetObject(projectInfoForm.value);
  projectMemberRef.value?.reset();
  resetObject(projectFundsForm.value);
  resetObject(zxFundsDetailForm.value); // 弃用
  resetObject(zcFundsDetailForm.value); // 弃用
  resetObject(fundsSourceForm.value);
  projectPlanRef.value?.reset();
  projectIndicatorRef.value?.reset();
  otherAttachmentRef.value?.reset();
  resetObject(projectProgressForm.value);
  projectSpecialFundRef.value?.reset();
  projectSelfFundRef.value?.reset();
  stepID.value = 0;
};

const submit = async () => {
  try {
    await projectInfoRef.value?.validateForm();
  } catch (e) {
    ElMessage({
      showClose: true,
      message: '错误哦，必选信息需要被填写',
      type: 'error'
    });
    return;
  }
  const loading = ElLoading.service({ fullscreen: true, lock: true, text: '努力加载中' });
  if (props.updateId) {
    const projectUpdateFundForm: any = {};
    projectFundForm(cards1Form.value, cards2Form.value, tableDataForm.value, projectUpdateFundForm);
    projectFundForm(zcCards1Form.value, zcCards2Form.value, zcTableDataForm.value, projectUpdateFundForm);
    jProjectFundForm(cards3Form.value, projectUpdateFundForm);
    jProjectFundForm(zcCards3Form.value, projectUpdateFundForm);
    updateProject(
      props.updateId,
      projectInfoForm.value,
      projectMemberForm.value,
      projectFundsForm.value,
      fundsSourceForm.value,
      projectIndicatorForm.value,
      projectPlanForm.value,
      otherAttachmentForm.value,
      projectProgressForm.value,
      projectUpdateFundForm
    )
      .then((resp: any) => {
        emits('reloadProjectList');
        ElMessage({
          message: '恭喜你，项目修改成功',
          type: 'success'
        });
        loading.close();
      })
      .catch((error: any) => {
        ElMessage.error('错了哦，服务器返回了一条错误信息\n' + error);
        loading.close();
      });
    emits('update:visible', false);

    return;
  }

  const projectAddFundForm: any = {};
  projectFundForm(cards1Form.value, cards2Form.value, tableDataForm.value, projectAddFundForm);
  projectFundForm(zcCards1Form.value, zcCards2Form.value, zcTableDataForm.value, projectAddFundForm);
  jProjectFundForm(cards3Form.value, projectAddFundForm);
  jProjectFundForm(zcCards3Form.value, projectAddFundForm);

  addProject(
    projectInfoForm.value,
    projectMemberForm.value,
    projectFundsForm.value,
    zxFundsDetailForm.value, // 弃用
    zcFundsDetailForm.value, // 弃用
    fundsSourceForm.value,
    projectIndicatorForm.value,
    projectPlanForm.value,
    otherAttachmentForm.value,
    projectProgressForm.value,
    projectAddFundForm
  )
    .then((resp: any) => {
      emits('reloadProjectList');
      ElMessage({
        message: '恭喜你，项目新增成功',
        type: 'success'
      });
      loading.close();
    })
    .catch((error: any) => {
      ElMessage.error('错了哦，服务器返回了一条错误信息\n' + error);
      loading.close();
    });
  emits('update:visible', false);
};

const projectFundForm = (cards1Form: any[], cards2Form: any[], tableDataForm: any[], result: any) => {
  cards1Form.forEach((item: any) => {
    result[item.value] = item.content;
  });
  cards2Form.forEach((item: any) => {
    item.forEach((item1: any) => {
      result[item1.value] = item1.content;
    });
  });
  tableDataForm.forEach((level1: any[]) => {
    level1.forEach((level2: any[]) => {
      level2.forEach((item: any) => {
        result[item.value] = item.content;
      });
    });
  });
};

const jProjectFundForm = (cards3Form: any[], result: any) => {
  cards3Form.forEach((item: any) => {
    if (item.content && item.content !== 0) {
      result[item.value] = item.content;
    }
  });
};

watch(stepID, (newid) => {
  nextButtonText.value = newid > TOTAL_STEPS - 1 ? '完成' : '下一步';
});

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

const closeDialog = () => {
  emits('update:visible', false);
};

const confirmDialog = () => {
  emits('update:visible', false);
};

// 遍历函数，将空数组替换为包含 { value: '' } 的对象数组
function transformTableData(data: Array<Array<Array<{ value: string }>>>): Array<Array<Array<{ value: string }>>> {
  return data.map((row: Array<Array<{ value: string }>>) =>
    row.map((cell: Array<{ value: string }>) => (cell.length === 0 ? [{ value: '' }] : cell))
  );
}

// 定义获取项目详情的逻辑
async function fetchProjectDetails(projectId: number) {
  if (projectId) {
    // 启动加载动画
    const loading = ElLoading.service({ fullscreen: true, lock: true, text: '加载中...' });

    try {
      projectSpecialFundForm.value = [];
      // 调用 getProject 方法
      await getProject(
        projectId,
        projectInfoForm.value,
        projectMemberForm.value,
        projectFundsForm.value,
        zxFundsDetailForm.value,
        zcFundsDetailForm.value,
        fundsSourceForm.value,
        projectIndicatorForm.value,
        projectPlanForm.value,
        otherAttachmentForm.value,
        projectProgressForm.value,
        projectSpecialFundForm.value
      );

      // 数据处理
      console.log('projectId', projectId);
      categoryOption1.value = categoryOptions1;
      categoryOption2.value = categoryOptions2;
      categoryOption4.value = categoryOptions4;
      categoryOption5.value = categoryOptions5;
      reorganizeData(categoryOption1.value, projectSpecialFundForm.value, cards1Form.value, cards2Form.value, tableDataForm.value);
      reorganizeData(categoryOption2.value, projectSpecialFundForm.value, zcCards1Form.value, zcCards2Form.value, zcTableDataForm.value);
      reorganizeJJData(categoryOption4.value, projectSpecialFundForm.value, cards3Form.value);
      reorganizeJJData(categoryOption5.value, projectSpecialFundForm.value, zcCards3Form.value);
      // 清楚数据中首地址为空的情况
      cards1Form.value.splice(0, 1);
      cards2Form.value.splice(0, 1);
      cards3Form.value.splice(0, 1);
      tableDataForm.value.splice(0, 1);
      tableDataForm.value = transformTableData(tableDataForm.value);
      if (cards3Form.value.length > 0 && cards3Form.value[cards3Form.value.length - 1].content === '') {
        cards3Form.value.pop();
      }

      zcCards1Form.value.splice(0, 1);
      zcCards2Form.value.splice(0, 1);
      zcCards3Form.value.splice(0, 1);
      zcTableDataForm.value.splice(0, 1);
      zcTableDataForm.value = transformTableData(zcTableDataForm.value);
      if (zcCards3Form.value.length > 0 && zcCards3Form.value[zcCards3Form.value.length - 1].content === '') {
        zcCards3Form.value.pop();
      }
      await nextTick(); // 确保 DOM 更新完成
    } catch (error) {
      // 捕获并显示错误信息
      ElMessage.error('项目加载失败: ' + error);
    } finally {
      // 关闭加载动画
      loading.close();
    }
  }
}

// 监听 updateId 的变化
watch(
  async () => props.updateId,
  (newUpdateId) => {
    fetchProjectDetails(props.updateId);
  }
);

// 组件挂载时执行
onMounted(async () => {
  await fetchProjectDetails(props.updateId);
});
</script>
