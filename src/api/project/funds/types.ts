import { OssVO } from '@/api/system/oss/types';

export interface ProjectBaseInfoBO {
  projectId?: number | string; // 项目id
  leadingUnit?: string; // 项目牵头单位
  assignedSubjectName?: string; // 承担课题名称
  projectContact?: string; // 科研项目管理人员
  projectAssignmentSerialNo?: string; // 项目任务书编号
  projectSource?: string; // 项目来源
  projectLevel?: number | string; // 项目级别
  hasLeadingRole?: number | string; // 是否是牵头单位
  assignedSubjectSection?: string; // 负责课题
  subjectAssignmentSerialNo?: number | string; // 课题任务书编号
  projectEstablishTime?: string; // 立项日期
  projectScheduledCompletionTime?: string; // 项目计划验收时间
  projectDuration?: string; // 项目执行时间（年）
  projectDescription?: string; // 项目简介
  significanceAndNecessity?: string; // 意义及必要性
  projectProgressStatus?: number | string; // 项目推进情况
  completionProgress?: string; // 完成进度
  collaboratingUnit?: string; // 合作单位
  hasCooperativeUnit?: number | string; // 有无合作单位
  expertTeam?: string; // 涉及专家、团队
  awardDetails?: string; // 获奖情况
  publicationDetails?: string; // 论文情况
  patentDetails?: string; // 专利情况
  softwareCopyrightDetails?: string; // 软著情况
  standardDetails?: string; // 标准情况
  userId?: number | string; // 项目参与者
  projectEstablishTimeSta?: string; // 立项日期开始查询时间
  projectEstablishTimeEnd?: string; // 立项日期结束查询时间
  projectScheduledCompletionTimeSta?: string; // 项目计划验收时间开始时间
  projectScheduledCompletionTimeEnd?: string; // 项目计划验收时间结束时间
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

export interface ProjectFundsAndBalanceVO {
  projectFunds: ProjectFundsVO;
  projectBalance: ProjectBalanceVO;
}

export interface ProjectBalanceVO {
  // 项目经费总额_已支付
  totalFundsAllPaid: number;

  // 项目经费总额_未支付
  totalFundsAllUnpaid: number;

  // 直接经费总额_已支付
  totalFundsZjPaid: number;

  // 直接经费总额_未支付
  totalFundsZjUnpaid: number;

  // 间接经费总额_已支付
  totalFundsJjPaid: number;

  // 间接经费总额_未支付
  totalFundsJjUnpaid: number;

  // 专项经费总额_已支付
  totalFundsZxPaid: number;

  // 专项经费总额_未支付
  totalFundsZxUnpaid: number;

  // 专项设备费_已支付
  sbfZxPaid: number;

  // 专项设备费_未支付
  sbfZxUnpaid: number;

  // 设备费_直接_已支付
  sbfZjPaid: number;

  // 设备费_直接_未支付
  sbfZjUnpaid: number;

  // 专项直接费用_已支付
  totalFundsZxZjPaid: number;

  // 专项直接费用_未支付
  totalFundsZxZjUnpaid: number;

  // 专项间接费用_已支付
  totalFundsZxJjPaid: number;

  // 专项间接费用_未支付
  totalFundsZxJjUnpaid: number;

  // 自筹经费总额_已支付
  totalFundsZcPaid: number;

  // 自筹经费总额_未支付
  totalFundsZcUnpaid: number;

  // 自筹设备费_已支付
  sbfZcPaid: number;

  // 自筹设备费_未支付
  sbfZcUnpaid: number;

  // 自筹直接费用_已支付
  totalFundsZcZjPaid: number;

  // 自筹直接费用_未支付
  totalFundsZcZjUnpaid: number;

  // 自筹间接费用_已支付
  totalFundsZcJjPaid: number;

  // 自筹间接费用_未支付
  totalFundsZcJjUnpaid: number;

  // 设备费_专项_直接_已支付
  sbfZxZjPaid: number;

  // 设备费_专项_直接_未支付
  sbfZxZjUnpaid: number;

  // 设备费_自筹_直接_已支付
  sbfZcZjPaid: number;

  // 设备费_自筹_直接_未支付
  sbfZcZjUnpaid: number;

  // 设备费_购置设备费_直接_已支付
  sbfGzsbZjPaid: number;

  // 设备费_购置设备费_直接_未支付
  sbfGzsbZjUnpaid: number;

  // 设备费_购置设备费_专项_直接_已支付
  sbfGzsbZxZjPaid: number;

  // 设备费_购置设备费_专项_直接_未支付
  sbfGzsbZxZjUnpaid: number;

  // 设备费_购置设备费_自筹_直接_已支付
  sbfGzsbZcZjPaid: number;

  // 设备费_购置设备费_自筹_直接_未支付
  sbfGzsbZcZjUnpaid: number;

  // 设备费_试制设备费_直接_已支付
  sbfSzsbZjPaid: number;

  // 设备费_试制设备费_直接_未支付
  sbfSzsbZjUnpaid: number;

  // 设备费_试制设备费_专项_直接_已支付
  sbfSzsbZxZjPaid: number;

  // 设备费_试制设备费_专项_直接_未支付
  sbfSzsbZxZjUnpaid: number;

  // 设备费_试制设备费_自筹_直接_已支付
  sbfSzsbZcZjPaid: number;

  // 设备费_试制设备费_自筹_直接_未支付
  sbfSzsbZcZjUnpaid: number;

  // 设备费_设备升级改造费_直接_已支付
  sbfSbsjgzZjPaid: number;

  // 设备费_设备升级改造费_直接_未支付
  sbfSbsjgzZjUnpaid: number;

  // 设备费_设备升级改造费_专项_直接_已支付
  sbfSbsjgzZxZjPaid: number;

  // 设备费_设备升级改造费_专项_直接_未支付
  sbfSbsjgzZxZjUnpaid: number;

  // 设备费_设备升级改造费_自筹_直接_已支付
  sbfSbsjgzZcZjPaid: number;

  // 设备费_设备升级改造费_自筹_直接_未支付
  sbfSbsjgzZcZjUnpaid: number;

