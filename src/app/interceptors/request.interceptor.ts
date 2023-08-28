
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SpinnerService} from '../services/spinner.service';
import {CommonDialogService} from '../common-dialog/common-dialog.service';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {


  constructor(private spinnerService: SpinnerService,
              private commonDialogService: CommonDialogService ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.spinnerOn();

    request = request.clone({
      setHeaders: {
        "x-keyId":"26347190-9a87-4569-af04-37c650abb2ba"
      }
    });



    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const keys = event.headers.keys();
            const headers = keys.map(key =>
              `${key}: ${event.headers.get(key)}`);


            this.spinnerService.spinnerOff();
            return;
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.spinnerService.spinnerOff();
            if (err.status === 401) {
              // redirect to the login route
              // or show a modal
            } else {

              this.commonDialogService.openCommonDialog('Service Error !!!', 'Service Error Occurred !!! ' + err.message, false, 'Ok', '')
                .subscribe(result => {
                });

            }

          }
        }
      ));

  }

}
