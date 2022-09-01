import { Component, OnInit } from '@angular/core';
import { AboutusService } from 'src/app/services/aboutus.service';
import { Aboutus } from 'src/app/model/Aboutus';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  socialInfo: Aboutus;

  constructor(private aboutusService: AboutusService) { }

  ngOnInit(): void {
    this.getAboutus();
  }

  getAboutus() {
    this.aboutusService.getAboutus().subscribe(response => {
      return this.socialInfo = response;
    })
  }

}
