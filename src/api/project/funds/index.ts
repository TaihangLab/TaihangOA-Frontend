import request from '@/utils/request';
import { BodyData, QueryParam, ProjectExpenditureBO, ResponseData } from './types';

// 查看支出信息
export function getExpenditure(bodyData: BodyData, queryParam: QueryParam): Promise<ResponseData<any>> {
  return request({
    url: '/project/funds/getProjectExpenditure',
    method: 'post',
    data: bodyData,
    params: queryParam
  });
}

// 删除支出信息
export function rollbackExpenditure(expenditureId: string): Promise<ResponseData<any>> {
  return request({
    url: '/project/funds/rollback',
    method: 'get',
    params: {
      expenditureId: expenditureId
    }
  });
}

// 导出支出信息
export function exportExpenditure(projectExpenditureBO: ProjectExpenditureBO): Promise<Blob> {
  return request({
    url: '/project/funds/exportData',
    method: 'post',
    data: projectExpenditureBO,
    responseType: 'blob'
  });
}

// 查看预算及支出汇总
export function fundsAndBalance(projectId: number | string): Promise<ResponseData<any>> {
  return request({
    url: '/project/balance/fundsAndBalance',
    method: 'get',
    params: {
      projectId: projectId
    }
  });
}

// 查看经费到账
export function getFundsReceived(projectId: number | string): Promise<ResponseData<any>> {
  return request({
    url: '/project/funds/getFundsReceived',
    method: 'get',
    params: {
      projectId: projectId
    }
  });
}
