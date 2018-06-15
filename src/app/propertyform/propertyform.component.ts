import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Propertylisting } from '../propertylisting';
import { Http } from '@angular/http';
import { stringify } from '@angular/compiler/src/util';
import { RisingPropService } from './../rising-prop.service';
import {
  FormDataComponent, property_details, user_details, user, location,
  area, property_feature, price_details, transaction_type, additional_feature,
  approved_by, flooring, amenities, images_data
} from './../data-model/formData.component';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';


@Component({
  selector: 'app-propertyform',
  templateUrl: './propertyform.component.html',
  styleUrls: ['./propertyform.component.css']
})
export class PropertyformComponent implements OnInit {

  private filedata: any[] = [];
  private postProData: any[] = [];
  FormDataComponent: FormDataComponent;
  isValid: boolean = true;
  myOptions: IMultiSelectOption[];
  flooringOptionSelected: IMultiSelectOption[];
  amenitiesOptionSelected: IMultiSelectOption[];
  multi_select_dropdowm_setting: IMultiSelectSettings = {
    buttonClasses: 'form-control'
  };

  Banks_offering_loan = [
    { id: '1', name: 'Allahabad Bank' },
    { id: '2', name: 'Axis Bank' },
    { id: '3', name: 'Bank of India' },
    { id: '4', name: 'Citibank' },
    { id: '5', name: 'DHFL' },
    { id: '6', name: 'Deutsche Bank' },
    { id: '7', name: 'HDFC Home Loans' },
    { id: '8', name: 'ICICI' },
    { id: '9', name: 'ING Vysya' },
    { id: '10', name: 'Indian Bank' },
    { id: '11', name: 'Kotak Mahindra Bank' },
    { id: '12', name: 'Oriental Bank Of Commerce' },
    { id: '13', name: 'Reliance Capital' },
    { id: '14', name: 'State Bank of Hyderabad' },
    { id: '15', name: 'UCO Bank' },
    { id: '16', name: 'United Bank of India' },
    { id: '17', name: 'Andhra Bank' },
    { id: '18', name: 'Bank of Baroda' },
    { id: '19', name: 'Canara Bank' },
    { id: '20', name: 'HDFC' },
    { id: '21', name: 'HSBC' },
    { id: '22', name: 'IDBI' },
    { id: '23', name: 'Indiabulls' },
    { id: '24', name: 'Karur Vysya Bank' },
    { id: '25', name: 'Punjab National Bank' },
    { id: '26', name: 'SBI' },
    { id: '27', name: 'Syndicate Bank' },
    { id: '28', name: 'Union Bank' },
    { id: '29', name: 'LIC Housing Finance' },
    { id: '30', name: 'Vijaya Bank' }
  ];

  flooringOptions = [
    { id: 1, name: 'Ceramic Tiles' },
    { id: 2, name: 'Granite' },
    { id: 3, name: 'Marble' },
    { id: 4, name: 'Marbonite' },
    { id: 5, name: 'Mosaic' },
    { id: 6, name: 'Normal Tiles/Kotah Stone' },
    { id: 7, name: 'Vitrified' },
    { id: 8, name: 'Wooden' },
  ];

  amenitiesOptions = [
    { id: 1, name: 'Air Conditioned' },
    { id: 2, name: 'Banquet Hall' },
    { id: 3, name: 'Bar/Longue' },
    { id: 4, name: 'Cafeteria/Food court' },
    { id: 5, name: 'Club House' },
    { id: 6, name: 'Conference Room' },
    { id: 7, name: 'DTH TV Facility' },
    { id: 8, name: 'Gymnasium' },
    { id: 9, name: 'Intercom Facility' },
    { id: 10, name: 'Internet/Wifi connectivity' },
    { id: 11, name: 'Jogging and Strolling Track' },
    { id: 12, name: 'Laundry Service' },
    { id: 13, name: 'Lift' },
    { id: 14, name: 'Maintenance Staff' },
    { id: 15, name: 'Outdoor Tennis Courts' },
    { id: 16, name: 'Park' },
    { id: 17, name: 'Piped Gas' },
    { id: 18, name: 'Power Back Up' },
    { id: 19, name: 'Private Terrace/Garden' },
    { id: 20, name: 'RO Water System' },
    { id: 21, name: 'Rain Water Harvesting' },
    { id: 22, name: 'Reserved Parking' },
    { id: 23, name: 'Security' },
    { id: 24, name: 'Service/Goods Lift' },
    { id: 25, name: 'Swimming Pool' },
    { id: 26, name: 'Vaastu Complaint' },
    { id: 27, name: 'Visitor Parking' },
    { id: 28, name: 'Waste Disposal' },
    { id: 29, name: 'Water Storage' }
  ];

