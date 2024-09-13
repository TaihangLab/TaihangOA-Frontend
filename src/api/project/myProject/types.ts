import { ProjectUserVo } from '@/api/project/members/types';
import { OssVO } from '@/api/system/oss/types';
import { ProjectFundsVO } from '@/api/project/funds/types';
import { ProjectTargetVO } from '@/api/project/target/types';

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
  projectId: number | null;
  keyword: string;
  milestoneStaTime: string;
  milestoneEndTime: string;
  milestoneType: string;
}

export interface queryProjectData {
  assignedSubjectName?: undefined; // 项目名称
  projectLevel?: undefined; // 项目级别
  assignedSubjectSection?: undefined; // 负责课题
  hasCooperativeUnit?: undefined; // 合作单位
  userId?: undefined; // 项目成员
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

export interface ProjectBaseInfoVO {
  projectId?: number; // 项目id
  leadingUnit?: string; // 项目牵头单位
  assignedSubjectName?: string; // 承担课题名称
  projectContact?: string; // 科研项目管理人
  projectAssignmentSerialNo?: string; // 项目任务书编号
  projectLevel?: number; // 项目级别，0国家级，1省级，2企业级
  assignedSubjectSection?: string; // 负责课题
  projectProgressStatus?: number; // 项目推进情况
  projectEstablishTime?: string; // 立项日期 (格式: YYYY-MM-DD)
  projectScheduledCompletionTime?: string; // 项目计划验收时间 (格式: YYYY-MM-DD)
  hasCooperativeUnit?: number; // 有无合作单位，1有，0无
  projectSource?: string; // 项目来源
  projectLeader?: string; // 项目负责人
  hasLeadingRole?: number; // 是否是牵头单位，1是，0否
  collaboratingUnit?: string; // 合作单位
  companyLeader?: string; // 公司负责人
  departmentLeader?: string; // 部门负责人
  researchManager?: string; // 科研管理负责人
  projectDuration?: string; // 项目执行时间（年）
  completionProgress?: string; // 完成进度
  totalFundsAll?: string; // 项目经费总额
  totalFundsZx?: string; // 专项经费总额
  totalFundsZc?: string; // 自筹经费总额
  totalFundsZxDk?: string; // 专项到款总额
  zctzDone?: string; // 已完成自筹投资
  zxtzDone?: string; // 已完成专项投资
  zcGspt?: string; // 自筹经费公司配套
  zxGslc?: string; // 专项经费公司留存（计划）
  updateTime?: string; // 更新时间
}

export interface ProjectMilestoneBo {
  milestoneId?: number; // 大事记ID
  projectId?: number; // 项目ID
  milestoneTitle?: string; // 大事记名称
  milestoneRemark?: string; // 大事记描述
  milestoneDate?: string; // 大事记时间 'yyyy-MM-dd'
  ossIds?: number[]; // ossID列表
  keyword?: string; // 搜索关键字
  milestoneStaTime?: string; // 起始时间 'yyyy-MM-dd'
  milestoneEndTime?: string; // 结束时间 'yyyy-MM-dd'
  milestoneCategoryId?: number; // 分类ID
  milestoneType?: number; // 对应分类
  projectMilestoneTypes?: number[]; // 分类列表
}
