import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';
import { StudentInfoComponent } from './/student-info/student-info.component';

const routes: Routes = [
  { path: '', component: ListStudentComponent },
  { path: 'add-student', component: StudentInfoComponent },
  { path: 'edit-student/:studentId', component: StudentInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
