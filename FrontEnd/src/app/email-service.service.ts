import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin } from "rxjs";
import { InboxList, SentMailList, UserDetails, ComposeMail, ComposeMailResponse } from './userDetails';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  public _host = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUsersList(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this._host + '/getUsersList')
      .pipe(catchError(this.handleError))
  }

  getUserDetails(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(this._host + `/getUserDetails?id=${id}`)
      .pipe(catchError(this.handleError))
  }

  getInboxList(id: number): Observable<InboxList[]> {
    return this.http.get<InboxList[]>(this._host + `/getInboxList?id=${id}`)
      .pipe(catchError(this.handleError))
  }

  getSentMailList(id: number): Observable<SentMailList[]> {
    return this.http.get<SentMailList[]>(this._host + `/getSentMailList?id=${id}`)
      .pipe(catchError(this.handleError))
  }

  viewInboxMail(id: number): Observable<InboxList> {
    return this.http.get<InboxList>(this._host + `/viewInboxMail?id=${id}`)
      .pipe(catchError(this.handleError))
  }

  viewSentMail(id: number): Observable<SentMailList> {
    return this.http.get<SentMailList>(this._host + `/viewSentMail?id=${id}`)
      .pipe(catchError(this.handleError))
  }

  composeMail(postBody: ComposeMail): Observable<ComposeMailResponse> {
    console.log("Post body:", JSON.stringify(postBody), postBody)
    return this.http.post<ComposeMailResponse>(this._host + `/composeMail`, postBody, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  getUserDetailsByEmail(userEmail: any): Observable<UserDetails> {
    return this.http.get<UserDetails>(this._host + `/getUserDetailsBasedOnEmail?userEmail=${userEmail}`)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
