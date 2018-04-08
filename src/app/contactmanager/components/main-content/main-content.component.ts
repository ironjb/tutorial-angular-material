import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  // ---------- Properties

    user: User;

  // ---------- Constructor

    constructor(private route: ActivatedRoute, private userService: UserService) { }

  // ---------- Lifecycle Hooks

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        let id = +params.get('id');
        if (!id) {
          id = 1;
        }
        this.user = null;

        this.userService.users.subscribe(users => {
          if (users.length > 0) {
            setTimeout(() => {
              this.user = this.userService.userById(id);
            }, 500);
          }
        });
      });
    }

}
