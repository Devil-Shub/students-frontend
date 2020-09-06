import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  submitted = false;
  message = "";
  addClass = ""

  studentFormInfo = {
    student_id: "",
    first_name: "",
    last_name: "",
    class: "",
    studentDetails: [{
      subject: '',
      marks: ''
    }]
  }

  studentDetails = {
    subject: '',
    marks: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) { }

  ngOnInit(): void {
    //student edit
    if (this.route.snapshot.paramMap.get('studentId') != null) {
      this._getStudentInfo(this.route.snapshot.paramMap.get('studentId'));
    }
    //student edit
  }

  /**
   * get student details
   */
  _getStudentInfo(studentId) {

    this.studentsService.getStudentById(studentId).subscribe((response) => {
      if (response.status) {
        //fillout all student info
        this.studentFormInfo.student_id = response.data.id;
        this.studentFormInfo.first_name = response.data.first_name;
        this.studentFormInfo.last_name = response.data.last_name;
        this.studentFormInfo.class = response.data.class;
        //make initially blank
        this.studentFormInfo.studentDetails = [];
        //set subjects info
        for (const [key, subject] of Object.entries(response.data.subjects)) {
          //set to default
          this.studentDetails = {
            subject: '',
            marks: ''
          };

          this.studentDetails.subject = subject['subject'];
          this.studentDetails.marks = subject['marks'];

          this.studentFormInfo.studentDetails.push(this.studentDetails);  
        }

      }
    }, (error) => {
    });

  }

  addSubject() {
    this.studentFormInfo.studentDetails.push({
      subject: '',
      marks: ''
    });
  }

  removeSubject(i: number) {
    this.studentFormInfo.studentDetails.splice(i, 1);
  }

  _validateForm() {
    if (this.studentFormInfo.first_name == "" ||
      this.studentFormInfo.last_name == "" ||
      this.studentFormInfo.class == "" ||
      this.studentFormInfo.studentDetails.length == 0) {

      return false;
    }
    return true;
  }

  /**
   * 
   * @param event add/edit student
   */
  saveStudent() {
    this.submitted = true;
    if (!this._validateForm()) {
      return false
    }

    //update student
    if (this.route.snapshot.paramMap.get('studentId') != null) {
      this._updateStudent();
    } else {
      //add student
      this._addStudent();
    }

  }

  /**
   * add student
   */
  _addStudent() {
    this.studentsService.addStudent(this.studentFormInfo).subscribe((response) => {
      if (response.status) {

        this.message = response.message;
        this.addClass = "success";

        setTimeout(() => {
          this.message = "";
          this.addClass = "";

          this.router.navigateByUrl('');
        }, 2000)
      } else {
        this.message = response.message;
        this.addClass = "danger";
      }
    }, (error) => {
      this.message = error;
      this.addClass = "danger";
    });
  }

  /**
   * update student
   */
  _updateStudent() {
    this.studentsService.editStudent(this.studentFormInfo).subscribe((response) => {
      if (response.status) {

        this.message = response.message;
        this.addClass = "success";

        setTimeout(() => {
          this.message = "";
          this.addClass = "";

          this.router.navigateByUrl('');
        }, 2000)
      } else {
        this.message = response.message;
        this.addClass = "danger";
      }
    }, (error) => {
      this.message = error;
      this.addClass = "danger";
    });
  }

}
