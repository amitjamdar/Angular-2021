import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, Validators } from "@angular/forms";
import { filter } from 'rxjs/operators';
interface filtersI {
  sortby: any;
  sortbyobject: any;
  filteringkey: any;
}
@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {
  employeeData: any = [];
  filterSearchValue:any= '';
  searchText:any;
  Employee: any = [];
  hideHeader:any;
  detailView: boolean = false;
  myParam:any;
  showModal : any;
  sortOrder: any;
  filterResult: any;
  detialsId:any;
  id:any;
  emptyFilter: filtersI = {
    sortby: null,
    sortbyobject:null,
    filteringkey:null
  };
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
      this.empFilter(this.emptyFilter);
      this.sortOrder = this.empFilter;
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
    this.detailView = true;
    this.detialsId = id;
    this.loadEmployeesWithID(this.detialsId);
    // this.router.navigate(['/emp-detail', id]);
  }
  
  loadEmployeesWithID(id:any) {
    console.log(id);
    return  this.restApi.getEmployee(id).subscribe((data: {}) => {
      this.employeeData = data;
      console.log(typeof this.employeeData);
    });
  }
  resetView(){
    console.log("resetView");
    this.detailView = false;
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
    sortby: ['', [Validators.required]],
    sortbyobject:['',[]],
    filteringkey:['']
  })

  

  onSubmit() {
    this.sortOrder = this.registrationForm.value;
    console.log("After Filter click" , JSON.stringify(this.sortOrder));
    this.empFilter(this.sortOrder);
    this.Employee.sort(this.compareValues('firstName', this.sortOrder));
    this.showModal = false;
  }  

  empFilter(filterItem: any){
    console.log("In EMP Filter" , JSON.stringify(filterItem));
    this.filterResult = this.Employee.filter((e:any) => {
        if(filterItem.filteringkey == "below"){
          return e.unitnumber < 100;
        }else if(filterItem.filteringkey == "above"){
          return e.unitnumber > 100
        }else{
          return this.Employee;
        }
      }); 
  }

  compareValues(key: string, order:any) {
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
