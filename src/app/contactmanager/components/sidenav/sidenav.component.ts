import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // --------- Properties

    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
    users: Observable<User[]>;
    @ViewChild(MatSidenav) sidenav: MatSidenav;
    isDarkTheme: boolean = false;
    dir: string = 'ltr';

  // --------- Constructor

    constructor(zone: NgZone, private userService: UserService, private router: Router) {
      this.mediaMatcher.addListener(mql => {
        zone.run(() => this.mediaMatcher = mql);
      });
    }

  // --------- Lifecycle Hooks
  
    ngOnInit() {
      this.users = this.userService.users;
      this.userService.loadAll();

      // this.users.subscribe(data => {
      //   if (data.length > 0) {
      //     this.router.navigate(['/contactmanager', data[0].id]);
      //   }
      // });

      this.router.events.subscribe(() => {
        if (this.isScreenSmall()) {
          this.sidenav.close();
        }
      });
    }

  // --------- Methods

    isScreenSmall(): boolean {
      return this.mediaMatcher.matches;
    }

    toggleTheme(): void {
      this.isDarkTheme = !this.isDarkTheme;
    }

    toggleDir(): void {
      this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';

      // // Was only needed for previous bug when switching from ltr<=>rtl
      // this.sidenav.toggle().then(() => { this.sidenav.toggle(); });
    }
}
