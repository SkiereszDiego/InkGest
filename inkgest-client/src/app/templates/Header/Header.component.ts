import { Component } from '@angular/core';
import { Path } from 'src/app/shared/enums/path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public newSessionPath: any = Path.NEW_SESSION;
  public profileControlPath: any = Path.PROFILE_CONTROL;
  
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
