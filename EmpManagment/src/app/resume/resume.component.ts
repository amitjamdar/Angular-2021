import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute, public restApi: RestApiService) {}
  employeeData: any = [];
  private sub: any;
  id:any;
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });

    // this.httpClient.get<any>("assets/empDetail.json").subscribe((data)=>
    //   this.employeeData = data
    // )
    this.loadEmployeesWithResumeData();
  }

  loadEmployeesWithResumeData() {
    return  this.restApi.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData = data;
      
      console.log("EmpData",  this.employeeData);
    });
  }
  backToHome(){
    this.router.navigate(['/']);
  }

}
