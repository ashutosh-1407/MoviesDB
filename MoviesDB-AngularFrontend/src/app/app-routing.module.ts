import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PopTvCarouselComponent } from './components/pop-tv-carousel/pop-tv-carousel.component';
import { TMovCarouselComponent } from './components/t-mov-carousel/t-mov-carousel.component';
import { TTvCarouselComponent } from './components/t-tv-carousel/t-tv-carousel.component';

const routes: Routes = [
  { path: '', component: PopTvCarouselComponent, pathMatch: 'full' },
  { path: 'watch', children: [
    { path: ':media_type/:id', component: TMovCarouselComponent },
    // { path: 'tv/:id', component: TMovCarouselComponent }
    ]
  },
  { path: 'mylist', component: TTvCarouselComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
