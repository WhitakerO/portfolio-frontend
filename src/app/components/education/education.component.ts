import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Education } from 'src/app/model/Education';
import { EducationService } from 'src/app/Service/education.service';
import { NotificadorService } from 'src/app/Service/notificador.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  closeResult = '';
  addEducation = new Education;
  educationInfo: Education[];

  constructor(private educationService: EducationService, private notificador: NotificadorService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEducation();
  }

  getEducation() {
    this.educationService.getEducation().subscribe(response => {
      return this.educationInfo = response;
    })
  }

  deleteEducation(id: number) {
    return this.educationService.deleteEducation(id).subscribe(
      res => { this.ngOnInit(), this.notificador.mostrarNotificacion("Tarjeta de educación borrada correctamente.", "Cerrar") }
    );
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.educationInfo, event.previousIndex, event.currentIndex);
    console.log(event.previousIndex)
    console.log(event.currentIndex)
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
  save(e: Education) {
    this.modalService.dismissAll();
    this.educationService.addEducation(e);
    this.notificador.mostrarNotificacion("Has creado una nueva tarjeta de educación.", "Cerrar");
    return this.ngOnInit();
  }

  edit(e: Education) {
    this.modalService.dismissAll();
    this.educationService.addEducation(e);
    this.notificador.mostrarNotificacion("Has editado con éxito esta tarjeta de educación.", "Cerrar");
  }

}