  isValidCarpet: boolean = true;

  isValidSuper: boolean = true;

  isValidFloor: boolean = true;

  floordata: any[] = Array(100).fill(-1, 0, 100).map((x, i) => i);

  totalfloors: any[] = Array(100).fill(-1, 0, 100).map((x, i) => i);

  bedroomdata: any[] = Array(11).fill(-1, 0, 11).map((x, i) => i);

  balconiesdata: any[] = Array(11).fill(-1, 0, 11).map((x, i) => i);

  bathroomsdata: any[] = Array(11).fill(-1, 0, 11).map((x, i) => i);

  pricedata: any[] = Array(100).fill(-1, 0, 100).map((x, i) => i);

  constructiondata: any[] = Array(100).fill(-1, 0, 100).map((x, i) => i);

  washroomdata: any[] = Array(100).fill(-1, 0, 100).map((x, i) => i);

  liftdata: any[] = Array(100).fill(-1, 0, 100).map((x, i) => i);
  yeardata: any[] = Array(100).fill(-1, 0, 100).map((x, i) => i);

  image;
  private toasterService: ToasterService;

  onMultiSelectChangeSubmit(selectedObject: any, optionObject: any, flag) {

    for (let jCount = 0; jCount < optionObject.length; jCount++) {
      if (flag == 1) {
        this.FormDataComponent.flooring[optionObject[jCount].name] = false;
      } else {
        this.FormDataComponent.amenities[optionObject[jCount].name] = false;
      }
    }

    if (selectedObject != undefined) {
      for (let iCount = 0; iCount < selectedObject.length; iCount++) {
        for (let jCount = 0; jCount < optionObject.length; jCount++) {
          if (selectedObject[iCount] == optionObject[jCount].id) {
            if (flag == 1) {
              this.FormDataComponent.flooring[optionObject[jCount].name] = true;
            } else {
              this.FormDataComponent.amenities[optionObject[jCount].name] = true;
            }
          }
        }
      }
    }

  }

