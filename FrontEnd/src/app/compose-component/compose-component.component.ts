import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { EmailService } from './../email-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-compose-component',
  templateUrl: './compose-component.component.html',
  styleUrls: ['./compose-component.component.css']
})
export class ComposeComponent implements OnInit {
  //public User:any;
  form: FormGroup;
  submitted = false;
  public temp: any;
  public userInfo: any;
  public finalObject: any = {
    to: String, subject: String, mailBody: String,
    from: String, fromName: String, fromId: String
  };
  constructor(private formBuilder: FormBuilder, private location: Location, private _emailService: EmailService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.location.getState());
    this.temp = this.location.getState()
    let userDetails;
    let userEmail = document.getElementById("dropdownMenuButton").innerText;
    this._emailService.getUserDetailsByEmail(userEmail)
      .subscribe((data) => {
        console.log("User details based on email:", JSON.stringify(data));
        userDetails = data;
        this.userInfo = this.temp.userName ? this.temp : userDetails;
        if(document.getElementById('Sent mail')) {
          console.log("inside IF ****************")
          document.getElementById('Sent mail').classList.remove('is-active')
        }
        if(document.getElementById('Inbox')) {
          document.getElementById('Inbox').classList.remove('is-active')
        }
      }, (err) => {
        console.log(err);
      })

    console.log("******UserInfo*********", this.userInfo, document.getElementById("dropdownMenuButton").innerText);
    this.form = this.formBuilder.group({
      to: ['', Validators.required],
      subject: ['', [Validators.required]],
      body: ['', Validators.required]
    });
    console.log(this.form)
  }

  public submit() {
    console.log("method hit")
    this.submitted = true;

    if (this.form.invalid) {
      console.log("Invalid")
      return;
    }

    // display form values on success
    this.finalObject.to = this.form.value.to
    this.finalObject.subject = this.form.value.subject;
    this.finalObject.mailBody = this.form.value.body;
    this.finalObject.from = this.userInfo.userEmail;
    this.finalObject.fromName = this.userInfo.userName;
    this.finalObject.fromId = this.userInfo.userId;
    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.finalObject, null, 4));

    this._emailService.composeMail(this.finalObject)
      .subscribe(data => {
        console.log("Data return from post call", data)
        data.sentMaiId ? this.router.navigate(['/viewSentMail', data.sentMaiId]) : this.router.navigate(['/inbox', this.userInfo.userId])

      }, err => {
        console.log(err)
        this.form.reset();
      })


  }

}
