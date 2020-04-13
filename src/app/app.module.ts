import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login/login.component";
import { ErrorPageComponent } from "./error/error-page/error-page.component";
import { HttpClientModule } from "@angular/common/http";
import { UserComponent } from "./user/user/user.component";
import { AdminComponent } from "./admin/admin/admin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminService } from "./services/admin.service";
import { LoginService } from "./services/login.service";
import { UserService } from "./services/user.service";
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorPageComponent,
    UserComponent,
    AdminComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AdminService, LoginService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
