import request from '@/utils/request';

/**
 * 获取公告数据
 */
export const listNotice = (params: any) => {
  return request({
    url: '/api/system/notice',
    method: 'get',
    params
  });
};

/**
 * 获取学历数据
 */
export const getDiplomaData = () => {
  return request({
    url: '/statistic/user/diploma',
    method: 'get'
  });
};

/**
 * 获取职称数据
 */
export const getJobtitleData = () => {
  return request({
    url: '/statistic/user/jobtitle',
    method: 'get'
  });
};

/**
 * 获取项目统计数据
 */
export const getProjectListData = () => {
  return request({
    url: '/statistic/project/level',
    method: 'get'
  });
};

/**
 * 获取知识产权数据
 */
export const getTypeData = () => {
  return request({
    url: '/statistic/ip/type',
    method: 'get'
  });
};
