import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.scss']
})
export class EmpEditComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  employeeData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { 
  }

  ngOnInit() { 
    this.restApi.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData = data;
      console.log("get Edit Data", this.employeeData);
    })
  }

  // Update employee data
  updateEmployee() {
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateEmployee(this.id, this.employeeData).subscribe(data => {
        this.router.navigate(['/emp-list'])
      })
    }
  }
  
  backToHome(){
    this.router.navigate(['/emp-list']);
  }

}
