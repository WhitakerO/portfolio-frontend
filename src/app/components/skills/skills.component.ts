import { Component, OnInit } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/Classes/Skill';
import { SkillService } from 'src/app/Service/skill.service';
import { NotificadorService } from 'src/app/Service/notificador.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  closeResult = '';
  addSkill = new Skill;
  skillsInfo: Skill[];
  skillsInfoArray: Skill[] = [];
  languageInfoArray: Skill[] = [];

  constructor(private skillService: SkillService, private notificador: NotificadorService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSkill();
  }

  getSkill() {
    this.skillService.getSkill().subscribe(response => {
      this.skillsInfo = response;
      for (let skill of this.skillsInfo) {
        if(skill.islanguage) {
          this.languageInfoArray.push(skill);
        } else {
          this.skillsInfoArray.push(skill);
        }
      }
    })
  }

  deleteSkill(id: number) {
    return this.skillService.deleteSkill(id).subscribe(
      res => { this.ngOnInit(), this.notificador.mostrarNotificacion("Habilidad borrada correctamente.", "Cerrar") }
    );
  }

  open(content: any) {
    this.addSkill = new Skill;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editBtn(content: any, habil: Skill) {
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

  save(e: Skill) {
    this.skillService.addSkill(e);
    this.notificador.mostrarNotificacion("Has creado una nueva habilidad.", "Cerrar");
    this.modalService.dismissAll();
    return this.ngOnInit();
  }

  isLanguage(event:any) {
    if (event.target.checked) {
      this.addSkill.islanguage = true;
    }
    else {
      this.addSkill.islanguage = false;
    }
  }

  edit(e: Skill) {
    this.modalService.dismissAll()
    this.skillService.addSkill(e);
    this.notificador.mostrarNotificacion("Has editado con éxito esta habilidad.", "Cerrar");
    return this.ngOnInit();
  }

}
