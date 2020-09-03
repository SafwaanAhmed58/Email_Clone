import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmailService } from './../email-service.service';

@Component({
  selector: 'app-view-mail',
  templateUrl: './view-mail.component.html',
  styleUrls: ['./view-mail.component.css']
})
@Injectable()
export class ViewMailComponent implements OnInit {
  public _id: any;
  public errData;
  constructor(private location: Location, private activatedRoute: ActivatedRoute, private _emailService: EmailService) { }

  public mailBody: any;
  ngOnInit(): void {
    // console.log("Mail body in view mail component",this.location.getState());
    // this.mailBody=this.location.getState()

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'))
      this._id = id;
      this._emailService.viewInboxMail(this._id)
        .subscribe(data => {
          console.log("View inbo mail data:", JSON.stringify(data))
          data.mailBody = data.mailBody.replace(/\n/ig, '');
          this.mailBody = data
          this.errData = ""
          if(document.getElementById('Sent mail')) {
            console.log("inside IF ****************")
            document.getElementById('Sent mail').classList.add('is-active')
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
