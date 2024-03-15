import { Component, Inject } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { url: string, id: string }
  ) {}

  onDelete() {
    this.api.delete(this.data.url, this.data.id).subscribe();
  }
}
