export interface ProjectTargetBO extends BaseEntity {
  targetId?: number; // 指标ID，EditGroup 必填
  projectId?: number; // 项目ID，QueryGroup 必填
  targetName?: string; // 指标名称，AddGroup, EditGroup 必填，最长 50 字符
  midtermTarget?: string; // 中期指标值/状态，最长 200 字符
  endTarget?: string; // 完成时指标值/状态，最长 200 字符
}

export interface ProjectTargetVO {
  targetId: number; // 指标ID
  projectId: number; // 项目ID
  targetName: string; // 指标名称
  midtermTarget: string; // 中期指标值/状态
  endTarget: string; // 完成时指标值/状态
}

export interface ProjectTargetProgressBO extends BaseEntity {
  progressId?: number; // 进度id
  targetId?: number; // 指标id
  completionStatus?: string; // 完成情况
  detailedDescription?: string; // 详细描述
  completionTime?: string; // 完成时间 (格式: YYYY-MM-DD)
  completionTimeSta?: string; // 完成时间起始时间 (格式: YYYY-MM-DD)
  completionTimeEnd?: string; // 完成时间截止时间 (格式: YYYY-MM-DD)
}

export interface ProjectTargetProgressVO {
  progressId?: number; // 进度id
  targetId?: number; // 指标id
  completionStatus?: string; // 完成情况
  detailedDescription?: string; // 详细描述
  completionTime?: string; // 完成时间 (格式: YYYY-MM-DD)
}