  // submit method on submit form
  submit(f) {
    console.log(this.FormDataComponent);
    if (this.generate_otp_btn) {
      let formFlag = this.generateOTPValidation();
      if (formFlag) {
        let url = "/api/v1/generateotp";
        this.postData(this.FormDataComponent.user_details, url)
          .subscribe(response => {
            //debugger
            this.popToast('success', 'OTP send to your mobile number');
            this.generate_otp_btn = false;
            this.otp_show = true;
            this.submitted = false;
          },
            error => {
              this.popToast('error', 'Error while generating OTP, Try again');
            });
      }
      return;
    } else if (this.validate_otp_btn) {
      let formFlag = this.OTPValidation();
      if (formFlag) {
        let url = "/api/v1/validateotp";
        let data = {
          "otp": this.FormDataComponent.user_details.otp,
          "mobile": this.FormDataComponent.user_details.user.mobile
        };

        this.postData(data, url)
          .subscribe(response => {
            //debugger
            let responseData = response.json();
            if (responseData.status == 400) {
              this.popToast('error', 'Please enter valid OTP');
              return;
            } else {
              this.popToast('success', 'OTP Submitted Successfully');
              this.validate_otp_btn = false;
              this.otp_show = false;
              this.valid_otp = false;
              this.otp_success = true;
              this.submitted = false;
              if (responseData.user_id) {
                this.FormDataComponent.property_details.user_id = responseData.user_id
              }
            }
          },
            error => {
              this.popToast('error', 'Please re-enter OTP');
            });
      }
      return;
    } else {
      let formFlag = this.basic_form_click(f);
      if (this.otp_success) {
        if ((formFlag == false) || (this.additional_form <= 1)) {
          if ((this.additional_form == 1) && (this.additional_form_count < 1)) {
            this.additional_form_count++;
            this.submitted = false;
            window.scroll(0, 0);
            let tempImg = '';
            if ((this.image != undefined) && (this.image).indexOf('data:image/jpeg;base64') >= 0) {
              tempImg = (this.image).split("data:image/jpeg;base64,");
            } else
              if ((this.image != undefined) && (this.image).indexOf('data:image/png;base64') >= 0) {
                tempImg = (this.image).split("data:image/png;base64,");
              }
            if (tempImg.length > 0) {
              this.FormDataComponent.images_data.photo = tempImg[1];
            } else {
              this.FormDataComponent.images_data.photo = this.image;
            }

            this.FormDataComponent.images_data.image_label = "mainImage";
            this.FormDataComponent.images = [this.FormDataComponent.images_data];
            console.log(this.FormDataComponent.images);
          }
          return;
        }
      } else {
        this.popToast('error', 'Please validate mobile number.');
        return;
      }

    }
    this.FormDataComponent.transaction_type.available_from =
      this.FormDataComponent.transaction_type.available_from_month +
      " " +
      this.FormDataComponent.transaction_type.available_from_year;

    this.onMultiSelectChangeSubmit(this.flooringOptionSelected, this.flooringOptions, 1);
    this.onMultiSelectChangeSubmit(this.amenitiesOptionSelected, this.amenitiesOptions, 2);

    console.log(this.FormDataComponent.flooring);
    console.log(this.FormDataComponent.amenities);

    /*console.log("hjvghj"+f.value);*/
    let url = "/api/v1/postproperty";
    //this.postData(data,url);
    // this the new porperty object need to post in database...
    let mydata = {
      type_of_user: f.value.rdoUserInfo,
      property_for: f.value.propfor,
      property_type: f.value.propertyInfo,
      city: f.value.quickCity,
      locality: f.value.locality,
      society_name: f.value.project_society_names,
      address: f.value.txtaddress,
      floors_allowed: "",
      total_floors: f.value.nofloor,
      floor_no: f.value.floorno,
      furnished_status: f.value.isfurnished,
      bathrooms: f.value.nobathrooms,
      plot_area: "",
      super_builtup_area: f.value.superbuildup + " " + f.value.superbuildup_lenght,
      builtup_area: f.value.buildup + " " + f.value.buildup_lenght,
      carpet_area: f.value.carpet + " " + f.value.carpet_length,
      possession_status: f.value.possession_status,
      floor_plc: "",
      facing_plc: "",
      basic_price: "",
      open_car_parking: f.value.open_car_parking + " " + f.value.open_car_parking_unit,
      covered_car_parking: f.value.covered_car_parking + " " + f.value.covered_car_parking_unit,
      is_club_membership: "",
      is_power_backup: "",
      is_electricity: "",
      is_water: "",
      ifs: "",
      eecffc: "",
      other_charges: f.value.other_charges + " " + f.value.stamp,
      no_of_open_sides: "",
      width_of_road_facing_side: "",
      is_any_construction_done: "",
      is_boundary_wall_made: "",
      is_in_gated_colony: "",
      area: f.value.txtarea,
      length: "",
      breadth: "",
      is_this_corner_plot: "",
      transaction_type: f.value.transaction_type,
      age_of_construction: f.value.ageofconstruction,
      total_price: f.value.total_price,
      price_per: "",
      imagedata: JSON.stringify(this.filedata),
      no_bedrooms: f.value.nobedrooms,
      no_balconies: f.value.nobalconies,
      booking_amt: f.value.tokenamt,
      maintenance_charge: f.value.maintenance + " " + f.value.maintenance_type,
      other_info: f.value.otherinfo,
      rera_id: f.value.rera_id,
      brokerage: f.value.brokerage,
      available_from: f.value.avilable_from_month + " " + f.value.avilable_from_year,
      covered_area: "",
      wash_rooms: "",
      ideal_for_bussiness: "",
      Is_personal_washroom: "",
      cafetaria: "",
      Is_currently_leased_out: "",
      Is_assured_returns: "",
      nearby_business: "",
      is_mainroad_facing: "",
      width_of_entrance: ""
    };
    let formData = [{
      "property_details": {
        "user_id": 3,
        "user_type": 2,
        "property_for": 2,
        "property_type_id": 1,
        "intersting_property_details": "Pool side facing, In the heart of the city",
        "landmarks_neighbourhood": "Airport just 2 KM awaay",
        "water_availability": true,
        "electricity_availability": true,
        "ownership_status": "Freehold"
      },
      "location": {
        "city": "Pune",
        "name_of_society": "Shivaji Enclave",
        "locality": "Shivajinagar",
        "full_address": "Plot Number 1102, A Block, Behind R-Sqaure",
        "land_zone_id": "Industrial"
      },
      "area": {
        "covered_area": "1200",
        "carpet_area": "1100",
        "measurement_id": "1",
        "plot_area": "1100",
        "plot_length": "120",
        "plot_breadth": "100",
        "is_corner_plot": true,
        "business_type": "Doctor Clinic, Pathology",
        "nearby_business": "Nursary, Hair Saloon",
        "width_of_entreance": "4000 meters"
      },
      "property_feature": {
        "floor_no": "10",
        "total_floor": "10",
        "furnished_status": "Furnished",
        "washroom": "2",
        "no_of_seats": "20",
        "meeting_rooms": "2",
        "open_hours": "Mon 9AM to 10PM, Tue 9AM to 10PM",
        "lock_in_period": "5",
        "pantry": "Dry",
        "bedrooms": "2",
        "balconies": "2",
        "bathrooms": "2",
        "willing_to_modify_interior": true,
        "corner_shop": true,
        "is_main_road_facing": true,
        "personl_washroom": true,
        "corner_showroom": true,
        "no_of_open_side": "2",
        "road_facing_plot_width": "30 ft",
        "boundary_wall_made": false,
        "floors_allowed_for_construction": "10",
        "any_construction_done": true
      },
      "price_details": {
        "total_cost": "20000000",
        "other_charges": "2000000",
        "electricty_water_excluded": false,
        "security_amount": "50000",
        "brokerage": "2%",
        "response_from_brokers": true,
        "daily_for_office": "5000",
        "price_per_square_feet": "4500",
        "stamp_and_registeration_excuded": true,
        "maintenance_charge": "5000 Monthly"
      },
      "transaction_type": {
        "available_from": "January 2019",
        "age_of_construction": "5 to 10 years",
        "currently_leased_out": false,
        "possession_status": "Under Construction",
        "transaction_type": "New Construction"
      },
      "additional_feature": {
        "puja_room": true,
        "study": true,
        "store": false,
        "servant_room": false,
        "facing": "north - east",
        "garden": true,
        "pool": false,
        "main_road": "30 ft",
        "covered_car_parking": "2",
        "open_car_parking": "2",
        "no_of_lifts": "2",
        "flats_on_floor": "2"
      },
      "approved_by": {
        "state": "Maharashtra",
        "authorities": "PCMC"
      },
      "flooring": {
        "ceramic_tiles": true,
        "Granite": false,
        "marble": false,
        "marbonite": false,
        "mosiac": false,
        "normal_tiles": false,
        "vitrified": false,
        "wooden": false
      },
      "amenities": {
        "air_condition": true,
        "banquet_hal": false,
        "bar_or_lounge": true,
        "cafeteria": false,
        "club_house": true,
        "confrence_room": false,
        "dth_television_facility": false,
        "gymnasium": true,
        "intercom_facility": true,
        "internet": false,
        "jogging_track": false,
        "laundry_service": false,
        "lift": true,
        "manintenance_staff": false,
        "outdoor_tennis_court": false,
        "park": false,
        "piped_gass": true,
        "power_back_up": true,
        "private_terrace_garden": true,
        "ro_system": true,
        "rain_water_harvesting": true,
        "reserved_parking": true,
        "security": true,
        "service_goods_lift": true,
        "swimming_pool": true,
        "vaastu_compliant": true,
        "visitor_parking": true,
        "waste_disposal": true,
        "water_storage": true
      },
      "images": [
        {
          "image_type": "balcoies",
          "photo": ""
        }
      ]
    }];

    this.postData(this.FormDataComponent, url)
      .subscribe(response => {
        setTimeout(()=>{   
          this.popToast('success', 'Thank you for posting the property. Your property would be reviewed by RisingProp support team and you will get a notification when the property is approved.');
     }, 1000);
        
        this.router.navigate([''])
      },
        error => {
          this.popToast('error', 'Property details not been submitted');
        });
  }

