import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SharedService} from '../services/shared.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { HMUserAttributes} from '../user/models/hmUserAttributes';
import { SecuredUser } from './securedUser';
import {from, Observable} from 'rxjs';
import {catchError, filter} from 'rxjs/operators';
import {Role} from './role.enum';
import {Organization} from './orginaztion.enum';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private readonly ADMIN_GROUPS: Map<string, Organization> = new Map([
    ['LDAP_Console_Admins-INT', Organization.SuperUser],
    ['LDAP_Console_Dental-Admin-INT', Organization.Dental],
    ['LDAP_Console_Highmark-Admin-INT', Organization.Highmark],
    ['UCCI EDI Operations-INT', Organization.Dental],
    ['HM EDI Operations-INT', Organization.Highmark],
    ['Dental Electronic Services-INT', Organization.Dental],
  ]);

  private readonly USER_GROUPS: Map<string, Organization> = new Map([
    ['LDAP_Console_Dental-User-INT', Organization.Dental],
    ['LDAP_Console_Highmark-User-INT', Organization.Highmark],
  ]);

  //private readonly this.ADMIN_GROUPS = 'UCCI EDI Operations-INT,HM EDI Operations-INT,Dental Electronic Services-INT,LDAP_Console_Admins-INT';

  public readonly BASE_DN = 'ou=people,ou=internet,dc=highmark,dc=com';

  // This is so the GUI can get context of the org enum
  public Organization = Organization;
  private cookieValue = "NA";
  public securedUser = new SecuredUser();
  public HMUserAttributes;



  /**
   * Constructor will handle getting the user on the cookie when the application is getting
   * bootstrapped
   * @param httpClient
   * @param configService
   * @param cookieService
   * @param router
   */
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private configService: SharedService,
    private router: Router) {

    this.securedUser.uid = this.getUserOnCookie();
  }


  /**
   * Filter the ui based on array of organizations
   * @param value
   */
  public filterUiByOrgArray(value: Organization[]): boolean {
    return !!value.find(x => (this.securedUser.organizationArray.includes(x) || this.securedUser.organizationArray.includes(Organization.SuperUser)));
  }

  /**
   * Filter the UI based on an single organziation + super user
   * @param value By a single org + super user
   */
  public filterUiByOrg(value: Organization): boolean {
    return this.securedUser.organizationArray.includes(value) || this.securedUser.organizationArray.includes(Organization.SuperUser);
  }


  // Gets the current user object
  public getUser() {
    return this.securedUser;
  }


  /**
   * Checks to see if the user has been authenticated at the lowest level aka are they on the cookie.
   */
  public isUserAuthenticated(): boolean {
    return this.securedUser.uid && this.securedUser.uid !== 'undefined';
  }


  /****************************************************************
   * This should use the roles in JWT token so that we know that roles
   * have not been tampered with. But we dont have JWT so we will just
   * use roles from SecureUser Object or we can call back to security/service
   * to see if the user is in anygroups
   *
   * @param allowedRoles
   * @returns boolean
   *
   **************************************************************/
  public isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    // get token from local storage or state management
    //const token = localStorage.getItem('token');

    // decode token to read the payload details
    //const decodeToken = this.jwtHelperService.decodeToken(token);

    // check if it was decoded successfully, if not the token is not valid, deny access
   // if (!decodeToken) {
   //   console.log('Invalid token');
    //  return false;
   // }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    //return allowedRoles.includes(decodeToken['role']);


    const roles = this.securedUser.hmdynmemberof.replace(/, /g, ',').split(',');

    // compare two arrays to see if any of the user roles are in the allowed roles
    return (allowedRoles.some(r=> roles.indexOf(r) >= 0));


  }







  /**
   * Observable to get the current logged in user
   */
  public getUserInfo(): Observable<HMUserAttributes> {
    return this.httpClient.get<HMUserAttributes>(
      this.configService.getURI('getUser'), {params: new HttpParams().set('UID', this.securedUser.uid)}
    ).pipe(
        map( data =>  {
          return(data);
        }),
      catchError(error => {
        return Observable.throw(error.statusText);
      })
    );
  }


  initUserObject(): Observable<any>  {

    return this.httpClient.get<any>(this.configService.getURI("getUser"),{params: new HttpParams().set('UID', this.securedUser.uid)}     )
      .pipe(
           map ( data => {
            this.constructUser(data);
            return (this.securedUser);
      })
    );
  }





  /**
   * Common function to construct a user based on the resolves
   * @param data IHMUserAttributesRoot
   */
  public constructUser(data: HMUserAttributes) {

    this.HMUserAttributes = data.valueOf();

    this.securedUser.uid = this.HMUserAttributes.HMUserAttributes.uid;
    this.securedUser.sn = this.HMUserAttributes.HMUserAttributes.sn;
    this.securedUser.cn = this.HMUserAttributes.HMUserAttributes.cn;
    this.securedUser.mail = this.HMUserAttributes.mail;
    this.securedUser.givenname = this.HMUserAttributes.HMUserAttributes.givenname;
    this.securedUser.groupmembership = this.HMUserAttributes.HMUserAttributes.groupmembership;
    this.securedUser.hmdynmemberof = this.HMUserAttributes.HMUserAttributes.hmdynmemberof;

    try {
      this.securedUser.organizationArray = this.assignOrg(this.securedUser.groupmembership.split(','));
    } catch (error) {
      // eat the error, this means there isnt any groups
      this.securedUser.organizationArray = [Organization.General];
      this.securedUser.role = Role.User;
    }
  }


  /**
   * Get user on the highmark cookie, if the UID doesnt exist reroute to the forbidden page
   */
  private getUserOnCookie(): string {
    const data = this.cookieService.get(this.configService.getUidCookieName());
    if (data && data !== 'undefined') {
      return data;
    }
    // no cookie!
    this.router.navigate(['forbidden']);
    return null;
  }



  /**
   * Process a array of groups and assign the correct values
   * @param groups
   */
  private assignOrg(groups: string[]): Array<Organization> {

    // Return val, its s set so we only handle unique items here
    const organizations: Set<Organization> = new Set<Organization>();
    const currentFilteredUserGroups: Array<string> = [];

    // Create a unique combined map to check the array against
    let mergeMap = new Map([...Array.from(this.USER_GROUPS.entries()), ...Array.from(this.ADMIN_GROUPS.entries()) ]);

    // filter the passed in array down to just items that would exist in the maps
    from(groups).pipe(filter(group => this.convertMapToArray(mergeMap).includes(group.trim())))
      .subscribe(filterGroup => {
        currentFilteredUserGroups.push(filterGroup.trim());
      });

    //admin check
    if (currentFilteredUserGroups.some(x => this.convertMapToArray(this.ADMIN_GROUPS).indexOf(x.trim()) >= 0)) {
      this.securedUser.role = Role.Admin;
    }

    // Load up the left over orgs into the return val
    currentFilteredUserGroups.forEach(value => {
      let org = mergeMap.get(value);
      organizations.add(org);
    });

    // Quick size check
    if (organizations.size === 0) {
      organizations.add(Organization.General);
    }

    return Array.from(organizations.values());
  }

  /**
   * Converts the user/admin map into an array of the keys
   * @param inputMap User/admin map
   */
  private convertMapToArray(inputMap: Map<String, Organization>): Array<string> {
    const array: Array<string> = [];
    inputMap.forEach((value: string, key: string) => {
      array.push(key);
    });
    return array;
  }


}
