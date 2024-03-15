import {
  Component,
  Input,
  signal,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Category } from '../_models/Category';
import { Ticket } from '../_models/Ticket';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { GLOBALS } from 'src/environment';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';
import { CountStepsPipe } from '../_pipes/count-steps.pipe';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { BehaviorSubject, concatMap } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        // each time the binding value changes
        query(
          ':leave',
          [stagger(100, [animate('0.5s', style({ opacity: 0 }))])],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(100, [animate('0.5s', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class CardListComponent implements OnChanges {
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private doneSteps: CountStepsPipe
  ) {}

  ngOnChanges() {
    this.signalTickets.set(this.tickets);
  }

  @Input() category!: Category;
  @Input() tickets!: Ticket[];
  @Output() positionChanged = new EventEmitter<string>();
  @Output() categoryDeleted = new EventEmitter<string>();
  signalTickets = signal<Ticket[] | undefined>([]);
  loading$ = new BehaviorSubject<boolean>(true);

  getData() {
    return this.api.getAll(
      GLOBALS.TICKET_URL + GLOBALS.CATEGORY + '/' + this.category.name
    );
  }

  getTickets() {
    this.api
      .getAll(GLOBALS.TICKET_URL + GLOBALS.CATEGORY + '/' + this.category.name)
      .subscribe((res) => {
        this.signalTickets.set(res);
      });
  }

  openTicketModal(data: {}) {
    const dialogRef = this.dialog.open(TicketModalComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.categoryChanged) {
        this.getTickets();
        this.positionChanged.emit(result.categoryChanged);
      }
    });
  }

  openCategoryModal(data?: string) {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTickets();
        if (result.deleted) {
          this.categoryDeleted.emit(this.category.name);
        }
      }
    });
  }

  openDeleteModal(id?: string) {
    let data = { url: GLOBALS.TICKET_URL, id: id };

    const dialogRef = this.dialog.open(DeleteModalComponent, { data: data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTickets();
      }
    });
  }

  ticketProgress(ticket: Ticket) {
    if (!ticket.steps) return;
    return (
      (this.doneSteps.transform(ticket.stepsChecked) / ticket.steps.length) *
      100
    );
  }

  drop(event: CdkDragDrop<any>) {
    if (
      event.container.data == event.previousContainer.data &&
      event.previousIndex == event.currentIndex
    )
      return;

    let patchData = {
      previousPosition: event.previousIndex,
      currentPosition: event.currentIndex,
      previousContainer: event.previousContainer.data,
      currentContainer: event.container.data,
      doneDate:
        event.container.data == 'Done' && event.previousContainer.data != 'Done'
          ? Date.now()
          : undefined,
    };

    this.api
      .update(
        GLOBALS.TICKET_URL + GLOBALS.UPDATE_POSITION,
        event.item.data.id,
        patchData
      )
      .pipe(
        concatMap(() => {
          this.positionChanged.emit(event.previousContainer.data);
          return this.getData();
        })
      )
      .subscribe((res) => {
        this.signalTickets.set(res);
      });
  }

  trackTicketById(index: number, ticket: Ticket) {
    return ticket._id;
  }
}
