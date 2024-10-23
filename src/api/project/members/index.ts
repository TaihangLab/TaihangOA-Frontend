import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProjectUserBo, ProjectUserDetailVo, ProjectUserVo } from '@/api/project/members/types';

// 获取用户详情
export function getDetails(memberId: number | string): AxiosPromise<ProjectUserDetailVo> {
  return request({
    url: '/project/user/getDetails',
    method: 'get',
    params: {
      userId: memberId
    }
  });
}

// 查看用户列表
export function getAllList(PageQuery: PageQuery, data: ProjectUserBo): AxiosPromise<ProjectUserVo[]> {
  return request({
    url: '/project/user/getAllList',
    method: 'post',
    params: PageQuery,
    data: data
  });
}

//导出项目成员列表
export function exportProjectMemberList(data: ProjectUserBo): AxiosPromise<Blob> {
  return request({
    url: '/project/user/exportData',
    method: 'post',
    data: data,
    responseType: 'blob'
  });
}
