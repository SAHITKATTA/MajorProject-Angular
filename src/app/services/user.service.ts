import { Injectable } from "@angular/core";
import { Email } from "../model/email";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class UserService {
  URL = "http://127.0.0.1:5000";
  USER = {
    INBOX: "/email/inbox",
    SENT: "/email/sent",
    ALL: "/email/all",
    SPAM: "/email/spam",
    SEND_MAIL: "/email/create",
    DELETE_MAIL: "/email/delete",
    PREDICT: "/predict",
  };
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "my-auth-token",
      "Access-Control-Allow-Credentials": "true",
    }),
  };
  constructor(private http: HttpClient) {}
  inbox(email: string): Observable<Email[]> {
    return this.http.get<Email[]>(
      this.URL + this.USER.INBOX + "/" + email,
      this.httpOptions
    );
  }
  sent(email: string): Observable<Email[]> {
    return this.http.get<Email[]>(
      this.URL + this.USER.SENT + "/" + email,
      this.httpOptions
    );
  }
  all(email: string): Observable<Email[]> {
    return this.http.get<Email[]>(
      this.URL + this.USER.ALL + "/" + email,
      this.httpOptions
    );
  }
  spam(email: string): Observable<Email[]> {
    return this.http.get<Email[]>(
      this.URL + this.USER.SPAM + "/" + email,
      this.httpOptions
    );
  }
  sendMail(newMail: Email): Observable<any> {
    return this.http.post<any>(
      this.URL + this.USER.SEND_MAIL,
      newMail,
      this.httpOptions
    );
  }
  deleteMail(eid: string): Observable<any> {
    return this.http.delete<any>(
      this.URL + this.USER.DELETE_MAIL + "/" + eid,
      this.httpOptions
    );
  }
  predict(message: string): Observable<any> {
    return this.http.post<any>(
      this.URL + this.USER.PREDICT,
      { message: message },
      this.httpOptions
    );
  }
}
