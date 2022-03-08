import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../shared/alert-model.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

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

    this.route.params.subscribe(
      (params: any)=>{
        const id = params['id'];
        console.log(id);
        const curso = this.service.loadByID(id)
      }
    )



    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }

  hasError(field: string){

    return this.form.get(field)?.errors;
  }

  onSubmit(){

    this.sumitted = true;
    console.log(this.form.value);

    if(this.form.valid){
      console.log('submit');
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

  onCancel(){
    this.sumitted = false;
    this.form.reset();
    //console.log('Cancel');
  }
}
