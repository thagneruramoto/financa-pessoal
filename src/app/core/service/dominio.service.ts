import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDespesa } from '../../shared/models/tipo-despesa.model';

@Injectable({
  providedIn: 'root'
})
export class DominioService {
  private readonly http = inject(HttpClient);

  public inserirTipoDespesa(tipoDespesa: TipoDespesa): Observable<TipoDespesa> {
    return this.http.post<TipoDespesa>('http://localhost:3000/tipoDespesa', tipoDespesa);
  }

  public inserirTipoReceita(tipoReceita: TipoDespesa): Observable<TipoDespesa> {
    return this.http.post<TipoDespesa>('http://localhost:3000/tipoReceita', tipoReceita);
  }
}
