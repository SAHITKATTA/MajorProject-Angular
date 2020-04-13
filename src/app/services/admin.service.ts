import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/user";
import { Email } from "../model/email";
@Injectable({
  providedIn: "root",
})
export class AdminService {
  URL = "http://127.0.0.1:5000";
  ADMIN = {
    CREATE_USER: "/user/create",
    READ_USER: "/user/read",
    READ_ALL_USER: "/user/read_all",
    UPDATE_USER: "/user/update",
    DELETE_USER: "/user/delete",
    VIEW_ALL_EMAILS: "/email/read_all",
  };
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "my-auth-token",
      "Access-Control-Allow-Credentials": "true",
    }),
  };
  constructor(private http: HttpClient) {}
  createUser(user: User): Observable<any> {
    return this.http.post(
      this.URL + this.ADMIN.CREATE_USER,
      user,
      this.httpOptions
    );
  }
  readAllUser(): Observable<User[]> {
    return this.http.get<User[]>(
      this.URL + this.ADMIN.READ_ALL_USER,
      this.httpOptions
    );
  }
  updateUser(user: User): Observable<any> {
    return this.http.put(
      this.URL + this.ADMIN.UPDATE_USER + "/" + user.email,
      { password: user.password },
      this.httpOptions
    );
  }
  deleteUser(email: string): Observable<any> {
    return this.http.delete(
      this.URL + this.ADMIN.DELETE_USER + "/" + email,
      this.httpOptions
    );
  }

  viewAllEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(
      this.URL + this.ADMIN.VIEW_ALL_EMAILS,
      this.httpOptions
    );
  }
}
