import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GLOBALS } from 'src/environment';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MarkAsDoneModalComponent } from '../mark-as-done-modal/mark-as-done-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from '../_models/Ticket';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss'],
})
export class TicketModalComponent implements OnInit {
  ticket: Ticket | undefined;
  categories = [];
  ticketForm!: FormGroup;
  steps!: FormArray;
  stepsChecked!: FormArray;
  deadline!: boolean;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { category?: string; id?: string },
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<TicketModalComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.api.getAll(GLOBALS.CATEGORY_URL).subscribe((data) => {
      this.categories = data;
    });

    if (this.data.id) {
      this.api.getOne(GLOBALS.TICKET_URL, this.data.id).subscribe((data) => {
        this.ticket = data;
        this.ticketForm = this.builder.group({
          name: new FormControl(data.name, Validators.required),
          description: new FormControl(data.description, Validators.required),
          category: new FormControl(data.category, Validators.required),
        });
        if (data.steps) {
          this.steps = this.builder.array([]);
          this.stepsChecked = this.builder.array([]);
          data.steps.forEach((element: any, index: string | number) => {
            this.steps.push(new FormControl(element));
            this.stepsChecked.push(new FormControl(data.stepsChecked[index]));
          });
          this.ticketForm.addControl('steps', this.steps);
          this.ticketForm.addControl('stepsChecked', this.stepsChecked);
        }
        if (data.deadline) {
          this.deadline = true;
          this.ticketForm.addControl(
            'deadline',
            new FormControl(data.deadline, Validators.required)
          );
        }
      });
    } else {
      this.ticketForm = this.builder.group({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        category: new FormControl(this.data.category, Validators.required),
      });
    }
  }

  getControlByIndex(formArray: FormArray, index: number): FormControl {
    return formArray.at(index) as FormControl;
  }

  getControlValueByIndex(formArray: FormArray, index: number): FormControl {
    return formArray.at(index).value;
  }

  saveTicket() {
    if (this.ticketForm.dirty) {
      if (this.data.id) {
        this.api
          .update(GLOBALS.TICKET_URL, this.data.id, this.ticketForm.value)
          .subscribe();
      } else {
        this.api.post(GLOBALS.TICKET_URL, this.ticketForm.value).subscribe();
      }
      this.dialogRef.close({ dirty: true, categoryChanged: this.ticketForm.controls['category'].value });
    }
  }

  markTicketAsDone() {
    let data = {
      id: this.ticket!._id,
      category: this.ticket!.category,
      pos: this.ticket!.position,
    };
    const dialogRef = this.dialog.open(MarkAsDoneModalComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close({ dirty: true });
      }
    });
  }

  openDeleteModal() {
    let data = {
      url: GLOBALS.TICKET_URL,
      id: this.ticket!._id,
    };

    const dialogRef = this.dialog.open(DeleteModalComponent, data);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close({ dirty: true });
      }
    });
  }

  addSteps() {
    this.steps = this.builder.array([new FormControl('')]);
    this.stepsChecked = this.builder.array([new FormControl(false)]);

    this.ticketForm.registerControl('steps', this.steps);
    this.ticketForm.registerControl('stepsChecked', this.stepsChecked);
  }

  addStep() {
    this.steps.push(new FormControl(''));
    this.ticketForm.setControl('steps', this.steps);
    this.stepsChecked.push(new FormControl(false));
    this.ticketForm.setControl('stepsCheked', this.stepsChecked);
  }

  removeSteps() {
    this.steps = this.builder.array([]);
    this.ticketForm.setControl('steps', new FormControl());
    this.stepsChecked = this.builder.array([]);
    this.ticketForm.setControl('stepsChecked', new FormControl());
    this.ticketForm.markAsDirty();
  }

  addDeadline() {
    this.deadline = true;
    this.ticketForm.addControl(
      'deadline',
      new FormControl('', Validators.required)
    );
  }

  removeDeadline() {
    this.deadline = false;
    this.ticketForm.setControl('deadline', new FormControl());
    this.ticketForm.markAsDirty();
  }
}
