import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginUsuario } from 'src/app/model/UserLogin';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult = "";
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private notifier: NotifierService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
    var loggedName = sessionStorage.getItem("loggedName");
    if (loggedName) {
        sessionStorage.removeItem("loggedOrLoggouted");
        this.notifier.showNotification(`¡Bienvenido! Has iniciado sesión como ${loggedName}.`, "Cerrar");
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        window.location.reload();
        sessionStorage.setItem("loggedName", data.nombreUsuario);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.notifier.showNotification(`Usuario o contraseña incorrectos.`, "Cerrar");
      }
    );
  }
  onLogout() {
    this.tokenService.logOut();
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
