import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpDetailComponent } from './emp-detail/emp-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from "@angular/common/http";
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';
import {ListOfEmpService } from './list-of-emp.service';
import { ResumeComponent } from './resume/resume.component'
const routes:Routes = [
  {
    path: '',   
    component:AppComponent
  },
  { 
    path:'app-page-not-found', 
    component:PageNotFoundComponent
  },
  {
    path:'app-emp-list',
    component:EmpListComponent
  },
  {
    path:'app-emp-detail/:id',
    component:EmpDetailComponent
  },
  {
    path:'app-resume',
    component:ResumeComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    EmpListComponent,
    EmpDetailComponent,
    PageNotFoundComponent,
    SearchPipe,
    ResumeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ListOfEmpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
