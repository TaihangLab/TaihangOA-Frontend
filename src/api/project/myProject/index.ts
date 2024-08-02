import request from '@/utils/request';
import { MilestoneFrom } from '@/api/project/myProject/types';

// 新增大事记
export function milestoneAdd(data: MilestoneFrom) {
  return request({
    url: '/project/my/milestoneadd',
    method: 'post',
    data: data
  });
}
