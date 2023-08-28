import { Directive, Input, OnInit } from '@angular/core';
import { MatGridList } from '@angular/material';
import { MediaObserver, MediaChange } from '@angular/flex-layout';



export interface IResponsiveColumnsMap {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}


@Directive({
  selector: '[responsiveCols]'
  // USAGE :   <mat-grid-list responsiveCols='{"xs": 1, "sm": 2, "md": 3, "lg": 3, "xl": 3}' rowHeight="100px">

})

export class ResposiveGridDirective {

                                               //default is no input present
  private countBySize: IResponsiveColumnsMap = {xs: 1, sm: 3, md: 4, lg: 4, xl: 4};

  public get cols(): IResponsiveColumnsMap {
    return this.countBySize;
  }

  @Input('responsiveCols') respCols : IResponsiveColumnsMap;



  public set cols(map: IResponsiveColumnsMap) {
    if (map && ('object' === (typeof map))) {
      this.countBySize = map;
    }
  }

  public constructor(
    private grid: MatGridList,
    private media: MediaObserver
  ) {

    this.initializeColsCount();
  }


  private ngAfterContentInit(){

    this.initializeColsCount();

    this.media.media$
      .subscribe((changes: MediaChange) =>
        this.grid.cols = this.countBySize[changes.mqAlias]
     );
  }


  private initializeColsCount(): void {

    if(this.respCols != undefined) {
      this.countBySize = JSON.parse(this.respCols.toString());
   }

      Object.keys(this.countBySize).some(
      (mqAlias: string): boolean => {
        const isActive = this.media.isActive(mqAlias);

        if (isActive) {
          this.grid.cols = this.countBySize[mqAlias];
        }

        return isActive;
      });
  }


}
