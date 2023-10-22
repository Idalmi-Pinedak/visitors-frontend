export interface ApplicationMenu {
  id: number;
  name: string;
  icon: string;
  path: string;
  parentId: number;
  selected?: boolean;
  allSelectedChildren?: boolean;
  children?: ApplicationMenu[];
  permissions?: PermissionModel[];
}

export interface PermissionModel {
  code: string;
  description: string;
  selected?: boolean;
}
