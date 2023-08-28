//templateUrl: './footer.component.html',
import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <mat-toolbar color="primary">
        <mat-toolbar-row fxLayoutAlign="start">
          <p>
            &copy; Saxler Technology, All Rights Reserved
            <a routerLink="/legal">Legal Disclaimer</a>
          </p>
        </mat-toolbar-row>
      </mat-toolbar>
    </footer>
  `
})
export class FooterComponent {

  constructor() {
  }


}
