export interface ProjectUserBo {
  projectId: number;
  userId: number;
}

export interface ProjectUserVo extends BaseEntity{
  userId: number;
  nickName: string;
  jobTitle: number;
  diploma: number;
  email: string;
  phonenumber: string;
  deptName: string;
  projectUserRoles: number[];
  userProjectNum: number;
  userNationNum: number;
  userProvincialNum: number;
  userEnterpriseNum: number;
  userProjectNumNow: number;
  userNationNumNow: number;
  userProvincialNumNow: number;
  userEnterpriseNumNow: number;
}

export interface ProjectUserDetailVo {
  nationProjectBaseInfos: ProjectBaseInfo[];
  provincialProjectBaseInfos: ProjectBaseInfo[];
  enterpriseProjectBaseInfos: ProjectBaseInfo[];
}

export interface ProjectBaseInfo {
  projectId: number;
  leadingUnit: string;
  assignedSubjectName: string;
  projectContact: string;
  projectAssignmentSerialNo: string;
  projectSource: string;
  projectLevel: number | string;
  hasLeadingRole: number | string;
  assignedSubjectSection: string;
  subjectAssignmentSerialNo: string;
  projectEstablishTime: string; // 使用字符串表示日期
  projectScheduledCompletionTime: string; // 使用字符串表示日期
  projectDuration: string;
  projectDescription: string;
  significanceAndNecessity: string;
  projectProgressStatus: number | string;
  completionProgress: string;
  collaboratingUnit: string;
  expertTeam: string;
  hasCooperativeUnit: number | string;
  awardDetails: string;
  publicationDetails: string;
  patentDetails: string;
  softwareCopyrightDetails: string;
  standardDetails: string;
  deleted?: number; // 可选属性，因为它在数据库查询中被忽略
}
