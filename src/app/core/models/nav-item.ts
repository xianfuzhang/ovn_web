export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  // show?: boolean;
  group?: string;
  children?: NavItem[];
  iconImgSrc?: string;
}
