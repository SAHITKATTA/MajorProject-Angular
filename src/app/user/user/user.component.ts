import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Email } from "src/app/model/email";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  message: string;
  user: string;
  showInbox: boolean = true;
  showSent: boolean = false;
  showSpam: boolean = false;
  showCompose: boolean = false;
  showViewAll: boolean = false;
  showPredict: boolean = false;
  emails: Email[];
  emailForm = new FormGroup({
    receiver: new FormControl(""),
    subject: new FormControl(""),
    body: new FormControl(""),
  });
  predictForm = new FormGroup({
    message: new FormControl(""),
  });
  ngOnInit() {
    this.user = localStorage.getItem("user");
    this.message = "";
    this.userService.inbox(this.user).subscribe((data) => {
      this.emails = data;
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate([""]);
  }
  viewInbox() {
    this.message = "";
    this.showInbox = true;
    this.showSent = false;
    this.showSpam = false;
    this.showCompose = false;
    this.showViewAll = false;
    this.showPredict = false;
    this.userService.inbox(this.user).subscribe((data) => {
      this.emails = data;
    });
    this.predictForm.reset();
    this.emailForm.reset();
  }
  viewSent() {
    this.message = "";
    this.showInbox = false;
    this.showSent = true;
    this.showSpam = false;
    this.showCompose = false;
    this.showViewAll = false;
    this.showPredict = false;
    this.userService.sent(this.user).subscribe((data) => {
      this.emails = data;
    });
    this.predictForm.reset();
    this.emailForm.reset();
  }
  viewSpam() {
    this.message = "";
    this.showInbox = false;
    this.showSent = false;
    this.showSpam = true;
    this.showCompose = false;
    this.showViewAll = false;
    this.showPredict = false;
    this.userService.spam(this.user).subscribe((data) => {
      this.emails = data;
    });
    this.predictForm.reset();
    this.emailForm.reset();
  }
  viewCompose() {
    this.message = "";
    this.showInbox = false;
    this.showSent = false;
    this.showSpam = false;
    this.showCompose = true;
    this.showViewAll = false;
    this.showPredict = false;
    this.predictForm.reset();
    this.emailForm.reset();
  }
  viewAll() {
    this.message = "";
    this.showInbox = false;
    this.showSent = false;
    this.showSpam = false;
    this.showCompose = false;
    this.showViewAll = true;
    this.showPredict = false;
    this.userService.all(this.user).subscribe((data) => {
      this.emails = data;
    });
    this.predictForm.reset();
    this.emailForm.reset();
  }
  viewPredict() {
    this.message = "";
    this.showInbox = false;
    this.showSent = false;
    this.showSpam = false;
    this.showCompose = false;
    this.showViewAll = false;
    this.showPredict = true;
    this.predictForm.reset();
    this.emailForm.reset();
  }
  compose() {
    const newMail: Email = {
      sender: this.user,
      receiver: this.emailForm.controls.receiver.value,
      body: this.emailForm.controls.body.value,
      subject: this.emailForm.controls.subject.value,
    };
    this.userService.sendMail(newMail).subscribe((data) => {
      this.message = data["message"];
    });
    this.predictForm.reset();
    this.emailForm.reset();
  }
  predict() {
    const text: string = this.predictForm.controls.message.value;
    this.userService.predict(text).subscribe((data) => {
      this.message = data["message"];
    });
    this.emailForm.reset();
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
// RESET PREDICT FORM AND EMAIL FORM IN EVERY METHOD
