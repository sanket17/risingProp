import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
  import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { Propertylisting } from '../propertylisting';
import { Http } from '@angular/http';
import { stringify } from '@angular/compiler/src/util';
import { RisingPropService } from './../rising-prop.service';
import { FormDataComponent, enquiry_details, user_details, user } from './../data-model/formData.component';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  FormDataComponent: FormDataComponent;
  private toasterService: ToasterService;
  generate_otp_btn:boolean;
  validate_otp_btn:boolean;
  valid_otp:boolean;
  otp_show:boolean;
  otp_success:boolean;
  submitted:boolean;
  property_details_site_visit:string
  property_details_immediate_purchase:string
  property_details_site_home_loan:string
  priceText:string;
  hiddenMobileNo:string;

  //component constructor
  constructor (private httpService: HttpClient, private route: ActivatedRoute,
    private _risingPropService: RisingPropService,toasterService: ToasterService) {
    this.FormDataComponent = new FormDataComponent();
    
    this.FormDataComponent.user_details = new user_details();
    this.FormDataComponent.user_details.user = new user();
    this.FormDataComponent.enquiry_details = new enquiry_details();
    this.toasterService = toasterService;
     }
  property={};
  id: number;
  getData(url) {
    return this._risingPropService.get(url);
  }


  
  postData(data,url) {
    return this._risingPropService.post(data,url);
  }



   /*Generate OTP validation*/
   generateOTPValidation() :boolean {

    this.submitted = true;
    if (this.mobileNumberCheck()) {
      // code...
    }
    let errorCount = 0;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (this.FormDataComponent.enquiry_details.user.user_type == undefined) {
      errorCount++;
    }
    if ((this.FormDataComponent.enquiry_details.user.name == undefined) || 
      (this.FormDataComponent.enquiry_details.user.name.length < 0)) {
      errorCount++;
    }else {
      this.FormDataComponent.enquiry_details.user.user_type = this.FormDataComponent.enquiry_details.user.user_type;
    }
    if ((this.FormDataComponent.enquiry_details.user.mobile == undefined) || 
      (this.FormDataComponent.enquiry_details.user.mobile.length < 0)) {
      errorCount++;
    } else if ((this.FormDataComponent.enquiry_details.user.mobile.length  < 10) &&
        (this.FormDataComponent.enquiry_details.user.mobile.length  > 10)) {
      errorCount++;
    }
    if ((this.FormDataComponent.enquiry_details.user.email == undefined) || 
      (this.FormDataComponent.enquiry_details.user.email.length < 0)) {
      errorCount++;
    }else if (reg.test(this.FormDataComponent.enquiry_details.user.email) == false) 
    {
        errorCount++;
    }
    if (errorCount >= 1) {
      return false;
    }else {
      return true;
    }
  }

  /*Mobile number validation for generating OTP*/
  mobileNumberCheck() :boolean {
    console.log("mobile");
    if (this.FormDataComponent.enquiry_details.user.mobile == undefined)
      return false;
    if ((this.FormDataComponent.enquiry_details.user.mobile.length  < 10) &&
        (this.FormDataComponent.enquiry_details.user.mobile.length  > 10))
      return false;

    return true;
  }

  /*Accept only number from input*/
  numberOnly(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onInterestChange(valueofInterest){    
  
    if(this.FormDataComponent.enquiry_details.interested_in==undefined){
      this.FormDataComponent.enquiry_details.interested_in=valueofInterest;
    }
    else
    {
      this.FormDataComponent.enquiry_details.interested_in=this.FormDataComponent.enquiry_details.interested_in+','+ valueofInterest
    }



   
  }
  
  /*OTP validation*/
  OTPValidation() :boolean {
    this.submitted = true;
    let errorCount = 0;
    if ((this.FormDataComponent.enquiry_details.otp == undefined) || 
      (this.FormDataComponent.enquiry_details.otp.length < 0)) {
      errorCount++;
    }

    if ((this.FormDataComponent.enquiry_details.user.mobile == undefined) || 
      (this.FormDataComponent.enquiry_details.user.mobile.length < 0)) {
      errorCount++;
    } else if ((this.FormDataComponent.enquiry_details.user.mobile.length  < 10) &&
        (this.FormDataComponent.enquiry_details.user.mobile.length  > 10)) {
      errorCount++;
    }

    if (errorCount >= 1) {
      return false;
    }else {
      return true;
    }
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




  //init method
  ngOnInit() {/*
    console.log("in detail");
    this.route.params.subscribe(params => {
      this.id = params['id']; // --> Name must match wanted parameter
      let id = this.id;
      //api call to get details of property..
      this.httpService.get('http://rpapi.dhoteghar.in/api/v1/propertydetails/{'+this.id)
    .subscribe( data => {
      debugger;
      this.property = data as string[];
    });
    });*/
    this.route.params.subscribe(params => {
      this.id = params['id']; // --> Name must match wanted parameter
      let id = this.id;
      //api call for get all listed property in data base order by priority..
      this.getData('/api/v1/propertydetails/'+id).subscribe(
        data => {
          data = data.json();
          if (data !== null) {
            //debugger
            this.property = data;
            /*console.log("propperty- "+this.property);*/
          }
          if (data === null) {
            this.property = [];
          } 
          this. bindPriceTextValue();
          this.hideMobileNumber(); 
        },
        error => {
            this.property = [];          
        }
      );
    });

    
    
  }

  hideMobileNumber() {
    var n;
    var num=this.property[0].users.mobile;
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';

    for (var i =0; i < n[0].length; ++i) {
      if ((i>2) || (i<5)) {
        str = str + 'x';
      }else{
        str = str + '' + n[0];
      }
    }
    this.hiddenMobileNo = str;
  }
  scroll(el) {
    el.scrollIntoView();
  }
  bindPriceTextValue()
  {
   
    var n;
    var a = ['','1 ','2 ','3 ','4 ', '5 ','6 ','7 ','8 ','9 ','10 ','11 ','12 ','13 ','14 ','15 ','16 ','17 ','18 ','19 '];
    var b = ['', '', '20','30','40','50', '60','70','80','90'];
    
     var num=this.property[0].price_details.total_cost;

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? n[1] + ' crore ' : '';
    str += (n[2] != 0) ? n[2] + ' lakh ' : '';
    str += (n[3] != 0) ? n[3] + ' thousand ' : '';
    str += (n[4] != 0) ? n[4] + ' hundred ' : '';
    str += (n[5] != 0) ? n[5] + ' only ' : '';
   
    this.priceText=str;
  }


  submit(f) {
  //debugger;
  var propertyId=this.property[0].property_features.property_details_id;
  console.log(this.FormDataComponent);
  this.FormDataComponent.enquiry_details.property_id=propertyId;
  if (this.generate_otp_btn) {
    let formFlag = this.generateOTPValidation();
    if (formFlag) {
      let url = "/api/v1/interested_in";
      this.postData(this.FormDataComponent.enquiry_details,url)
      .subscribe( response => {
        //debugger
          response = response.json();
          if (response.status == 200) {
            this.popToast('success', 'OTP send to your mobile number');
            this.generate_otp_btn = false;
            this.otp_show = true;
            this.submitted = false;
          }else {
            this.popToast('error', 'Please re-enter OTP');
          }
          
        },
        error => {
          this.popToast('error', 'Error while generating OTP, Try again');
      });
    }
    return;
  }
  else if (this.validate_otp_btn) {
    let formFlag = this.OTPValidation();
    if (formFlag) {
      let url = "/api/v1/validate_interested_in";
      let data = {
                  "otp": this.FormDataComponent.enquiry_details.otp,
                  "mobile": this.FormDataComponent.enquiry_details.user.mobile,
                  "property_id": this.FormDataComponent.enquiry_details.property_id
                 };

      this.postData(data,url)
      .subscribe( response => {
        //debugger
        response = response.json();
          if (response.status == 200) {
            this.popToast('success', 'Successfuly submitted OTP');
            this.validate_otp_btn = false;
            this.otp_show = false;
            this.valid_otp = false;
            this.otp_success = true;
            this.submitted = false;
          }else {
            this.popToast('error', 'Please re-enter OTP');
          }
        },
        error => {
          this.popToast('error', 'Please re-enter OTP');
      });
    }
    return;
  }
  }

}
