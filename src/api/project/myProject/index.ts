import request from '@/utils/request';
import {
  MilestoneFrom,
  combinedSearchDataList,
  combinedSearchDataSetList,
  deleteParams,
  queryPara,
  queryProjectData,
  queryParam
} from '@/api/project/myProject/types';

// 新增大事记
export function milestoneAdd(data: MilestoneFrom) {
  return request({
    url: '/project/my/milestoneadd',
    method: 'post',
    data: data
  });
}

export function queryMilestoneList(data: combinedSearchDataList, params: typeof queryPara.value) {
  return request({
    url: '/project/list/milestonequery',
    method: 'post',
    data: data,
    params: params
  });
}

export function queryMilestoneCategorySelectSetList(params: combinedSearchDataSetList) {
  return request({
    url: '/project/list/milestoneCategorySelectSet',
    method: 'get',
    params: params
  });
}

export function getMilestoneCategorySelectList(data: typeof queryPara.value) {
  return request({
    url: '/project/list/milestoneCategorySelect',
    method: 'get',
    data: data // 假设 this.data 是从 queryPara 获取的
  });
}

// 删除大事记
export function milestoneDelete(params: deleteParams) {
  return request({
    url: `/project/my/milestonedelete`,
    method: 'delete',
    params: params
  });
}

// 查询项目列表
export function queryProjectList(data: queryProjectData, params: typeof queryParam) {
  return request({
    url: '/project/my/getMyList',
    method: 'post',
    data: data,
    params: params
  });
}
