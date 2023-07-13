import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProfileControlComponent } from './pages/profile-control/profile-control.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';

import { Path } from './shared/enums/path';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { NewSessionComponent } from './pages/new-session/new-session.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SessionsComponent } from './pages/sessions/sessions.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path:  Path.DASHBOARD,
    component: DashboardComponent,
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module')
        .then((m) => m.DashboardModule)
  },
  {
    path: Path.LOGIN,
    loadChildren: () =>
      import('./pages/login/login.module')
        .then((m) => m.LoginModule)
  },
  {
    path: Path.AGENDA,
    component: AgendaComponent,
    loadChildren: () =>
      import('./pages/agenda/agenda.module')
        .then((m) => m.AgendaModule)
  },
  {
    path:  Path.CLIENTS,
    component: ClientsComponent,
    loadChildren: () =>
      import('./pages/clients/clients.module')
        .then((m) => m.ClientsModule)
  },
  {
    path: Path.PROFILE_CONTROL,
    component: ProfileControlComponent,
    loadChildren: () =>
      import('./pages/profile-control/profile-control.module')
        .then((m) => m.ProfileControlModule)
  },
  {
    path: Path.PROFESSIONALS,
    component: ProfessionalsComponent,
    loadChildren: () =>
      import('./pages/professionals/professionals.module')
        .then((m) => m.ProfessionalsModule)
  },
  {
    path: Path.INVENTORY,
    component: InventoryComponent,
    loadChildren: () =>
      import('./pages/inventory/inventory.module')
        .then((m) => m.InventoryModule)
  },
  {
    path: Path.NEW_SESSION, 
    component: NewSessionComponent,
    loadChildren: () =>
      import('./pages/new-session/new-session.module')
      .then((m) => m.NewSessionModule) // Import the new module
  },
  {
    path: Path.SESSIONS, 
    component: SessionsComponent, 
    loadChildren: () =>
      import('./pages/sessions/sessions.module')
      .then((m) => m.SessionsModule)
  },
  {
    path: Path.PAGE_NOT_FOUND, 
    component: PageNotFoundComponent,
    loadChildren: () =>
    import('./pages/page-not-found/page-not-found.module')
    .then((m) => m.PageNotFoundModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

