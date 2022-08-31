import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experience } from 'src/app/model/Experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  closeResult = '';
  addExperience = new Experience;
  experienceInfo: Experience[];
  isLogged = this.tokenService.getToken();

  constructor(private tokenService:TokenService, private experienceService: ExperienceService, private notifier: NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getExperience();
  }
  getExperience() {
    this.experienceService.getExperience().subscribe(response => {
      return this.experienceInfo = response;
    })
  }
  deleteExperience(id: number) {
    if(!id) return this.notifier.showNotification("Lo siento, para realizar esta acción debes recargar la página.", "Cerrar");
    return this.experienceService.deleteExperience(id).subscribe(
      res => { 
        this.experienceInfo.filter(item => item.id == id);
        this.notifier.showNotification("Experiencia borrada correctamente.", "Cerrar");
        this.ngOnInit();
      }
    );
  }
  
  open(content: any) {
    this.addExperience = new Experience;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editBtn(content: any, exp: Experience) {
    this.addExperience = exp;
    if(!this.addExperience.id) return this.notifier.showNotification("Lo siento, para realizar esta acción debes recargar la página.", "Cerrar");
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any) {
      if(reason != undefined) return this.ngOnInit();
  }
  save(expObject: Experience) {
    this.experienceInfo.push(expObject);
    this.experienceService.addExperience(expObject);
    this.notifier.showNotification("Has creado una nueva experiencia.", "Cerrar");
    this.modalService.dismissAll();
  }
  edit(expObject: Experience) {
    this.modalService.dismissAll();
    this.notifier.showNotification("Has editado con éxito esta experiencia.", "Cerrar");
    this.experienceService.saveExperience(expObject);
  }

}
