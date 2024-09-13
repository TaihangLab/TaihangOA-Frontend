import request from '@/utils/request';
import {
  MilestoneFrom,
  combinedSearchDataList,
  queryProjectData,
  ProjectDetailsVO,
  ProjectBaseInfoVO,
  ProjectMilestoneBo
} from '@/api/project/myProject/types';
import { AxiosPromise } from 'axios';
import { ProjectBaseInfoBO } from '@/api/project/funds/types';

// 新增大事记
export function milestoneAdd(data: MilestoneFrom) {
  return request({
    url: '/project/my/milestoneadd',
    method: 'post',
    data: data
  });
}

// 查询大事记
export function queryMilestoneList(data: combinedSearchDataList) {
  return request({
    url: '/project/list/milestonequery',
    method: 'post',
    data: data
  });
}

// 查询大事记类别
export function queryMilestoneCategorySelectSetList(projectId: number) {
  return request({
    url: '/project/list/milestoneCategorySelectSet',
    method: 'get',
    params: {
      projectId
    }
  });
}

// 删除大事记
export function milestoneDelete(milestoneId: number): AxiosPromise<any> {
  return request({
    url: `/project/my/milestonedelete`,
    method: 'get',
    params: {
      milestoneId
    }
  });
}

// 查询项目列表
export function queryProjectList(data: queryProjectData, pageQuery: PageQuery) {
  return request({
    url: '/project/my/getMyList',
    method: 'post',
    data: data,
    params: pageQuery
  });
}

// 查询项目详情
export function getProjectDetails(projectId: number | string): AxiosPromise<ProjectDetailsVO> {
  return request({
    url: `/project/list/getDetails`,
    method: 'get',
    params: {
      projectId
    }
  });
}

export function getAllProjectList(data: ProjectBaseInfoBO, pageQuery: PageQuery): AxiosPromise<ProjectBaseInfoVO[]> {
  return request({
    url: '/project/list/getAllList',
    method: 'post',
    params: pageQuery,
    data: data
  });
}

export function editProjectMileStone(data: ProjectMilestoneBo): AxiosPromise<any> {
  return request({
    url: '/project/my/milestoneedit',
    method: 'post',
    data: data
  });
}
