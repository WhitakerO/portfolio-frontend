import { Component, OnInit } from '@angular/core';
import { AboutusService } from 'src/app/Service/aboutus.service';
import { Aboutus } from 'src/app/model/Aboutus';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificadorService } from 'src/app/Service/notificador.service';
import { FooterComponent } from '../footer/footer.component';




@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  aboutInfo: Aboutus;
  closeResult = "";

  constructor(private notifier:NotificadorService, private modalService: NgbModal, private aboutusService: AboutusService) { }
  
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
    this.notifier.mostrarNotificacion("Has guardado tu información personal.", "Cerrar");
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
