import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {SearchDatacomponent } from './data-model/searchData.component';

@Injectable()
export class RisingPropService {
  baseURL: string;
  searchDataObject: SearchDatacomponent;

  constructor(private http: Http) {
    this.baseURL = "http://rpapi.dhoteghar.in";
    this.searchDataObject = new SearchDatacomponent();
  }

  get(data): Observable<Response> {
      let url =  this.baseURL + "" + data;
      return this.http.get(url);
  }

  post(data,apiUrl): Observable<Response> {
    //debugger;
    let url = this.baseURL + '' + apiUrl;
    let headers = new Headers().set('Content-Type', 'application/json; charset=utf-8');
    console.log("headers"+headers);
    const options = new RequestOptions({
      body: headers,
    });
    return this.http.post(url, data, options);
  }

  put(data, apiUrl): Observable<Response> {
    //debugger;
    let url = this.baseURL + '' + apiUrl;
    let headers = new Headers()
    console.log(headers);
    headers.append('Content-Type', 'application/json; charset=utf-8');

    console.log("headers"+headers);
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.put(url, data, options);
  }

  setSearchObject(searchObject){
     this.searchDataObject.property_type = searchObject.property_type;
     this.searchDataObject.property_for = searchObject.property_for;
     this.searchDataObject.bedroom = searchObject.bedroom;    
     this.searchDataObject.locality = searchObject.locality;
     this.searchDataObject.city = searchObject.city;
     this.searchDataObject.total_cost = searchObject.total_cost;
     this.searchDataObject.area = searchObject.area;
    this.searchDataObject.area_unit = searchObject.area_unit;

    
  }

  getSearchObject(): SearchDatacomponent {
    return  this.searchDataObject;
  }
}
