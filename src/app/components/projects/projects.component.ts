import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/model/Project';
import { ProjectService } from 'src/app/services/project.service';
import { NotificadorService } from 'src/app/services/notificador.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  closeResult = '';
  addProject = new Project;
  projectInfo: Project[];

  constructor(private projectService: ProjectService, private notificador: NotificadorService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProject();
  }
  getProject() {
    this.projectService.getProject().subscribe(response => {
      return this.projectInfo = response;
    })
  }
  deleteProject(id: number) {
    return this.projectService.deleteProject(id).subscribe(
      res => { this.ngOnInit(), this.notificador.showNotification("Proyecto borrado correctamente.", "Cerrar") }
    );
  }
  

  open(content: any) {
    this.addProject = new Project;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editBtn(content: any, proy: Project) {
    this.addProject = proy;
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
  save(e: Project) {
    this.projectService.addProject(e);
    this.notificador.showNotification("Has creado un nuevo proyecto.", "Cerrar");
    this.modalService.dismissAll();
    return this.ngOnInit();
  }
  edit(e: Project) {
    this.modalService.dismissAll()
    this.projectService.addProject(e);
    this.notificador.showNotification("Has editado con éxito este proyecto.", "Cerrar");
    return this.ngOnInit();
  }

}
