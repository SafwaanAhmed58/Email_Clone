import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EmailService } from './../email-service.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
@Injectable()
export class InboxComponent implements OnInit {
  public inboxData;
  searchText;
  public errData = "Inbox";
  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute, private _emailService: EmailService) { }
  public _id: any;
  ngOnInit(): void {
    // let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      // let id = parseInt(params.get('id'))
      if(!localStorage.getItem("userInfo")){
        this._id = 1;
      } else {
        let userInfo = localStorage.getItem("userInfo")
        console.log("Inside Inbox component", JSON.parse(userInfo))
        console.log("Inside Inbox component", JSON.parse(userInfo))
        this._id = JSON.parse(userInfo).userId;
      }
      console.log("Inside Activated route")
      // this.router.events.forEach(event => {
      //   console.log("events:", event)
      // })
      
      console.log("******user Id*********", this._id);
        this._emailService.getInboxList(this._id)
          .subscribe(data => {
            console.log("Inbox data from api:", JSON.stringify(data))
            this.errData = "Inbox"
            this.inboxData = data
            if(document.getElementById('Inbox')) {
              console.log("inside IF ****************")
              document.getElementById('Inbox').classList.add('is-active')
              if(document.getElementById('Sent mail')) {
                document.getElementById('Sent mail').classList.remove('is-active')
              }
            } else {
              console.log("inside Else ****************")
            }
          }, err => {
            console.log(err)
            this.errData = "The page you are looking for, does not exists."
          })

    })

    


    console.log("Inbox data is:", JSON.stringify(this.inboxData))
  }

}
