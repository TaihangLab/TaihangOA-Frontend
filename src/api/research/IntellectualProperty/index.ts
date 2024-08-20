import { AxiosPromise } from 'axios';
import request from '@/utils/request';


export interface PageQuery {
  ipQuery :{
    projectId: number,
    ipName: string,
    ipType: string ,
    ipStatus: string,
    userIdList: number[],
    ipDate: string,
  },
  pageParams : {
    pageNum: number,
    pageSize: number
  },
}
 
export function getIpDerails(PageQuery: PageQuery): AxiosPromise<any> {
  return request({
    url: '/ip/list',
    method: 'post',
    data: PageQuery
  });
}

// 获取项目树结构 项目类型->项目名
export function getProjectTree(): AxiosPromise<any> {
  return request({
    url: '/ip/getProjectTree',
    method: 'get'
  });
}

export default {
  getProjectTree,
  getIpDerails
}