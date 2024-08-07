import request from '@/utils/request';
import { filterList } from '@/api/project/myProject/utils';
import Vue from 'vue';
import { ElLoading } from 'element-plus';

/**
 * 获取项目列表
 * @param projectInfoForm
 * @param projectMemberForm
 * @param projectFundsForm
 * @param zxFundsDetailForm
 * @param zcFundsDetailForm
 * @param fundsSourceForm
 * @param projectIndicatorForm
 * @param projectPlanForm
 * @param otherAttachmentForm
 * @param projectProgressForm
 * @param projectSpecialFundForm
 * @returns {AxiosPromise}
 */
export async function addProject(
  projectInfoForm,
  projectMemberForm,
  projectFundsForm,
  zxFundsDetailForm,
  zcFundsDetailForm,
  fundsSourceForm,
  projectIndicatorForm,
  projectPlanForm,
  otherAttachmentForm,
  projectProgressForm,
  projectSpecialFundForm
) {
  /**
   *  项目成员
   */
  const members = filterList(projectMemberForm.items).map((value) => {
    return { userId: value.id, projectUserRoleList: value.role };
  });
  /**
   *  项目指标
   */
  const indicators = filterList(projectIndicatorForm.items, 'title').map((value) => {
    return { targetName: value.title, midtermTarget: value.midterm, endTarget: value.finish };
  });
  /**
   *  项目计划
   */
  const plans = filterList(projectPlanForm.items, 'date').map((value) => {
    return { stageStartDate: value.date[0], stageEndDate: value.date[1], stageTask: value.task };
  });

  return request({
    url: '/project/my/add',
    method: 'post',
    data: {
      'projectBaseInfoBO': {
        /**
         *  牵头单位
         */
        'leadingUnit': projectInfoForm.leadingUnit,
        /**
         *  项目名称
         */
        'assignedSubjectName': projectInfoForm.name,
        /**
         *  联系人
         */
        'projectContact': projectInfoForm.contact,
        /**
         *  项目编号
         */
        'projectAssignmentSerialNo': projectInfoForm.projectNumber,
        /**
         *  项目来源
         */
        'projectSource': projectInfoForm.source,
        /**
         *  项目级别
         */
        'projectLevel': projectInfoForm.level,
        /**
         *  是否牵头单位
         */
        'hasLeadingRole': projectInfoForm.isLeadingUnit,
        /**
         *  课题名称
         */
        'assignedSubjectSection': projectInfoForm.subjectName,
        /**
         *  课题编号
         */
        'subjectAssignmentSerialNo': projectInfoForm.subjectNumber,
        /**
         *  立项时间
         */
        'projectEstablishTime': projectInfoForm.startTime,
        /**
         *  结束时间
         */
        'projectScheduledCompletionTime': projectInfoForm.endTime,
        /**
         *  项目周期
         */
        'projectDuration': projectInfoForm.duration,
        /**
         *  项目意义和必要性
         */
        'significanceAndNecessity': projectInfoForm.meaning,
        /**
         *  项目进展情况
         */
        'projectProgressStatus': projectProgressForm.projectProgressStatus,
        /**
         *  项目完成进度
         */
        'completionProgress': projectProgressForm.completionProgress,
        /**
         *  合作单位
         */
        'collaboratingUnit': projectInfoForm.coopUnit,
        /**
         *  专家团队
         */
        'expertTeam': projectInfoForm.expertTeam,
        /**
         *  有无合作单位
         */
        'hasCooperativeUnit': projectInfoForm.coopUnit ? 1 : 0,
        /**
         *  项目描述
         */
        'projectDescription': projectInfoForm.description,
        /**
         *  获奖情况（项）
         */
        'awardDetails': projectProgressForm.awardDetails,
        /**
         *  论文情况（项）
         */
        'publicationDetails': projectProgressForm.publicationDetails,
        /**
         *  专利情况
         */
        'patentDetails': projectProgressForm.patentDetails,
        /**
         *  软著情况
         */
        'softwareCopyrightDetails': projectProgressForm.softwareCopyrightDetails,
        /**
         *  标准情况
         */
        'standardDetails': projectProgressForm.standardDetails
      },
      'projectFundsBO': {
        /**
         *  总经费
         */
        'totalFundsAll': projectFundsForm.jfze,
        /**
         *  专项到款总额
         */
        'totalFundsZxDk': projectProgressForm.totalFundsZxDk,
        /**
         *  已完成自筹投资
         */
        'zctzDone': projectProgressForm.zctzDone,
        /**
         *  已完成专项投资
         */
        'zxtzDone': projectProgressForm.zxtzDone,
        /**
         *  自筹经费公司配套
         */
        'zcGspt': projectProgressForm.zcGspt,
        /**
         *  专项经费公司留存（计划）
         */
        'zxGslc': projectProgressForm.zxGslc,
        /**
         *  专项经费总额
         */
        'totalFundsZx': projectFundsForm.zxjfze,
        /**
         *  专项经费设备费
         */
        'sbfZx': projectFundsForm.zxsbf,
        /**
         *  专项经费直接费
         */
        'totalFundsZxZj': projectFundsForm.zxzjx,
        /**
         *  专项经费间接费
         */
        'totalFundsZxJj': projectFundsForm.zxjjy,
        /**
         *  自筹经费总额
         */
        'totalFundsZc': projectFundsForm.zcjfze,
        /**
         *  自筹经费设备费
         */
        'sbfZc': projectFundsForm.zcsbf,
        /**
         *  自筹经费直接费
         */
        'totalFundsZcZj': projectFundsForm.zczjx,
        /**
         *  自筹经费间接费
         */
        'totalFundsZcJj': projectFundsForm.zcjjy,

        /**
         *  经费来源-专项经费
         */
        'jflyZx': fundsSourceForm.zxjfzz,
        /**
         *  经费来源-自筹经费
         */
        'jflyZc': fundsSourceForm.zcjf,
        /**
         *  经费来源-其他财政拨款
         */
        'jflyQtczbkZc': fundsSourceForm.qtczbk,
        /**
         *  经费来源-自有货币基金
         */
        'jflyDwzyhbzjZc': fundsSourceForm.zyhbzj,
        /**
         *  经费来源-其他资金
         */
        'jflyQtzjZc': fundsSourceForm.qtzj,

        /**
         *  专项经费和自筹经费
         */
        ...projectSpecialFundForm
      },
      /**
       *  项目成员
       */
      'projectUserBoList': members,
      /**
       *  项目指标
       */
      'projectTargetBOList': indicators,
      /**
       *  项目计划
       */
      'projectPlanBOList': plans,
      /**
       *  附件列表
       */
      'ossIdList': otherAttachmentForm.uploadList
    }
  });
}

