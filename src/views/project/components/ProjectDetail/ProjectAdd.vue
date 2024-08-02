<template>
  <el-dialog :model-value="visible" fullscreen title="新增项目" @update:model-value="updateVisible" @close="reset()">
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
import categoryOptions1, {
  categoryOptions2,
  categoryOptions4,
  categoryOptions5,
  reorganizeData,
  reorganizeJJData
} from '@/api/project/funds/fundkeys';
import ProjectInfo from '@/views/project/components/ProjectDetail/ProjectInfo.vue';
import ProjectSpecialFund from '@/views/project/components/ProjectDetail/ProjectSpecialFund.vue';
import ProjectSelfFund from '@/views/project/components/ProjectDetail/ProjectSelfFund.vue';
import ProjectMember from '@/views/project/components/ProjectDetail/ProjectMember.vue';
import TotalFunds from '@/views/project/components/ProjectDetail/TotalFunds.vue';
import FundsSource from '@/views/project/components/ProjectDetail/FundSource.vue';
import ProjectIndicator from '@/views/project/components/ProjectDetail/ProjectIndicator.vue';
import ProjectPlan from '@/views/project/components/ProjectDetail/ProjectPlans.vue';
import OtherAttachment from '@/views/project/components/ProjectDetail/OtherAttachment.vue';
import ProjectProgress from '@/views/project/components/ProjectDetail/ProjectProgress.vue';
import { ElMessage, ElLoading } from 'element-plus';
import { addProject, getProject, updateProject } from '@/api/project/myProject/project';

const TOTAL_STEPS = 9;
const props = defineProps<{ visible: boolean; updateId: string }>();
const emits = defineEmits(['update:visible']);

const stepID = ref(0);
const isStepHover = ref(false);
const nextButtonText = ref('下一步');
const titles = ref(['项目信息', '项目成员', '项目经费', '专项经费', '自筹经费', '经费来源', '项目指标', '项目计划', '项目申报附件', '项目推进情况']);

const projectInfoForm = ref({});
const projectMemberForm = ref({ members: [], items: [] });
const projectFundsForm = ref({});
const zxFundsDetailForm = ref({}); // 弃用
const zcFundsDetailForm = ref({}); // 弃用
const projectIndicatorForm = ref({});
const projectPlanForm = ref({});
const fundsSourceForm = ref({});
const mainAttachmentForm = ref({});
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
const projectAllFundsForm = ref([]);
const categoryOption1 = ref([]);
const categoryOption2 = ref([]);
const categoryOption4 = ref([]);
const categoryOption5 = ref([]);

onMounted(async () => {
  if (props.updateId) {
    await getProject(
      props.updateId,
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
      projectAllFundsForm.value
    ).then(() => {
      categoryOption1.value = categoryOptions1;
      categoryOption2.value = categoryOptions2;
      categoryOption4.value = categoryOptions4;
      categoryOption5.value = categoryOptions5;
      reorganizeData(categoryOption1.value, projectAllFundsForm.value, cards1Form.value, cards2Form.value, tableDataForm.value);
      reorganizeData(categoryOption2.value, projectAllFundsForm.value, zcCards1Form.value, zcCards2Form.value, zcTableDataForm.value);
      reorganizeJJData(categoryOption4.value, projectAllFundsForm.value, cards3Form.value);
      reorganizeJJData(categoryOption5.value, projectAllFundsForm.value, zcCards3Form.value);
    });
  }
});

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
      zxFundsDetailForm.value, // 弃用
      zcFundsDetailForm.value, // 弃用
      fundsSourceForm.value,
      projectIndicatorForm.value,
      projectPlanForm.value,
      otherAttachmentForm.value,
      projectProgressForm.value,
      projectUpdateFundForm
    )
      .then((resp: any) => {
        ElMessage({
          message: '恭喜你，项目修改成功',
          type: 'success'
        });
        loading.close();
      })
      .catch((error: any) => {
        Message.error('错了哦，服务器返回了一条错误信息\n' + error);
        ElMessage.error('错了哦，服务器返回了一条错误信息\n' + error);
        loading.close();
      });
    emits('update:visible', false);
    // 这行代码会导致修改后重新加载页面
    // setTimeout(() => location.reload(), 900);
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
  // 这行代码会导致修改后重新加载页面
  // setTimeout(() => location.reload(), 900);
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
</script>
