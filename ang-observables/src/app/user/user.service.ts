import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    'providedIn': 'root'
})
export class UserService {
    userActivateEmitter = new Subject<boolean>();
}