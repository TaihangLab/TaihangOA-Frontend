export interface Params {
  [key: string]: string | number | boolean;
}

export interface Data {
  [key: string]: any;
}

export interface UserDetails {
  id: number;
  name: string;
  email: string;
  // 可以添加其他需要的属性
}
