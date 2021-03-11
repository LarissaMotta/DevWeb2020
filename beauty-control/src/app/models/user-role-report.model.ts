export class UserRoleReport {
  admin: UserRoleReportData[];
  employee: UserRoleReport[];
}

export class UserRoleReportData {
  name: string;
  email: string;
  active: boolean;
}