  // 设备费_设备租赁费_直接_已支付
  sbfSbzlZjPaid: number;

  // 设备费_设备租赁费_直接_未支付
  sbfSbzlZjUnpaid: number;

  // 设备费_设备租赁费_专项_直接_已支付
  sbfSbzlZxZjPaid: number;

  // 设备费_设备租赁费_专项_直接_未支付
  sbfSbzlZxZjUnpaid: number;

  // 设备费_设备租赁费_自筹_直接_已支付
  sbfSbzlZcZjPaid: number;

  // 设备费_设备租赁费_自筹_直接_未支付
  sbfSbzlZcZjUnpaid: number;

  // 业务费_直接_已支付
  ywfZjPaid: number;

  // 业务费_直接_未支付
  ywfZjUnpaid: number;

  // 业务费_专项_直接_已支付
  ywfZxZjPaid: number;

  // 业务费_专项_直接_未支付
  ywfZxZjUnpaid: number;

  // 业务费_自筹_直接_已支付
  ywfZcZjPaid: number;

  // 业务费_自筹_直接_未支付
  ywfZcZjUnpaid: number;

  // 业务费_材料费_直接_已支付
  ywfClfZjPaid: number;

  // 业务费_材料费_直接_未支付
  ywfClfZjUnpaid: number;

  // 业务费_材料费_专项_直接_已支付
  ywfClfZxZjPaid: number;

  // 业务费_材料费_专项_直接_未支付
  ywfClfZxZjUnpaid: number;

  // 业务费_材料费_自筹_直接_已支付
  ywfClfZcZjPaid: number;

  // 业务费_材料费_自筹_直接_未支付
  ywfClfZcZjUnpaid: number;

  // 业务费_资料费_直接_已支付
  ywfZlfZjPaid: number;

  // 业务费_资料费_直接_未支付
  ywfZlfZjUnpaid: number;

  // 业务费_资料费_专项_直接_已支付
  ywfZlfZxZjPaid: number;

  // 业务费_资料费_专项_直接_未支付
  ywfZlfZxZjUnpaid: number;

  // 业务费_资料费_自筹_直接_已支付
  ywfZlfZcZjPaid: number;

  // 业务费_资料费_自筹_直接_未支付
  ywfZlfZcZjUnpaid: number;

  // 业务费_数据样本采集费_直接_已支付
  ywfSjybcjfZjPaid: number;

  // 业务费_数据样本采集费_直接_未支付
  ywfSjybcjfZjUnpaid: number;

  // 业务费_数据样本采集费_专项_直接_已支付
  ywfSjybcjfZxZjPaid: number;

  // 业务费_数据样本采集费_专项_直接_未支付
  ywfSjybcjfZxZjUnpaid: number;

  // 业务费_数据样本采集费_自筹_直接_已支付
  ywfSjybcjfZcZjPaid: number;

  // 业务费_数据样本采集费_自筹_直接_未支付
  ywfSjybcjfZcZjUnpaid: number;

  // 业务费_测试化验加工费_直接_已支付
  ywfCshyjgfZjPaid: number;

  // 业务费_测试化验加工费_直接_未支付
  ywfCshyjgfZjUnpaid: number;

  // 业务费_测试化验加工费_专项_直接_已支付
  ywfCshyjgfZxZjPaid: number;

  // 业务费_测试化验加工费_专项_直接_未支付
  ywfCshyjgfZxZjUnpaid: number;

  // 业务费_测试化验加工费_自筹_直接_已支付
  ywfCshyjgfZcZjPaid: number;

  // 业务费_测试化验加工费_自筹_直接_未支付
  ywfCshyjgfZcZjUnpaid: number;

  // 业务费_燃料动力费_直接_已支付
  ywfRldlfZjPaid: number;

  // 业务费_燃料动力费_直接_未支付
  ywfRldlfZjUnpaid: number;

  // 业务费_燃料动力费_专项_直接_已支付
  ywfRldlfZxZjPaid: number;

  // 业务费_燃料动力费_专项_直接_未支付
  ywfRldlfZxZjUnpaid: number;

  // 业务费_燃料动力费_自筹_直接_已支付
  ywfRldlfZcZjPaid: number;

  // 业务费_燃料动力费_自筹_直接_未支付
  ywfRldlfZcZjUnpaid: number;

  // 业务费_办公费_直接_已支付
  ywfBgfZjPaid: number;

  // 业务费_办公费_直接_未支付
  ywfBgfZjUnpaid: number;

  // 业务费_办公费_专项_直接_已支付
  ywfBgfZxZjPaid: number;

  // 业务费_办公费_专项_直接_未支付
  ywfBgfZxZjUnpaid: number;

  // 业务费_办公费_自筹_直接_已支付
  ywfBgfZcZjPaid: number;

  // 业务费_办公费_自筹_直接_未支付
  ywfBgfZcZjUnpaid: number;

  // 业务费_印刷出版费_直接_已支付
  ywfYscbfZjPaid: number;

  // 业务费_印刷出版费_直接_未支付
  ywfYscbfZjUnpaid: number;

  // 业务费_印刷出版费_专项_直接_已支付
  ywfYscbfZxZjPaid: number;

  // 业务费_印刷出版费_专项_直接_未支付
  ywfYscbfZxZjUnpaid: number;

  // 业务费_印刷出版费_自筹_直接_已支付
  ywfYscbfZcZjPaid: number;

  // 业务费_印刷出版费_自筹_直接_未支付
  ywfYscbfZcZjUnpaid: number;

  // 业务费_知识产权事务费_直接_已支付
  ywfZscqswfZjPaid: number;

  // 业务费_知识产权事务费_直接_未支付
  ywfZscqswfZjUnpaid: number;

  // 业务费_知识产权事务费_专项_直接_已支付
  ywfZscqswfZxZjPaid: number;

  // 业务费_知识产权事务费_专项_直接_未支付
  ywfZscqswfZxZjUnpaid: number;

  // 业务费_知识产权事务费_自筹_直接_已支付
  ywfZscqswfZcZjPaid: number;

