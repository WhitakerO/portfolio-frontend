import { Component } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { AboutusService } from 'src/app/Service/aboutus.service';
import { Aboutus } from 'src/app/model/Aboutus';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  aboutInfo: Aboutus;

  constructor(private config: NgbCarouselConfig, private aboutusService: AboutusService) { 

    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }
  
  ngOnInit(): void {
    this.getAboutus();
  }
  getAboutus() {
    this.aboutusService.getAboutus().subscribe ( response =>{
      return this.aboutInfo=response;
    })
  }

}
