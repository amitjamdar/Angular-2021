import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, Validators } from "@angular/forms";

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
  hideHeader:any;
  myParam:any;
  showModal : any;
  sortOrder: any;
  constructor(private httpClient: HttpClient, private router:Router,  public restApi: RestApiService, private route : ActivatedRoute,public fb: FormBuilder) {
    
   }

  // ngOnInit(): void {
  //   this.httpClient.get<any>("assets/employees.json").subscribe((data)=>
  //     this.employeeData = data
  //   )
  // }

  ngOnInit() {
    this.loadEmployees();
  }


  // Get employees list
  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
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
    this.restApi.hideHeader.next(true);
    this.router.navigate(['/']);
  }
  addEmp(){
    this.router.navigate(['add-employee']);
  }
  onClick(event: any)
  {
    this.showModal = true; // Show-Hide Modal Check
  }
  hide()
  {
    this.showModal = false;
  }


  registrationForm = this.fb.group({
    sortby: ['asc', [Validators.required]],
    sortbyobject:['name',[]]
  })
    
  onSubmit() {
    this.sortOrder = this.registrationForm.value;
    console.log(this.sortOrder);
    this.Employee.sort(this.compareValues('firstName', this.sortOrder));
    this.showModal = false;
  }  
  
  compareValues(key: string, order: {}) {
    return function innerSort(a: { [x: string]: any; hasOwnProperty: (arg0: any) => any; }, b: { [x: string]: any; hasOwnProperty: (arg0: any) => any; }) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order.sortby === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  SortData(){
    console.log("In Sort data");
  }
  CancelSort(){
    this.showModal = false;
  }
}