  // 业务费_知识产权事务费_自筹_直接_未支付
  ywfZscqswfZcZjUnpaid: number;

  // 业务费_车辆使用费_直接_已支付
  ywfClsyfZjPaid: number;

  // 业务费_车辆使用费_直接_未支付
  ywfClsyfZjUnpaid: number;

  // 业务费_车辆使用费_专项_直接_已支付
  ywfClsyfZxZjPaid: number;

  // 业务费_车辆使用费_专项_直接_未支付
  ywfClsyfZxZjUnpaid: number;

  // 业务费_车辆使用费_自筹_直接_已支付
  ywfClsyfZcZjPaid: number;

  // 业务费_车辆使用费_自筹_直接_未支付
  ywfClsyfZcZjUnpaid: number;

  // 业务费_差旅费_直接_已支付
  ywfChlfZjPaid: number;

  // 业务费_差旅费_直接_未支付
  ywfChlfZjUnpaid: number;

  // 业务费_差旅费_专项_直接_已支付
  ywfChlfZxZjPaid: number;

  // 业务费_差旅费_专项_直接_未支付
  ywfChlfZxZjUnpaid: number;

  // 业务费_差旅费_自筹_直接_已支付
  ywfChlfZcZjPaid: number;

  // 业务费_差旅费_自筹_直接_未支付
  ywfChlfZcZjUnpaid: number;

  // 业务费_会议会务费_直接_已支付
  ywfHyhwfZjPaid: number;

  // 业务费_会议会务费_直接_未支付
  ywfHyhwfZjUnpaid: number;

  // 业务费_会议会务费_专项_直接_已支付
  ywfHyhwfZxZjPaid: number;

  // 业务费_会议会务费_专项_直接_未支付
  ywfHyhwfZxZjUnpaid: number;

  // 业务费_会议会务费_自筹_直接_已支付
  ywfHyhwfZcZjPaid: number;

  // 业务费_会议会务费_自筹_直接_未支付
  ywfHyhwfZcZjUnpaid: number;

  // 业务费_国内协作费_直接_已支付
  ywfGnxzfZjPaid: number;

  // 业务费_国内协作费_直接_未支付
  ywfGnxzfZjUnpaid: number;

  // 业务费_国内协作费_专项_直接_已支付
  ywfGnxzfZxZjPaid: number;

  // 业务费_国内协作费_专项_直接_未支付
  ywfGnxzfZxZjUnpaid: number;

  // 业务费_国内协作费_自筹_直接_已支付
  ywfGnxzfZcZjPaid: number;

  // 业务费_国内协作费_自筹_直接_未支付
  ywfGnxzfZcZjUnpaid: number;

  // 业务费_国际合作费_直接_已支付
  ywfGjhzfZjPaid: number;

  // 业务费_国际合作费_直接_未支付
  ywfGjhzfZjUnpaid: number;

  // 业务费_国际合作费_专项_直接_已支付
  ywfGjhzfZxZjPaid: number;

  // 业务费_国际合作费_专项_直接_未支付
  ywfGjhzfZxZjUnpaid: number;

  // 业务费_国际合作费_自筹_直接_已支付
  ywfGjhzfZcZjPaid: number;

  // 业务费_国际合作费_自筹_直接_未支付
  ywfGjhzfZcZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_直接_已支付
  ywfHyclgjhzyjlfZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_直接_未支付
  ywfHyclgjhzyjlfZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_专项_直接_已支付
  ywfHyclgjhzyjlfZxZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_专项_直接_未支付
  ywfHyclgjhzyjlfZxZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_自筹_直接_已支付
  ywfHyclgjhzyjlfZcZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_自筹_直接_未支付
  ywfHyclgjhzyjlfZcZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_会议费_直接_已支付
  ywfHyclgjhzyjlfHyfZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_会议费_直接_未支付
  ywfHyclgjhzyjlfHyfZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_会议费_专项_直接_已支付
  ywfHyclgjhzyjlfHyfZxZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_会议费_专项_直接_未支付
  ywfHyclgjhzyjlfHyfZxZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_会议费_自筹_直接_已支付
  ywfHyclgjhzyjlfHyfZcZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_会议费_自筹_直接_未支付
  ywfHyclgjhzyjlfHyfZcZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_差旅费_直接_已支付
  ywfHyclgjhzyjlfClfZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_差旅费_直接_未支付
  ywfHyclgjhzyjlfClfZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_差旅费_专项_直接_已支付
  ywfHyclgjhzyjlfClfZxZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_差旅费_专项_直接_未支付
  ywfHyclgjhzyjlfClfZxZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_差旅费_自筹_直接_已支付
  ywfHyclgjhzyjlfClfZcZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_差旅费_自筹_直接_未支付
  ywfHyclgjhzyjlfClfZcZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_国际合作费_直接_已支付
  ywfHyclgjhzyjlfGjhzfZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_国际合作费_直接_未支付
  ywfHyclgjhzyjlfGjhzfZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_国际合作费_专项_直接_已支付
  ywfHyclgjhzyjlfGjhzfZxZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_国际合作费_专项_直接_未支付
  ywfHyclgjhzyjlfGjhzfZxZjUnpaid: number;

  // 业务费_会议/差旅/国际合作与交流费_国际合作费_自筹_直接_已支付
  ywfHyclgjhzyjlfGjhzfZcZjPaid: number;

