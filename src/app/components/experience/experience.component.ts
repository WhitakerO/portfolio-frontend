import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experience } from 'src/app/model/Experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { NotificadorService } from 'src/app/services/notificador.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  closeResult = '';
  addExperience = new Experience;
  experienceInfo: Experience[];

  constructor(private experienceService: ExperienceService, private notificador: NotificadorService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getExperience();
  }
  getExperience() {
    this.experienceService.getExperience().subscribe(response => {
      return this.experienceInfo = response;
    })
  }
  deleteExperience(id: number) {
    return this.experienceService.deleteExperience(id).subscribe(
      res => { 
        this.experienceInfo.filter(item => item.id == id);
        this.notificador.mostrarNotificacion("Experiencia borrada correctamente.", "Cerrar");
        this.ngOnInit();
      }
    );
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.experienceInfo, event.previousIndex, event.currentIndex);
    console.log(event.previousIndex)
    console.log(event.currentIndex)
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.ngOnInit();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.ngOnInit();
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
  save(e: Experience) {
    this.experienceInfo.push(e);
    this.experienceService.agregarExperience(e);
    this.notificador.mostrarNotificacion("Has creado una nueva experiencia.", "Cerrar");
    this.modalService.dismissAll();
    this.ngOnInit();
  }
  edit(e: Experience) {
    this.modalService.dismissAll()
    this.experienceService.agregarExperience(e);
    this.notificador.mostrarNotificacion("Has editado con éxito esta experiencia.", "Cerrar");
    this.experienceInfo.forEach(item => {
      if(item.id == e.id) {
        item = e;
      }
      console.log("a")
    })
  }

}
