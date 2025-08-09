import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TipoDespesa } from '../../shared/models/tipo-despesa.model';
import { map, Observable, timeInterval } from 'rxjs';
import { Despesa } from '../../shared/models/despesa.model';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  private readonly http = inject(HttpClient);

  public getTipoDespesa(): Observable<TipoDespesa[]> {
    return this.http.get<TipoDespesa[]>('http://localhost:3000/tipoDespesa');
  }

  public inserir(despesa: Omit<Despesa, 'id'>): Observable<Despesa> {
    return this.http.post<Despesa>('http://localhost:3000/despesas', despesa);
  }

  public buscarTodos(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>('http://localhost:3000/despesas');
  }

}