  // 业务费_会议/差旅/国际合作与交流费_国际合作费_自筹_直接_未支付
  ywfHyclgjhzyjlfGjhzfZcZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_直接_已支付
  ywfCbwxxxcbzscqswfZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_直接_未支付
  ywfCbwxxxcbzscqswfZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_专项_直接_已支付
  ywfCbwxxxcbzscqswfZxZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_专项_直接_未支付
  ywfCbwxxxcbzscqswfZxZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_自筹_直接_已支付
  ywfCbwxxxcbzscqswfZcZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_自筹_直接_未支付
  ywfCbwxxxcbzscqswfZcZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_知识产权事务费_直接_已支付
  ywfCbwxxxcbzscqswfZscqswfZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_知识产权事务费_直接_未支付
  ywfCbwxxxcbzscqswfZscqswfZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_知识产权事务费_专项_直接_已支付
  ywfCbwxxxcbzscqswfZscqswfZxZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_知识产权事务费_专项_直接_未支付
  ywfCbwxxxcbzscqswfZscqswfZxZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_知识产权事务费_自筹_直接_已支付
  ywfCbwxxxcbzscqswfZscqswfZcZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_知识产权事务费_自筹_直接_未支付
  ywfCbwxxxcbzscqswfZscqswfZcZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_印刷打印制作费_直接_已支付
  ywfCbwxxxcbzscqswfYsdyzzfZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_印刷打印制作费_直接_未支付
  ywfCbwxxxcbzscqswfYsdyzzfZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_印刷打印制作费_专项_直接_已支付
  ywfCbwxxxcbzscqswfYsdyzzfZxZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_印刷打印制作费_专项_直接_未支付
  ywfCbwxxxcbzscqswfYsdyzzfZxZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_印刷打印制作费_自筹_直接_已支付
  ywfCbwxxxcbzscqswfYsdyzzfZcZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_印刷打印制作费_自筹_直接_未支付
  ywfCbwxxxcbzscqswfYsdyzzfZcZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_文献数据库费_直接_已支付
  ywfCbwxxxcbzscqswfWxsjkfZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_文献数据库费_直接_未支付
  ywfCbwxxxcbzscqswfWxsjkfZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_文献数据库费_专项_直接_已支付
  ywfCbwxxxcbzscqswfWxsjkfZxZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_文献数据库费_专项_直接_未支付
  ywfCbwxxxcbzscqswfWxsjkfZxZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_文献数据库费_自筹_直接_已支付
  ywfCbwxxxcbzscqswfWxsjkfZcZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_文献数据库费_自筹_直接_未支付
  ywfCbwxxxcbzscqswfWxsjkfZcZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_信息传播费_直接_已支付
  ywfCbwxxxcbzscqswfXxcbfZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_信息传播费_直接_未支付
  ywfCbwxxxcbzscqswfXxcbfZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_信息传播费_专项_直接_已支付
  ywfCbwxxxcbzscqswfXxcbfZxZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_信息传播费_专项_直接_未支付
  ywfCbwxxxcbzscqswfXxcbfZxZjUnpaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_信息传播费_自筹_直接_已支付
  ywfCbwxxxcbzscqswfXxcbfZcZjPaid: number;

  // 业务费_出版/文献/信息传播/知识产权事务费_信息传播费_自筹_直接_未支付
  ywfCbwxxxcbzscqswfXxcbfZcZjUnpaid: number;

  // 劳务费_直接_已支付
  lwfZjPaid: number;

  // 劳务费_直接_未支付
  lwfZjUnpaid: number;

  // 劳务费_专项_直接_已支付
  lwfZxZjPaid: number;

  // 劳务费_专项_直接_未支付
  lwfZxZjUnpaid: number;

  // 劳务费_自筹_直接_已支付
  lwfZcZjPaid: number;

  // 劳务费_自筹_直接_未支付
  lwfZcZjUnpaid: number;

  // 劳务费_专家咨询费_直接_已支付
  lwfZjzxfZjPaid: number;

  // 劳务费_专家咨询费_直接_未支付
  lwfZjzxfZjUnpaid: number;

  // 劳务费_专家咨询费_专项_直接_已支付
  lwfZjzxfZxZjPaid: number;

  // 劳务费_专家咨询费_专项_直接_未支付
  lwfZjzxfZxZjUnpaid: number;

  // 劳务费_专家咨询费_自筹_直接_已支付
  lwfZjzxfZcZjPaid: number;

  // 劳务费_专家咨询费_自筹_直接_未支付
  lwfZjzxfZcZjUnpaid: number;

  // 劳务费_人员劳务费_直接_已支付
  lwfRylwfZjPaid: number;

  // 劳务费_人员劳务费_直接_未支付
  lwfRylwfZjUnpaid: number;

  // 劳务费_人员劳务费_专项_直接_已支付
  lwfRylwfZxZjPaid: number;

  // 劳务费_人员劳务费_专项_直接_未支付
  lwfRylwfZxZjUnpaid: number;

  // 劳务费_人员劳务费_自筹_直接_已支付
  lwfRylwfZcZjPaid: number;

  // 劳务费_人员劳务费_自筹_直接_未支付
  lwfRylwfZcZjUnpaid: number;

  /**
   * 材料费_直接_已支付
   */
  clfZjPaid: number;

  /**
   * 材料费_直接_未支付
   */
  clfZjUnpaid: number;

  /**
   * 材料费_专项_直接_已支付
   */
  clfZxZjPaid: number;

  /**
   * 材料费_专项_直接_未支付
   */
  clfZxZjUnpaid: number;

  /**
   * 材料费_自筹_直接_已支付
   */
  clfZcZjPaid: number;

  /**
   * 材料费_自筹_直接_未支付
   */
  clfZcZjUnpaid: number;

  /**
   * 材料费_材料费_直接_已支付
   */
  clfClfZjPaid: number;

  /**
   * 材料费_材料费_直接_未支付
   */
  clfClfZjUnpaid: number;

  /**
   * 材料费_材料费_专项_直接_已支付
   */
  clfClfZxZjPaid: number;

  /**
   * 材料费_材料费_专项_直接_未支付
   */
  clfClfZxZjUnpaid: number;

  /**
   * 材料费_材料费_自筹_直接_已支付
   */
  clfClfZcZjPaid: number;

  /**
   * 材料费_材料费_自筹_直接_未支付
   */
  clfClfZcZjUnpaid: number;

  /**
   * 科研活动费_直接_已支付
   */
  kyhdfZjPaid: number;

  /**
   * 科研活动费_直接_未支付
   */
  kyhdfZjUnpaid: number;

  /**
   * 科研活动费_专项_直接_已支付
   */
  kyhdfZxZjPaid: number;

