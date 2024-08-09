import { AxiosPromise } from 'axios';
import request from '@/utils/request';

// 获取项目树结构 项目类型->项目名
export function getProjectTree(): AxiosPromise<any> {
  return request({
    url: '/ip/getProjectTree',
    method: 'get'
  });
}
