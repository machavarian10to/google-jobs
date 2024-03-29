import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { JobDescriptionComponent } from './pages/job-description/job-description.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { JobsListingComponent } from './components/jobs-listing/jobs-listing.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { NewlinePipe } from './newline.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobDescriptionComponent,
    PageNotFoundComponent,
    JobsListingComponent,
    JobCardComponent,
    NewlinePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
