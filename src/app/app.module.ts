import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CountStepsPipe } from './_pipes/count-steps.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MarkAsDoneModalComponent } from './mark-as-done-modal/mark-as-done-modal.component';
import { DateDifferencePipe } from './_pipes/date-difference.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SortByPositionPipe } from './_pipes/sort-by-position.pipe';
import { CardListComponent } from './card-list/card-list.component';
import { DndModule } from 'ngx-drag-drop';
import { AuthInterceptor } from './_services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketModalComponent,
    CountStepsPipe,
    DeleteModalComponent,
    MarkAsDoneModalComponent,
    DateDifferencePipe,
    CategoryModalComponent,
    SortByPositionPipe,
    CardListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    DragDropModule,
    CdkScrollableModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    DndModule,
  ],
  providers: [
    CountStepsPipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
