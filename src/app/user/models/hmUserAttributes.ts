
import {Role} from '../../security/role.enum';
import {Organization} from '../../security/orginaztion.enum';


export class HMUserAttributes {
  givenname: string;
  cn: string;
  sn: string;
  mail: string;
  groupmembership: string;
  uid: string;

  telephonenumber: string;
  employeenumber: string;
  obuseraccountcontrol: string;
  roomnumber: string;
  countrycode: string;
  countrytext: string;
  companycode: string;
  postalcode: string;
  street: string;
  managerlevel: string;
  hmdynmemberof: string;
  middleini: string;
  st: string;
  organizationcode: string;
  manager: string;
  ou: string;
  postaladdress: string;
  l: string;
  o: string;
  lastaccess: string;
  jobcode: string;
  departmentnumber: string;
  userdn: string;
  userPassword: string;
  userPasswordConfirm: string;
  pwdaccountlockedtime: string;
  hmuccidob: string;
  hmfim: string;
  providerid: string;
  password: string;
  dspwppasswordpolicydn: string;
  memberid: string;
  passwordexpirationtime: string;
  taxid: string;
  hmnpiid: string;
  pwdfailuretime: string;
  hmpwdcluequestion: string;
}

export class HmUser {
  givenname: string;
  cn: string;
  sn: string;
  mail: string;
  groupmembership: string;
  uid: string;
  role: Role;
  organizationArray: Array<Organization>;

  constructor() {
    this.role = Role.User;
    this.organizationArray = [Organization.General];
  }

}



