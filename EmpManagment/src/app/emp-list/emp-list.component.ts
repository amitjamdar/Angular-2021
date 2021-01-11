import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Router } from '@angular/router';
@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {
  employeeData:any;
  filterSearchValue:any= '';
  searchText:any;

  constructor(private httpClient: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.httpClient.get<any>("assets/employees.json").subscribe((data)=>
      this.employeeData = data
    )
  }
  backToHome(){
    this.router.navigate(['/']);
  }
  empDetails(id:any){
    console.log(id);
    this.router.navigate(['/app-emp-detail', id]);
  }
}
