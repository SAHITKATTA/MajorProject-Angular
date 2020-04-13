import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login/login.component";
import { ErrorPageComponent } from "./error/error-page/error-page.component";
import { UserComponent } from "./user/user/user.component";
import { AdminComponent } from "./admin/admin/admin.component";
import { UserGuard } from "./guards/user.guard";
import { AdminGuard } from "./guards/admin.guard";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "user", component: UserComponent, canActivate: [UserGuard] },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
  //add path above ** only
  { path: "**", component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
