import { Role } from "../enums/role.enum";

export default class User {
  id: number;
  name: string;
  email: string;
  role: Role;
}
