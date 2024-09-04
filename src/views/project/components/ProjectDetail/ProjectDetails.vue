<template>
  <el-dialog :model-value="visible" width="1200px" @update:model-value="updateVisible">
    <div class="sticky-container">
      <el-tabs v-model="activeNames" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <div style="margin-top: 5px"></div>
          <el-descriptions-item label="基本信息" :span="2"/>
          <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '25%' }" :content-style="{ width: '25%' }" border>
            <el-descriptions-item label="项目名称">{{ projectDetails.projectInfoVO.assignedSubjectName }}</el-descriptions-item>
            <el-descriptions-item label="项目任务书编号">{{ projectDetails.projectInfoVO.projectAssignmentSerialNo }}</el-descriptions-item>
            <el-descriptions-item label="负责课题">{{ projectDetails.projectInfoVO.assignedSubjectSection }}</el-descriptions-item>
            <el-descriptions-item label="课题任务书编号">{{ projectDetails.projectInfoVO.subjectAssignmentSerialNo }}</el-descriptions-item>
            <el-descriptions-item label="项目牵头单位">{{ projectDetails.projectInfoVO.leadingUnit }}</el-descriptions-item>
            <el-descriptions-item label="是否牵头单位">{{ pro_cooperative_unit[projectDetails.projectInfoVO.hasLeadingRole]?.label || '未知'
              }}
            </el-descriptions-item>
            <el-descriptions-item label="项目负责人">{{ projectDetails.projectInfoVO.projectLeader }}</el-descriptions-item>
            <el-descriptions-item label="项目专员/联系人">{{ projectDetails.projectInfoVO.projectContact }}</el-descriptions-item>
            <el-descriptions-item label="项目级别">{{ pro_level_type[projectDetails.projectInfoVO.projectLevel]?.label || '未知'
              }}
            </el-descriptions-item>
            <el-descriptions-item label="项目来源">{{ projectDetails.projectInfoVO.projectSource }}</el-descriptions-item>
            <el-descriptions-item label="立项时间">{{ projectDetails.projectInfoVO.projectEstablishTime }}</el-descriptions-item>
            <el-descriptions-item label="项目计划验收时间">{{ projectDetails.projectInfoVO.projectScheduledCompletionTime
              }}
            </el-descriptions-item>
            <el-descriptions-item label="项目执行时间（年）">{{ projectDetails.projectInfoVO.projectDuration }}</el-descriptions-item>
            <el-descriptions-item label="项目推进情况">{{ pro_progress_status[projectDetails.projectInfoVO.projectProgressStatus]?.label || '未知' }}</el-descriptions-item>
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
                {{ projectDescription }}
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
            <el-table v-loading="loading" :data="transformedUserList" style="margin: 0; padding: 0">
              <el-table-column  label="用户名称" align="center" prop="nickName" :show-overflow-tooltip="true" />
              <el-table-column
                label="职称"
                align="center"
                prop="jobTitle"
                :show-overflow-tooltip="true">
                <template #default="scope">
                  {{ sys_jobtitle_type[scope.row.jobTitle]?.label || '未知' }}
                </template>
              </el-table-column>
              <el-table-column
                label="学历"
                align="center"
                prop="diploma"
                :show-overflow-tooltip="true">
                <template #default="scope">
                  {{ sys_diploma_type[scope.row.diploma]?.label || '未知' }}
                </template>
              </el-table-column>
              <el-table-column label="手机号码" align="center" prop="phonenumber" :show-overflow-tooltip="true" />
              <el-table-column label="所属部门" align="center" prop="deptName" :show-overflow-tooltip="true" />
              <el-table-column
                label="项目角色"
                align="center"
                prop="projectUserRole"
                :show-overflow-tooltip="true">
                <template #default="scope">
                  {{ pro_user_role[scope.row.projectUserRole]?.label || '未知' }}
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
          <el-table v-loading="loading" :data="transformedFile" style="margin: 0; padding: 0">
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
              <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '20%' }" :content-style="{ width: '30%' }" border>
                <el-descriptions-item label="推进情况" :span="1"
                  >{{ pro_progress_status[projectDetails.projectInfoVO.projectProgressStatus]?.label || '未知' }}
                </el-descriptions-item>
                <el-descriptions-item label="" :span="1">{{}} </el-descriptions-item>
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
                <el-descriptions-item label="专项到款总额" :span="1">{{ projectDetails.projectFundsVO.totalFundsZxDk
                  }}
                </el-descriptions-item>
                <el-descriptions-item label="专项经费总额" :span="1">{{ projectDetails.projectFundsVO.totalFundsZx }}</el-descriptions-item>
                <el-descriptions-item label="已完成自筹投资" :span="1">{{ projectDetails.projectFundsVO.zctzDone }}</el-descriptions-item>
                <el-descriptions-item label="已完成专项投资" :span="1">{{ projectDetails.projectFundsVO.zxtzDone }}</el-descriptions-item>
                <el-descriptions-item label="自筹经费公司配套" :span="1">{{ projectDetails.projectFundsVO.zcGspt }}</el-descriptions-item>
                <el-descriptions-item label="专项经费公司留存(计划)" :span="1">{{ projectDetails.projectFundsVO.zxGslc
                  }}
                </el-descriptions-item>
              </el-descriptions>
            </el-collapse-item>

            <el-collapse-item name="3">
              <template #title>
                <span>项目成果情况</span>
              </template>
              <div style="margin-top: 5px"></div>
              <el-descriptions class="margin-top" title="" :column="2" :label-style="{ width: '20%' }" :content-style="{ width: '30%' }" border>
                <el-descriptions-item label="获奖情况（项）" :span="1">{{ projectDetails.projectInfoVO.awardDetails }}</el-descriptions-item>
                <el-descriptions-item label="论文情况（项）" :span="1">{{ projectDetails.projectInfoVO.publicationDetails
                  }}
                </el-descriptions-item>
                <el-descriptions-item label="专利情况" :span="1">{{ projectDetails.projectInfoVO.patentDetails }}</el-descriptions-item>
                <el-descriptions-item label="软著情况" :span="1">{{ projectDetails.projectInfoVO.softwareCopyrightDetails
                  }}
                </el-descriptions-item>
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
import ProjectFunds from '@/views/project/components/ProjectDetail/ProjectFunds.vue';
import { getProjectDetails } from '@/api/project/myProject/project';
// 接收组件的props
const props = defineProps<{
  visible: boolean;
  projectId: string;
}>();
const emits = defineEmits(['update:visible']);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const {
  pro_cocompany_type,
  pro_level_type,
  pro_progress_status,
  pro_cooperative_unit,
  pro_user_role,
  sys_jobtitle_type,
  sys_diploma_type
} = toRefs<any>(
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

interface User {
  nickName: string;
  jobTitle: number;
  diploma: number;
  phonenumber: string;
  deptName: string;
  projectUserRoles: number[];
}

const loading = ref(true);
const userList = ref<User[]>([]);

interface ProjectDetails {
  projectInfoVO: {
    createDept: number; // 创建部门ID
    createBy: number; // 创建人ID
    createTime: string; // 创建时间
    updateBy: number; // 更新人ID
    updateTime: string; // 更新时间
    projectId: number; // 项目ID
    leadingUnit: string; // 项目牵头单位
    assignedSubjectName: string; // 项目名称
    projectContact: string; // 项目专员
    projectAssignmentSerialNo: string; // 项目任务书编号
    projectSource: string; // 项目来源
    projectLevel: number; // 项目级别（0:省级, 1:国家级等）
    hasLeadingRole: number; // 是否有牵头单位（1: 是, 0: 否）
    assignedSubjectSection: string; // 负责课题
    subjectAssignmentSerialNo: string; // 课题任务书编号
    projectLeader: string; // 项目负责人
    projectEstablishTime: string; // 项目立项时间
    projectScheduledCompletionTime: string; // 项目计划完成时间
    projectDuration: string; // 项目周期
    projectDescription: string; // 项目简介
    significanceAndNecessity?: string | null; // 项目意义和必要性
    projectProgressStatus: number; // 项目进度状态（0: 未开始, 1: 进行中, 2: 完成）
    completionProgress: string; // 完成进度
    collaboratingUnit: string; // 合作单位
    expertTeam: string; // 涉及专家团队
    hasCooperativeUnit: number; // 是否有合作单位（1: 是, 0: 否）
    awardDetails: string; // 获奖情况
    publicationDetails: string; // 论文情况
    patentDetails: string; // 专利情况
    softwareCopyrightDetails: string; // 软件著作权情况
    standardDetails: string; // 标准情况
  };
  projectUserVoList: Array<{
    userId: number; // 用户ID
    nickName: string; // 用户昵称
    jobTitle: number; // 职位
    diploma: number; // 学历
    email: string; // 电子邮件
    phonenumber: string; // 手机号码
    deptName: string; // 部门名称
    projectUserRoles: string[]; // 用户角色列表
    userProjectNum: number; // 用户项目数量
    userNationNum: number; // 国家级项目数量
    userProvincialNum: number; // 省级项目数量
    userEnterpriseNum: number; // 企业项目数量
    userProjectNumNow: number; // 当前项目数量
    userNationNumNow: number; // 当前国家级项目数量
    userProvincialNumNow: number; // 当前省级项目数量
    userEnterpriseNumNow: number; // 当前企业项目数量
  }>;
  projectTargetVOList: Array<{
    targetName: string; // 指标名称
    midtermTarget: string; // 中期指标值/状态
    endTarget: string; // 完成指标值/状态
  }>;
  projectAttachmentVOList: Array<{
    ossId: string; // OSS文件ID
    fileName: string; // 文件名称
    originalName: string; // 文件原始名称
    fileSuffix: string; // 文件后缀
    url: string; // 文件访问URL
    createTime: string; // 创建时间
    createBy: number; // 创建人ID
    createByName: string; // 创建人名称
    service: string; // 服务名
    milestoneTitle?: string | null; // 里程碑标题（可选）
  }>;
  projectPlanVOList: Array<{
    stageStartDate: string; // 阶段开始日期
    stageEndDate: string; // 阶段结束日期
    stageTask: string; // 阶段任务
  }>;
  projectFundsVO: Array<{ ProjectFundsV0List }>;
}

// 定义响应式引用
const size = ref('');
const border = ref(true);
const activeName = ref('first');
const activeNames = ref('first');

const projectDescription = ref<any>();
const projectLeaders = ref<any>();

const defaultProjectDetails: ProjectDetails = {
  projectInfoVO: {
    createDept: undefined, // 默认值
    createBy: undefined, // 默认值
    createTime: '', // 默认值
    updateBy: undefined, // 默认值
    updateTime: '', // 默认值
    projectId: undefined, // 默认值
    leadingUnit: '', // 默认值
    assignedSubjectName: '', // 默认值
    projectContact: '', // 默认值
    projectAssignmentSerialNo: '', // 默认值
    projectSource: '', // 默认值
    projectLevel: undefined, // 默认值
    hasLeadingRole: undefined, // 默认值
    assignedSubjectSection: '', // 默认值
    subjectAssignmentSerialNo: '', // 默认值
    projectLeader: '', // 默认值
    projectEstablishTime: '', // 默认值
    projectScheduledCompletionTime: '', // 默认值
    projectDuration: '', // 默认值
    projectDescription: '', // 默认值
    significanceAndNecessity: null, // 默认值
    projectProgressStatus: undefined, // 默认值
    completionProgress: '', // 默认值
    collaboratingUnit: '', // 默认值
    expertTeam: '', // 默认值
    hasCooperativeUnit: undefined, // 默认值
    awardDetails: '', // 默认值
    publicationDetails: '', // 默认值
    patentDetails: '', // 默认值
    softwareCopyrightDetails: '', // 默认值
    standardDetails: '' // 默认值
  },
  projectUserVoList: [], // 默认值为空数组
  projectTargetVOList: [], // 默认值为空数组
  projectAttachmentVOList: [], // 默认值为空数组
  projectPlanVOList: {
    stageStartDate: '', // 阶段开始日期
    stageEndDate: '', // 阶段结束日期
    stageTask: '' // 阶段任务
  },
  projectFundsVO: []
};
const projectDetails = ref<ProjectDetails>(defaultProjectDetails);

const projectMembers = () => {
  getProjectDetails(props.projectId)
    .then((resp) => {
      userList.value = resp.data.projectUserVoList;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

watch(() => props.projectId, projectMembers);

// 定义methods
const handleDownload = (row: { ossId: string }) => {
  // 调用下载方法
  proxy?.$download.oss(row.ossId);
};

// 计算属性 transformedFile
const transformedFile = computed(() => {
  const result = projectDetails.value.projectAttachmentVOList.map((file) => {
    const cleanedName = file.originalName.replace(/\.[^/.]+$/, '');
    const createTime = new Date(file.createTime).toLocaleDateString();
    return {
      originalName: cleanedName,
      fileSuffix: file.fileSuffix,
      createBy: file.createBy,
      createTime: createTime,
      url: file.url,
      ossId: file.ossId
    };
  });
  return result;
});

// 监听projectdetails.value.projectAttachmentVOList属性的变化
watch(
  () => projectDetails.value.projectAttachmentVOList,
  () => {
    transformedFile.value;
  },
  { deep: true }
);

const transformedUserList = computed(() => {
  const result: any[] = [];
  userList.value.forEach((user) => {
    user.projectUserRoles.forEach((role) => {
      result.push({
        nickName: user.nickName,
        jobTitle: user.jobTitle,
        diploma: user.diploma,
        phonenumber: user.phonenumber,
        deptName: user.deptName,
        projectUserRole: role
      });
    });
  });
  return result;
});

projectMembers();

// 监听项目ID的变化
watch(
  () => props.projectId,
  (newProjectId, oldProjectId) => {
    activeName.value = 'first';
    projectDetail(); // 确保在属性变化时调用获取详情的方法
  },
  { immediate: true }
);

// 获取项目详情
function projectDetail() {
  loading.value = true;
  activeNames.value = 'first';
  getProjectDetails(props.projectId)
    .then((resp) => {
      projectDetails.value = resp.data;
      projectDescription.value = projectDetails.value.projectInfoVO.projectDescription;
      projectLeaders.value = projectDetails.value.projectUserVoList.find((member) => member.projectUserRoles.includes('0'));
    })
    .catch((error) => {
      console.error('获取用户数据时出错：', error);
    })
    .finally(() => {
      loading.value = false;
  });
}

const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

watch(
  () => props.visible,
  (newValue, oldValue) => {
    activeNames.value = 'first';
  }
);
</script>
