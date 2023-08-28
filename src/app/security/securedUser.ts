
import {Role} from '../security/role.enum';
import {Organization} from '../security/orginaztion.enum';


export class SecuredUser {
  givenname: string;
  cn: string;
  sn: string;
  mail: string;
  groupmembership: string;
  hmdynmemberof: string;
  uid: string;
  role: Role;
  organizationArray: Array<Organization>;

  constructor() {
    this.role = Role.User;
    this.organizationArray = [Organization.General];
  }

}

