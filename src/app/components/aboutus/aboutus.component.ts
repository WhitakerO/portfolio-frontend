import { Component, OnInit } from '@angular/core';
import { AboutusService } from 'src/app/services/aboutus.service';
import { Aboutus } from 'src/app/model/Aboutus';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'src/app/services/notifier.service';




@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  aboutInfo: Aboutus;
  closeResult = "";

  constructor(private notifier:NotifierService, private modalService: NgbModal, private aboutusService: AboutusService) { }
  
  ngOnInit(): void {
    this.getAboutus();
  }
  getAboutus() {
    this.aboutusService.getAboutus().subscribe ( response =>{
      return this.aboutInfo=response;
    })
  }
  save(a: Aboutus) {
    this.modalService.dismissAll();
    this.aboutusService.saveAboutus(a);
    this.notifier.showNotification("Has guardado tu información personal.", "Cerrar");
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any) {
    if(reason != undefined) return this.ngOnInit();
}
}
