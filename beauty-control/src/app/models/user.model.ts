import { Role } from "../enums/role.enum";

export default class User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  password: string;

  constructor() {
    this.role = Role.EMPLOYEE;
    this.name = "";
    this.email = "";
    this.avatar = "";
    this.password = "";   
  }
}
