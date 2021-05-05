import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { YouTubePlayerModule} from '@angular/youtube-player';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CpMovCarouselComponent } from './components/cp-mov-carousel/cp-mov-carousel.component';
import { CwCarouselComponent } from './components/cw-carousel/cw-carousel.component';
import { PopMovCarouselComponent } from './components/pop-mov-carousel/pop-mov-carousel.component';
import { PopTvCarouselComponent } from './components/pop-tv-carousel/pop-tv-carousel.component'
import { TMovCarouselComponent } from './components/t-mov-carousel/t-mov-carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TTvCarouselComponent } from './components/t-tv-carousel/t-tv-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    CpMovCarouselComponent,
    CwCarouselComponent,
    PopMovCarouselComponent,
    NavbarComponent,
    PopTvCarouselComponent,
    TTvCarouselComponent,
    TMovCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    LayoutModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
