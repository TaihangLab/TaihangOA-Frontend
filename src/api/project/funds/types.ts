import { OssVO } from '@/api/system/oss/types';

export interface ProjectBaseInfoBO {
  projectId: number | string; // 项目id
  leadingUnit: string; // 项目牵头单位
  assignedSubjectName: string; // 承担课题名称
  projectContact: string; // 科研项目管理人员
  projectAssignmentSerialNo: string; // 项目任务书编号
  projectSource: string; // 项目来源
  projectLevel: number | string; // 项目级别
  hasLeadingRole: number | string; // 是否是牵头单位
  assignedSubjectSection: string; // 负责课题
  subjectAssignmentSerialNo: number | string; // 课题任务书编号
  projectEstablishTime: string; // 立项日期
  projectScheduledCompletionTime: string; // 项目计划验收时间
  projectDuration: string; // 项目执行时间（年）
  projectDescription: string; // 项目简介
  significanceAndNecessity: string; // 意义及必要性
  projectProgressStatus: number | string; // 项目推进情况
  completionProgress: string; // 完成进度
  collaboratingUnit: string; // 合作单位
  hasCooperativeUnit: number | string; // 有无合作单位
  expertTeam: string; // 涉及专家、团队
  awardDetails: string; // 获奖情况
  publicationDetails: string; // 论文情况
  patentDetails: string; // 专利情况
  softwareCopyrightDetails: string; // 软著情况
  standardDetails: string; // 标准情况
  userId: number | string; // 项目参与者
  projectEstablishTimeSta?: string; // 立项日期开始查询时间
  projectEstablishTimeEnd?: string; // 立项日期结束查询时间
  projectScheduledCompletionTimeSta: string; // 项目计划验收时间开始时间
  projectScheduledCompletionTimeEnd: string; // 项目计划验收时间结束时间
}

export interface ProjectFundsManagementVO extends BaseEntity {
  projectId: number; // 项目id
  assignedSubjectName: string; // 承担课题名称
  assignedSubjectSection: string; // 负责课题
  projectLevel: number; // 项目级别，0国家级，1省级，2企业级
  totalFundsAll: number; // 项目经费总额
  totalFundsZx: number; // 专项经费总额
  totalFundsZc: number; // 自筹经费总额
  totalFundsAllPaid: number; // 项目经费总额_已支付
  totalFundsAllUnpaid: number; // 项目经费总额_未支付
  totalFundsZxPaid: number; // 专项经费总额_已支付
  totalFundsZxUnpaid: number; // 专项经费总额_未支付
  totalFundsZcPaid: number; // 自筹经费总额_已支付
  totalFundsZcUnpaid: number; // 自筹经费总额_未支付
}

export interface ProjectExpenditureBO {
  expenditureId?: number | string;
  expenditureIds?: number[];
  projectId: number | string;
  expenditureDate?: string;
  projectName?: string;
  voucherNo?: string;
  expenditureAbstract?: string;
  zxzc?: number | string;
  zjjj?: number | string;
  firstLevelSubject: number | string;
  secondLevelSubject: number | string;
  thirdLevelSubject: number | string;
  amount?: number | string;
  expenditureDateSta?: string;
  expenditureDateEnd?: string;
}

export interface ProjectExpenditureVO extends BaseEntity {
  expenditureId: number | string;
  projectId: number | string;
  expenditureDate: string;
  projectName: string;
  voucherNo: string;
  expenditureAbstract: string;
  zxzc: number;
  zjjj: number;
  firstLevelSubject: number;
  secondLevelSubject: number;
  thirdLevelSubject: number;
  amount: number | string;
  createBy: string;
  createTime: string;
}

export interface ProjectFundsReceivedVo extends BaseEntity {
  receivedId: number | string;
  projectId: number | string;
  milestoneId: number | string;
  amountReceived: number | string;
  receivedType: number;
  receivedFrom: string;
  sysOsses: OssVO[];
  receivedDate: string;
}

export interface ProjectFundsReceived {
  receivedId?: number;
  projectId: number;
  milestoneId?: number;
  ossIds?: number[];
  amountReceived: number | string;
  receivedType: number;
  receivedFrom: string;
  receivedDate: string;
  sysOsses?: OssVO[];
}