/**
 *
 * @param {*} projectId
 * @param {*} projectInfoForm
 * @param {*} projectFundsForm
 * @param {*} projectMemberForm
 * @param {*} zxFundsDetailForm
 * @param {*} zcFundsDetailForm
 * @param {*} fundsSourceForm
 * @param {*} projectIndicatorForm
 * @param {*} projectPlanForm
 * @param {*} otherAttachmentForm
 * @param {*} projectProgressForm
 */
export function getProject(
  projectId,
  projectInfoForm,
  projectMemberForm,
  projectFundsForm,
  zxFundsDetailForm,
  zcFundsDetailForm,
  fundsSourceForm,
  projectIndicatorForm,
  projectPlanForm,
  otherAttachmentForm,
  projectProgressForm,
  projectSpecialFundForm
) {
  const loading = ElLoading.service({ fullscreen: true, lock: true, text: '努力加载中' });
  return new Promise((resolve, reject) => {
    request({
      url: '/project/list/getDetails',
      method: 'get',
      params: { projectId }
    })
      .then((resp) => {
        const { projectInfoVO, projectUserVoList, projectFundsVO, projectTargetVOList, projectAttachmentVOList, projectPlanVOList } = resp.data;

        // console.log("项目", projectInfoVO);
        // console.log("指标", projectTargetVOList);
        // console.log("计划", projectFundsVO);
        // console.log("附件", projectAttachmentVOList);
        /**
         *  项目成员
         */

        const members = projectUserVoList.map((value) => {
          return { id: value.userId, role: value.projectUserRoles };
        });
        // if (members.length > 0) Vue.set(projectMemberForm, 'items', members);
        if (members.length > 0) projectMemberForm.item = members;
        /**
         *  项目指标
         */
        const indicators = projectTargetVOList.map((value) => {
          return { title: value.targetName, midterm: value.midtermTarget, finish: value.endTarget };
        });
        // if (indicators.length > 0) Vue.set(projectIndicatorForm, 'items', indicators);
        if (indicators.length > 0) projectIndicatorForm.items = indicators;
        /**
         *  项目经费
         *          const projectSpecialFund = Object.entries(projectFundsVO).map(([key, value]) => {return { key: key, value: value };});
         *         Vue.set(projectSpecialFundForm, "items", projectSpecialFund)
         *         Object.assign(projectSpecialFundForm, projectFundsVO);
         */
        Object.keys(projectFundsVO).map((key) => {
          projectSpecialFundForm.push({ key: key, value: projectFundsVO[key] });
        });
        /**
         *  项目计划
         */
        const plans = projectPlanVOList.map((value) => {
          return { date: [value.stageStartDate, value.stageEndDate], task: value.stageTask };
        });
        // if (plans.length > 0) Vue.set(projectPlanForm, 'items', plans);
        if (plans.length > 0) projectPlanForm.items = plans;
        /**
         *  项目推进情况
         *  推进情况
         */
        // Vue.set(projectProgressForm, 'projectProgressStatus', projectInfoVO.projectProgressStatus);
        projectProgressForm.projectProgressStatus = projectInfoVO.projectProgressStatus;
        /**
         *  完成进度
         */
        // Vue.set(projectProgressForm, 'completionProgress', projectInfoVO.completionProgress);
        projectProgressForm.completionProgress = projectInfoVO.completionProgress;
        /**
         *  专项到款总额
         */
        projectProgressForm.totalFundsZxDk = projectFundsVO.totalFundsZxDk;
        /**
         *  已完成自筹投资
         */
        projectProgressForm.zctzDone = projectFundsVO.zctzDone;
        /**
         *  已完成专项投资
         */
        projectProgressForm.zxtzDone = projectFundsVO.zxtzDone;
        /**
         *  自筹经费公司配套
         */
        projectProgressForm.zcGspt = projectFundsVO.zcGspt;
        /**
         *  专项经费公司留存
         */
        projectProgressForm.zxGslc = projectFundsVO.zxGslc;
        /**
         *  获奖情况
         */
        projectProgressForm.awardDetails = projectInfoVO.awardDetails;
        /**
         *  论文情况
         */
        projectProgressForm.publicationDetails = projectInfoVO.publicationDetails;
        /**
         *  专利情况
         */
        projectProgressForm.patentDetails = projectInfoVO.patentDetails;
        /**
         *  软著情况
         */
        projectProgressForm.softwareCopyrightDetails = projectInfoVO.softwareCopyrightDetails;
        /**
         *  标准情况
         */
        projectProgressForm.standardDetails = projectInfoVO.standardDetails;
        /**
         *  项目附件
         */
        otherAttachmentForm.value = projectAttachmentVOList;

        /**
         *  牵头单位
         */
        projectInfoForm.leadingUnit = projectInfoVO.leadingUnit;
        /**
         *  项目名称
         */
        projectInfoForm.name = projectInfoVO.assignedSubjectName;
        /**
         *  联系人
         */
        projectInfoForm.contact = projectInfoVO.projectContact;
        /**
         *  项目编号
         */
        projectInfoForm.projectNumber = projectInfoVO.projectAssignmentSerialNo;
        /**
         *  项目来源
         */
        projectInfoForm.source = projectInfoVO.projectSource;
        /**
         *  项目级别
         */
        projectInfoForm.level = projectInfoVO.projectLevel;
        /**
         *  是否牵头单位
         */
        projectInfoForm.isLeadingUnit = projectInfoVO.hasLeadingRole;
        /**
         *  课题名称
         */
        projectInfoForm.subjectName = projectInfoVO.assignedSubjectSection;
        /**
         *  课题编号
         */
        projectInfoForm.subjectNumber = projectInfoVO.subjectAssignmentSerialNo;
        /**
         *  立项时间
         */
        projectInfoForm.startTime = projectInfoVO.projectEstablishTime;
        /**
         *  结束时间
         */
        projectInfoForm.endTime = projectInfoVO.projectScheduledCompletionTime;
        /**
         *  项目周期
         */
        projectInfoForm.duration = projectInfoVO.projectDuration;
        /**
         *  项目意义和必要性
         */
        projectInfoForm.meaning = projectInfoVO.significanceAndNecessity;
        /**
         *  项目进展情况
         */
        projectInfoForm.progressStatus = projectInfoVO.projectProgressStatus;
        /**
         *  项目完成进度
         */
        projectInfoForm.completionProgress = projectInfoVO.completionProgress;
        /**
         *  合作单位
         */
        projectInfoForm.coopUnit = projectInfoVO.collaboratingUnit;
        /**
         *  专家团队
         */
        projectInfoForm.expertTeam = projectInfoVO.expertTeam;
        /**
         *  项目简介
         */
        projectInfoForm.description = projectInfoVO.projectDescription;

        /**
         *  Vue.set(projectInfoForm, "awardStatus", projectInfoVO.awardDetails);
         */
        /**
         *  Vue.set(projectInfoForm, "paperStatus", projectInfoVO.publicationDetails);
         */
        /**
         *  Vue.set(projectInfoForm, "patentStatus", projectInfoVO.patentDetails);
         */
        /**
         *  Vue.set(projectInfoForm, "rzStatus", projectInfoVO.softwareCopyright);
         */
        /**
         *  Vue.set(projectInfoForm, "standardStatus", projectInfoVO.standardDetails);
         */

        /**
         *  经费总额
         */
        projectFundsForm.jfze = projectFundsVO.totalFundsAll;

        /**
         *  专项经费总额
         */
        projectFundsForm.zxjfze = projectFundsVO.totalFundsZx;

        /**
         *  专项经费设备费
         */
        projectFundsForm.zxsbf = projectFundsVO.sbfZx;

        /**
         *  专项经费直接费
         */
        projectFundsForm.zxzjx = projectFundsVO.totalFundsZxZj;

        /**
         *  专项经费间接费
         */
        projectFundsForm.zxjjy = projectFundsVO.totalFundsZxJj;

        /**
         *  自筹经费总额
         */
        projectFundsForm.zcjfze = projectFundsVO.totalFundsZc;

        /**
         *  自筹经费设备费
         */
        projectFundsForm.zcsbf = projectFundsVO.sbfZc;

        /**
         *  自筹经费直接费
         */
        projectFundsForm.zczjx = projectFundsVO.totalFundsZcZj;

        /**
         *  自筹经费间接费
         */
        projectFundsForm.zcjjy = projectFundsVO.totalFundsZcJj;

        /**
         *  直接专项经费设备费
         */
        zxFundsDetailForm.sbf_zj = projectFundsVO.sbfZxZj;

        /**
         *  直接自筹经费设备费
         */
        zcFundsDetailForm.sbf_zj = projectFundsVO.sbfZcZj;

        /**
         *  直接专项经费设备费-购置设备费
         */
        zxFundsDetailForm.gzsbf_zj = projectFundsVO.sbfGzsbZxZj;

        /**
         *  直接自筹经费设备费-购置设备费
         */
        zcFundsDetailForm.gzsbf_zj = projectFundsVO.sbfGzsbZcZj;

        /**
         *  直接专项经费设备费-试制设备费
         */
        zxFundsDetailForm.szsbf_zj = projectFundsVO.sbfSzsbZxZj;

        /**
         *  直接自筹经费设备费-试制设备费
         */
        zcFundsDetailForm.szsbf_zj = projectFundsVO.sbfSzsbZcZj;

        /**
         *  直接专项经费设备费-设备购置与租赁费
         */
        zxFundsDetailForm.sbgzyzlf_zj = projectFundsVO.sbfSbgzyzlZxZj;

        /**
         *  直接自筹经费设备费-设备购置与租赁费
         */
        zcFundsDetailForm.sbgzyzlf_zj = projectFundsVO.sbfSbgzyzlZcZj;

        /**
         *  直接专项经费材料费
         */
        zxFundsDetailForm.clf_zj = projectFundsVO.clfZxZj;

        /**
         *  直接自筹经费材料费
         */
        zcFundsDetailForm.clf_zj = projectFundsVO.clfZcZj;

        /**
         *  直接专项经费科研活动费
         */
        zxFundsDetailForm.kyhdf_zj = projectFundsVO.kyhdfZxZj;

        /**
         *  直接自筹经费科研活动费
         */
        zcFundsDetailForm.kyhdf_zj = projectFundsVO.kyhdfZcZj;

        /**
         *  直接专项经费科研活动费-专利费
         */
        zxFundsDetailForm.zlf_zj = projectFundsVO.kyhdfZlZxZj;

        /**
         *  直接自筹经费科研活动费-专利费
         */
        zcFundsDetailForm.zlf_zj = projectFundsVO.kyhdfZlZcZj;

        /**
         *  直接专项经费科研活动费-测试化验加工费
         */
        zxFundsDetailForm.cshyjgf_zj = projectFundsVO.kyhdfCshyjgZxZj;

        /**
         *  直接自筹经费科研活动费-测试化验加工费
         */
        zcFundsDetailForm.cshyjgf_zj = projectFundsVO.kyhdfCshyjgZcZj;

        /**
         *  直接专项经费科研活动费-办公费
         */
        zxFundsDetailForm.bgf_zj = projectFundsVO.kyhdfBgZxZj;

        /**
         *  直接自筹经费科研活动费-办公费
         */
        zcFundsDetailForm.bgf_zj = projectFundsVO.kyhdfBgZcZj;

        /**
         *  直接专项经费科研活动费-数据样本采集费
         */
        zxFundsDetailForm.sjybcjf_zj = projectFundsVO.kyhdfSjybcjZxZj;

        /**
         *  直接自筹经费科研活动费-数据样本采集费
         */
        zcFundsDetailForm.sjybcjf_zj = projectFundsVO.kyhdfSjybcjZcZj;

        /**
         *  直接专项经费科研活动费-印刷出版费
         */
        zxFundsDetailForm.yscbf_zj = projectFundsVO.kyhdfYscbZxZj;

        /**
         *  直接自筹经费科研活动费-印刷出版费
         */
        zcFundsDetailForm.yscbf_zj = projectFundsVO.kyhdfYscbZcZj;

        /**
         *  直接专项经费科研活动费-知识产权事务费
         */
        zxFundsDetailForm.zscqswf_zj = projectFundsVO.kyhdfZscqswZxZj;

        /**
         *  直接自筹经费科研活动费-知识产权事务费
         */
        zcFundsDetailForm.zscqswf_zj = projectFundsVO.kyhdfZscqswZcZj;

        /**
         *  直接专项经费科研活动费-燃料动力费
         */
        zxFundsDetailForm.rldlf_zj = projectFundsVO.kyhdfRldlZxZj;

        /**
         *  直接自筹经费科研活动费-燃料动力费
         */
        zcFundsDetailForm.rldlf_zj = projectFundsVO.kyhdfRldlZcZj;

        /**
         *  直接专项经费科研活动费-车辆使用费
         */
        zxFundsDetailForm.clsyf_zj = projectFundsVO.kyhdfClsyZxZj;

        /**
         *  直接自筹经费科研活动费-车辆使用费
         */
        zcFundsDetailForm.clsyf_zj = projectFundsVO.kyhdfClsyZcZj;

        /**
         *  直接专项经费科服务动费
         */
        zxFundsDetailForm.kyfwf_zj = projectFundsVO.kyfwfZxZj;

        /**
         *  直接自筹经费科服务动费
         */
        zcFundsDetailForm.kyfwf_zj = projectFundsVO.kyfwfZcZj;

        /**
         *  直接专项经费科服务动费-专家咨询费
         */
        zxFundsDetailForm.zjzxf_zj = projectFundsVO.kyfwfZjzxZxZj;

        /**
         *  直接自筹经费科服务动费-专家咨询费
         */
        zcFundsDetailForm.zjzxf_zj = projectFundsVO.kyfwfZjzxZcZj;

        /**
         *  直接专项经费科服务动费-差旅费
         */
        zxFundsDetailForm.chlf_zj = projectFundsVO.kyfwfClZxZj;

        /**
         *  直接自筹经费科服务动费-差旅费
         */
        zcFundsDetailForm.chlf_zj = projectFundsVO.kyfwfClZcZj;

        /**
         *  直接专项经费科服务动费-会议会务费
         */
        zxFundsDetailForm.hyhwf_zj = projectFundsVO.kyfwfHyhwZxZj;

        /**
         *  直接自筹经费科服务动费-会议会务费
         */
        zcFundsDetailForm.hyhwf_zj = projectFundsVO.kyfwfHyhwZcZj;

        /**
         *  直接专项经费科服务动费-国际合作交流费
         */
        zxFundsDetailForm.gjhzjlf_zj = projectFundsVO.kyfwfGjhzjlZxZj;

        /**
         *  直接自筹经费科服务动费-国际合作交流费
         */
        zcFundsDetailForm.gjhzjlf_zj = projectFundsVO.kyfwfGjhzjlZcZj;

        /**
         *  直接专项经费科服务动费-国内协作费
         */
        zxFundsDetailForm.gnxzf_zj = projectFundsVO.kyfwfGnxzZxZj;

        /**
         *  直接自筹经费科服务动费-国内协作费
         */
        zcFundsDetailForm.gnxzf_zj = projectFundsVO.kyfwfGnxzZcZj;

        /**
         *  直接专项经费人员劳务补助费
         */
        zxFundsDetailForm.rylwbzf_zj = projectFundsVO.ryhlwbzfZxZj;

        /**
         *  直接自筹经费人员劳务补助费
         */
        zcFundsDetailForm.rylwbzf_zj = projectFundsVO.ryhlwbzfZcZj;

        /**
         *  直接专项经费间接绩效支出
         */
        zxFundsDetailForm.jxzc_jj = projectFundsVO.jxzcZx;

        /**
         *  直接自筹经费间接绩效支出
         */
        zcFundsDetailForm.jxzc_jj = projectFundsVO.jxzcZc;

        /**
         *   经费来源-专项经费资助
         */
        fundsSourceForm.zxjfzz = projectFundsVO.jflyZx;
        /**
         *  经费来源-自筹经费
         */
        fundsSourceForm.zcjf = projectFundsVO.jflyZc;
        /**
         *  经费来源-其他财政拨款
         */
        fundsSourceForm.qtczbk = projectFundsVO.jflyQtczbkZc;
        /**
         *  经费来源-自有货币基金
         */
        fundsSourceForm.zyhbzj = projectFundsVO.jflyDwzyhbzjZc;
        /**
         *  经费来源-其他资金
         */
        fundsSourceForm.qtzj = projectFundsVO.jflyQtzjZc;

        /**
         *  间接专项经费设备费
         */
        zxFundsDetailForm.sbf_jj = projectFundsVO.sbfZxJj;
        /**
         *  间接自筹经费设备费
         */
        zcFundsDetailForm.sbf_jj = projectFundsVO.sbfZcJj;
        /**
         *  间接专项经费设备费-购置设备费
         */
        zxFundsDetailForm.gzsbf_jj = projectFundsVO.sbfGzsbZxJj;
        /**
         *  间接自筹经费设备费-购置设备费
         */
        zcFundsDetailForm.gzsbf_jj = projectFundsVO.sbfGzsbZcJj;
        /**
         *  间接专项经费设备费-试制设备费
         */
        zxFundsDetailForm.szsbf_jj = projectFundsVO.sbfSzsbZxJj;
        /**
         *  间接自筹经费设备费-试制设备费
         */
        zcFundsDetailForm.szsbf_jj = projectFundsVO.sbfSzsbZcJj;
        /**
         *  间接专项经费设备费-设备购置与租赁费
         */
        zxFundsDetailForm.sbgzyzlf_jj = projectFundsVO.sbfSbgzyzlZxJj;
        /**
         *  间接自筹经费设备费-设备购置与租赁费
         */
        zcFundsDetailForm.sbgzyzlf_jj = projectFundsVO.sbfSbgzyzlZcJj;
        /**
         *  间接专项经费材料费
         */
        zxFundsDetailForm.clf_jj = projectFundsVO.clfZxJj;
        /**
         *  间接自筹经费材料费
         */
        zcFundsDetailForm.clf_jj = projectFundsVO.clfZcJj;
        /**
         *  间接专项经费科研活动费
         */
        zxFundsDetailForm.kyhdf_jj = projectFundsVO.kyhdfZxJj;
        /**
         *  间接自筹经费科研活动费
         */
        zcFundsDetailForm.kyhdf_jj = projectFundsVO.kyhdfZcJj;
        /**
         *  间接专项经费科研活动费-专利费
         */
        zxFundsDetailForm.zlf_jj = projectFundsVO.kyhdfZlZxJj;
        /**
         *  间接自筹经费科研活动费-专利费
         */
        zcFundsDetailForm.zlf_jj = projectFundsVO.kyhdfZlZcJj;
        /**
         *  间接专项经费科研活动费-测试化验加工费
         */
        zxFundsDetailForm.cshyjgf_jj = projectFundsVO.kyhdfCshyjgZxJj;
        /**
         *  间接自筹经费科研活动费-测试化验加工费
         */
        zcFundsDetailForm.cshyjgf_jj = projectFundsVO.kyhdfCshyjgZcJj;
        /**
         *  间接专项经费科研活动费-办公费
         */
        zxFundsDetailForm.bgf_jj = projectFundsVO.kyhdfBgZxJj;
        /**
         *  间接自筹经费科研活动费-办公费
         */
        zcFundsDetailForm.bgf_jj = projectFundsVO.kyhdfBgZcJj;
        /**
         *  间接专项经费科研活动费-数据样本采集费
         */
        zxFundsDetailForm.sjybcjf_jj = projectFundsVO.kyhdfSjybcjZxJj;
        /**
         *  间接自筹经费科研活动费-数据样本采集费
         */
        zcFundsDetailForm.sjybcjf_jj = projectFundsVO.kyhdfSjybcjZcJj;
        /**
         *  间接专项经费科研活动费-印刷出版费
         */
        zxFundsDetailForm.yscbf_jj = projectFundsVO.kyhdfYscbZxJj;
        /**
         *  间接自筹经费科研活动费-印刷出版费
         */
        zcFundsDetailForm.yscbf_jj = projectFundsVO.kyhdfYscbZcJj;
        /**
         *  间接专项经费科研活动费-知识产权事务费
         */
        zxFundsDetailForm.zscqswf_jj = projectFundsVO.kyhdfZscqswZxJj;
        /**
         *  间接自筹经费科研活动费-知识产权事务费
         */
        zcFundsDetailForm.zscqswf_jj = projectFundsVO.kyhdfZscqswZcJj;
        /**
         *  间接专项经费科研活动费-燃料动力费
         */
        zxFundsDetailForm.rldlf_jj = projectFundsVO.kyhdfRldlZxJj;
        /**
         *  间接自筹经费科研活动费-燃料动力费
         */
        zcFundsDetailForm.rldlf_jj = projectFundsVO.kyhdfRldlZcJj;
        /**
         *  间接专项经费科研活动费-车辆使用费
         */
        zxFundsDetailForm.clsyf_jj = projectFundsVO.kyhdfClsyZxJj;
        /**
         *  间接自筹经费科研活动费-车辆使用费
         */
        zcFundsDetailForm.clsyf_jj = projectFundsVO.kyhdfClsyZcJj;
        /**
         *  间接专项经费科服务动费
         */
        zxFundsDetailForm.kyfwf_jj = projectFundsVO.kyfwfZxJj;
        /**
         *  间接自筹经费科服务动费
         */
        zcFundsDetailForm.kyfwf_jj = projectFundsVO.kyfwfZcJj;
        /**
         *  间接专项经费科服务动费-专家咨询费
         */
        zxFundsDetailForm.zjzxf_jj = projectFundsVO.kyfwfZjzxZxJj;
        /**
         *  间接自筹经费科服务动费-专家咨询费
         */
        zcFundsDetailForm.zjzxf_jj = projectFundsVO.kyfwfZjzxZcJj;
        /**
         *  间接专项经费科服务动费-差旅费
         */
        zxFundsDetailForm.chlf_jj = projectFundsVO.kyfwfClZxJj;
        /**
         *  间接自筹经费科服务动费-差旅费
         */
        zcFundsDetailForm.chlf_jj = projectFundsVO.kyfwfClZcJj;
        /**
         *  间接专项经费科服务动费-会议会务费
         */
        zxFundsDetailForm.hyhwf_jj = projectFundsVO.kyfwfHyhwZxJj;
        /**
         *  间接自筹经费科服务动费-会议会务费
         */
        zcFundsDetailForm.hyhwf_jj = projectFundsVO.kyfwfHyhwZcJj;
        /**
         *  间接专项经费科服务动费-国际合作交流费
         */
        zxFundsDetailForm.gjhzjlf_jj = projectFundsVO.kyfwfGjhzjlZxJj;

        /**
         *  间接自筹经费科服务动费-国际合作交流费
         */
        zcFundsDetailForm.gjhzjlf_jj = projectFundsVO.kyfwfGjhzjlZcJj;
        /**
         *  间接专项经费科服务动费-国内协作费
         */
        zxFundsDetailForm.gnxzf_jj = projectFundsVO.kyfwfGnxzZxJj;
        /**
         *  间接自筹经费科服务动费-国内协作费
         */
        zcFundsDetailForm.gnxzf_jj = projectFundsVO.kyfwfGnxzZcJj;
        /**
         *  间接专项经费人员劳务补助费
         */
        zxFundsDetailForm.rylwbzf_jj = projectFundsVO.ryhlwbzfZxJj;
        /**
         *  间接自筹经费人员劳务补助费
         */
        zcFundsDetailForm.rylwbzf_jj = projectFundsVO.ryhlwbzfZcJj;

        /**
         *  关闭加载
         */
        // loading.close();
        resolve(null);
      })
      .catch((error) => {
        // 如果请求失败，拒绝 Promise
        reject(error);
      })
      .finally(() => {
        // 最后关闭加载动画
        loading.close();
      });
  });
}

