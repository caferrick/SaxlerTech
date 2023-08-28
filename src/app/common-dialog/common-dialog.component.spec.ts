import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material';
import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { CommonDialogComponent } from './common-dialog.component';

describe('CommonDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DialogTestModule ],
      providers: [
        { provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          return { getContainerElement: () => overlayContainerElement };
        }}
      ]
    });

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(NoopComponent);

  });

  it('Dialog Opened Correctly With Close Button Enabled', () => {
    const config = {
      disableClose: true
    };

    let dialogRef = dialog.open(CommonDialogComponent, config);
    dialogRef.componentInstance.message = "Service Test";
    dialogRef.componentInstance.title = "Dialog Opened";
    dialogRef.componentInstance.okOnlyFlag=true;

    noop.detectChanges(); // Updates the dialog in the overlay
    const h2 = overlayContainerElement.querySelector('h4');
    expect(h2.textContent).toContain('Dialog');


    const button = overlayContainerElement.getElementsByClassName('btn');
    expect(button.item(1).textContent).toContain('Close');



  });

  it('Data injected into dialog', () => {

    const config = {
      disableClose: false
    };


    let dialogRef = dialog.open(CommonDialogComponent, config);
    dialogRef.componentInstance.message = "Service Test";
    dialogRef.componentInstance.title = "Dialog Opened Test";

    noop.detectChanges(); // Updates the dialog in the overlay

    const message1 = overlayContainerElement.querySelector('p');
    expect(message1.textContent).toContain('Test');

  });
});



// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  CommonDialogComponent,
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    CommonDialogComponent
  ],
})
class DialogTestModule { }
