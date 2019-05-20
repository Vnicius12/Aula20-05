import { Note } from "../models/note.model";
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class NoteService {
    notes: Array<Note> = new Array<Note>();
    notesSource = new BehaviorSubject<Array<Note>>(this.notes)
    notesCurrent = this.notesSource.asObservable()

    constructor(private http: HttpClient) {
        this.mockNotes()
    }

    mockNotes() {
        this.http.get<Array<Note>>('http://www.mocky.io/v2/5cd726593000002d4a606241').subscribe(
            resp => {
                this.notes = resp
                this.notesSource.next(this.notes)
            }
        )
    }

    removeNote(note) {
        let index = this.notes.indexOf(note);
        if (index > -1) {
            this.notes.splice(index, 1);
        }
    }

    addNote(note: Note) {
        this.notes.push(note);
        this.notesSource.next(this.notes)
    }


}