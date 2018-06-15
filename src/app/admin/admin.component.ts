import { Component, OnInit, Injectable } from '@angular/core';
import { RisingPropService } from './../rising-prop.service';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'approve_property',
  template: '<p><p>'
})
export class approve_property {
    public created_on: string;
    public name: string;
    public property_details_id: number;
    public user_type: number;
    public status: number;
    public rejection_reason: string;
    public rank: number;
    /*constructor(property_details_id:any, created_on:any, name:any, user_type:any, status:any, rejection_reason:any, rank:any) {
     this.property_details_id = property_details_id;
     this.user_type=user_type;
     this.name=name;
     this.created_on=created_on;
     this.status = status;
     this.rejection_reason = rejection_reason;
     this.rank = rank;
     }*/
     constructor(){}
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  property : any;
  properties = [];
  private toasterService: ToasterService;
  approve_property_btn: boolean;

  constructor (
    private _risingPropService: RisingPropService,
    private router: Router,
    toasterService: ToasterService) {
        this.toasterService = toasterService;
    }

  getData(url) {
    return this._risingPropService.get(url);
  }

  putData(data,url) {
    return this._risingPropService.put(data,url);
  }

  ngOnInit() {
    //api call for get all listed property in data base order by priority..
    this.getData('/api/v1/propertydetails/get').subscribe(
      data => {
        //debugger
        data = data.json();
        if (data !== null) {
          this.property = data;
          for (let prop of this.property) {
          let name='';
          let user_type = null;
          let status = prop.status/1;
          let rank = null;

          if (prop.users){
          name=prop.users.name;
          user_type= prop.users.user_type/1;
          }

          if (prop.premium_property){
              rank = prop.premium_property.rank/1;
          }
            let pr = new approve_property();
            pr.created_on = prop.created_on
            pr.name=name;
            pr.property_details_id=prop.id;
            pr.user_type= user_type;
            pr.status= status;
            pr.rejection_reason= prop.rejection_reason;
            pr.rank= rank;

            this.properties.push(pr);
          }

          //console.log(this.property);
        }
        if (data === null) {
          this.property = [];
        }
      },
      error => {
          this.property = [];
      }
    );
  }

  // submit method on submit form
  submit(f) {

        console.log("approve clicked");
        console.log(f);

        let url = "/api/v1/propertydetails/" + f.property_details_id;
        console.log(url);
        this.putData(f,url)
        .subscribe( response => {
            response = response.json();
            if(response['status']==404){
                this.popToast('error', response['message']);
             }
             else{
                 this.popToast('success', response['message']);
             }
          },
          error => {
            this.popToast('error', error);
        });

      return;
    }

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade',
    showCloseButton: true,
    timeout: 5000
  });

  popToast(messageType, message) {
    this.toasterService.pop(messageType, message);
  }

  }



