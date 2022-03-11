import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  total: number;
  //readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSearch (){
    //console.log(this.queryField.value);
    let value = this.queryField.value;
    const fields = 'name,description,version,homepage'

    if(value && (value = value.trim()) !== ''){


      const params_ = {
        search: value,
        fields: fields
      }

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);


    this.results$ = this.http.get(this.SEARCH_URL, {params})
    .pipe(
      tap((res:any) => this.total = res.total),
      map((res: any) => res.results)
    );
    }
  }

}