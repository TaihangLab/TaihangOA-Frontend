export interface MilestoneFrom {
  projectId: number;
  milestoneTitle: string;
  milestoneRemark: string;
  milestoneDate: string;
  ossIds: number[];
  projectMilestoneTypes: string[];
}

export const queryPara = ref({});

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
  projectId: string | null;
  keyword: string;
  milestoneStaTime: string;
  milestoneEndTime: string;
}
