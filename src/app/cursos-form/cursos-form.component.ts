import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../shared/alert-model.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  sumitted = false;

  constructor(private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    /*this.route.params.subscribe(
      (params: any)=>{
        const id = params['id'];
        console.log(id);
        const curso$ = this.service.loadByID(id);
        curso$.subscribe(curso =>{
          this.updateForm(curso);
        });

      }
    )*/

      /* this.route.params
     .pipe(
       map((params: any) => params['id']),
       switchMap(id => this.service.loadByID(id)),
      // switchMap(cursos => obterAulas)
     )
     .subscribe(curso => this.updateForm(curso));*/

     const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }


   /*updateForm(curso: any) {
     this.form.patchValue({
      id: curso.id,
       nome: curso.nome
     });
   }*/


  hasError(field: string){

    return this.form.get(field)?.errors;
  }

  onSubmit(){

    this.sumitted = true;

    if(this.form.valid){
      console.log('submit');

      if(this.form.controls['id'].value){

        this.service.update(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Sucesso ao atualizar curso'),
            this.location.back()
          },

          error => this.modal.showAlertDanger('Erro ao atualziar curso'),
          ()=> console.log('Update completo')
        )

      }else{

      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Sucesso ao criar curso'),
          this.location.back()
        },

        error => this.modal.showAlertDanger('Erro ao criar curso'),
        ()=> console.log('requests completo')
      );

      }

    }
  }

  onCancel(){
    this.sumitted = false;
    this.form.reset();
    //console.log('Cancel');
  }
}
