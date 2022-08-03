import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Educacion } from 'src/app/Classes/Educacion';
import { EducacionService } from 'src/app/Service/educacion.service';
import { NotificadorService } from 'src/app/Service/notificador.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  closeResult = '';
  addEducation = new Educacion;
  educacionInfo: Educacion[];

  constructor(private educacionService: EducacionService, private notificador: NotificadorService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEducacion();
  }

  getEducacion() {
    this.educacionService.getEducacion().subscribe(response => {
      return this.educacionInfo = response;
    })
  }
  borrarExp(id: number) {
    return this.educacionService.deleteEducacion(id).subscribe(
      res => { this.ngOnInit(), this.notificador.mostrarNotificacion("Tarjeta de educación borrada correctamente.", "Cerrar") }
    );
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.educacionInfo, event.previousIndex, event.currentIndex);
    console.log(event.previousIndex)
    console.log(event.currentIndex)
  }

  open(content: any) {
    this.addEducation = new Educacion;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editBtn(content: any, exp: Educacion) {
    this.addEducation = exp;
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
  guardar(e: Educacion) {
    this.modalService.dismissAll();
    this.educacionService.agregarEducacion(e);
    this.notificador.mostrarNotificacion("Has creado una nueva tarjeta de educación.", "Cerrar");
    return this.ngOnInit();
  }
  trackByMethod (index:number, el:any) {
    return el.titulo
  }
  editar(e: Educacion) {
    this.modalService.dismissAll();
    this.educacionService.agregarEducacion(e);
    this.notificador.mostrarNotificacion("Has editado con éxito esta tarjeta de educación.", "Cerrar");
    return this.ngOnInit();
  }

}
