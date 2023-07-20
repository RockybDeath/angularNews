import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsAreaComponent } from './components/news-area/news-area.component';

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'news',
  },
  {
    path: 'news',
    component: NewsAreaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
