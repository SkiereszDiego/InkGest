import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProfileControlComponent } from './pages/profile-control/profile-control.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';

import { Path } from './shared/enums/path';
import { InventoryComponent } from './pages/inventory/inventory.component';


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
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

