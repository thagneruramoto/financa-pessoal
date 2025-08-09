import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoReceita } from '../../shared/models/tipo-receita.model';
import { Receita } from '../../shared/models/receita.model';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private readonly http = inject(HttpClient);

  public getTipoDespesa(): Observable<TipoReceita[]> {
    return this.http.get<TipoReceita[]>('http://localhost:3000/tipoReceita');
  }

  public inserir(despesa: Omit<Receita, 'id'>): Observable<Receita> {
    return this.http.post<Receita>('http://localhost:3000/receitas', despesa);
  }

  public buscarTodos(): Observable<Receita[]> {
    return this.http.get<Receita[]>('http://localhost:3000/receitas');
  }
}