  Multistorey_apt_price;
  Multistorey_apt_price_crore;
  Multistorey_apt_price_lac;
  Multistorey_apt_price_thousand;
  onChange(crore) {

    this.FormDataComponent.price_details.total_cost = undefined;
    if (this.Multistorey_apt_price_crore != undefined && this.Multistorey_apt_price_crore != 0) {
      this.FormDataComponent.price_details.total_cost = this.Multistorey_apt_price_crore

    }
    if (this.Multistorey_apt_price_lac != undefined) {
      if (this.Multistorey_apt_price_lac > 9) {
        if (this.FormDataComponent.price_details.total_cost == undefined) {
          this.FormDataComponent.price_details.total_cost = this.Multistorey_apt_price_lac;
        }
        else {
          this.FormDataComponent.price_details.total_cost = this.FormDataComponent.price_details.total_cost + '' + this.Multistorey_apt_price_lac;
        }

      }
      else {
        if (this.FormDataComponent.price_details.total_cost == undefined) {
          this.FormDataComponent.price_details.total_cost = this.Multistorey_apt_price_lac;
        }
        else {
          this.FormDataComponent.price_details.total_cost = this.FormDataComponent.price_details.total_cost + '0' + this.Multistorey_apt_price_lac;
        }
      }

    }
    else {
      if (this.FormDataComponent.price_details.total_cost != undefined) {
        this.FormDataComponent.price_details.total_cost = this.FormDataComponent.price_details.total_cost + '00';
      }

    }
    if (this.Multistorey_apt_price_thousand != undefined) {

      if (this.Multistorey_apt_price_thousand > 9) {
        if (this.FormDataComponent.price_details.total_cost == undefined) {
          this.FormDataComponent.price_details.total_cost = this.Multistorey_apt_price_thousand + '000';
        }
        else {
          this.FormDataComponent.price_details.total_cost = this.FormDataComponent.price_details.total_cost + '' + this.Multistorey_apt_price_thousand + '000';
        }


      }
      else {
        if (this.FormDataComponent.price_details.total_cost == undefined) {
          this.Multistorey_apt_price = this.Multistorey_apt_price_thousand + '000';
        }
        else {
          this.FormDataComponent.price_details.total_cost = this.FormDataComponent.price_details.total_cost + '0' + this.Multistorey_apt_price_thousand + '000';
        }

      }

    }
    else {
      if (this.FormDataComponent.price_details.total_cost != undefined) {
        this.FormDataComponent.price_details.total_cost = this.FormDataComponent.price_details.total_cost + '00' + '000'
      }

    }
  }

