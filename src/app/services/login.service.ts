import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { User } from "../model/user";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  isUserLoggedIn: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "my-auth-token",
      "Access-Control-Allow-Credentials": "true",
    }),
  };
  loginURL = "http://127.0.0.1:5000/login";
  constructor(private http: HttpClient) {}
  login(user: User): Observable<string> {
    return this.http.post<string>(this.loginURL, user, this.httpOptions);
  }
}
