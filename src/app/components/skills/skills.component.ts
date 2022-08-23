import { Component, OnInit } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/model/Skill';
import { SkillService } from 'src/app/services/skill.service';
import { NotifierService } from 'src/app/services/notifier.service';


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

  constructor(private skillService: SkillService, private notifier: NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSkill();
  }
  getSkill() {
    this.skillService.getSkill().subscribe(response => {
      this.skillsInfo = response;
      this.skillsInfo.forEach((skill) => {
          this.languageInfoArray = this.skillsInfo.filter((skill) => skill.islanguage);
          this.skillsInfoArray = this.skillsInfo.filter((skill) => !skill.islanguage)
      })
    })
  }

  deleteSkill(id: number) {
    return this.skillService.deleteSkill(id).subscribe(
      res => { this.ngOnInit(), this.notifier.showNotification("Habilidad borrada correctamente.", "Cerrar") }
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
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any) {
    if(reason != undefined) return this.ngOnInit();
}

  isLanguage(event:any) {
    if (event.target.checked) {
      this.addSkill.islanguage = true;
    }
    else {
      this.addSkill.islanguage = false;
    }
  }

  save(skillObject: Skill) {
    if(skillObject.islanguage)
    {
      this.languageInfoArray.push(skillObject);
      this.notifier.showNotification("Has agregado un nuevo lenguaje.", "Cerrar");
    } else {
      this.skillsInfoArray.push(skillObject);
      this.notifier.showNotification("Has agregado una nueva habilidad.", "Cerrar");
    }
    this.skillService.addSkill(skillObject);
    this.modalService.dismissAll();
  }
  edit(skillObject: Skill) {
    this.modalService.dismissAll();
    this.notifier.showNotification("Has editado con éxito esta habilidad.", "Cerrar");
    this.skillService.saveSkill(skillObject);
  }

}
