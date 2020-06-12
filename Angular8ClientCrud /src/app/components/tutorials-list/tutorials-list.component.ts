import { Component, OnInit, TemplateRef } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

//import * as $ from 'jquery';
//declare var $:any;
@Component({
  
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
 
  tutorials: any;
  currentTutorial = null;
  auxTutorial = null;
  currentIndex = -1;
  title = '';

  message = '';

  modalRef: BsModalRef;

  constructor(private tutorialService: TutorialService, private modalService: BsModalService) { }

  ngOnInit() {
    this.retrieveTutorials();

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
}

  retrieveTutorials() {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial, index) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
    this.updateAux();
  }

  removeAllTutorials() {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        });
  }

  removeCurrentTutorial(index){
    this.tutorialService.delete(index)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle() {
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  //pt form

  updatePublished(status) {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe(
        response => {
          this.currentTutorial.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  updateTutorial() {
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Cartea a fost editata cu succes!';
        },
        error => {
          console.log(error);
        });
        this.modalRef.hide();
  }
  updateAux(){
    this.auxTutorial.title = this.currentTutorial.title;
    this.auxTutorial.description = this.currentTutorial.description;
  }

}