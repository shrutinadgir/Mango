import { environment } from 'src/environments/environment';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(environment.baseUrl)) {
            req = req.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                },
                // setParams: {
                //     clientapp: 'mango-web'
                // }
            })
        }
        return next.handle(req);
    }
}