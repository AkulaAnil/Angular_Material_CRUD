import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../app.component'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  createForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateComponent>, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      position: ['', Validators.required],
      name: ['', Validators.required],
      weight: ['', Validators.required],
      symbol: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
