import { Component, OnInit, TemplateRef  } from '@angular/core';

import { TutorialService } from 'src/app/services/tutorial.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library';
  logginguser = null;
  user = {
    name: '',
    email: '',
    password: ''
  };
  modalRef: BsModalRef;

  loggedin = false;

  constructor(private tutorialService: TutorialService, private modalService: BsModalService) { }

  ngOnInit() {

  }

  signUp(){
      const data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      };
  
      this.tutorialService.createUser(data)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
        this.modalRef.hide();
        this.loggedin = true;
  
  }
  logIn(templatePass: TemplateRef<any>, templateEmail: TemplateRef<any>){

        this.tutorialService.getAllUsers()
        .subscribe(
          data => {
            this.logginguser = Object.assign([], data).find(x => x.email === this.user.email);
            if(this.logginguser != null){
              this.logginguser = Object.assign([], data).find(x => x.password === this.user.password);
              if(this.logginguser != null){
                this.loggedin = true;
                this.user.name = this.logginguser.name;
                this.modalRef.hide();
              }
              else{
                  this.modalRef.hide();
                  this.modalRef = this.modalService.show(templatePass);
              }
          }
          else{
            this.modalRef.hide();
            this.modalRef = this.modalService.show(templateEmail);
          }
            console.log(data);
          },
          error => {
            console.log(error);
          });
        
  }
  logOut(template: TemplateRef<any>){
    this.loggedin = false;
    this.modalRef = this.modalService.show(template);
    this.logginguser = null;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  retry(template: TemplateRef<any>){
    this.modalRef.hide();
    this.openModal(template);
  }
}
