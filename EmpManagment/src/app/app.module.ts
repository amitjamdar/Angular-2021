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
import { ResumeComponent } from './resume/resume.component';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmpEditComponent } from './emp-edit/emp-edit.component';

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
  },
  {
    path:'add-employee',
    component:AddEmployeeComponent
  },
  {
    path:'emp-edit/:id',
    component:EmpEditComponent
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
    AddEmployeeComponent,
    EmpEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
