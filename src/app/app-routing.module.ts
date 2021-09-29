import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Importar Firebase Guards
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

// Define redirecionadores
const toLogin = () => redirectUnauthorizedTo(['/login']); // Usuário  não logado
const isLogged = () => redirectLoggedInTo(['/profile']); // Usuário logado

const routes: Routes = [
  // Rota da página inicial
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // Página inicial
  {
    path: 'home',
    loadChildren: () =>
      import('./page/home/home.module').then((m) => m.HomePageModule),
  },

  // Página sobre
  {
    path: 'adotar',
    loadChildren: () =>
      import('./user/adotar/adotar.module').then((m) => m.AdotarPageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  // Página doar
  {
    path: 'doar',
    loadChildren: () =>
      import('./user/doar/doar.module').then((m) => m.DoarPageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  // Pagina Login
  {
    path: 'login',
    loadChildren: () =>
      import('./user/login/login.module').then((m) => m.LoginPageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isLogged },
  },

  //Pagina Profile
  {
    path: 'profile',
    loadChildren: () =>
      import('./user/profile/profile.module').then((m) => m.ProfilePageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  //Pagina Logout
  {
    path: 'logout',
    loadChildren: () =>
      import('./user/logout/logout.module').then((m) => m.LogoutPageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },
  // Pagina Registro
  {
    path: 'user/register',
    loadChildren: () =>
      import('./user/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserPageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },
  {
    path: 'duvidas',
    loadChildren: () =>
      import('./pages/duvidas/duvidas.module').then((m) => m.DuvidasPageModule),
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./page/home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'chat',
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatPageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  {
    path: 'notificacao',
    loadChildren: () =>
      import('./pages/notificacao/notificacao.module').then(
        (m) => m.NotificacaoPageModule
      ),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  {
    path: 'suporte',
    loadChildren: () =>
      import('./pages/support/support.module').then((m) => m.SupportPageModule),
  },

  {
    path: 'loginadotar',
    loadChildren: () =>
      import('./pages/loginadotar/loginadotar.module').then(
        (m) => m.LoginadotarPageModule
      ),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  {
    path: 'logindoar',
    loadChildren: () =>
      import('./pages/logindoar/logindoar.module').then(
        (m) => m.LogindoarPageModule
      ),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },
  // Rota curinga (rotas inexistentes)
  // TEM QUE SER SEMPRE A ÚLTIMA ROTA
  {
    path: '**',
    loadChildren: () =>
      import('./page/e404/e404.module').then((m) => m.E404PageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
