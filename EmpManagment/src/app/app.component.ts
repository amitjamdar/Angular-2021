import { Component } from '@angular/core';
import{ Router} from '@angular/router'
import{ RestApiService } from './shared/rest-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideHeader:any;
  detailView:any;
  constructor(private router : Router, private restApi:RestApiService ) {
    this.restApi.hideHeader.subscribe(data=>{
      this.hideHeader = data;
    })
  }
  title = 'Angualar Project Demo';
  hideList:boolean = true;

  notFound(){
    this.restApi.hideHeader.next(false);
    this.router.navigate(['page-not-found']);
  }
  showEmpList(){
    this.restApi.hideHeader.next(false);
    this.router.navigate(['emp-list']);
  }
  addEmp(){
    this.restApi.hideHeader.next(false);
    this.router.navigate(['add-employee']);
  }
}
