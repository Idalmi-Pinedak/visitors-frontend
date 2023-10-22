import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpServicesModule } from './http-services/http-services.module';
import { ViewsModule } from './views/views.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeViewsModule } from './back-office-views/back-office-views.module';
import { ViewsServicesModule } from './views-services/views-services.module';
import { AuthModule } from "./auth/auth.module";

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    HttpServicesModule,
    ViewsModule,
    BackOfficeViewsModule,
    ViewsServicesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
