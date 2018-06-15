import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { SearchDatacomponent } from './../data-model/searchData.component';
import { RisingPropService } from './../rising-prop.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormDataComponent, enquiry_details, user_details, user } from './../data-model/formData.component';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';


@Component({
  selector: 'app-search-list-property',
  templateUrl: './search-list-property.component.html',
  styleUrls: ['./search-list-property.component.css']
})
export class SearchListPropertyComponent implements OnInit {
  public property_type: string;
  public property_for: string;
  public property: {};
  public all_price_inc: any[];
  public open_enquiry_flag: boolean;
  public user_id: string;
  SearchDatacomponent: SearchDatacomponent;
  private toasterService: ToasterService;
  FormDataComponent: FormDataComponent;
  generate_otp_btn: boolean;
  validate_otp_btn: boolean;
  valid_otp: boolean;
  otp_show: boolean;
  otp_success: boolean;
  submitted: boolean;
  property_details_site_visit: string;
  property_details_immediate_purchase: string;
  property_details_site_home_loan: string;
  no_data: string;
  myOptions: IMultiSelectOption[];
  intrestedInOptionSelected: IMultiSelectOption[];
  multi_select_dropdowm_setting: IMultiSelectSettings = {
    buttonClasses: 'form-control'
  };

  property_details_intrest = [
    { id: 1, name: 'Site Visit' },
    { id: 2, name: 'Immediate Purchase' },
    { id: 3, name: 'Home Loan' }
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _risingPropService: RisingPropService,
    toasterService: ToasterService) {
    this.SearchDatacomponent = new SearchDatacomponent();
    this.FormDataComponent = new FormDataComponent();
    this.FormDataComponent.user_details = new user_details();
    this.FormDataComponent.user_details.user = new user();
    this.FormDataComponent.enquiry_details = new enquiry_details();
    this.all_price_inc = [];
    this.open_enquiry_flag = false;
    this.toasterService = toasterService;
    this.no_data = "";
    /* this.route.queryParams.subscribe(params => {
         this.SearchDatacomponent.property_type = params["property_type"];
         this.SearchDatacomponent.property_for = params["property_for"];
         this.SearchDatacomponent.bedroom = params["bedroom"];
         this.SearchDatacomponent.locality = params["locality"];
         this.SearchDatacomponent.city = params["city"];
         this.SearchDatacomponent.total_cost = params["total_cost"];
         this.SearchDatacomponent.area = params["area"];
         this.SearchDatacomponent.area_unit = params["area_unit"];
         
         
     });*/

    /*this.route.params.subscribe(params => {
      debugger
    console.log(params);
    if (params['search']) {
      //this.doSearch(params['term'])
    }
  });*/
  }

