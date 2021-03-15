export class UserRoleReport {
  admin: UserRoleReportData[];
  employee: UserRoleReportData[];
}

export class UserRoleReportData {
  name: string;
  email: string;
  active: boolean;
}