import { CursosService } from './../../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { catchError, empty, Observable, Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-model.service';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[];

  bsModalRef: BsModalRef;
  cursos$: Observable<Curso[]>;
  error$ = new Subject <boolean>();

  constructor(private service: CursosService,
    //private modalService: BsModalService)
    private alertService: AlertModalService){}


  ngOnInit(): void {
    //this.service.list().
    //subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh(){

    this.cursos$ = this.service.list()
    .pipe(
      catchError(error=>{
        console.log(error);
        //this.error$.next(true)
        this.handleError();
        return empty();
      })
    )

    /*this.service.list()
    .pipe(
        catchError(error => empty())
      )
      .subscribe(
        dados => {
          console.log(dados);
        }
         //error => console.error(error),
        // () => console.log('Obserservable completo!')
     );*/
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')
    /*this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = ' Erro ao carregar cursos. Tente novamente mais tarde.';*/
  }
}
