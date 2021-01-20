import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  fullScreenView: boolean = false;
  myParam:any;
  showModal : any;
  sortOrder: any;
  filterResult: any;
  detialsId:any;
  id:any;
  showMyContainer: boolean = true;
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
    this.filterSearchValue = "";
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
      this.emptyFilter = {
        sortby: null,
        sortbyobject:null,
        filteringkey:null
      };
      this.empFilterSort(this.emptyFilter);
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
    });
  }
 
  registrationForm = this.fb.group({
    sortby: ['', [Validators.required]],
    sortbyobject:['',[]],
    filteringkey:['']
  })
  
  onSubmit() {
    console.log(this.registrationForm);
    this.emptyFilter = {
      sortby: this.registrationForm.value.sortby,
      sortbyobject:this.registrationForm.value.sortbyobject,
      filteringkey:this.registrationForm.value.filteringkey
    }
    this.empFilterSort(this.emptyFilter);
    this.Employee.sort(this.compareValues('firstName', this.emptyFilter));
    this.showModal = false;
  }  

  empFilterSort(filterItem: any){
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
  SortData(){
    console.log("In Sort data");
  }
  CancelSort(){
    this.showModal = false;
  }
  resetView(){
    this.detailView = false;
  }
  fullView(){
    this.fullScreenView = true;
  };
  closeFullView(){
    this.fullScreenView = false;
    this.detailView = false;
  }
}
