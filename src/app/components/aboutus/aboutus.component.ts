import { Component, OnInit } from '@angular/core';
import { AboutusService } from 'src/app/services/aboutus.service';
import { Aboutus } from 'src/app/model/Aboutus';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  aboutInfo: Aboutus;
  closeResult = "";
  isLogged = this.tokenService.getToken();
  background = "#fff123";

  constructor(private tokenService:TokenService, private notifier:NotifierService, private modalService: NgbModal, private aboutusService: AboutusService) { }
  
  ngOnInit(): void {
    this.getAboutus();
    let savingAbout = sessionStorage.getItem("savingAboutus");
    let loggedOut = sessionStorage.getItem("loggedOut");
    if (savingAbout) {
        sessionStorage.removeItem("savingAboutus");
        this.notifier.showNotification("Has guardado tu información personal.", "Cerrar");
    }
    if(loggedOut)
    {
        sessionStorage.removeItem("loggedOut");
        this.notifier.showNotification("Has cerrado sesión satisfactoriamente.", "Cerrar");
    }
  }
 
  getAboutus() {
    this.aboutusService.getAboutus().subscribe ( response =>{
      if(!response.backgroundimage) {
        response.backgroundimage = "https://static.vecteezy.com/system/resources/previews/001/987/748/original/abstract-template-blue-geometric-diagonal-overlap-layer-on-dark-blue-background-free-vector.jpg";
      }
      return this.aboutInfo=response;
    })
  }
  save(a: Aboutus) {
    this.modalService.dismissAll();
    this.aboutusService.saveAboutus(a);
    window.location.reload();
    sessionStorage.setItem("savingAboutus", "true");
    
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
