import { AxiosPromise } from 'axios';
import request from '@/utils/request';
import { IntellectualPropertyBO, IntellectualPropertyDetailVO, IntellectualPropertyVO } from '@/api/research/IntellectualProperty/type';
import exp from 'constants';

// 获取项目树结构 项目类型->项目名
export function getProjectTree(): AxiosPromise<any> {
  return request({
    url: '/ip/getProjectTree',
    method: 'get'
  });
}

// 新增知识产权
export function addIntellectualProperty(data: IntellectualPropertyBO): AxiosPromise<any> {
  return request({
    url: '/ip/add',
    method: 'post',
    data: data
  });
}

// 删除知识产权
export function deleteIntellectualProperty(ipId: number | string): AxiosPromise<any> {
  return request({
    url: '/ip/delete',
    method: 'get',
    params: {
      ipId: ipId
    }
  });
}
//知识产权管理获取项目ID和名称映射关系
export function getProjectIdNameMap(): AxiosPromise<any> {
  return request({
    url: '/ip/getProjectMapping',
    method: 'get'
  });
}
// 更新知识产权
export function updateIntellectualProperty(data: IntellectualPropertyBO): AxiosPromise<any> {
  return request({
    url: '/ip/update',
    method: 'post',
    data: data
  });
}

export function getIntellectualPropertyDetails(ipId: number | string): AxiosPromise<IntellectualPropertyDetailVO[]> {
  return request({
    url: '/ip/getDetails',
    method: 'get',
    params: {
      ipId: ipId
    }
  });
}

// 获取知识产权列表
export function getIntellectualPropertyList(PageQuery: PageQuery, data: IntellectualPropertyBO): AxiosPromise<IntellectualPropertyVO[]> {
  return request({
    url: '/ip/list',
    method: 'post',
    params: PageQuery,
    data: data
  });
}


export default {
  getProjectTree,
  addIntellectualProperty,
  deleteIntellectualProperty,
  updateIntellectualProperty,
  getIntellectualPropertyDetails,
  getIntellectualPropertyList,
  getProjectIdNameMap
}