export interface MilestoneFrom {
  projectId: number;
  milestoneTitle: string;
  milestoneRemark: string;
  milestoneDate: string;
  ossIds: number[];
  projectMilestoneTypes: string[];
}

export const queryPara = ref({});

export const queryParam = reactive({
  pageNum: 1,
  pageSize: 10
});

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
