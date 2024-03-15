import { Component, Inject } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GLOBALS } from 'src/environment';

@Component({
  selector: 'app-mark-as-done-modal',
  templateUrl: './mark-as-done-modal.component.html',
  styleUrls: ['./mark-as-done-modal.component.scss'],
})
export class MarkAsDoneModalComponent {
  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, category: string, pos: number}
  ) {}

  onClick() {
    let patchData = {
      previousContainer: this.data.category,
      currentContainer: 'Done',
      previousPosition: this.data.pos,
      currentPosition: 0,
      doneDate: Date.now()
    }
    this.api
      .update(GLOBALS.TICKET_URL + GLOBALS.UPDATE_POSITION, this.data.id, patchData)
      .subscribe();
  }
}
