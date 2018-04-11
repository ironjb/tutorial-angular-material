import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  // ---------- Properties

    user: User;
    avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
    name = new FormControl('', [Validators.required])

  // ---------- Constructor

    constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>, private userService: UserService) { }

  // ---------- Lifecycle Hooks

    ngOnInit() {
      this.user = new User();
    }

  // ---------- Methods

    save() {
      this.userService.addUser(this.user).then(user => {
        this.dialogRef.close(this.user);
      });
    }

    dismiss() {
      this.dialogRef.close(null);
    }

    getErrorMessage() {
      return this.name.hasError('required') ? 'You must enter a name' : '';
    }
}
