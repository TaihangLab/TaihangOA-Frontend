<template>
  <el-dialog :model-value="visible" width="1200px" @update:model-value="updateVisible">
    <div class="sticky-container">
      <el-tabs v-model="activeNames" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <div style="margin-top: 5px"></div>
          <el-descriptions-item label="基本信息" :span="2" />
          <el-descriptions
            v-loading="loading"
            class="margin-top"
            title=""
            :column="2"
            :label-style="{ width: '25%' }"
            :content-style="{ width: '25%' }"
            border
            :data="projectDetails"
          >
            <el-descriptions-item label="项目名称">{{ projectDetails.projectInfoVO.assignedSubjectName }}</el-descriptions-item>
            <el-descriptions-item label="项目任务书编号">{{ projectDetails.projectInfoVO.projectAssignmentSerialNo }}</el-descriptions-item>
            <el-descriptions-item label="负责课题">{{ projectDetails.projectInfoVO.assignedSubjectSection }}</el-descriptions-item>
            <el-descriptions-item label="课题任务书编号">{{ projectDetails.projectInfoVO.subjectAssignmentSerialNo }}</el-descriptions-item>
            <el-descriptions-item label="项目牵头单位">{{ projectDetails.projectInfoVO.leadingUnit }}</el-descriptions-item>
            <el-descriptions-item label="是否牵头单位"
              >{{ pro_cooperative_unit[projectDetails.projectInfoVO.hasLeadingRole]?.label || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="项目负责人">{{ projectDetails.projectInfoVO.projectLeader }}</el-descriptions-item>
            <el-descriptions-item label="项目专员/联系人">{{ projectDetails.projectInfoVO.projectContact }}</el-descriptions-item>
            <el-descriptions-item label="项目级别"
              >{{ pro_level_type[projectDetails.projectInfoVO.projectLevel]?.label || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="项目来源">{{ projectDetails.projectInfoVO.projectSource }}</el-descriptions-item>
            <el-descriptions-item label="立项时间">{{ projectDetails.projectInfoVO.projectEstablishTime }}</el-descriptions-item>
            <el-descriptions-item label="项目计划验收时间">{{ projectDetails.projectInfoVO.projectScheduledCompletionTime }} </el-descriptions-item>
            <el-descriptions-item label="项目执行时间（年）">{{ projectDetails.projectInfoVO.projectDuration }}</el-descriptions-item>
            <el-descriptions-item label="项目推进情况">{{
              pro_progress_status[projectDetails.projectInfoVO.projectProgressStatus]?.label || '未知'
            }}</el-descriptions-item>
            <el-descriptions-item label="合作单位">{{ projectDetails.projectInfoVO.collaboratingUnit }}</el-descriptions-item>
            <el-descriptions-item label="涉及专家、团队">{{ projectDetails.projectInfoVO.expertTeam }}</el-descriptions-item>
            <el-descriptions-item label="项目经费总额">{{ projectDetails.projectFundsVO.totalFundsAll }}</el-descriptions-item>
            <el-descriptions-item label="专项经费">{{ projectDetails.projectFundsVO.totalFundsZx }}</el-descriptions-item>
            <el-descriptions-item label="自筹经费">{{ projectDetails.projectFundsVO.totalFundsZc }}</el-descriptions-item>
          </el-descriptions>
          <el-collapse>
            <el-collapse-item style="font-size: 20px" name="2">
              <template #title>
                <span style="font-size: 14px">项目简介</span>
              </template>
              <div class="unselectable-textbox" style="font-size: 14px; color: #606266">
                {{ projectDetails.projectInfoVO.projectDescription }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="项目计划" name="second">
          <div v-if="projectDetails.projectPlanVOList && projectDetails.projectPlanVOList.length > 0">
            <div style="margin-top: 5px"></div>
            <div v-for="(plan, index) in projectDetails.projectPlanVOList" :key="index">
              <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 30%">
                  <template #label>开始时间</template>
                  {{ plan.stageStartDate }}
                </el-descriptions-item>
                <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" content-style="width: 30%">
                  <template #label>结束时间</template>
                  {{ plan.stageEndDate }}
                </el-descriptions-item>
                <el-descriptions-item label-style="width: 15%; text-align: center; width: auto;" :span="3">
                  <template #label>任务详情</template>
                  {{ plan.stageTask }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
          <div v-else class="no-data-message" style="color: #909399; font-size: 14px; text-align: center">暂无数据</div>
        </el-tab-pane>
        <el-tab-pane label="项目指标" name="third">
          <div v-if="projectDetails.projectTargetVOList && projectDetails.projectTargetVOList.length > 0">
            <div style="margin-top: 5px"></div>
            <div v-for="(plan, index) in projectDetails.projectTargetVOList" :key="index">
              <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item label-style="width: 20%; text-align: center; width: auto;" content-style="width: 80%" :span="3">
                  <template #label>项目指标</template>
                  {{ plan.targetName }}
                </el-descriptions-item>
                <el-descriptions-item label-style="width: 20%; text-align: center; width: auto;" content-style="width: 80%" :span="3">
                  <template #label>中期指标值/状态</template>
                  {{ plan.midtermTarget }}
                </el-descriptions-item>
                <el-descriptions-item label-style="width: 20%; text-align: center; width: auto;" content-style="width: 80%" :span="3">
                  <template #label>完成时指标值/状态</template>
                  {{ plan.endTarget }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
          <div v-else class="no-data-message" style="color: #909399; font-size: 14px; text-align: center">暂无数据</div>
        </el-tab-pane>
        <el-tab-pane label="项目成员" name="fourth">
          <div>
            <div style="margin-top: 5px"></div>
            <el-table v-loading="loading" :data="projectDetails.projectUserVoList" style="margin: 0; padding: 0">
              <el-table-column label="用户名称" align="center" prop="nickName" :show-overflow-tooltip="true" />
              <el-table-column label="职称" align="center" prop="jobTitle" :show-overflow-tooltip="true">
                <template #default="scope">
                  {{ sys_jobtitle_type[scope.row.jobTitle]?.label || '未知' }}
                </template>
              </el-table-column>
              <el-table-column label="学历" align="center" prop="diploma" :show-overflow-tooltip="true">
                <template #default="scope">
                  {{ sys_diploma_type[scope.row.diploma]?.label || '未知' }}
                </template>
              </el-table-column>
              <el-table-column label="手机号码" align="center" prop="phonenumber" :show-overflow-tooltip="true" />
              <el-table-column label="所属部门" align="center" prop="deptName" :show-overflow-tooltip="true" />
              <el-table-column label="项目角色" align="center" prop="projectUserRoles" :show-overflow-tooltip="true">
                <template #default="scope">
                  <!-- 遍历 projectUserRoles 数组，根据角色ID显示对应的角色标签 -->
                  <span v-for="(role, index) in scope.row.projectUserRoles" :key="index">
                    {{ pro_user_role[role]?.label || '未知' }}<span v-if="index < scope.row.projectUserRoles.length - 1">, </span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目经费" name="fifth">
          <ProjectFunds :project-fund-form="projectDetails.projectFundsVO"></ProjectFunds>
        </el-tab-pane>
        <el-tab-pane label="项目申报附件" name="sixth">
          <div style="margin-top: 5px"></div>
          <el-table v-loading="loading" :data="projectDetails.projectAttachmentVOList" style="margin: 0; padding: 0">
            <el-table-column :label="'文件名称'" align="center" prop="originalName" :show-overflow-tooltip="true" />
            <el-table-column :label="'文件格式'" align="center" prop="fileSuffix" :show-overflow-tooltip="true">
              <template #default="scope">
                <div>
                  <el-tag v-if="scope.row.fileSuffix === '.pdf'" type="success" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.docx'" type="warning" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.doc'" type="warning" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.xls'" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.xlsx'" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.ppt'" type="danger" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.pptx'" type="danger" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else-if="scope.row.fileSuffix === '.txt'" size="small">{{ scope.row.fileSuffix }}</el-tag>
                  <el-tag v-else type="info" size="small">{{ scope.row.fileSuffix }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="'上传人'" align="center" prop="createBy" :show-overflow-tooltip="true" />
            <el-table-column :label="'上传时间'" align="center" prop="createTime" :show-overflow-tooltip="true" />
            <el-table-column :label="'操作'" align="center">
              <template #default="scope">
                <el-button size="small" type="text" icon="el-icon-download" @click="handleDownload(scope.row)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="项目推进情况" name="seventh">
          <div style="margin-top: 5px"></div>
          <el-collapse>
            <el-collapse-item name="1">
              <template #title>
                <span>项目推进情况</span>
              </template>
              <div style="margin-top: 5px"></div>
              <el-descriptions class="margin-top" title="" :column="1" :label-style="{ width: '20%' }" :content-style="{ width: '30%' }" border>
                <el-descriptions-item label="推进情况" :span="1"
                  >{{ pro_progress_status[projectDetails.projectInfoVO.projectProgressStatus]?.label || '未知' }}
                </el-descriptions-item>
                <el-descriptions-item label="完成进度" :span="2">{{ projectDetails.projectInfoVO.completionProgress }}</el-descriptions-item>
              </el-descriptions>
            </el-collapse-item>

            <el-collapse-item name="2">
              <template #title>
                <span>项目经费情况</span>
                <span style="font-size: 12px; color: #f56c6c">（单位：万元）</span>
              </template>
              <div style="margin-top: 5px"></div>
              <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '20%' }" :content-style="{ width: '30%' }" border>
                <el-descriptions-item label="经费总额" :span="2">{{ projectDetails.projectFundsVO.totalFundsAll }}</el-descriptions-item>
                <el-descriptions-item label="专项到款总额" :span="1">{{ projectDetails.projectFundsVO.totalFundsZxDk }} </el-descriptions-item>
                <el-descriptions-item label="专项经费总额" :span="1">{{ projectDetails.projectFundsVO.totalFundsZx }}</el-descriptions-item>
                <el-descriptions-item label="已完成自筹投资" :span="1">{{ projectDetails.projectFundsVO.zctzDone }}</el-descriptions-item>
                <el-descriptions-item label="已完成专项投资" :span="1">{{ projectDetails.projectFundsVO.zxtzDone }}</el-descriptions-item>
                <el-descriptions-item label="自筹经费公司配套" :span="1">{{ projectDetails.projectFundsVO.zcGspt }}</el-descriptions-item>
                <el-descriptions-item label="专项经费公司留存(计划)" :span="1">{{ projectDetails.projectFundsVO.zxGslc }} </el-descriptions-item>
              </el-descriptions>
            </el-collapse-item>

            <el-collapse-item name="3">
              <template #title>
                <span>项目成果情况</span>
              </template>
              <div style="margin-top: 5px"></div>
              <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '20%' }" :content-style="{ width: '30%' }" border>
                <el-descriptions-item label="获奖情况（项）" :span="1">{{ projectDetails.projectInfoVO.awardDetails }}</el-descriptions-item>
                <el-descriptions-item label="论文情况（项）" :span="1">{{ projectDetails.projectInfoVO.publicationDetails }} </el-descriptions-item>
                <el-descriptions-item label="专利情况" :span="1">{{ projectDetails.projectInfoVO.patentDetails }}</el-descriptions-item>
                <el-descriptions-item label="软著情况" :span="1">{{ projectDetails.projectInfoVO.softwareCopyrightDetails }} </el-descriptions-item>
                <el-descriptions-item label="标准情况" :span="1">{{ projectDetails.projectInfoVO.standardDetails }}</el-descriptions-item>
              </el-descriptions>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';
import ProjectFunds from '@/views/project/components/MyProject/ProjectFunds.vue';
import { getProjectDetails } from '@/api/project/myProject/project';
import { ProjectDetailsVO } from '@/api/project/myProject/types';

const props = defineProps<{
  visible: boolean;
  projectId: string;
}>();
const emits = defineEmits(['update:visible']);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const loading = ref(true);
const { pro_cocompany_type, pro_level_type, pro_progress_status, pro_cooperative_unit, pro_user_role, sys_jobtitle_type, sys_diploma_type } =
  toRefs<any>(
    proxy?.useDict(
      'pro_cocompany_type',
      'pro_level_type',
      'pro_progress_status',
      'pro_cooperative_unit',
      'pro_user_role',
      'sys_jobtitle_type',
      'sys_diploma_type'
    )
  );

const projectDetails = reactive<ProjectDetailsVO>({
  projectInfoVO: {},
  projectPlanVOList: [],
  projectTargetVOList: [],
  projectUserVoList: [],
  projectFundsVO: {},
  projectAttachmentVOList: []
});

const activeNames = ref('first');

// 定义methods
const handleDownload = (row: { ossId: string }) => {
  proxy?.$download.oss(row.ossId);
};

const getProjectDetail = async () => {
  loading.value = true;
  activeNames.value = 'first';
  await getProjectDetails(props.projectId)
    .then((resp) => {
      projectDetails.projectFundsVO = resp.data.projectFundsVO;
      projectDetails.projectInfoVO = resp.data.projectInfoVO;
      projectDetails.projectPlanVOList = resp.data.projectPlanVOList;
      projectDetails.projectTargetVOList = resp.data.projectTargetVOList;
      projectDetails.projectUserVoList = resp.data.projectUserVoList;
      projectDetails.projectAttachmentVOList = resp.data.projectAttachmentVOList;
    })
    .catch((error) => {
      console.error('获取用户数据时出错：', error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

watch(
  () => props.projectId,
  (newValue, oldValue) => {
    getProjectDetail();
  },
  { immediate: true }
);

watch(
  () => props.visible,
  (newValue, oldValue) => {
    activeNames.value = 'first';
  }
);
</script>
