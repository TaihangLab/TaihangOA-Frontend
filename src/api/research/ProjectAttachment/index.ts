import { AxiosPromise } from 'axios';
import request from '@/utils/request';
import { projectParams , pageParams } from '@/api/research/ProjectAttachment/types'

// 获取项目树结构 项目类型->项目名
export function getProjectTree(): AxiosPromise<any> {
  return request({
    url: '/ip/getProjectTree',
    method: 'get'
  });
}


//获取全部附件列表
export function getAllList(data: projectParams,PageQuery: pageParams): AxiosPromise<any> {
  return request({
      url: '/milestone/oss/getAllList',
      method: 'post',
      params: PageQuery,
      data: data
    });
}

export default{
  getProjectTree,
  getAllList
}