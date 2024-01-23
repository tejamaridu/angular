import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  logMessage(msg: string) {
    console.log('Log Message is ' + msg);
  }
}
