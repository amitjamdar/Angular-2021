import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ListOfEmpService {

  constructor(private httpClient:HttpClient) { }
  employeeData:any; 

  getEmpList(): void {
    this.httpClient.get<any>("assets/employees.json").subscribe((data)=>
      this.employeeData = data
    )
  }
}
