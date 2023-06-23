import { Component } from '@angular/core';
import { Path } from 'src/app/shared/enums/path';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InventoryService } from 'src/app/shared/services/inventory.service';

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss'],
    providers: [MessageService]
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

    public addItemPath: any = Path.INVENTORY;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private inventoryService: InventoryService
    ) {}

    navigateTo(path: string) {
        this.router.navigate([path]);
    }

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

    private formatarData(data: Date): string {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = String(data.getFullYear());

        return `${ano}-${mes}-${dia}`;
    }

    criarItem(): void {
        // Verificar se os campos obrigatórios estão preenchidos
        if (!this.nome || !this.categoria || !this.preco) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios.' });
            return;
        }

        const newItem = {
            name: this.nome,
            category: this.categoria,
            subcategory: this.subcategoria,
            description: this.descricao,
            price: parseFloat(this.preco.replace(/[^0-9.]/g, '')),
            purchase_date: this.formatarData(this.dataCompra),
            quantity: this.quantidade,
            expiry_date: this.formatarData(this.dataValidade),
            // adicione outros campos conforme necessário
        };

        console.log('Novo item:', newItem);

        this.inventoryService.createItem(newItem).subscribe(
            (response) => {
                console.log('Resposta do servidor:', response);
                this.navigateTo(this.addItemPath); // Redireciona de volta para a tela de Inventário
            },
            (error) => {
                console.error('Erro ao criar novo item:', error);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar novo item.' });
            }
        );
    }
}