  /**
   * 科研活动费_专项_直接_未支付
   */
  kyhdfZxZjUnpaid: number;

  /**
   * 科研活动费_自筹_直接_已支付
   */
  kyhdfZcZjPaid: number;

  /**
   * 科研活动费_自筹_直接_未支付
   */
  kyhdfZcZjUnpaid: number;

  /**
   * 科研活动费_资料费_直接_已支付
   */
  kyhdfZlZjPaid: number;

  /**
   * 科研活动费_资料费_直接_未支付
   */
  kyhdfZlZjUnpaid: number;

  /**
   * 科研活动费_资料费_专项_直接_已支付
   */
  kyhdfZlZxZjPaid: number;

  /**
   * 科研活动费_资料费_专项_直接_未支付
   */
  kyhdfZlZxZjUnpaid: number;

  /**
   * 科研活动费_资料费_自筹_直接_已支付
   */
  kyhdfZlZcZjPaid: number;

  /**
   * 科研活动费_资料费_自筹_直接_未支付
   */
  kyhdfZlZcZjUnpaid: number;

  /**
   * 科研活动费_测试化验加工费_直接_已支付
   */
  kyhdfCshyjgZjPaid: number;

  /**
   * 科研活动费_测试化验加工费_直接_未支付
   */
  kyhdfCshyjgZjUnpaid: number;

  /**
   * 科研活动费_测试化验加工费_专项_直接_已支付
   */
  kyhdfCshyjgZxZjPaid: number;

  /**
   * 科研活动费_测试化验加工费_专项_直接_未支付
   */
  kyhdfCshyjgZxZjUnpaid: number;

  /**
   * 科研活动费_测试化验加工费_自筹_直接_已支付
   */
  kyhdfCshyjgZcZjPaid: number;

  /**
   * 科研活动费_测试化验加工费_自筹_直接_未支付
   */
  kyhdfCshyjgZcZjUnpaid: number;

  /**
   * 科研活动费_办公费_直接_已支付
   */
  kyhdfBgZjPaid: number;

  /**
   * 科研活动费_办公费_直接_未支付
   */
  kyhdfBgZjUnpaid: number;

  /**
   * 科研活动费_办公费_专项_直接_已支付
   */
  kyhdfBgZxZjPaid: number;

  /**
   * 科研活动费_办公费_专项_直接_未支付
   */
  kyhdfBgZxZjUnpaid: number;

  /**
   * 科研活动费_办公费_自筹_直接_已支付
   */
  kyhdfBgZcZjPaid: number;

  /**
   * 科研活动费_办公费_自筹_直接_未支付
   */
  kyhdfBgZcZjUnpaid: number;

  /**
   * 科研活动费_数据/样本采集费_直接_已支付
   */
  kyhdfSjybcjZjPaid: number;

  /**
   * 科研活动费_数据/样本采集费_直接_未支付
   */
  kyhdfSjybcjZjUnpaid: number;

  /**
   * 科研活动费_数据/样本采集费_专项_直接_已支付
   */
  kyhdfSjybcjZxZjPaid: number;

  /**
   * 科研活动费_数据/样本采集费_专项_直接_未支付
   */
  kyhdfSjybcjZxZjUnpaid: number;

  /**
   * 科研活动费_数据/样本采集费_自筹_直接_已支付
   */
  kyhdfSjybcjZcZjPaid: number;

  /**
   * 科研活动费_数据/样本采集费_自筹_直接_未支付
   */
  kyhdfSjybcjZcZjUnpaid: number;

  /**
   * 科研活动费_印刷/出版费_直接_已支付
   */
  kyhdfYscbZjPaid: number;

  /**
   * 科研活动费_印刷/出版费_直接_未支付
   */
  kyhdfYscbZjUnpaid: number;

  /**
   * 科研活动费_印刷/出版费_专项_直接_已支付
   */
  kyhdfYscbZxZjPaid: number;

  /**
   * 科研活动费_印刷/出版费_专项_直接_未支付
   */
  kyhdfYscbZxZjUnpaid: number;

  /**
   * 科研活动费_印刷/出版费_自筹_直接_已支付
   */
  kyhdfYscbZcZjPaid: number;

  /**
   * 科研活动费_印刷/出版费_自筹_直接_未支付
   */
  kyhdfYscbZcZjUnpaid: number;

  /**
   * 科研活动费_知识产权事务费_直接_已支付
   */
  kyhdfZscqswZjPaid: number;

  /**
   * 科研活动费_知识产权事务费_直接_未支付
   */
  kyhdfZscqswZjUnpaid: number;

  /**
   * 科研活动费_知识产权事务费_专项_直接_已支付
   */
  kyhdfZscqswZxZjPaid: number;

  /**
   * 科研活动费_知识产权事务费_专项_直接_未支付
   */
  kyhdfZscqswZxZjUnpaid: number;

  /**
   * 科研活动费_知识产权事务费_自筹_直接_已支付
   */
  kyhdfZscqswZcZjPaid: number;

  /**
   * 科研活动费_知识产权事务费_自筹_直接_未支付
   */
  kyhdfZscqswZcZjUnpaid: number;

  /**
   * 科研活动费_燃料动力费_直接_已支付
   */
  kyhdfRldlZjPaid: number;

  /**
   * 科研活动费_燃料动力费_直接_未支付
   */
  kyhdfRldlZjUnpaid: number;

  /**
   * 科研活动费_燃料动力费_专项_直接_已支付
   */
  kyhdfRldlZxZjPaid: number;

  /**
   * 科研活动费_燃料动力费_专项_直接_未支付
   */
  kyhdfRldlZxZjUnpaid: number;

  /**
   * 科研活动费_燃料动力费_自筹_直接_已支付
   */
  kyhdfRldlZcZjPaid: number;

  /**
   * 科研活动费_燃料动力费_自筹_直接_未支付
   */
  kyhdfRldlZcZjUnpaid: number;

  /**
   * 科研活动费_车辆使用费_直接_已支付
   */
  kyhdfClsyZjPaid: number;

