//知识产权BO
import { OssVO } from '@/api/system/oss/types';

export interface IntellectualPropertyBO {
  ipId?: number | null;
  projectId?: number | null;
  ipName: string;
  ipType?: number | string;
  ipStatus?: number | string;
  ipDate?: string | null;
  milestoneId?: number | null;
  userIdList?: number[] | null;
  ossIdList?: number[] | null;
  userId?: number | null;
  ipDateSta?: string | null;
  ipDateEnd?: string | null;
}

//知识产权详情VO
export interface IntellectualPropertyDetailVO {
  ipId?: number;
  projectId?: number;
  projectPath?: number[];
  assignedSubjectName?: string;
  ipName?: string;
  ipType?: number | string;
  ipStatus?: number | string;
  ipDate?: string;
  ipUserVOList?: IpUserVO[];
  userPathList?: number[][];
  sysOssVoList?: OssVO[];
}

//用户信息VO
export interface IpUserVO {
  userId?: number;
  nickName?: string;
  jobTitle?: number | string;
  diploma?: number | string;
  email?: string;
  phonenumber?: string;
  deptName?: string;
}

//知识产权VO
export interface IntellectualPropertyVO {
  ipId?: number;
  projectId?: number;
  assignedSubjectName?: string;
  ipName?: string;
  ipType?: number | string;
  ipStatus?: number | string;
  ipDate?: string;
}
