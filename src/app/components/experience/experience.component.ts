import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpLaboral } from 'src/app/Classes/ExpLaboral';
import { ExpLaboralService } from 'src/app/Service/explaboral.service';
import { NotificadorService } from 'src/app/Service/notificador.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  closeResult = '';
  addExp = new ExpLaboral;
  expLaboralInfo: ExpLaboral[];

  constructor(private expLaboralService: ExpLaboralService, private notificador: NotificadorService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getExpLaboral();
  }
  getExpLaboral() {
    this.expLaboralService.getExpLaboral().subscribe(response => {
      return this.expLaboralInfo = response;
    })
  }
  borrarExp(id: number) {
    return this.expLaboralService.deleteExpLaboral(id).subscribe(
      res => { this.ngOnInit(), this.notificador.mostrarNotificacion("Experiencia borrada correctamente.", "Cerrar") }
    );
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.expLaboralInfo, event.previousIndex, event.currentIndex);
    console.log(event.previousIndex)
    console.log(event.currentIndex)
  }

  open(content: any) {
    this.addExp = new ExpLaboral;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editBtn(content: any, exp: ExpLaboral) {
    this.addExp = exp;
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
  guardar(e: ExpLaboral) {
    this.expLaboralService.agregarExpLaboral(e);
    this.notificador.mostrarNotificacion("Has creado una nueva experiencia.", "Cerrar");
    this.modalService.dismissAll();
    return this.ngOnInit();
  }
  editar(e: ExpLaboral) {
    this.modalService.dismissAll()
    this.expLaboralService.agregarExpLaboral(e);
    this.notificador.mostrarNotificacion("Has editado con éxito esta experiencia.", "Cerrar");
    return this.ngOnInit();
  }

}
