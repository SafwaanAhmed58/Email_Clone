import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EmailService } from './../email-service.service';
import { Router } from '@angular/router'
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() public childEvent = new EventEmitter();
  public userData: any;
  public users:any;
  
  //users = [{'userId': 1, 'userName': 'Safwaan Ahmed', 'userEmail': 'safwaanA@xyz.com'}, {'userId': 2, 'userName':'John Doe', 'userEmail': 'JohnD@xyz.com'}]
  constructor(private _emailService: EmailService, private router: Router) { }
  
  ngOnInit(): void {
    this._emailService.getUsersList()
    .subscribe(data => {
      this.users = data
      this.userData=this.users[0];
      if(!localStorage.getItem('userInfo')){
        localStorage.setItem('userInfo', JSON.stringify(this.users[0]));
        this.userData = this.users[0]
      } else {
        console.log("unparsed storage data", localStorage.getItem('userInfo'))
        console.log("Parsed storage data", JSON.parse(localStorage.getItem('userInfo')))
        this.userData = JSON.parse(localStorage.getItem('userInfo'))
      }
    },err =>{
      console.log(err)
    })
    
  }

  fireEvent(user: any) {
    // console.log("*****************", JSON.stringify(user))
    // this.childEvent.emit(user);
    document.getElementById('dropdownMenuButton').innerText = user.userEmail;
    this.userData=user
    // console.log(this.userData)
    localStorage.setItem("userInfo", JSON.stringify(user));
    this.router.navigate(['/inbox', user.userId])
  }

}
