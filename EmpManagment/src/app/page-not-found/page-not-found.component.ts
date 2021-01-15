import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  hideList:boolean = false;
  constructor(private router:Router, private restApi:RestApiService) {  }
  ngOnInit(): void {}
  backToHome(){
    this.restApi.hideHeader.next(true);
    this.router.navigate(['/']);
  }
}
