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
  receivedType: number | string;
  receivedFrom: string;
  receivedDate: string;
  sysOsses?: OssVO[];
}

export interface ProjectFundsVO {
  /**
   * 项目经费总额
   */
  totalFundsAll: number | string;

  /**
   * 直接经费总额
   */
  totalFundsZj: number | string;

  /**
   * 间接经费总额
   */
  totalFundsJj: number | string;

  /**
   * 专项经费总额
   */
  totalFundsZx: number | string;

  /**
   * 专项到款总额
   */
  totalFundsZxDk: number | string;

  /**
   * 已完成自筹投资
   */
  zctzDone: number | string;

  /**
   * 已完成专项投资
   */
  zxtzDone: number | string;

  /**
   * 自筹经费公司配套
   */
  zcGspt: number | string;

  /**
   * 专项经费公司留存（计划）
   */
  zxGslc: number | string;

  /**
   * 专项设备费
   */
  sbfZx: number | string;

  /**
   * 设备费_直接
   */
  sbfZj: number | string;

  /**
   * 专项直接费用
   */
  totalFundsZxZj: number | string;

  /**
   * 专项间接费用
   */
  totalFundsZxJj: number | string;

  /**
   * 自筹经费总额
   */
  totalFundsZc: number | string;

  /**
   * 自筹设备费
   */
  sbfZc: number | string;

  /**
   * 自筹直接费用
   */
  totalFundsZcZj: number | string;

  /**
   * 自筹间接费用
   */
  totalFundsZcJj: number | string;

  /**
   * 设备费_专项_直接
   */
  sbfZxZj: number | string;

  /**
   * 设备费_自筹_直接
   */
  sbfZcZj: number | string;

  /**
   * 设备费_购置设备费_直接
   */
  sbfGzsbZj: number | string;

  /**
   * 设备费_购置设备费_专项_直接
   */
  sbfGzsbZxZj: number | string;

  /**
   * 设备费_购置设备费_自筹_直接
   */
  sbfGzsbZcZj: number | string;

  /**
   * 设备费_试制设备费_直接
   */
  sbfSzsbZj: number | string;

  /**
   * 设备费_试制设备费_专项_直接
   */
  sbfSzsbZxZj: number | string;

  /**
   * 设备费_试制设备费_自筹_直接
   */
  sbfSzsbZcZj: number | string;

  /**
   * 设备费_设备升级改造费_直接
   */
  sbfSbsjgzZj: number | string;

  /**
   * 设备费_设备升级改造费_专项_直接
   */
  sbfSbsjgzZxZj: number | string;

  /**
   * 设备费_设备升级改造费_自筹_直接
   */
  sbfSbsjgzZcZj: number | string;

  /**
   * 设备费_设备租赁费_直接
   */
  sbfSbzlZj: number | string;

  /**
   * 设备费_设备租赁费_专项_直接
   */
  sbfSbzlZxZj: number | string;

  /**
   * 设备费_设备租赁费_自筹_直接
   */
  sbfSbzlZcZj: number | string;

  /**
   * 业务费_直接
   */
  ywfZj: number | string;

  /**
   * 业务费_专项_直接
   */
  ywfZxZj: number | string;

  /**
   * 业务费_自筹_直接
   */
  ywfZcZj: number | string;

  /**
   * 业务费_材料费_直接
   */
  ywfClfZj: number | string;

  /**
   * 业务费_材料费_专项_直接
   */
  ywfClfZxZj: number | string;

  /**
   * 业务费_材料费_自筹_直接
   */
  ywfClfZcZj: number | string;

  /**
   * 业务费_资料费_直接
   */
  ywfZlfZj: number | string;

  /**
   * 业务费_资料费_专项_直接
   */
  ywfZlfZxZj: number | string;

  /**
   * 业务费_资料费_自筹_直接
   */
  ywfZlfZcZj: number | string;

  /**
   * 业务费_数据样本采集费_直接
   */
  ywfSjybcjfZj: number | string;

  /**
   * 业务费_数据样本采集费_专项_直接
   */
  ywfSjybcjfZxZj: number | string;

