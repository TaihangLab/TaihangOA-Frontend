import request from '@/utils/request';
import { Params, Data, UserDetails } from './types';

// 获取用户详情
export function getDetails(params: Params): Promise<UserDetails> {
  return request({
    url: '/project/user/getDetails',
    method: 'get',
    params: params
  });
}

// 查看用户列表
export function getAllList(data: Data, params: Params): Promise<any> {
  return request({
    url: '/project/user/getAllList',
    method: 'post',
    data: data,
    params: params
  });
}
