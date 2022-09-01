import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Education } from 'src/app/model/Education';
import { EducationService } from 'src/app/services/education.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  closeResult = '';
  addEducation = new Education;
  educationInfo: Education[];
  isLogged = this.tokenService.getToken();


  constructor(private tokenService: TokenService, private educationService: EducationService, private notifier: NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEducation();

  }

  async getEducation() {
    this.educationService.getEducation().subscribe(response => {
      return this.educationInfo = response;
    })
  }

  deleteEducation(id: number) {
    if (!id) return this.notifier.showNotification("Lo siento, para realizar esta acción debes recargar la página.", "Cerrar");
    return this.educationService.deleteEducation(id).subscribe(
      res => { this.ngOnInit(), this.notifier.showNotification("Tarjeta de educación borrada correctamente.", "Cerrar") }
    );
  }

  open(content: any) {
    this.addEducation = new Education;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editBtn(content: any, exp: Education) {
    this.addEducation = exp;
    if (!this.addEducation.id) return this.notifier.showNotification("Lo siento, para realizar esta acción debes recargar la página.", "Cerrar");
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  private getDismissReason(reason: any) {
    if (reason != undefined) return this.ngOnInit();
  }

  save(educationObject: Education) {
    this.educationInfo.push(educationObject);
    this.educationService.addEducation(educationObject);
    this.notifier.showNotification("Has creado una nueva tarjeta de educación.", "Cerrar");
    this.modalService.dismissAll();
  }

  edit(educationObject: Education) {
    this.modalService.dismissAll();
    this.notifier.showNotification("Has editado con éxito esta tarjeta de educación.", "Cerrar");
    this.educationService.saveEducation(educationObject);
  }
}
