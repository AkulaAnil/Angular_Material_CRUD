import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private fb: FormBuilder) {
      
    // console.log('data=>',data);
    this.editForm = this.fb.group({
      position: ['', Validators.required],
      name: ['', Validators.required],
      weight: ['', Validators.required],
      symbol: ['', Validators.required],
      status: ['', Validators.required]
    });
    if(data)
    {
      this.editForm.patchValue(data);  // If Both Names Are Same
      // this.editForm.get('pos').setValue(data.position)  // If Both Names are Different
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
     
  }

  ngOnInit() {
  }

}
