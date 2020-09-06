import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';

import { StudentsRoutingModule } from './students-routing.module';

import {ListStudentComponent} from './list-student/list-student.component';
import { StudentInfoComponent } from './student-info/student-info.component';


@NgModule({
  declarations: [
    ListStudentComponent,
    StudentInfoComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentsModule { }
