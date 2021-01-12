import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  @Input() employeeDetails = { firstName: '', lastName: '', address: '', city:'', country:'', postalCode:'', phone:'' , imgurl:'https://picsum.photos/300/300?random=1'}

  constructor(private httpClient: HttpClient, private router:Router,  public restApi: RestApiService) { }

  ngOnInit(): void {
  }
  addEmployee(dataEmployee: any) {
    this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
      this.router.navigate(['/emp-list'])
    })
  }

  backToHome(){
    this.router.navigate(['/']);
  }

}
