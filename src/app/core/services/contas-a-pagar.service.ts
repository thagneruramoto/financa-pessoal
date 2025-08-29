import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ContaAPagar } from '../../shared/models/conta-a-pagar.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContasAPagarService {
  private readonly http = inject(HttpClient);

  public atualizar(conta: ContaAPagar): Observable<ContaAPagar> {
    return this.http.put<ContaAPagar>(`http://localhost:3000/contas-a-pagar/${conta.id}`, conta);
  }

  public inserir(conta: Omit<ContaAPagar, 'id'>): Observable<ContaAPagar> {
    console.log('inserindo');

    return this.http.post<ContaAPagar>('http://localhost:3000/contas-a-pagar', conta);
  }

  public listar(): Observable<ContaAPagar[]> {
    console.log('listar');

    return this.http.get<ContaAPagar[]>('http://localhost:3000/contas-a-pagar');
  }

  public excluir(id: string): Observable<void> {
    console.log('excluir', id);

    return this.http.delete<void>(`http://localhost:3000/contas-a-pagar/${id}`);
  }
}
