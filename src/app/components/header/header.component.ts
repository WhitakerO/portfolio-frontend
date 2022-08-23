import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogin = "";
  userPassword = "";
  closeResult = "";
  user = new User();

  constructor(private notifier:NotifierService, private modalService:NgbModal, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > 230) {
      element.classList.add('nav-solid');
    } else {
      element.classList.remove('nav-solid');
    }
  }

  doLogin() {
    console.info("user", this.user);
    this.loginService.doLogin(this.user).subscribe(data => {
      this.user.isLogged = true;
      this.notifier.showNotification("Logueaste correctamente en tu cuenta", "Cerrar");
    }, error => this.notifier.showNotification("User o password incorrectos", "Cerrar")
    );
  }

  open(content: any) {
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
}
