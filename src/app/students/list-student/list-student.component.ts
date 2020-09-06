import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {

  public data = [];
  
  message = "";
  addClass = "";

  studentIds = [];
  storeIndexes = [];

  dtOptions: DataTables.Settings = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    //load students
    this._getStudentList();

  }

  _getStudentList() {
    this.studentsService.listStudent().subscribe((response) => {
      if (response.status) {
        this.data = response.data;
      }else{
        this.message = response.message;
        this.addClass = "danger";
      }
    }, (error) => {
      this.message = error;
      this.addClass = "danger";
    });
  }

  _storeUserId(studentId, index) {
    if(this.studentIds.indexOf(studentId) == -1) {
      this.studentIds.push(studentId);
      this.storeIndexes.push(index);
    }
    return '';
  }

  deleteStudent(studentId) {
    this.studentsService.deleteStudent(studentId).subscribe((response) => {
      if (response.status) {
        this.message = response.message;
        this.addClass = "success";

        //load students
        this._getStudentList();

        setTimeout(() => {
          this.message = "";
          this.addClass = "";
        }, 2000)

      }else{
        this.message = response.message;
        this.addClass = "danger";
      }
    }, (error) => {
      this.message = error;
      this.addClass = "danger";
    });
  }

}
