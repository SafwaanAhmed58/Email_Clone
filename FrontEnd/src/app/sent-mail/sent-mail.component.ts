import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmailService } from './../email-service.service';
@Component({
  selector: 'app-sent-mail',
  templateUrl: './sent-mail.component.html',
  styleUrls: ['./sent-mail.component.css']
})
export class SentMailComponent implements OnInit {

  public errData = "Sent Mail";
  searchText;
  public sentMailData;
  public _id: any;
  constructor(private location: Location, private activatedRoute: ActivatedRoute, private _emailService: EmailService) { }

  public userInfo: any;
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      // let id = parseInt(params.get('id'))
      // this._id = id;
      if(!localStorage.getItem("userInfo")){
        this._id = 1;
      } else {
        let userInfo = localStorage.getItem("userInfo")
        console.log("Inside Inbox component", JSON.parse(userInfo))
        console.log("Inside Inbox component", JSON.parse(userInfo))
        this._id = JSON.parse(userInfo).userId;
      }
      this._emailService.getSentMailList(this._id)
        .subscribe((data) => {
          console.log("Sent mail data from email:", JSON.stringify(data))
          this.sentMailData = data;
          this.errData = "Sent Mail"
          if(document.getElementById('Sent mail')) {
            console.log("inside IF ****************")
            document.getElementById('Sent mail').classList.add('is-active')
            if(document.getElementById('Inbox')) {
              document.getElementById('Inbox').classList.remove('is-active')
            }
          } else {
            console.log("inside Else ****************")
          }
        },err =>{
          console.log(err)
          this.errData = "The page you are looking for, does not exists."
        })
      console.log("******UserInfo*********", this.userInfo);

      console.log("Inbox data is:", JSON.stringify(this.sentMailData))
    })

    //console.log(this.location.getState());


  }

}