  /**
   * 科研活动费_车辆使用费_直接_未支付
   */
  kyhdfClsyZjUnpaid: number;

  /**
   * 科研活动费_车辆使用费_专项_直接_已支付
   */
  kyhdfClsyZxZjPaid: number;

  /**
   * 科研活动费_车辆使用费_专项_直接_未支付
   */
  kyhdfClsyZxZjUnpaid: number;

  /**
   * 科研活动费_车辆使用费_自筹_直接_已支付
   */
  kyhdfClsyZcZjPaid: number;

  /**
   * 科研活动费_车辆使用费_自筹_直接_未支付
   */
  kyhdfClsyZcZjUnpaid: number;

  /**
   * 科研服务费_直接_已支付
   */
  kyfwfZjPaid: number;

  /**
   * 科研服务费_直接_未支付
   */
  kyfwfZjUnpaid: number;

  /**
   * 科研服务费_专项_直接_已支付
   */
  kyfwfZxZjPaid: number;

  /**
   * 科研服务费_专项_直接_未支付
   */
  kyfwfZxZjUnpaid: number;

  /**
   * 科研服务费_自筹_直接_已支付
   */
  kyfwfZcZjPaid: number;

  /**
   * 科研服务费_自筹_直接_未支付
   */
  kyfwfZcZjUnpaid: number;

  /**
   * 科研服务费_专家咨询费_直接_已支付
   */
  kyfwfZjzxZjPaid: number;

  /**
   * 科研服务费_专家咨询费_直接_未支付
   */
  kyfwfZjzxZjUnpaid: number;

  /**
   * 科研服务费_专家咨询费_专项_直接_已支付
   */
  kyfwfZjzxZxZjPaid: number;

  /**
   * 科研服务费_专家咨询费_专项_直接_未支付
   */
  kyfwfZjzxZxZjUnpaid: number;

  /**
   * 科研服务费_专家咨询费_自筹_直接_已支付
   */
  kyfwfZjzxZcZjPaid: number;

  /**
   * 科研服务费_专家咨询费_自筹_直接_未支付
   */
  kyfwfZjzxZcZjUnpaid: number;

  /**
   * 科研服务费_差旅费_直接_已支付
   */
  kyfwfClZjPaid: number;

  /**
   * 科研服务费_差旅费_直接_未支付
   */
  kyfwfClZjUnpaid: number;

  /**
   * 科研服务费_差旅费_专项_直接_已支付
   */
  kyfwfClZxZjPaid: number;

  /**
   * 科研服务费_差旅费_专项_直接_未支付
   */
  kyfwfClZxZjUnpaid: number;

  /**
   * 科研服务费_差旅费_自筹_直接_已支付
   */
  kyfwfClZcZjPaid: number;

  /**
   * 科研服务费_差旅费_自筹_直接_未支付
   */
  kyfwfClZcZjUnpaid: number;

  /**
   * 科研服务费_会议/会务费_直接_已支付
   */
  kyfwfHyhwZjPaid: number;

  /**
   * 科研服务费_会议/会务费_直接_未支付
   */
  kyfwfHyhwZjUnpaid: number;

  /**
   * 科研服务费_会议/会务费_专项_直接_已支付
   */
  kyfwfHyhwZxZjPaid: number;

  /**
   * 科研服务费_会议/会务费_专项_直接_未支付
   */
  kyfwfHyhwZxZjUnpaid: number;

  /**
   * 科研服务费_会议/会务费_自筹_直接_已支付
   */
  kyfwfHyhwZcZjPaid: number;

  /**
   * 科研服务费_会议/会务费_自筹_直接_未支付
   */
  kyfwfHyhwZcZjUnpaid: number;

  /**
   * 科研服务费_国际合作交流_直接_已支付
   */
  kyfwfGjhzjlZjPaid: number;

  /**
   * 科研服务费_国际合作交流_直接_未支付
   */
  kyfwfGjhzjlZjUnpaid: number;

  /**
   * 科研服务费_国际合作交流_专项_直接_已支付
   */
  kyfwfGjhzjlZxZjPaid: number;

  /**
   * 科研服务费_国际合作交流_专项_直接_未支付
   */
  kyfwfGjhzjlZxZjUnpaid: number;

  /**
   * 科研服务费_国际合作交流_自筹_直接_已支付
   */
  kyfwfGjhzjlZcZjPaid: number;

  /**
   * 科研服务费_国际合作交流_自筹_直接_未支付
   */
  kyfwfGjhzjlZcZjUnpaid: number;

  /**
   * 科研服务费_国内协作费_直接_已支付
   */
  kyfwfGnxzZjPaid: number;

  /**
   * 科研服务费_国内协作费_直接_未支付
   */
  kyfwfGnxzZjUnpaid: number;

  /**
   * 科研服务费_国内协作费_专项_直接_已支付
   */
  kyfwfGnxzZxZjPaid: number;

  /**
   * 科研服务费_国内协作费_专项_直接_未支付
   */
  kyfwfGnxzZxZjUnpaid: number;

  /**
   * 科研服务费_国内协作费_自筹_直接_已支付
   */
  kyfwfGnxzZcZjPaid: number;

  /**
   * 科研服务费_国内协作费_自筹_直接_未支付
   */
  kyfwfGnxzZcZjUnpaid: number;

  /**
   * 人员和劳务补助费_直接_已支付
   */
  ryhlwbzfZjPaid: number;

  /**
   * 人员和劳务补助费_直接_未支付
   */
  ryhlwbzfZjUnpaid: number;

  /**
   * 人员和劳务补助费_专项_直接_已支付
   */
  ryhlwbzfZxZjPaid: number;

  /**
   * 人员和劳务补助费_专项_直接_未支付
   */
  ryhlwbzfZxZjUnpaid: number;

  /**
   * 人员和劳务补助费_自筹_直接_已支付
   */
  ryhlwbzfZcZjPaid: number;

  /**
   * 人员和劳务补助费_自筹_直接_未支付
   */
  ryhlwbzfZcZjUnpaid: number;

