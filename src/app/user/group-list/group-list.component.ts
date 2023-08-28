import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogTitle, MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { ViewChild} from '@angular/core';
import { PageEvent} from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonDialogService } from '../../common-dialog/common-dialog.service';
import { UserService } from '../user.service';



@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})


export class GroupListComponent implements OnInit {


// MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  public userList
  user


  dataSource;
  displayedColumns = ['lastName', 'firstName', 'email', 'obuseraccountcontrol'];


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService,
              private _fb: FormBuilder,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private commonDialogService: CommonDialogService ) {


  } // end constructor





  ngOnInit() {

    this.userList = this.userService.getUserObject()
    this.userList = this.userList.SecuredUsers;

    this.dataSource = new MatTableDataSource<any>(this.userList);

  }


  ngAfterViewInit(): void {

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }






  selectedRow(row) {
    console.log(row);
  }



  startEdit(idx: number, user : any) {
    console.log("startEdit :"+ JSON.stringify(user));
  }




  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }





}
