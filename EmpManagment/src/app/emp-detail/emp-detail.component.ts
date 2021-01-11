import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.scss']
})
export class EmpDetailComponent implements OnInit {

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router:Router) {}
  employeeData:any;
  filterSearchValue:any= '';
  searchText:any;
  private sub: any;
  id:any;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });

    this.httpClient.get<any>("assets/empDetail.json").subscribe((data)=>
      this.employeeData = data
    )
  }
  backToHome(){
    this.router.navigate(['app-emp-list']);
  }
  goToResume(){
    console.log("go to resume component");
    this.router.navigate(['app-resume']);
  }

}