  /**
   * 人员和劳务补助费_人员劳务费_直接_已支付
   */
  ryhlwbzfRylwZjPaid: number;

  /**
   * 人员和劳务补助费_人员劳务费_直接_未支付
   */
  ryhlwbzfRylwZjUnpaid: number;

  /**
   * 人员和劳务补助费_人员劳务费_专项_直接_已支付
   */
  ryhlwbzfRylwZxZjPaid: number;

  /**
   * 人员和劳务补助费_人员劳务费_专项_直接_未支付
   */
  ryhlwbzfRylwZxZjUnpaid: number;

  /**
   * 人员和劳务补助费_人员劳务费_自筹_直接_已支付
   */
  ryhlwbzfRylwZcZjPaid: number;

  /**
   * 人员和劳务补助费_人员劳务费_自筹_直接_未支付
   */
  ryhlwbzfRylwZcZjUnpaid: number;

  /**
   * 绩效支出_间接_已支付
   */
  jxzcJjPaid: number;

  /**
   * 绩效支出_间接_未支付
   */
  jxzcJjUnpaid: number;

  /**
   * 绩效支出_专项_间接_已支付
   */
  jxzcZxJjPaid: number;

  /**
   * 绩效支出_专项_间接_未支付
   */
  jxzcZxJjUnpaid: number;

  /**
   * 绩效支出_自筹_间接_已支付
   */
  jxzcZcJjPaid: number;

  /**
   * 绩效支出_自筹_间接_未支付
   */
  jxzcZcJjUnpaid: number;

  /**
   * 其他支出_间接_已支付
   */
  othersJjPaid: number;

  /**
   * 其他支出_间接_未支付
   */
  othersJjUnpaid: number;

  /**
   * 间接费用_其他支出_专项_已支付
   */
  othersZxPaid: number;

  /**
   * 间接费用_其他支出_专项_未支付
   */
  othersZxUnpaid: number;

  /**
   * 间接费用_其他支出_自筹_已支付
   */
  othersZcPaid: number;

  /**
   * 间接费用_其他支出_自筹_未支付
   */
  othersZcUnpaid: number;

  /**
   * 设备费_间接_已支付
   */
  sbfJjPaid: number;

  /**
   * 设备费_间接_未支付
   */
  sbfJjUnpaid: number;

  /**
   * 设备费_专项_间接_已支付
   */
  sbfZxJjPaid: number;

  /**
   * 设备费_专项_间接_未支付
   */
  sbfZxJjUnpaid: number;

  /**
   * 设备费_自筹_间接_已支付
   */
  sbfZcJjPaid: number;

  /**
   * 设备费_自筹_间接_未支付
   */
  sbfZcJjUnpaid: number;

  /**
   * 材料费_间接_已支付
   */
  clfJjPaid: number;

  /**
   * 材料费_间接_未支付
   */
  clfJjUnpaid: number;

  /**
   * 材料费_专项_间接_已支付
   */
  clfZxJjPaid: number;

  /**
   * 材料费_专项_间接_未支付
   */
  clfZxJjUnpaid: number;

  /**
   * 材料费_自筹_间接_已支付
   */
  clfZcJjPaid: number;

  /**
   * 材料费_自筹_间接_未支付
   */
  clfZcJjUnpaid: number;

  /**
   * 管理费_间接_已支付
   */
  glfJjPaid: number;

  /**
   * 管理费_间接_未支付
   */
  glfJjUnpaid: number;

  /**
   * 管理费_专项_间接_已支付
   */
  glfZxJjPaid: number;

  /**
   * 管理费_专项_间接_未支付
   */
  glfZxJjUnpaid: number;

  /**
   * 管理费_自筹_间接_已支付
   */
  glfZcJjPaid: number;

  /**
   * 管理费_自筹_间接_未支付
   */
  glfZcJjUnpaid: number;

  /**
   * 房屋租赁费_间接_已支付
   */
  fwzjfJjPaid: number;

  /**
   * 房屋租赁费_间接_未支付
   */
  fwzjfJjUnpaid: number;

  /**
   * 房屋租赁费_专项_间接_已支付
   */
  fwzjfZxJjPaid: number;

  /**
   * 房屋租赁费_专项_间接_未支付
   */
  fwzjfZxJjUnpaid: number;

  /**
   * 房屋租赁费_自筹_间接_未支付
   */
  fwzjfZcJjUnpaid: number;

  /**
   * 房屋租赁费_自筹_间接_已支付
   */
  fwzjfZcJjPaid: number;

  /**
   * 日常水电暖费_间接_未支付
   */
  rcsdnfJjUnpaid: number;

  /**
   * 日常水电暖费_间接_已支付
   */
  rcsdnfJjPaid: number;

  /**
   * 日常水电暖费_专项_间接_未支付
   */
  rcsdnfZxJjUnpaid: number;

  /**
   * 日常水电暖费_专项_间接_已支付
   */
  rcsdnfZxJjPaid: number;

  /**
   * 日常水电暖费_自筹_间接_已支付
   */
  rcsdnfZcJjPaid: number;

  /**
   * 日常水电暖费_自筹_间接_未支付
   */
  rcsdnfZcJjUnpaid: number;

  /**
   * 资料费_间接_已支付
   */
  zlfJjPaid: number;

  /**
   * 资料费_间接_未支付
   */
  zlfJjUnpaid: number;

  /**
   * 资料费_专项_间接_已支付
   */
  zlfZxJjPaid: number;

  /**
   * 资料费_专项_间接_未支付
   */
  zlfZxJjUnpaid: number;

  /**
   * 资料费_自筹_间接_已支付
   */
  zlfZcJjPaid: number;

  /**
   * 资料费_自筹_间接_未支付
   */
  zlfZcJjUnpaid: number;

  /**
   * 数据样本采集费_间接_已支付
   */
  sjybcjfJjPaid: number;

  /**
   * 数据样本采集费_间接_未支付
   */
  sjybcjfJjUnpaid: number;

  /**
   * 数据样本采集费_专项_间接_已支付
   */
  sjybcjfZxJjPaid: number;

