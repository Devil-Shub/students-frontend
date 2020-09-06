import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  /*
   * add student
   */
  addStudent(value): Observable<any> {
    return this.http.post(this.apiUrl + 'create-student', value).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /*
   * edit student
   */
  editStudent(value): Observable<any> {
    return this.http.post(this.apiUrl + 'update-student', value).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /*
   * list student
   */
  listStudent(): Observable<any> {
    return this.http.get(this.apiUrl + 'list-students').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /*
   * delete student
   */
  deleteStudent(studentId): Observable<any> {
    return this.http.delete(this.apiUrl + 'delete-student/'+studentId).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /*
   * fetch student
   */
  getStudentById(studentId): Observable<any> {
    return this.http.get(this.apiUrl + 'get-student/'+studentId).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  
}
