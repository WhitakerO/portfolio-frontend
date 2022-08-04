import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyectos } from 'src/app/model/Proyectos';
import { ProyectosService } from 'src/app/Service/proyectos.service';
import { NotificadorService } from 'src/app/Service/notificador.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  closeResult = '';
  addProyecto = new Proyectos;
  proyectosInfo: Proyectos[];

  constructor(private proyectosService: ProyectosService, private notificador: NotificadorService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProyectos();
  }
  getProyectos() {
    this.proyectosService.getProyectos().subscribe(response => {
      return this.proyectosInfo = response;
    })
  }
  borrarProyecto(id: number) {
    return this.proyectosService.deleteProyectos(id).subscribe(
      res => { this.ngOnInit(), this.notificador.mostrarNotificacion("Proyecto borrado correctamente.", "Cerrar") }
    );
  }
  

  open(content: any) {
    this.addProyecto = new Proyectos;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editBtn(content: any, proy: Proyectos) {
    this.addProyecto = proy;
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
  guardar(e: Proyectos) {
    this.proyectosService.agregarProyectos(e);
    this.notificador.mostrarNotificacion("Has creado un nuevo proyecto.", "Cerrar");
    this.modalService.dismissAll();
    return this.ngOnInit();
  }
  editar(e: Proyectos) {
    this.modalService.dismissAll()
    this.proyectosService.agregarProyectos(e);
    this.notificador.mostrarNotificacion("Has editado con éxito este proyecto.", "Cerrar");
    return this.ngOnInit();
  }

}
