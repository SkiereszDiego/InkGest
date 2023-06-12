import { Component } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  nome: string = '';
  categoria: string = '';
  subcategoria: string = '';
  descricao: string = '';
  preco: string = '';
  dataCompra: Date = new Date();
  dataValidade: Date = new Date();
  quantidade: number = 0;
  categorias = [
    { label: 'Agulhas', value: 'Agulhas' },
    { label: 'Tintas', value: 'Tintas' },
    { label: 'Batoques', value: 'Batoques' },
    { label: 'Transfers', value: 'Transfers' }
  ];

  formatarNome(valor: string): void {
    this.nome = valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase();
  }

  formatarPreco(valor: string): void {
    // Remover caracteres não numéricos
    const precoNumerico = valor.replace(/[^0-9.]/g, '');

    // Formatar como moeda em reais
    const precoFormatado = parseFloat(precoNumerico).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    this.preco = precoFormatado;
  }
}
