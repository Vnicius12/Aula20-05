import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoteService } from '../../app/services/note.service';
import { Note } from '../../app/models/note.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes: Array<Note>

  constructor(public navCtrl: NavController, private noteService: NoteService) {
    this.noteService.notesCurrent.subscribe(
      response => { this.notes = response }
    )
  }

  onItemClick(note) {
    this.navCtrl.push('DetailPage', {
      noteParam: note
    });
  }

  onAddClick() {
    this.navCtrl.push('DetailPage');
  }

}
