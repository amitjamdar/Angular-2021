import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {
  employeeData:any;
  filterSearchValue:any= '';
  searchText:any;
  Employee: any = [];
  constructor(private httpClient: HttpClient, private router:Router,  public restApi: RestApiService) { }

  // ngOnInit(): void {
  //   // this.httpClient.get<any>("assets/employees.json").subscribe((data)=>
  //   //   this.employeeData = data
  //   // )
  //   // this.loadEmployees();
  // }

  ngOnInit() {
    this.loadEmployees()
  }

  // Get employees list
  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
      console.log("In load Emp", this.Employee);
    })
  }

  // Delete employee
  deleteEmployee(id: string) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deleteEmployee(id).subscribe(data => {
        this.loadEmployees()
      })
    }
  }  
  editEmployee(id:any){
    this.router.navigate(['/emp-edit', id]);
  }

  empDetails(id:any){
    this.router.navigate(['/emp-detail', id]);
  }

  backToHome(){
    this.router.navigate(['/']);
  }
  addEmp(){
    this.router.navigate(['add-employee']);
  }
}
