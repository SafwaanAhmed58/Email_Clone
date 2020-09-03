import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ComposeComponent } from './compose-component/compose-component.component';
import { ViewMailComponent } from './view-mail/view-mail.component';
import { ViewSentMailComponent } from './view-sent-mail/view-sent-mail.component';
import { SentMailComponent } from './sent-mail/sent-mail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([

      { path: '', redirectTo: '/inbox/1', pathMatch: 'full' },
      // { path: 'inbox', component: InboxComponent },
      { path: 'inbox/:id', component: InboxComponent },
      { path: 'compose', component: ComposeComponent },
      { path: 'viewMail/:id', component: ViewMailComponent },
      { path: 'viewSentMail/:id', component: ViewSentMailComponent },
      // { path: 'sentMail', component: SentMailComponent },
      { path: 'sentMail/:id', component: SentMailComponent },
      { path: '**', component: PageNotFoundComponent}

    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [MainNavComponent]
