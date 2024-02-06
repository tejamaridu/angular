import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Handle the request according to the requirment
        const newRequest = req.clone(
            { headers: req.headers.append('Auth', 'xyz') }
        )
        return next.handle(newRequest);
        // Handle the response
        // .pipe(
        //     tap(event => {
        //         console.log(event);
        //         if(event.type === HttpEventType.Response) {
        //             console.log('Response received');
        //             console.log(event.body);
        //         }
        //     })
        // );
    }
} 