import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { User } from "src/app/model/user";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    if (this.loginService.isUserLoggedIn) {
      localStorage.setItem("user_type", "");
      this.loginService.isUserLoggedIn = false;
      this.router.navigate([""]);
    }
  }
  user_type: string;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.loginService
      .login({ email: this.f.username.value, password: this.f.password.value })
      .pipe(first())
      .subscribe(
        (data) => {
          this.user_type = data["user_type"];
          localStorage.setItem("user", this.f.username.value);
          localStorage.setItem("user_type", this.user_type);
          this.loginService.isUserLoggedIn = true;
          this.router.navigate([this.user_type]);
        },
        (error) => {
          this.error = "Login Failed";
          this.loading = false;
        }
      );
  }
}
