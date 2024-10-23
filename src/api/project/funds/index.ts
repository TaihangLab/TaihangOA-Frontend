import request from '@/utils/request';
import {
  ProjectBaseInfoBO,
  ProjectExpenditureBO,
  ProjectExpenditureVO,
  ProjectFundsAndBalanceVO,
  ProjectFundsManagementVO,
  ProjectFundsReceived,
  ProjectFundsReceivedVo
} from './types';
import { AxiosPromise } from 'axios';

export function getProjectList(pageQuery: PageQuery, bodyData: ProjectBaseInfoBO): AxiosPromise<ProjectFundsManagementVO[]> {
  return request({
    url: '/project/funds/getProjectList',
    method: 'post',
    params: pageQuery,
    data: bodyData
  });
}

export function exportListData(bodyData: ProjectBaseInfoBO): AxiosPromise<Blob> {
  return request({
    url: 'project/funds/exportListData',
    method: 'post',
    data: bodyData,
    responseType: 'blob' // 确保响应类型为 blob，以处理文件下载
  });
}

export function addProjectExpenditure(bodyData: ProjectExpenditureBO[]): AxiosPromise<any> {
  return request({
    url: '/project/funds/add',
    method: 'post',
    data: bodyData
  });
}

// 删除支出信息
export function rollBackProjectExpenditure(expenditureId: number | string): AxiosPromise<any> {
  return request({
    url: '/project/funds/rollback',
    method: 'get',
    params: {
      expenditureId: expenditureId
    }
  });
}

// 导入支出信息
export function importExpenditureData(file: File): AxiosPromise<any> {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: '/project/funds/importData',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 导出支出信息
export function exportExpenditure(ids: number[]): AxiosPromise<Blob> {
  return request({
    url: '/project/funds/exportData',
    method: 'post',
    data: ids,
    responseType: 'blob'
  });
}

// 新增专项经费到账记录
export function addFundsReceived(bodyData: ProjectFundsReceived): AxiosPromise<any> {
  return request({
    url: '/project/funds/addFundsReceived',
    method: 'post',
    data: bodyData
  });
}

// 修改专项经费到账记录
export function updateFundsReceived(bodyData: ProjectFundsReceived): AxiosPromise<any> {
  return request({
    url: '/project/funds/updateFundsReceived',
    method: 'post',
    data: bodyData
  });
}

// 删除专项经费到账记录
export function deleteFundsReceived(receivedId: number | string): AxiosPromise<any> {
  return request({
    url: '/project/funds/deleteFundsReceived',
    method: 'get',
    params: {
      receivedId
    }
  });
}

// 查询某个项目的专项经费到账记录
export function getFundsReceivedList(projectId: number | string): AxiosPromise<ProjectFundsReceivedVo[]> {
  return request({
    url: '/project/funds/getFundsReceived',
    method: 'get',
    params: {
      projectId
    }
  });
}

// 查询支出明细
export function getProjectExpenditureList(projectExpenditureBO: ProjectExpenditureBO, pageQuery: PageQuery): AxiosPromise<ProjectExpenditureVO[]> {
  return request({
    url: '/project/funds/getProjectExpenditure',
    method: 'post',
    data: projectExpenditureBO,
    params: pageQuery
  });
}

//根据项目ID查询项目经费预算和支出明细及汇总
export function getFundsAndBalanceByProjectId(projectId: number | string): AxiosPromise<ProjectFundsAndBalanceVO> {
  return request({
    url: '/project/balance/fundsAndBalance',
    method: 'get',
    params: {
      projectId
    }
  });
}