  /**
   * 业务费_数据样本采集费_自筹_直接
   */
  ywfSjybcjfZcZj: number | string;

  /**
   * 业务费_测试化验加工费_直接
   */
  ywfCshyjgfZj: number | string;

  /**
   * 业务费_测试化验加工费_专项_直接
   */
  ywfCshyjgfZxZj: number | string;

  /**
   * 业务费_测试化验加工费_自筹_直接
   */
  ywfCshyjgfZcZj: number | string;

  /**
   * 业务费_燃料动力费_直接
   */
  ywfRldlfZj: number | string;

  /**
   * 业务费_燃料动力费_专项_直接
   */
  ywfRldlfZxZj: number | string;

  /**
   * 业务费_燃料动力费_自筹_直接
   */
  ywfRldlfZcZj: number | string;

  /**
   * 业务费_办公费_直接
   */
  ywfBgfZj: number | string;

  /**
   * 业务费_办公费_专项_直接
   */
  ywfBgfZxZj: number | string;

  /**
   * 业务费_办公费_自筹_直接
   */
  ywfBgfZcZj: number | string;

  /**
   * 业务费_印刷出版费_直接
   */
  ywfYscbfZj: number | string;

  /**
   * 业务费_印刷出版费_专项_直接
   */
  ywfYscbfZxZj: number | string;

  /**
   * 业务费_印刷出版费_自筹_直接
   */
  ywfYscbfZcZj: number | string;

  /**
   * 业务费_知识产权事务费_直接
   */
  ywfZscqswfZj: number | string;

  /**
   * 业务费_知识产权事务费_专项_直接
   */
  ywfZscqswfZxZj: number | string;

  /**
   * 业务费_知识产权事务费_自筹_直接
   */
  ywfZscqswfZcZj: number | string;

  /**
   * 业务费_车辆使用费_直接
   */
  ywfClsyfZj: number | string;

  /**
   * 业务费_车辆使用费_专项_直接
   */
  ywfClsyfZxZj: number | string;

  /**
   * 业务费_车辆使用费_自筹_直接
   */
  ywfClsyfZcZj: number | string;

  /**
   * 业务费_差旅费_直接
   */
  ywfChlfZj: number | string;

  /**
   * 业务费_差旅费_专项_直接
   */
  ywfChlfZxZj: number | string;

  /**
   * 业务费_差旅费_自筹_直接
   */
  ywfChlfZcZj: number | string;

  /**
   * 业务费_会议会务费_直接
   */
  ywfHyhwfZj: number | string;

  /**
   * 业务费_会议会务费_专项_直接
   */
  ywfHyhwfZxZj: number | string;

  /**
   * 业务费_会议会务费_自筹_直接
   */
  ywfHyhwfZcZj: number | string;

  /**
   * 业务费_国内协作费_直接
   */
  ywfGnxzfZj: number | string;

  /**
   * 业务费_国内协作费_专项_直接
   */
  ywfGnxzfZxZj: number | string;

  /**
   * 业务费_国内协作费_自筹_直接
   */
  ywfGnxzfZcZj: number | string;

  /**
   * 业务费_国际合作与交流费_直接
   */
  ywfGjhzjlZj: number | string;

  /**
   * 业务费_国际合作与交流费_专项_直接
   */
  ywfGjhzjlZxZj: number | string;

  /**
   * 业务费_国际合作与交流费_自筹_直接
   */
  ywfGjhzjlZcZj: number | string;

  /**
   * 业务费_劳务费_直接
   */
  ywfLwfZj: number | string;

  /**
   * 业务费_劳务费_专项_直接
   */
  ywfLwfZxZj: number | string;

  /**
   * 业务费_劳务费_自筹_直接
   */
  ywfLwfZcZj: number | string;

  /**
   * 业务费_专家咨询费_直接
   */
  ywfZjzxfZj: number | string;

  /**
   * 业务费_专家咨询费_专项_直接
   */
  ywfZjzxfZxZj: number | string;

  /**
   * 业务费_专家咨询费_自筹_直接
   */
  ywfZjzxfZcZj: number | string;
}
