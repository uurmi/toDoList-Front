import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GLOBALS } from 'src/environment';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../_models/Category';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
  category?: Category;
  categoryForm!: FormGroup;

  constructor(
    private api: ApiService,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<CategoryModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data?: string
  ) {}

  ngOnInit() {
    if (this.data) {
      this.api
        .getOne(GLOBALS.CATEGORY_URL, this.data)
        .subscribe((res: Category) => {
          this.category = res;
          this.categoryForm = this.builder.group({
            name: new FormControl(res.name, Validators.required),
            description: new FormControl(res.description, Validators.required),
            color: new FormControl(res.color, Validators.required),
          });
        });
    } else {
      this.categoryForm = this.builder.group({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        color: new FormControl('', Validators.required),
      });
    }
  }

  saveCategory() {
    if (this.category?._id) {
      this.api
        .update(
          GLOBALS.CATEGORY_URL,
          this.category._id,
          this.categoryForm.value
        )
        .subscribe();
    } else {
      this.api.post(GLOBALS.CATEGORY_URL, this.categoryForm.value).subscribe();
    }
  }

  openDeleteModal() {
    let data = {
      url: GLOBALS.CATEGORY_URL,
      id: this.category?._id,
    };

    const dialogRef = this.dialog.open(DeleteModalComponent, { data: data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close({ deleted: true });
      }
    });
  }
}