export function updateProject(
  projectId,
  projectInfoForm,
  projectMemberForm,
  projectFundsForm,
  zxFundsDetailForm,
  zcFundsDetailForm,
  fundsSourceForm,
  projectIndicatorForm,
  projectPlanForm,
  otherAttachmentForm,
  projectProgressForm,
  projectSpecialFundForm
) {
  /**
   *  项目成员
   */
  const members = filterList(projectMemberForm.items).map((value) => {
    return { userId: value.id, projectUserRoleList: value.role };
  });
  /**
   *  项目指标
   */
  const indicators = filterList(projectIndicatorForm.items, 'title').map((value) => {
    return { targetName: value.title, midtermTarget: value.midterm, endTarget: value.finish };
  });
  /**
   *  项目计划
   */
  const plans = filterList(projectPlanForm.items, 'date').map((value) => {
    return { stageStartDate: value.date[0], stageEndDate: value.date[1], stageTask: value.task };
  });

  return request({
    url: '/project/my/edit',
    method: 'post',
    data: {
      'projectBaseInfoBO': {
        /**
         *  项目id
         */
        projectId,
        /**
         *  牵头单位
         */
        'leadingUnit': projectInfoForm.leadingUnit,
        /**
         *  项目名称
         */
        'assignedSubjectName': projectInfoForm.name,
        /**
         *  联系人
         */
        'projectContact': projectInfoForm.contact,
        /**
         *  项目编号
         */
        'projectAssignmentSerialNo': projectInfoForm.projectNumber,
        /**
         *  项目来源
         */
        'projectSource': projectInfoForm.source,
        /**
         *  项目级别
         */
        'projectLevel': projectInfoForm.level,
        /**
         *  是否牵头单位
         */
        'hasLeadingRole': projectInfoForm.isLeadingUnit,
        /**
         *  课题名称
         */
        'assignedSubjectSection': projectInfoForm.subjectName,
        /**
         *  课题编号
         */
        'subjectAssignmentSerialNo': projectInfoForm.subjectNumber,
        /**
         *  立项时间
         */
        'projectEstablishTime': projectInfoForm.startTime,
        /**
         *  结束时间
         */
        'projectScheduledCompletionTime': projectInfoForm.endTime,
        /**
         *  项目周期
         */
        'projectDuration': projectInfoForm.duration,
        /**
         *  项目意义和必要性
         */
        'significanceAndNecessity': projectInfoForm.meaning,
        /**
         *  项目进展情况
         */
        'projectProgressStatus': projectProgressForm.projectProgressStatus,
        /**
         *  项目完成进度
         */
        'completionProgress': projectProgressForm.completionProgress,
        /**
         *  合作单位
         */
        'collaboratingUnit': projectInfoForm.coopUnit,
        /**
         *  专家团队
         */
        'expertTeam': projectInfoForm.expertTeam,
        /**
         *  有无合作单位
         */
        'hasCooperativeUnit': projectInfoForm.coopUnit ? 1 : 0,
        /**
         *  项目描述
         */
        'projectDescription': projectInfoForm.description,
        /**
         *  获奖情况
         */
        'awardDetails': projectProgressForm.awardDetails,
        /**
         *  论文情况
         */
        'publicationDetails': projectProgressForm.publicationDetails,
        /**
         *  专利情况
         */
        'patentDetails': projectProgressForm.patentDetails,
        /**
         *  软著情况
         */
        'softwareCopyrightDetails': projectProgressForm.softwareCopyrightDetails,
        /**
         *  标准情况
         */
        'standardDetails': projectProgressForm.standardDetails
      },
      'projectFundsBO': {
        /**
         *  专项到款总额
         */
        'totalFundsZxDk': projectProgressForm.totalFundsZxDk,
        /**
         *  已完成自筹投资
         */
        'zctzDone': projectProgressForm.zctzDone,
        /**
         *  已完成专项投资
         */
        'zxtzDone': projectProgressForm.zxtzDone,
        /**
         *  自筹经费公司配套
         */
        'zcGspt': projectProgressForm.zcGspt,
        /**
         *  专项经费公司留存（计划）
         */
        'zxGslc': projectProgressForm.zxGslc,
        /**
         *  总经费
         */
        'totalFundsAll': projectFundsForm.jfze,
        /**
         *  专项经费总额
         */
        'totalFundsZx': projectFundsForm.zxjfze,
        /**
         *  专项经费设备费
         */
        'sbfZx': projectFundsForm.zxsbf,
        /**
         *  专项经费直接费
         */
        'totalFundsZxZj': projectFundsForm.zxzjx,
        /**
         *  专项经费间接费
         */
        'totalFundsZxJj': projectFundsForm.zxjjy,
        /**
         *  自筹经费总额
         */
        'totalFundsZc': projectFundsForm.zcjfze,
        /**
         *  自筹经费设备费
         */
        'sbfZc': projectFundsForm.zcsbf,
        /**
         *  自筹经费直接费
         */
        'totalFundsZcZj': projectFundsForm.zczjx,
        /**
         *  自筹经费间接费
         */
        'totalFundsZcJj': projectFundsForm.zcjjy,
        /**
         *  经费来源-专项经费自筹
         */
        'jflyZx': fundsSourceForm.zxjfzz,
        /**
         *  经费来源-自筹经费
         */
        'jflyZc': fundsSourceForm.zcjf,
        /**
         *  经费来源-其他财政拨款
         */
        'jflyQtczbkZc': fundsSourceForm.qtczbk,
        /**
         *  经费来源-自有货币基金
         */
        'jflyDwzyhbzjZc': fundsSourceForm.zyhbzj,
        /**
         *  经费来源-其他资金
         */
        'jflyQtzjZc': fundsSourceForm.qtzj,
        /**
         *  专项和自筹
         */
        ...projectSpecialFundForm
      },
      'projectUserBoList': members,
      /**
       *  项目指标
       */
      'projectTargetBOList': indicators,
      /**
       *  项目计划
       */
      'projectPlanBOList': plans,
      /**
       *  附件列表
       */
      'ossIdList': otherAttachmentForm.uploadList
    }
  });
}

export function deleteProject(projectId: string) {
  return request({
    url: '/project/my/delete',
    method: 'get',
    params: {
      projectId: projectId
    }
  });
}
