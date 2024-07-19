export interface QueryParam {
  pageNum: number;
  pageSize: number;
}

export interface BodyData {
  projectId: number | string;
  firstLevelSubject: string;
  secondLevelSubject: string;
  thirdLevelSubject: string;
  expenditureDateSta: string;
  expenditureDateEnd: string;
}

export interface ProjectExpenditureBO {
  expenditureIds: number[];
}

export interface ResponseData<T> {
  code: number;
  message: string;
  data: T;
}
