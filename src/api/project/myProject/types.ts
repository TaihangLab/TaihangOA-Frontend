import { ProjectUserVo } from '@/api/project/members/types';
import { OssVO } from '@/api/system/oss/types';
import { ProjectFundsVO } from '@/api/project/funds/types';

export interface MilestoneFrom {
  projectId: number;
  milestoneTitle: string;
  milestoneRemark: string;
  milestoneDate: string;
  ossIds: number[];
  projectMilestoneTypes: string[];
}

export interface deleteParams {
  milestoneId: number;
}

export interface combinedSearchDataList {
  projectId: string | null;
  keyword: string;
  milestoneStaTime: string;
  milestoneEndTime: string;
  milestoneType: string;
}

export interface combinedSearchDataSetList {
  projectId: string;
  keyword: string;
  milestoneStaTime: string;
  milestoneEndTime: string;
}

export interface queryProjectData {
  pageNum: number;
  pageSize: number;
  assignedSubjectName: undefined; // 项目名称
  projectLevel: undefined; // 项目级别
  assignedSubjectSection: undefined; // 负责课题
  hasCooperativeUnit: undefined; // 合作单位
  userId: undefined; // 项目成员
  projectEstablishTimeSta: undefined; // 立项时间开始时间
  projectEstablishTimeEnd: undefined; // 立项时间结束时间
  projectScheduledCompletionTimeSta: undefined; // 项目计划验收时间开始时间
  projectScheduledCompletionTimeEnd: undefined; // 项目计划验收时间结束时间
}

export interface ProjectPlanVO {
  stageStartDate?: string;
  stageEndDate?: string;
  stageTask?: string;
}

export interface ProjectTargetVO {
  targetName?: string;
  midtermTarget?: string;
  endTarget?: string;
}

export interface ProjectInfoVO {
  projectId?: number;
  leadingUnit?: string;
  assignedSubjectName?: string;
  projectContact?: string;
  projectAssignmentSerialNo?: string;
  projectSource?: string;
  projectLevel?: number | string;
  hasLeadingRole?: number | string;
  assignedSubjectSection?: string;
  subjectAssignmentSerialNo?: string;
  projectLeader?: string;
  projectEstablishTime?: string; // ISO 8601 date string (YYYY-MM-DD)
  projectScheduledCompletionTime?: string; // ISO 8601 date string (YYYY-MM-DD)
  projectDuration?: string;
  projectDescription?: string;
  significanceAndNecessity?: string;
  projectProgressStatus?: number | string;
  completionProgress?: string;
  collaboratingUnit?: string;
  expertTeam?: string;
  hasCooperativeUnit?: number | string;
  awardDetails?: string;
  publicationDetails?: string;
  patentDetails?: string;
  softwareCopyrightDetails?: string;
  standardDetails?: string;
}

export interface ProjectDetailsVO {
  projectInfoVO?: ProjectInfoVO;
  projectUserVoList?: ProjectUserVo[];
  projectFundsVO?: ProjectFundsVO;
  projectTargetVOList?: ProjectTargetVO[];
  projectAttachmentVOList?: OssVO[];
  projectPlanVOList?: ProjectPlanVO[];
}
