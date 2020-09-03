import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'help-tab';
  // public userData: any;
  // user(data: any) {
  //   console.log("##############", JSON.stringify(data));
  //   this.userData= data;
  //   console.log("##############", JSON.stringify(this.userData));
  // }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    ); 

    constructor(private breakpointObserver: BreakpointObserver) {}
}
