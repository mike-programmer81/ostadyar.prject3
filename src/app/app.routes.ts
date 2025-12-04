import { Routes } from '@angular/router';
import { NavbarComponent } from './layouts/navbar-layout';
// import { AuthGuard } from './pages/guard/auth.guard';

export const routes: Routes = [

  // ---------------------- Default redirect ----------------------
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },

  // ---------------------- Login (بدون Navbar) -------------------
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login copy/login.component').then(c => c.LoginComponent)
  },

  // ---------------------- Home ----------------------
  {
    path: 'home',
    // canActivate: [AuthGuard],
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.routes').then(r => r.homeRoutes)
      }
    ]
  },

  // ---------------------- Room Reservation ----------------------
  {
    path: 'RoomReservation',
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/RoomReservation/Room.routes').then(r => r.RoomRoutes)
      }
    ]
  },

  // ---------------------- Survey (نسخه نهایی و منظم) ----------------------
  {
    path: 'survey',
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/Survey/survey-list.page').then(m => m.SurveyListPage)
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/Survey/survey-create.page').then(m => m.SurveyCreatePage)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/Survey/survey-detail.page').then(m => m.SurveyDetailPage)
      },
      {
        path: 'result/:id',
        loadComponent: () =>
          import('./pages/survey-result/survey-result.page').then(m => m.SurveyResultPage)
      }
    ]
  },

  // ---------------------- Courses ----------------------
  {
    path: 'course',
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/course/course.routes').then(r => r.corseroutes)
      }
    ]
  },

  // ---------------------- Profile ----------------------
  {
    path: 'profile',
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/profile/profile.routes').then(r => r.profileRautes)
      }
    ]
  },

  // ---------------------- 404 → login ----------------------
  {
    path: '**',
    redirectTo: 'login'
  }

];
