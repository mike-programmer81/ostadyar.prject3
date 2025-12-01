
import { Routes } from '@angular/router';
import { NavbarComponent } from './layouts/navbar-layout';
// import { AuthGuard } from './pages/guard/auth.guard';

export const routes: Routes = [

  // وقتی لود میشه → اگر لاگین نکرده باشد = بفرست login
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },

  // صفحه Login (بدون Navbar)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login copy/login.component').then(c => c.LoginPage)
  },

  // Home → فقط وقتی اجازه می‌ده وارد شی
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
      {
        path: 'SurveyComponent',
        component: NavbarComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/Survey/Survey.routes').then(r => r.SurveyRoutes)
          }
        ]
      },
      {
  path: 'survey',
  // canActivate: [AuthGuard],
  component: NavbarComponent,   // یا layout مد نظرت
  children: [
    { path: '', loadComponent: () => import('./pages/Survey/survey-list.page').then(m => m.SurveyListPage) },
    { path: 'create', loadComponent: () => import('./pages/Survey/survey-create.page').then(m => m.SurveyCreatePage) },
    { path: ':id', loadComponent: () => import('./pages/Survey/survey-detail.page').then(m => m.SurveyDetailPage) },
  ]
},


  // هر مسیر اشتباه → login
  
  {
  path: 'survey/:id',
  loadComponent: () =>
    import('./pages/Survey/survey-detail.page')
      .then(m => m.SurveyDetailPage)
}
,

{
  path: 'survey/result/:id',
  loadComponent: () =>
    import('./pages/survey-result/survey-result.page')
      .then(m => m.SurveyResultPage)
},
{
  path: 'survey/create',
  loadComponent: () =>
    import('./pages/Survey/survey-create.page')
      .then(m => m.SurveyCreatePage)
},
{
  path: 'survey/list',
  loadComponent: () =>
    import('./pages/Survey/survey-list.page')
      .then(m => m.SurveyListPage)
},
{
     path:'course',
    component:NavbarComponent,
    children:[
        {
            path:'',
            loadChildren:() => import('./pages/course/course.routes').then(r=>r.corseroutes)
        }
    ]

},{
     path:'profile',
    component:NavbarComponent,
    children:[
        {
            path:'',
            loadChildren:() => import('./pages/profile/profile.routes').then(r=>r.profileRautes)
        }
    ]
}


];
