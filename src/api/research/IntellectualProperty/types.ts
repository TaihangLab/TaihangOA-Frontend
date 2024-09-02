//知识产权BO，BO是业务对象，用于业务逻辑处理
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
  ipUserVOList?: IpUserVO[]; //用户列表
  userPathList?: number[]; //用户路径列表
  sysOssVoList: OssVO[]; //附件列表
}

//用户信息VO
export interface IpUserVO {
  nickName?: string;
  jobTitle?: number | string;
  diploma?: number | string;
  email?: string;
  phonenumber?: string;
  deptName?: string;
  userId?: number;
}

//知识产权VO
export interface IntellectualPropertyVO {
  ipId?: number;
  projectId?: number;
  assignedSubjectName?: string; //  关联项目名称
  ipName?: string;
  ipType?: number | string;
  ipStatus?: number | string;
  ipDate?: string;
}

/**
 * 菜单树形结构类型
 */
export interface DeptTreeOption {
  id: string;
  label: string;
  parentId: string;
  weight: number;
  children?: DeptTreeOption[];
}
