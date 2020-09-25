import { Role } from '../enums/role.enum';

export default class User {
  email: string;
  name: string;
  role: Role;
  password: string;
}