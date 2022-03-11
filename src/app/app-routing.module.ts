import { UploadFileModule } from './upload-file/upload-file.module';
import { UploadFileComponent } from './upload-file/upload-file/upload-file.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',redirectTo: 'upload'
  },
  {
    path: 'cursos',

    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)

  },
  {
    path: 'upload',

    loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)

  },
  {
    path: 'busca-reativa',

    loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