  ngOnInit() {
    //let data = this.route.snapshot.queryParamMap.get('SearchData');
    //console.log(data)
   
    if (sessionStorage.getItem('loadCount') == undefined) {
      sessionStorage.setItem('loadCount', '1');
      this.SearchDatacomponent = this._risingPropService.getSearchObject();
      sessionStorage.setItem('searchObj', JSON.stringify(this.SearchDatacomponent));
    }
    else if (sessionStorage.getItem('loadCount') == '1') {
      this.SearchDatacomponent = JSON.parse(sessionStorage.getItem('searchObj'));
      sessionStorage.setItem('loadCount', '2');
    }
    else if (sessionStorage.getItem('loadCount') == '2') {
      this.SearchDatacomponent = JSON.parse(sessionStorage.getItem('searchObj'));
      sessionStorage.setItem('loadCount', '2');
    }




    let url = "/api/v1/searchproperty";

    this.postData(this.SearchDatacomponent, url).subscribe(
      data => {
        data = data.json();
        if (data['status'] == 404) {
          this.popToast('error', data['message']);
        }
        else if (data['status'] == 201) {
          this.no_data = data['message'];
        } else {

          if (data !== null) {
            this.no_data = null;
            this.property = data;
            let tempData;

            for (var i = 0; i < Object.keys(this.property).length; ++i) {
              //this.all_price_inc = "";
              tempData = (this.property[i].price_details.maintenance_charge).split(" ");
              this.all_price_inc[i] = parseInt(this.property[i].price_details.total_cost)
                + parseInt(this.property[i].price_details.daily_for_office)
                + parseInt(this.property[i].price_details.other_charges)
                + parseInt(tempData[0])
                + parseInt(this.property[i].price_details.security_amount);

              this.all_price_inc[i] =
                this.bindPriceTextValue(this.all_price_inc[i]);

              this.property[i].price_details.total_cost =
                this.bindPriceTextValue(this.property[i].price_details.total_cost);
            }
          } else if (data === null) {
            this.property = [];
            this.popToast('error', data['message']);
          }
        }
      },
      error => {
        this.property = [];
        this.popToast('error', error);
      }
    );


  }
  submit(f) {
    //debugger;
    var propertyId = this.property[0].property_features.property_details_id;
    console.log(this.FormDataComponent);
    this.FormDataComponent.enquiry_details.property_id = propertyId;
    if (this.generate_otp_btn) {
      let formFlag = this.generateOTPValidation();
      if (formFlag) {
        let url = "/api/v1/interested_in";
        if (this.FormDataComponent.enquiry_details.otp != "") {
          this.FormDataComponent.enquiry_details.otp = "";
        }
        this.FormDataComponent.enquiry_details.user.user_type = 4;
        this.onInterestChange();
        this.postData(this.FormDataComponent.enquiry_details, url)
          .subscribe(response => {
            //debugger
            response = response.json();
            if (response.status == 200) {
              this.popToast('success', 'OTP send to your mobile number');
              this.generate_otp_btn = false;
              this.otp_show = true;
              this.submitted = false;
            } else {
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

        this.postData(data, url)
          .subscribe(response => {
            //debugger
            response = response.json();
            if (response.status == 200) {
              this.popToast('success', 'OTP Submitted Successfully');
              this.validate_otp_btn = false;
              this.otp_show = false;
              this.valid_otp = false;
              this.otp_success = true;
              this.submitted = false;
            } else {
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
  postData(data, url) {
    return this._risingPropService.post(data, url);
  }


  bindPriceTextValue(formattedPrice) {

    var n;
    var a = ['', '1 ', '2 ', '3 ', '4 ', '5 ', '6 ', '7 ', '8 ', '9 ', '10 ', '11 ', '12 ', '13 ', '14 ', '15 ', '16 ', '17 ', '18 ', '19 '];
    var b = ['', '', '20', '30', '40', '50', '60', '70', '80', '90'];

    var num = formattedPrice;

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? n[1] + ' cr ' : '';
    str += (n[2] != 0) ? n[2] + ' lac ' : '';
    str += (n[3] != 0) ? n[3] + ' thousand ' : '';
    str += (n[4] != 0) ? n[4] + ' hundred ' : '';
    str += (n[5] != 0) ? n[5] + ' only ' : '';

    return str;
  }

  /*bindPriceTextValue_new(value) {
    var suffixes = ["", "k", "lac", "b","t"];
    var suffixNum = Math.floor((""+value).length/2);
    console.log(parseFloat((value / Math.pow(100,suffixNum) ) ) );
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(100,(suffixNum/2))) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        var shortNum = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}*/
  popToast(messageType, message) {
    this.toasterService.pop(messageType, message);
  }

  openEnquiryForm(event) {
    if (this.open_enquiry_flag == true) {
      this.open_enquiry_flag = false;
    } else {
      this.open_enquiry_flag = true;
      event.scrollIntoView();
    }
  }

  /*Generate OTP validation*/
  generateOTPValidation(): boolean {

    this.submitted = true;
    if (this.mobileNumberCheck()) {
      // code...
    }
    let errorCount = 0;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if ((this.FormDataComponent.enquiry_details.user.name == undefined) ||
      (this.FormDataComponent.enquiry_details.user.name.length < 0)) {
      errorCount++;
    } else {
      this.FormDataComponent.enquiry_details.user.user_type = this.FormDataComponent.enquiry_details.user.user_type;
    }
    if ((this.FormDataComponent.enquiry_details.user.mobile == undefined) ||
      (this.FormDataComponent.enquiry_details.user.mobile.length < 0)) {
      errorCount++;
    } else if ((this.FormDataComponent.enquiry_details.user.mobile.length < 10) &&
      (this.FormDataComponent.enquiry_details.user.mobile.length > 10)) {
      errorCount++;
    }
    if ((this.FormDataComponent.enquiry_details.user.email == undefined) ||
      (this.FormDataComponent.enquiry_details.user.email.length < 0)) {
      errorCount++;
    } else if (reg.test(this.FormDataComponent.enquiry_details.user.email) == false) {
      errorCount++;
    }
    if (errorCount >= 1) {
      return false;
    } else {
      return true;
    }
  }

  /*Mobile number validation for generating OTP*/
  mobileNumberCheck(): boolean {
    console.log("mobile");
    if (this.FormDataComponent.enquiry_details.user.mobile == undefined)
      return false;
    if ((this.FormDataComponent.enquiry_details.user.mobile.length < 10) &&
      (this.FormDataComponent.enquiry_details.user.mobile.length > 10))
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

  onInterestChange() {
    console.log("this.myOptions" + this.myOptions);
    console.log("this.myOptions" + this.property_details_intrest);
    let optionArrObj = [];
    for (let i = 0; i < this.myOptions.length; i++) {
      optionArrObj[i] = this.myOptions[i];
    }
    for (let i = 0; i < this.myOptions.length; i++) {
      for (let j = 0; j < this.property_details_intrest.length; j++) {

        if (optionArrObj[i] == this.property_details_intrest[j].id) {
          if (this.FormDataComponent.enquiry_details.interested_in == undefined) {
            this.FormDataComponent.enquiry_details.interested_in = this.property_details_intrest[j].name;
          }
          else {
            //if (this.FormDataComponent.enquiry_details.interested_in.indexOf(this.property_details_intrest[i].name) == -1) {
            this.FormDataComponent.enquiry_details.interested_in = this.FormDataComponent.enquiry_details.interested_in + ',' + this.property_details_intrest[j].name;
            //}

          }
        }
      }
      console.log("this.myOptions" + this.FormDataComponent.enquiry_details.interested_in);
    }
    /*if(this.FormDataComponent.enquiry_details.interested_in==undefined){
      this.FormDataComponent.enquiry_details.interested_in=valueofInterest;
    }
    else
    {
      this.FormDataComponent.enquiry_details.interested_in=this.FormDataComponent.enquiry_details.interested_in+','+ valueofInterest
    }*/




  }

  /*OTP validation*/
  OTPValidation(): boolean {
    this.submitted = true;
    let errorCount = 0;
    if ((this.FormDataComponent.enquiry_details.otp == undefined) ||
      (this.FormDataComponent.enquiry_details.otp.length < 0)) {
      errorCount++;
    }

    if ((this.FormDataComponent.enquiry_details.user.mobile == undefined) ||
      (this.FormDataComponent.enquiry_details.user.mobile.length < 0)) {
      errorCount++;
    } else if ((this.FormDataComponent.enquiry_details.user.mobile.length < 10) &&
      (this.FormDataComponent.enquiry_details.user.mobile.length > 10)) {
      errorCount++;
    }

    if (errorCount >= 1) {
      return false;
    } else {
      return true;
    }
  }

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade',
    showCloseButton: true,
    timeout: 5000
  });



}
