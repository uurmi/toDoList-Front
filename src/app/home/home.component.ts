import { Component, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Ticket } from '../_models/Ticket';
import { MatDialog } from '@angular/material/dialog';
import { GLOBALS } from 'src/environment';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { Category } from '../_models/Category';
import { CardListComponent } from '../card-list/card-list.component';

export class TicketsByCategory {
  category!: Category;
  tickets!: Ticket[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.getTickets();
  }

  ticketsByCategories: TicketsByCategory[] = [];
  @ViewChildren(CardListComponent) cardLists!: QueryList<CardListComponent>;

  getTickets() {
    this.apiService
      .getAll(GLOBALS.TICKET_URL)
      .subscribe(
        (tickets: TicketsByCategory[]) => (this.ticketsByCategories = tickets)
      );
  }

  openCategoryModal(data?: string) {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTickets();
      }
    });
  }

  trackCategoryById(index: number, category: TicketsByCategory) {
    return category.category._id;
  }

  refreshChild(category: string) {
    let childIndex = this.ticketsByCategories.findIndex(
      (item) => item.category.name == category
    );
    this.apiService
      .getAll(GLOBALS.TICKET_URL + GLOBALS.CATEGORY + '/' + category)
      .subscribe((tickets) => {
        this.ticketsByCategories[childIndex].tickets = tickets;
      });
  }

  removeCategory(category: string) {
    this.ticketsByCategories.splice(
      this.ticketsByCategories.findIndex(
        (item) => item.category.name == category
      ),
      1
    );
  }
}
