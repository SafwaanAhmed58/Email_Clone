import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router'
import { MAT_DRAWER_CONTAINER, MatDrawer } from '@angular/material/sidenav/drawer';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  color: string = ""
  @Input() public parentData;

  general = [{ 'name': 'Inbox', 'class': 'navigationChannel', 'link': '/inbox', 'img':'./assets/inbox.png' }, { 'name': 'Sent mail', 'class': 'navigationChannel', 'link': '/sentMail', 'img': './assets/sentMail.png' }, { 'name': 'Important', 'class': 'navigationChannel', 'link': '/important' }, { 'name': 'Starred', 'class': 'navigationChannel', 'link': '/starred' }, { 'name': 'Drafts', 'class': 'navigationChannel', 'link': '/drafts' }];


  opened = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit():void {
    console.log("Parent Data:", JSON.stringify(this.parentData))
    
  }
}
