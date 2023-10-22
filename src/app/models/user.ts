export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserInfoModel {
  sub: string;
  userId: number;
  name: string;
}

export interface UserRequestModel {
  userId?: number;
  active: boolean;
  email: string;
  name: string;
  password?: string;
}

export interface UserModel {
  id: number;
  active: boolean;
  email: string;
  name: string;
  password?: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  roleId?: number;
}

export interface RoleModel {
  id: number;
  active: boolean;
  code: string;
  name: string;
  menuList?: RoleMenuModel[];
}

export interface RoleMenuModel {
  menuId: number;
  permissions: string[];
}