  floor_no;
  total_floors;
  onChangeFloorNo(floor) {

    if (this.floor_no != undefined && this.total_floors != undefined) {
      var floor_no = this.floor_no;
      var total_floor = this.total_floors;
      if (floor_no > total_floor) {
        this.isValidFloor = false;
      }
      else {
        this.isValidFloor = true;
      }
    }

  }

  super_Build_up_Area;
  built_up_area;
  carpet_area;

  onAreaChange(area) {
    var super_area = this.super_Build_up_Area;
    var builtup_area = this.built_up_area;
    var carpet_area = this.carpet_area;
    if (this.super_Build_up_Area != undefined && this.built_up_area != undefined) {
      if (super_area < builtup_area) {
        this.isValid = false;

      }
      else {
        this.isValid = true;
      }
    }
    if (this.built_up_area != undefined && this.carpet_area != undefined) {
      if (builtup_area < carpet_area) {
        this.isValidCarpet = false;

      }
      else {
        this.isValidCarpet = true;
      }
    }
    if (this.super_Build_up_Area != undefined && this.carpet_area != undefined) {
      if (super_area < carpet_area) {
        this.isValidSuper = false;

      }
      else {
        this.isValidSuper = true;
      }
    }
  }

  onValueChange(event: any) { // without type info

    this.Multistorey_apt_price_crore = undefined;
    this.Multistorey_apt_price_lac = undefined;
    this.Multistorey_apt_price_thousand = undefined;

    var value = parseInt(this.FormDataComponent.price_details.total_cost);
    if (value > 9999999) {
      var crore = Math.floor(value / 10000000);
      this.Multistorey_apt_price_crore = (crore);

      var lac_twodigit = value % 10000000;
      var lac_twodigit_price = Math.floor(lac_twodigit / 100000);
      this.Multistorey_apt_price_lac = (lac_twodigit_price);

      var thousand = lac_twodigit % 100000;
      var thousand_price = Math.floor(thousand / 1000);
      this.Multistorey_apt_price_thousand = (thousand_price);
    }
    if (value <= 9999999 && value > 99999) {
      var twodigitlac = Math.floor(value / 100000);
      this.Multistorey_apt_price_lac = (twodigitlac);

      var thousand = value % 100000;
      var thousand_price = Math.floor(thousand / 1000);
      this.Multistorey_apt_price_thousand = (thousand_price);

    }

    if (value <= 99999 && value > 999) {
      var thousand = Math.floor(value / 1000);
      this.Multistorey_apt_price_thousand = (thousand);
    }


  }