  /**
   * 数据样本采集费_专项_间接_未支付
   */
  sjybcjfZxJjUnpaid: number;

  /**
   * 数据样本采集费_自筹_间接_已支付
   */
  sjybcjfZcJjPaid: number;

  /**
   * 数据样本采集费_自筹_间接_未支付
   */
  sjybcjfZcJjUnpaid: number;

  /**
   * 测试化验加工费_间接_已支付
   */
  cshyjgfJjPaid: number;

  /**
   * 测试化验加工费_间接_未支付
   */
  cshyjgfJjUnpaid: number;

  /**
   * 测试化验加工费_专项_间接_已支付
   */
  cshyjgfZxJjPaid: number;

  /**
   * 测试化验加工费_专项_间接_未支付
   */
  cshyjgfZxJjUnpaid: number;

  /**
   * 测试化验加工费_自筹_间接_已支付
   */
  cshyjgfZcJjPaid: number;

  /**
   * 测试化验加工费_自筹_间接_未支付
   */
  cshyjgfZcJjUnpaid: number;

  /**
   * 燃料动力费_间接_已支付
   */
  rldlfJjPaid: number;

  /**
   * 燃料动力费_间接_未支付
   */
  rldlfJjUnpaid: number;

  /**
   * 燃料动力费_专项_间接_已支付
   */
  rldlfZxJjPaid: number;

  /**
   * 燃料动力费_专项_间接_未支付
   */
  rldlfZxJjUnpaid: number;

  /**
   * 燃料动力费_自筹_间接_已支付
   */
  rldlfZcJjPaid: number;

  /**
   * 燃料动力费_自筹_间接_未支付
   */
  rldlfZcJjUnpaid: number;

  /**
   * 办公费_间接_已支付
   */
  bgfJjPaid: number;

  /**
   * 办公费_间接_未支付
   */
  bgfJjUnpaid: number;

  /**
   * 办公费_专项_间接_已支付
   */
  bgfZxJjPaid: number;

  /**
   * 办公费_专项_间接_未支付
   */
  bgfZxJjUnpaid: number;

  /**
   * 办公费_自筹_间接_已支付
   */
  bgfZcJjPaid: number;

  /**
   * 办公费_自筹_间接_未支付
   */
  bgfZcJjUnpaid: number;

  /**
   * 印刷出版费_间接_已支付
   */
  yscbfJjPaid: number;

  /**
   * 印刷出版费_间接_未支付
   */
  yscbfJjUnpaid: number;

  /**
   * 印刷出版费_专项_间接_已支付
   */
  yscbfZxJjPaid: number;

  /**
   * 印刷出版费_专项_间接_未支付
   */
  yscbfZxJjUnpaid: number;

  /**
   * 印刷出版费_自筹_间接_已支付
   */
  yscbfZcJjPaid: number;

  /**
   * 印刷出版费_自筹_间接_未支付
   */
  yscbfZcJjUnpaid: number;

  /**
   * 知识产权事务费_间接_已支付
   */
  zscqswfJjPaid: number;

  /**
   * 知识产权事务费_间接_未支付
   */
  zscqswfJjUnpaid: number;

  /**
   * 知识产权事务费_专项_间接_已支付
   */
  zscqswfZxJjPaid: number;

  /**
   * 知识产权事务费_专项_间接_未支付
   */
  zscqswfZxJjUnpaid: number;

  /**
   * 知识产权事务费_自筹_间接_已支付
   */
  zscqswfZcJjPaid: number;

  /**
   * 知识产权事务费_自筹_间接_未支付
   */
  zscqswfZcJjUnpaid: number;

  /**
   * 车辆使用费_间接_已支付
   */
  clsyfJjPaid: number;

  /**
   * 车辆使用费_间接_未支付
   */
  clsyfJjUnpaid: number;

  /**
   * 车辆使用费_专项_间接_已支付
   */
  clsyfZxJjPaid: number;

  /**
   * 车辆使用费_专项_间接_未支付
   */
  clsyfZxJjUnpaid: number;

  /**
   * 车辆使用费_自筹_间接_已支付
   */
  clsyfZcJjPaid: number;

  /**
   * 车辆使用费_自筹_间接_未支付
   */
  clsyfZcJjUnpaid: number;

  /**
   * 差旅费_间接_已支付
   */
  chlfJjPaid: number;

  /**
   * 差旅费_间接_未支付
   */
  chlfJjUnpaid: number;

  /**
   * 差旅费_专项_间接_已支付
   */
  chlfZxJjPaid: number;

  /**
   * 差旅费_专项_间接_未支付
   */
  chlfZxJjUnpaid: number;

  /**
   * 差旅费_自筹_间接_已支付
   */
  chlfZcJjPaid: number;

  /**
   * 差旅费_自筹_间接_未支付
   */
  chlfZcJjUnpaid: number;

  /**
   * 会议会务费_间接_已支付
   */
  hyhwfJjPaid: number;

  /**
   * 会议会务费_间接_未支付
   */
  hyhwfJjUnpaid: number;

  /**
   * 会议会务费_专项_间接_已支付
   */
  hyhwfZxJjPaid: number;

  /**
   * 会议会务费_专项_间接_未支付
   */
  hyhwfZxJjUnpaid: number;

  /**
   * 会议会务费_自筹_间接_已支付
   */
  hyhwfZcJjPaid: number;

  /**
   * 会议会务费_自筹_间接_未支付
   */
  hyhwfZcJjUnpaid: number;

  /**
   * 专家咨询费_间接_已支付
   */
  zjzxfJjPaid: number;

  /**
   * 专家咨询费_间接_未支付
   */
  zjzxfJjUnpaid: number;

  /**
   * 专家咨询费_专项_间接_已支付
   */
  zjzxfZxJjPaid: number;

  /**
   * 专家咨询费_专项_间接_未支付
   */
  zjzxfZxJjUnpaid: number;

  /**
   * 专家咨询费_自筹_间接_已支付
   */
  zjzxfZcJjPaid: number;

  /**
   * 专家咨询费_自筹_间接_未支付
   */
  zjzxfZcJjUnpaid: number;
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
