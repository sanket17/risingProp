import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PropertyformComponent } from './propertyform/propertyform.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { GetjsonobjectPipe } from './getjsonobject.pipe';
import { RisingPropService } from './rising-prop.service';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchListPropertyComponent } from './search-list-property/search-list-property.component';
import { AdminComponent, approve_property } from './admin/admin.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


@NgModule({
  declarations: [
    AppComponent,
    PropertyformComponent,
    LoginComponent,
    HomepageComponent,
    PropertyDetailComponent,
    GetjsonobjectPipe,
    SearchListPropertyComponent,
    AdminComponent,
    approve_property
  ],
  imports: [
    MultiselectDropdownModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'postproperty', component: PropertyformComponent },
      { path: 'login', component: LoginComponent},
      { path: 'admin', component: AdminComponent },
      { path: 'propertydetail/:id', component: PropertyDetailComponent},
      { path: 'SearchListPropertyComponent', component: SearchListPropertyComponent },
      { path: '', component: HomepageComponent },
      { path: '**', component: LoginComponent }
    ]),
    ToasterModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [approve_property,
               RisingPropService,
              {provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
