import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/model/Project';
import { ProjectService } from 'src/app/services/project.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  closeResult = '';
  addProject = new Project;
  projectInfo: Project[];
  isLogged = this.tokenService.getToken();

  constructor(private tokenService: TokenService, private projectService: ProjectService, private notifier: NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProject();
  }
  getProject() {
    this.projectService.getProject().subscribe(response => {
      return this.projectInfo = response;
    })
  }
  deleteProject(id: number) {
    if (!id) return this.notifier.showNotification("Lo siento, para realizar esta acción debes recargar la página.", "Cerrar");
    return this.projectService.deleteProject(id).subscribe(
      res => { this.ngOnInit(), this.notifier.showNotification("Proyecto borrado correctamente.", "Cerrar") }
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
    if (!this.addProject.id) return this.notifier.showNotification("Lo siento, para realizar esta acción debes recargar la página.", "Cerrar");
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any) {
    console.log(reason)
    if (reason != undefined) return this.ngOnInit();
  }

  save(projectObject: Project) {
    this.projectInfo.push(projectObject);
    this.projectService.addProject(projectObject);
    this.notifier.showNotification("Has creado un nuevo proyecto.", "Cerrar");
    this.modalService.dismissAll();
  }
  edit(projectObject: Project) {
    this.modalService.dismissAll();
    this.notifier.showNotification("Has editado con éxito este proyecto.", "Cerrar");
    this.projectService.saveProject(projectObject);
  }
}
