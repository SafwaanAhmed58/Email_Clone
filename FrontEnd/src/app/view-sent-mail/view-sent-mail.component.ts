import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmailService } from './../email-service.service';
@Component({
  selector: 'app-view-sent-mail',
  templateUrl: './view-sent-mail.component.html',
  styleUrls: ['./view-sent-mail.component.css']
})
export class ViewSentMailComponent implements OnInit {

  constructor(private location:Location, private activatedRoute: ActivatedRoute, private _emailService: EmailService) { }
  public _id:any;
  public errData;
  public mailBody:any;
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'))
      this._id = id;
      this._emailService.viewSentMail(this._id)
        .subscribe(data => {
          console.log("View inbo mail data:", JSON.stringify(data))
          data.mailBody = data.mailBody.replace(/\n/ig, '');
          this.mailBody = data
          this.errData = ""
          if(document.getElementById('Sent mail')) {
            console.log("inside IF ****************")
            document.getElementById('Sent mail').classList.remove('is-active')
          }
          if(document.getElementById('Inbox')) {
            document.getElementById('Inbox').classList.remove('is-active')
          }
        },err =>{
          console.log(err)
          this.errData = "The page you are looking for, does not exists."
          if(document.getElementById('Sent mail')) {
            console.log("inside IF ****************")
            document.getElementById('Sent mail').classList.remove('is-active')
          }
          if(document.getElementById('Inbox')) {
            document.getElementById('Inbox').classList.remove('is-active')
          }
        })
    })

  }

}
