import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptorService implements HttpInterceptor {

  constructor(public toastr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((succsess) => {
      if (succsess instanceof HttpResponse) {
        if (succsess.url.endsWith('signup') || succsess.url.endsWith('signin')
          || succsess.url.endsWith('create') || succsess.url.includes('delete')) {
          this.toastr.success('Success!');
        }
      }
    }), catchError((err) => {
      this.toastr.error(err.error.message, `Error`);
      throw err;
    }));
  }
}
