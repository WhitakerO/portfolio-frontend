import { Component, OnInit } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Habilidades } from 'src/app/Classes/Habilidades';
import { HabilidadesService } from 'src/app/Service/habilidades.service';
import { NotificadorService } from 'src/app/Service/notificador.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  closeResult = '';
  addSkill = new Habilidades;
  skillsInfo: Habilidades[];
  skillsInfoArray: Habilidades[] = [];
  languageInfoArray: Habilidades[] = [];

  constructor(private habilidadesService: HabilidadesService, private notificador: NotificadorService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getHabilidades();
  }

  getHabilidades() {
    this.habilidadesService.getHabilidades().subscribe(response => {
      this.skillsInfo = response;
      for (let skill of this.skillsInfo) {
        if(skill.esidioma) {
          this.languageInfoArray.push(skill);
        } else {
          this.skillsInfoArray.push(skill);
        }
      }
    })
  }

  borrarHabilidad(id: number) {
    return this.habilidadesService.deleteHabilidades(id).subscribe(
      res => { this.ngOnInit(), this.notificador.mostrarNotificacion("Habilidad borrada correctamente.", "Cerrar") }
    );
  }

  open(content: any) {
    this.addSkill = new Habilidades;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editBtn(content: any, habil: Habilidades) {
    this.addSkill = habil;
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

  guardar(e: Habilidades) {
    this.habilidadesService.agregarHabilidades(e);
    this.notificador.mostrarNotificacion("Has creado una nueva habilidad.", "Cerrar");
    this.modalService.dismissAll();
    return this.ngOnInit();
  }

  esIdioma(event:any) {
    if (event.target.checked) {
      this.addSkill.esidioma = true;
    }
    else {
      this.addSkill.esidioma = false;
    }
  }

  editar(e: Habilidades) {
    this.modalService.dismissAll()
    this.habilidadesService.agregarHabilidades(e);
    this.notificador.mostrarNotificacion("Has editado con éxito esta habilidad.", "Cerrar");
    return this.ngOnInit();
  }

}
