import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDespesa } from '../../shared/models/tipo-despesa.model';
import { TipoReceita } from '../../shared/models/tipo-receita.model';

@Injectable({
  providedIn: 'root'
})
export class DominioService {
  private readonly http = inject(HttpClient);

  public getDominios(): Observable<TipoDespesa[]> {
    return this.http.get<TipoDespesa[]>('http://localhost:3000/dominios');
  }

  public inserirTipoDespesa(tipoDespesa: TipoDespesa): Observable<TipoDespesa> {
    return this.http.post<TipoDespesa>('http://localhost:3000/tipoDespesa', tipoDespesa);
  }

  public inserirTipoReceita(tipoReceita: TipoReceita): Observable<TipoReceita> {
    return this.http.post<TipoReceita>('http://localhost:3000/tipoReceita', tipoReceita);
  }
}
