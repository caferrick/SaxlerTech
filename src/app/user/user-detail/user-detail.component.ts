
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CommonDialogService} from '../../common-dialog/common-dialog.service';
import {UserService} from '../user.service';
import {UserEditDialogComponent} from '../user-edit-dialog/user-edit-dialog.component';
import {SecurityService} from '../../security/security.service';
import {HMUserAttributes} from "../models/hmUserAttributes";
import {filter} from "rxjs/operators";
import {from} from "rxjs";
import {group} from "@angular/animations";



export const dentalArrayGroup: Array<string> = ['UCDTDP-Tableau Users-EXT' , 'UCXpressClaim-EXT','UCProviderInquiry-EXT','UCProviderOCONUS-EXT','TDP-ADHOC_REPORTING-EXT','TP2-EFT Active-EXT' , 'DHPRC-Customer-EXT','DART-Dental Treatment Facility-EXT' , 'DART-Dental Svc POC-EXT' , 'ADDP Data Mart TMA-EXT' , 'ADDP Data Mart-Customer-EXT','ADDP Data Mart-Ad Hoc Reporting-EXT','ADDP Data Mart-Branch Headquarters-EXT,'];
export const highmarkArrayGroup: Array<string> = ['Broadvision'];

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit, AfterViewInit {


  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private commonDialogService: CommonDialogService,
    private userService: UserService,
    public secService: SecurityService, ) {

  }


  hmData : HMUserAttributes;
  rawData: any;
  groupName = "cn=Dental Electronic Services-INT,ou=groups,ou=intranet,dc=highmark,dc=com";



  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  /**
   * On init to resolve the logged in user and the user we are navigation to
   */
  ngOnInit() {


    var data = this.route.snapshot.data;
    data = data.hmkData;

    console.log("getUserInfo FOO Called ..........:"+JSON.stringify(data));


      this.hmData = data.HMUserAttributes;
      this.rawData = data.HMUserAttributes;

      if (data == null || !this.hmData.uid) {
        this.commonDialogService.openCommonDialog(
          'No Users Found',
          'Please search again with different criteria',
          false, 'Ok', ''
        );
        this.router.navigate(['/home'], {
          relativeTo: this.route
        });
      }

   // });

  }


  /**
   * gets hows many days are remaining for password reset
   * Very good example of Date Manipulation
   */
  getDaysRemaining(): number {
    let daysRemaing: number;
    if (this.hmData.passwordexpirationtime) {
      const today = new Date().toISOString().slice(0, 10);
      const newDate = this.hmData.passwordexpirationtime.slice(0, 14);
      const expirDate = this.parseSplitDate(newDate);
      const expirationDate = expirDate.slice(0, 10);
      const interval = 'days';
      daysRemaing = this.diffDay(today, expirationDate, interval);
    }
    return daysRemaing;
  }

  getExpirationDate(): string {
    let returnDate: string;
    if (this.hmData.passwordexpirationtime) {
      const newDate = this.hmData.passwordexpirationtime.slice(0, 14);
      returnDate = this.parseSplitDate(newDate).trim();

    }


    return returnDate;

  }

  private diffDay(dateParam: string, date2Param: string, interval: string) {
    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, week = day * 7;
    const date1 = new Date(dateParam);
    const date2 = new Date(date2Param);
    const timeDiff = date2.getTime() - date1.getTime();
    if (isNaN(timeDiff)) {
      return NaN;
    }
    switch (interval) {
      case 'years':
        return date2.getFullYear() - date1.getFullYear();
      case 'months':
        return (
          (date2.getFullYear() * 12 + date2.getMonth())
          -
          (date1.getFullYear() * 12 + date1.getMonth())
        );
      case 'weeks':
        return Math.floor(timeDiff / week);
      case 'days':
        return Math.floor(timeDiff / day);
      case 'hours':
        return Math.floor(timeDiff / hour);
      case 'minutes':
        return Math.floor(timeDiff / minute);
      case 'seconds':
        return Math.floor(timeDiff / second);
      default:
        return undefined;
    }
  }

  /**
   * get the time that the user was locked out
   */
  getLockOutTime(): string {
    let translatedAccountLockedTime: string;
    if (this.hmData.pwdaccountlockedtime) {
      const tempDate = this.hmData.pwdaccountlockedtime.split('.');
      translatedAccountLockedTime = this.parseSplitDate(tempDate[0]);
    }

    return translatedAccountLockedTime;
  }

  private parseSplitDate(tempDate: string) {
    return tempDate.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3T$4:$5:$6');
  }


  /**
   * Get the image path for the current user profile based on roles
   */
  imagePath(): string {

    let imgPath = '';

    if(this.hmData.hmdynmemberof){
      const groupMembershipArray: Array<string> = this.hmData.hmdynmemberof.split(',');
      imgPath = this.groupSearch(groupMembershipArray);
    }

    if(this.hmData.groupmembership){
      const groupMembershipArray: Array<string> = this.hmData.groupmembership.split(',');
      imgPath = this.groupSearch(groupMembershipArray);

    }
    return imgPath;
  }

  /**
   * Logic that displays organization logo. Mainly geared toward UCD.
   * Takes an array set above with various roles and does a check, whether to display image or not.
   *
   */
  private groupSearch(array: Array<string>): string{
    const dentalPath = '/assets/img/ucd.jpg';
    const broadvisionPath = '/assets/img/highmark-health-services.png';

    let imgPath = '';

    from(array).pipe(filter(group => highmarkArrayGroup.includes(group.trim()))).subscribe(() =>{
      imgPath = broadvisionPath;
    });
    from(array).pipe(filter(group => dentalArrayGroup.includes(group.trim()))).subscribe(() =>{
      imgPath = dentalPath;
    });

    const highmarkGroupCheck = array.find(value => value.includes('Broadvision'));
    if(highmarkGroupCheck){
      imgPath = broadvisionPath;
    }

    const dentalGroupCheck1 = array.find(value => value.includes('Dental'));
    const dentalGroupCheck2 = array.find(value => value.includes('UCCI'));
    const dentalGroupCheck3 = array.find(value => value.includes('ADDP'));

    if( dentalGroupCheck1 || dentalGroupCheck2 || dentalGroupCheck3){
      imgPath = dentalPath;
    }

    return imgPath;
  }
  /**
   * Opens the edit user modal
   * @param HMUserAttributes
   */
  startEdit(HMUserAttributes: HMUserAttributes): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: {HMUserAttributes},
      height: '500px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.fixButtonRippleEffectBug();
    });
  }

  /*
   * Handle activate user modal
   * @param userId
   */
  activateUser(userId: string): void {
    this.commonDialogService.openCommonDialog('Confirmation Dialog', 'Activate User ?', true, 'Yes', 'No').subscribe(uiDecision => {
      this.userService.fixButtonRippleEffectBug();
      if (uiDecision) {
        this.userService.activateUser(userId).subscribe(data => {
          this.userService.handleCommonDialog(data, this.hmData.uid);

        });
      }
    });
  }

  /**
   * Handle suspend user modal
   * @param userId
   */
  suspendUser(userId: string): void {
    this.commonDialogService.openCommonDialog('Confirmation Dialog', 'Suspend User ?', true, 'Yes', 'No').subscribe(uiDecision => {
      this.userService.fixButtonRippleEffectBug();
      if (uiDecision) {
        this.userService.suspendUser(userId).subscribe(data => {
          this.userService.handleCommonDialog(data, this.hmData.uid);

        });
      }
    });
  }


  userGroupList() {

    this.userService.getUsersInGroup(this.groupName).subscribe( data => {

        this.userService.setUserObject(data);

        this.router.navigate(['/user/group-list'], {
          relativeTo: this.route
        });

    });


  }


}