  // i don't know what is this for
  onFileChange(event) {

    if (event.target.files && event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        let reader = new FileReader();
        const file = event.target.files[index];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.filedata.push({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          });
        };
      }
    }
  }

  // component constructor 
  constructor(private http: Http, private router: Router,
    private _risingPropService: RisingPropService,
    toasterService: ToasterService) {
    this.FormDataComponent = new FormDataComponent();
    this.FormDataComponent.property_details = new property_details();
    this.FormDataComponent.user_details = new user_details();
    this.FormDataComponent.user_details.user = new user();
    this.FormDataComponent.user_details.user.country_code = "91";
    this.FormDataComponent.location = new location();
    this.FormDataComponent.area = new area();
    this.FormDataComponent.property_feature = new property_feature();
    this.FormDataComponent.price_details = new price_details();
    this.FormDataComponent.transaction_type = new transaction_type();
    this.FormDataComponent.additional_feature = new additional_feature();
    this.FormDataComponent.approved_by = new approved_by();
    this.FormDataComponent.flooring = new flooring();
    this.FormDataComponent.amenities = new amenities();
    this.FormDataComponent.images_data = new images_data();
    this.toasterService = toasterService;
  }

  basic_form_hide: boolean;
  additional_form_hide: boolean;
  submitted: boolean;
  additional_form: number;
  additional_form_count: number;
  generate_otp_btn: boolean;
  validate_otp_btn: boolean;
  valid_otp: boolean;
  otp_show: boolean;
  otp_success: boolean;

  postData(data, url) {
    return this._risingPropService.post(data, url);
  }
  //on init method run on initialization 
  ngOnInit() {
    console.log('on call --->');
    this.basic_form_hide = false;
    this.additional_form_hide = true;
    this.additional_form = this.additional_form_count = 0;
    this.generate_otp_btn = false;
    this.validate_otp_btn = false;
    this.valid_otp = true;
    this.otp_show = false;
    this.otp_success = false;
    /*this.http.get('http://rpapi.dhoteghar.in/api/v1/property')
    .subscribe( response => {
      /*console.log(response);*
    });*/
  }


  onChangeProperty(val) {
    this.isValidCarpet = true;
    this.isValid = true;
    this.isValidSuper = true;
    this.Multistorey_apt_price_crore = undefined;
    this.Multistorey_apt_price_lac = undefined;
    this.Multistorey_apt_price_thousand = undefined;
    this.Multistorey_apt_price = undefined;
    this.isValidFloor = true
    this.floor_no = undefined;
    this.total_floors = undefined;
    this.submitted = false;
  }

  /*For redirect Basic form to additional form*/
  basic_form_click(fr) {
    console.log("in click" + this.FormDataComponent.property_details.user_type);
    this.submitted = true;
    if (fr.valid && this.isValid == true && this.isValidCarpet == true && this.isValidSuper == true && this.isValidFloor == true) {
      this.basic_form_hide = true;
      this.additional_form_hide = false;
      this.additional_form++;
      return true;
    } else {
      return false;
    }

  }

  /*Generate OTP validation*/
  generateOTPValidation(): boolean {
    //debugger
    this.submitted = true;
    if (this.mobileNumberCheck()) {
      // code...
    }
    let errorCount = 0;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (this.FormDataComponent.property_details.user_type == undefined) {
      errorCount++;
    }
    if ((this.FormDataComponent.user_details.user.name == undefined) ||
      (this.FormDataComponent.user_details.user.name.length < 0)) {
      errorCount++;
    } else {
      this.FormDataComponent.user_details.user.user_type = this.FormDataComponent.property_details.user_type;
    }
    if ((this.FormDataComponent.user_details.user.mobile == undefined) ||
      (this.FormDataComponent.user_details.user.mobile.length < 0)) {
      errorCount++;
    } else if ((this.FormDataComponent.user_details.user.mobile.length < 10) ||
      (this.FormDataComponent.user_details.user.mobile.length > 10)) {
      errorCount++;
    }
    if ((this.FormDataComponent.user_details.user.email == undefined) ||
      (this.FormDataComponent.user_details.user.email.length < 0)) {
      errorCount++;
    } else if (reg.test(this.FormDataComponent.user_details.user.email) == false) {
      errorCount++;
    }
    if (this.FormDataComponent.user_details.user.country_code == undefined) {
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
    if (this.FormDataComponent.user_details.user.mobile == undefined)
      return false;
    if ((this.FormDataComponent.user_details.user.mobile.length < 10) &&
      (this.FormDataComponent.user_details.user.mobile.length > 10))
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

  /*emailCheck() {
    if (this.FormDataComponent.user_details.user.email == undefined)
      return false;

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(this.FormDataComponent.user_details.user.email) == false) 
    {
        return false;
    }
    return true;

  }*/

  /*OTP validation*/
  OTPValidation(): boolean {
    this.submitted = true;
    let errorCount = 0;
    if ((this.FormDataComponent.user_details.otp == undefined) ||
      (this.FormDataComponent.user_details.otp.length < 0)) {
      errorCount++;
    }

    if ((this.FormDataComponent.user_details.user.mobile == undefined) ||
      (this.FormDataComponent.user_details.user.mobile.length < 0)) {
      errorCount++;
    } else if ((this.FormDataComponent.user_details.user.mobile.length < 10) &&
      (this.FormDataComponent.user_details.user.mobile.length > 10)) {
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

  popToast(messageType, message) {
    this.toasterService.pop(messageType, message);
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
}
