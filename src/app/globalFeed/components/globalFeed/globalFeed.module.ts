import { FeedModule } from '../../../shared/modules/feed/feed.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/globalFeed.component';

const routes = [

  {
    path: '',
    component: GlobalFeedComponent,
  },

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FeedModule],
  declarations: [GlobalFeedComponent]
})
export class GlobalFeedModule {}
