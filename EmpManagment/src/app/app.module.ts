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
import { ResumeComponent } from './resume/resume.component';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';
import { EmployeecreateComponent } from './employeecreate/employeecreate.component';
const routes:Routes = [
  {
    path: '',   
    component:AppComponent,
    pathMatch: 'full',
  },
  
  { 
    path:'page-not-found', 
    component:PageNotFoundComponent
  },
  {
    path:'emp-list',
    component:EmpListComponent
  },
  {
    path:'emp-detail/:id',
    component:EmpDetailComponent
  },
  {
    path:'resume/:id',
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
    ResumeComponent,
    TabComponent,
    TabsComponent,
    EmployeecreateComponent
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
