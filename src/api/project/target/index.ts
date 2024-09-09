import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProjectTargetBO, ProjectTargetProgressBO, ProjectTargetProgressVO, ProjectTargetVO } from '@/api/project/target/types';

// 查询某个项目下的指标列表
export function getAllProjectTargetList(data: ProjectTargetBO, pageQuery: PageQuery): AxiosPromise<ProjectTargetVO[]> {
  return request({
    url: '/project/target/all',
    method: 'post',
    params: pageQuery,
    data: data
  });
}

// 某项目添加指标
export function addProjectTarget(data: ProjectTargetBO): AxiosPromise<any> {
  return request({
    url: '/project/target/add',
    method: 'post',
    data: data
  });
}

// 删除项目指标
export function deleteProjectTarget(targetId: number): AxiosPromise<any> {
  return request({
    url: '/project/target/delete',
    method: 'post',
    params: { targetId: targetId }
  });
}

// 更新项目指标
export function updateProjectTarget(data: ProjectTargetBO): AxiosPromise<any> {
  return request({
    url: '/project/target/update',
    method: 'post',
    data: data
  });
}

// 查询某指标全部进度
export function getProjectTargetDetail(data: ProjectTargetProgressBO, pageQuery: PageQuery): AxiosPromise<ProjectTargetProgressVO[]> {
  return request({
    url: '/project/target/detail',
    method: 'post',
    params: pageQuery,
    data: data
  });
}

// 添加指标进度
export function addProjectTargetProgress(data: ProjectTargetProgressBO): AxiosPromise<any> {
  return request({
    url: '/project/target/addProgress',
    method: 'post',
    data: data
  });
}

// 删除指标进度
export function deleteProjectTargetProgress(progressId: number): AxiosPromise<any> {
  return request({
    url: '/project/target/deleteProgress',
    method: 'get',
    params: { progressId: progressId }
  });
}

// 更新指标进度
export function updateProjectTargetProgress(data: ProjectTargetProgressBO): AxiosPromise<any> {
  return request({
    url: '/project/target/updateProgress',
    method: 'post',
    data: data
  });
}
