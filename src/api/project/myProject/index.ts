import request from '@/utils/request';
import {
  MilestoneFrom,
  combinedSearchDataList,
  combinedSearchDataSetList,
  deleteParams,
  queryProjectData,
  ProjectDetailsVO
} from '@/api/project/myProject/types';
import { AxiosPromise } from 'axios';

// 新增大事记
export function milestoneAdd(data: MilestoneFrom) {
  return request({
    url: '/project/my/milestoneadd',
    method: 'post',
    data: data
  });
}

export function queryMilestoneList(data: combinedSearchDataList, PageQuery: PageQuery) {
  return request({
    url: '/project/list/milestonequery',
    method: 'post',
    data: data,
    params: PageQuery
  });
}

export function queryMilestoneCategorySelectSetList(params: combinedSearchDataSetList) {
  return request({
    url: '/project/list/milestoneCategorySelectSet',
    method: 'get',
    params: params
  });
}

export function getMilestoneCategorySelectList(PageQuery: PageQuery) {
  return request({
    url: '/project/list/milestoneCategorySelect',
    method: 'get',
    data: PageQuery
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
export function queryProjectList(data: queryProjectData, PageQuery: PageQuery) {
  return request({
    url: '/project/my/getMyList',
    method: 'post',
    data: data,
    params: PageQuery
  });
}

export function getProjectDetails(projectId: number | string): AxiosPromise<ProjectDetailsVO> {
  return request({
    url: `/project/list/getDetails`,
    method: 'get',
    params: {
      projectId
    }
  });
}
