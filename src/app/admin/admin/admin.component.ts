import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { User } from "src/app/model/user";
import { Email } from "src/app/model/email";
import { AdminService } from "src/app/services/admin.service";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  message: string;
  showCreateUser: boolean = true;
  showReadUser: boolean = false;
  showReadAllUser: boolean = false;
  showUpdateUser: boolean = false;
  showDeleteUser: boolean = false;
  showAllEmail: boolean = false;
  userForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    user_type: new FormControl(""),
  });

  users: User[];
  emails: Email[];
  constructor(
    private router: Router,
    private adminService: AdminService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.adminService.viewAllEmails().subscribe((data) => {
      this.emails = data;
    });
  }
  viewCreateUser() {
    this.message = "";
    this.showCreateUser = true;
    this.showReadAllUser = false;
    this.showUpdateUser = false;
    this.showDeleteUser = false;
    this.showAllEmail = false;
    this.userForm.reset();
  }
  viewReadUser() {
    this.message = "";
    this.showCreateUser = false;
    this.showReadUser = true;
    this.showReadAllUser = false;
    this.showUpdateUser = false;
    this.showDeleteUser = false;
    this.showAllEmail = false;
    this.userForm.reset();
  }

  viewUpdateUser() {
    this.message = "";
    this.showCreateUser = false;
    this.showReadUser = false;
    this.showReadAllUser = false;
    this.showUpdateUser = true;
    this.showDeleteUser = false;
    this.showAllEmail = false;
    this.userForm.reset();
  }
  viewDeleteUser() {
    this.message = "";
    this.showCreateUser = false;
    this.showReadUser = false;
    this.showReadAllUser = false;
    this.showUpdateUser = false;
    this.showDeleteUser = true;
    this.showAllEmail = false;
    this.userForm.reset();
  }
  viewAllEmail() {
    this.message = "";
    this.showCreateUser = false;
    this.showReadUser = false;
    this.showReadAllUser = false;
    this.showUpdateUser = false;
    this.showDeleteUser = false;
    this.showAllEmail = true;
    this.adminService.viewAllEmails().subscribe((data) => {
      this.emails = data;
    });
    this.userForm.reset();
  }
  viewReadAllUser() {
    this.message = "";
    this.showCreateUser = false;
    this.showReadUser = false;
    this.showReadAllUser = true;
    this.showUpdateUser = false;
    this.showDeleteUser = false;
    this.showAllEmail = false;
    this.adminService.readAllUser().subscribe((data) => {
      this.users = data;
    });
    this.userForm.reset();
  }

  createUser() {
    const user: User = {
      email: this.userForm.controls.email.value,
      password: this.userForm.controls.password.value,
      user_type: this.userForm.controls.user_type.value,
    };
    this.adminService.createUser(user).subscribe((data) => {
      this.message = data["message"];
    });
    this.userForm.reset();
  }
  updateUser() {
    const user: User = {
      email: this.userForm.controls.email.value,
      password: this.userForm.controls.password.value,
    };
    this.adminService.updateUser(user).subscribe((data) => {
      this.message = data["message"];
    });
    this.userForm.reset();
  }
  deleteUser() {
    const email = this.userForm.controls.email.value;
    this.adminService.deleteUser(email).subscribe((data) => {
      this.message = data["message"];
    });
    this.userForm.reset();
  }

  logout() {
    localStorage.clear();
    this.userForm.reset();
    this.router.navigate([""]);
  }
  delete(eid) {
    this.userService.deleteMail(eid).subscribe((data) => {
      this.message = data["message"];
    });
    this.emails.forEach((element) => {
      if (element.eid == eid) {
        this.emails.pop();
      }
    });
  }
}
