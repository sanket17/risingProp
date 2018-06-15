import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { RisingPropService } from './../rising-prop.service';
import { Router , NavigationExtras} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Propertylisting } from '../propertylisting';
import { stringify } from '@angular/compiler/src/util';
import { SearchDatacomponent } from './../data-model/searchData.component';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
  
})
export class HomepageComponent implements OnInit {
  SearchDatacomponent: SearchDatacomponent;
  private toasterService: ToasterService;
  priceText:string;
  Min_show:boolean
  Max_show:boolean
  Budget1:string;
  minBudgtText:string;
  maxBudgtText:string;
  Property_Type:string;
  aditional:string;
  property_type=[];
  property_value=[];
  propcount:number;
  prop_value:string;
  minBudgetPrice:string;
  maxBudgetPrice:string;
  prop_rent:boolean;
  prop_buy:boolean;
  Show_bhk:boolean;
  submitted:boolean;


  property={};
  search_property_btn:boolean;
  constructor (private httpService: HttpClient,
    private http:Http,
    private _risingPropService: RisingPropService,
    private router: Router,toasterService: ToasterService) {
      this.SearchDatacomponent=new SearchDatacomponent();
      
      this.toasterService = toasterService;
      this.Min_show=true;
      this.Max_show=false;
      this.Budget1="Budget";
      this.minBudgtText="0";
      this.maxBudgtText="0";
      this.Property_Type="Property Type";
      this.aditional="";
      this.propcount=0;
      this.prop_rent=false;
      this.prop_buy=true;
      this.Show_bhk=false;
      this.submitted = false;

     }
  
  getData(url) {
    return this._risingPropService.get(url);
  }
  ngOnInit() {
    //api call for get all listed property in data base order by priority..
    this.getData('/api/v1/premiumproperty/all').subscribe(
      data => {

        data = data.json();
        if (data !== null) {
          this.property = data;
          /*console.log("propperty- "+this.property[2]["0"].id);*/
        }
        if (data === null) {
          this.property = [];
        } 
        this. bindPriceTextValue(this.property[3]);
        this.bindPriceTextValue(this.property[2])
      },
      error => {
          this.property = [];          
      }
    );
    this.SearchDatacomponent.property_type;
     this.SearchDatacomponent.bedroom;
     this.SearchDatacomponent.locality="";
     this.SearchDatacomponent.total_cost="";
     this.SearchDatacomponent.area="";
     this.SearchDatacomponent.area_unit="";
  }

  submit(f) {
    if (this.search_property_btn) {
      if (!this.validateForm(f)) {
        return;
      }
      if(this.SearchDatacomponent.property_for==undefined)
      {
        this.SearchDatacomponent.property_for=1;
      }
      if(this.SearchDatacomponent.property_type==undefined)
      {
        this.SearchDatacomponent.property_type="";
      }
       

        let url = "/api/v1/searchproperty";
        let SearchData = {
          "property_type": "1,2",
          "property_for": 1,
          "bedroom": "",
          "locality": "",
          "city": "Pune",
          "total_cost": "",
          "area" : "",
          "area_unit" : ""
         };
         /*let navigationExtras: NavigationExtras = {
            queryParams: {
                "property_type": SearchData["property_type"],
                "property_for": SearchData["property_for"],
                "bedroom": SearchData["bedroom"],
                "locality": SearchData["locality"],
                "city": SearchData["city"],
                "total_cost": SearchData["total_cost"],
                "area": SearchData["area"],
                "area_unit": SearchData["area_unit"]
            }
        };*/

        this._risingPropService.setSearchObject(this.SearchDatacomponent);
        /*let navigationExtras: NavigationExtras = {
            queryParams: {
                "property_type": this.SearchDatacomponent.property_type,
                "property_for": this.SearchDatacomponent.property_for,
                "bedroom": this.SearchDatacomponent.bedroom,
                "locality": this.SearchDatacomponent.locality,
                "city": this.SearchDatacomponent.city,
                "total_cost": this.SearchDatacomponent.total_cost,
                "area": this.SearchDatacomponent.area,
                "area_unit": this.SearchDatacomponent.area_unit
            }
        };*/
         this.router.navigate(['/SearchListPropertyComponent']);
      /*this.postData(SearchData,url).subscribe(
        data => {
          data = data.json();
          if (data !== null) {
            this.property = data;
          }
          if (data === null) {
            this.property = [];
          } 
        },
        error => {
          this.property = [];          
        }
      );*/

    }
  
  }


bindPriceTextValue(pricetext){
    var n;
     for (var prop of  pricetext) {

    var num=prop.property_details.total_cost;
      
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? n[1] + ' crore ' : '';
    str += (n[2] != 0) ? n[2] + ' lakh ' : '';
    str += (n[3] != 0) ? n[3] + ' thousand ' : '';
    str += (n[4] != 0) ? n[4] + ' hundred ' : '';
    str += (n[5] != 0) ? n[5] + ' only ' : '';
    prop.property_details.total_cost=str;
    
  }
  
}
  
  postData(data,url) {
    return this._risingPropService.post(data,url);
  }
  popToast(messageType, message) {
    this.toasterService.pop(messageType, message);
  }
 
