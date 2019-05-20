import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NoteService } from '../../app/services/note.service';
import { Note } from '../../app/models/note.model';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  note: Note;
  newNoteFlag: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteService: NoteService,
    private alertCtrl: AlertController) {

    this.note = this.navParams.get("noteParam");
    if (!this.note) {
      this.note = new Note();
      this.newNoteFlag = true;
    }
    
  }

  onTrash() {
    //constrói o alerta
    let confirm = this.alertCtrl.create({
      title: "Delete?",
      message: `Tem certeza que deseja deleta-lo: "${this.note.title}"?`,
      buttons: [
        //primeiro botão, sem handler não faz nada
        {
          text: "Cancel"
        },
        //segundo botão
        {
          text: "Confirm",
          handler: () => {
            this.noteService.removeNote(this.note);
            this.navCtrl.pop();
          }
        }
      ]
    });
    //exibe
    confirm.present();
  }

  ionViewDidLoad() {}

  ionViewWillLeave() {
    if (this.newNoteFlag)
      this.noteService.addNote(this.note);
  }
}
