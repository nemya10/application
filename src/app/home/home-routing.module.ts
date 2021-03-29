import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
{
  path: '',
  component: HomePage,
  children: [
    {
      path: 'compensation',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('../compensation/compensation.module').then(m => m.CompensationPageModule)
        }
      ]
    },
    {
      path: 'profile',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('../profile/profile.module').then(m => m.ProfilePageModule)
        }
      ]
    },
    {
      path: 'calendrier',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('../calendrier/calendrier.module').then(m => m.CalendrierPageModule)
        }
      ]
    },
    {
      path: '',
      redirectTo: '/home/compensation',
      pathMatch: 'full'
    }
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