  onPropertyTypeChange(prop_type){ 

    if(this.SearchDatacomponent.property_type==undefined){
      this.property_value[this.propcount]=prop_type.target.value;
      this.prop_value=this.property_value.join(',');
      this.SearchDatacomponent.property_type=this.prop_value;
      this.property_type[this.propcount]=prop_type.currentTarget.dataset.value;
      this.propcount++;
    }
    else
    {
      if(prop_type.target.checked==true)
      {
        
        this.property_value[this.propcount]=prop_type.target.value;
        this.prop_value=this.property_value.join(',');
        this.SearchDatacomponent.property_type=this.prop_value;
        this.property_type[this.propcount]=prop_type.currentTarget.dataset.value;
        this.propcount++;
      }
      else
      {
        for(var i=0; i< this.property_type.length; i++)
        {
          if(prop_type.currentTarget.dataset.value==this.property_type[i])
          {
            this.property_type[i]="";
            this.propcount--;
          }
        }
        for(var j=0; j< this.property_value.length; j++)
        {
         if(prop_type.target.value==this.property_value[j])
         {
           this.property_value[j]="";
         }
        }
        var outPropTypeArray = [];
        for (var i = 0; i < this.property_type.length; i++) {
            if(this.property_type[i] !=""){
              outPropTypeArray.push(this.property_type[i]);     
            }
        }
        this.property_type=outPropTypeArray;
        var outPropValueArray =[];
        for (var i = 0; i < this.property_value.length; i++) {
          if(this.property_value[i] !=""){
            outPropValueArray.push(this.property_value[i]);     
          }
      }
      debugger;
      this.property_value=outPropValueArray;
      this.prop_value=this.property_value.join(',');
      this.SearchDatacomponent.property_type=this.prop_value;


      }
     
    }
    this.Property_Type=this.property_type[0];
    if(this.property_type.length>1)
    {
      this.aditional="+"+String(this.property_type.length-1);
    }
    else
    {
      this.aditional="";
    }
    if(this.property_type.length==0)
    {
      this.Property_Type="Property Type"
      this.propcount=0;
    }

    for (var i = 0; i < this.property_value.length; i++) {
      if(this.property_value[i]==2 ||this.property_value[i]==4||this.property_value[i]==5){
             this.Show_bhk=true;
             break;
      }
      else
      {
        this.Show_bhk=false;
      }
  }
    

  }

  onBedroomTypeChange(no_of_bed)
  {
   var bedroom= no_of_bed;
   if(this.SearchDatacomponent.bedroom==undefined)
   {
    this.SearchDatacomponent.bedroom=bedroom;
   }
   else
   {
    this.SearchDatacomponent.bedroom=this.SearchDatacomponent.bedroom+','+bedroom;
   }

  }
  rangeMinLinkClick()
  {
    
    this.Min_show=true;
    this.Max_show=false;
    if(this.maxBudgtText !="0")
    {
      var budgetPrice=this.convertToWords(this.maxBudgtText);
    }
    else
    {
      this.convertToWords(this.maxBudgtText);
    }

  }

  rangeMaxLinkClick()
  {
    this.Max_show=true;
    this.Min_show=false;
    if(this.minBudgtText!="0")
    {

    }
  }
 
   convertToWords(price):string
  {
    
    return null;
  }

  
  onClickProperty_for_Rent(){
   
    this.SearchDatacomponent.property_for=2
    this.prop_buy=false;
    this.prop_rent=true;

  }

  onClickProperty_for_Buy(){
    this.SearchDatacomponent.property_for=1;
    this.prop_buy=true;
    this.prop_rent=false;

  }

  onMaxBudgetClick(budget)
  {
  
    this.maxBudgetPrice=budget.text;
    if(this.minBudgtText=="0")
    {
       let price=budget.dataset.value;
       this.maxBudgtText=price;
       this.Budget1="Upto"+this.maxBudgetPrice;
       this.SearchDatacomponent.total_cost="0"+'-'+this.maxBudgtText;
    }
    else
    {
      let price=budget.dataset.value;
      this.maxBudgtText=price;
      this.Budget1=this.minBudgetPrice+'-'+this.maxBudgetPrice;
      this.SearchDatacomponent.total_cost=this.minBudgetPrice+'-'+this.maxBudgtText;
    }
    this.Min_show=true;
    this.Max_show=false;
   
  }
 
  onMinBudgetClick(budget)
  {
    this. minBudgetPrice=budget.text;
    if(this.maxBudgtText=="0")
    {
     
      let price=budget.dataset.value;
      this.minBudgtText= price;
      this.Budget1="Greater than"+this.minBudgetPrice;
      this.SearchDatacomponent.total_cost=this.minBudgtText+'-'+"100000000";
    }
    else
    {
     
      let price=budget.dataset.value;
      this.minBudgtText= price;
      this.Budget1=this.minBudgetPrice+'-'+this.maxBudgetPrice;
      this.SearchDatacomponent.total_cost=this.minBudgtText+'-'+this.maxBudgetPrice;
    }
    this.Max_show=true;
    this.Min_show=false;
  
  }

  validateForm(fr) : boolean{
    this.submitted = true;
    if (fr.valid) {
      
      return true;
    } else {
      return false;
    }
  }

}
