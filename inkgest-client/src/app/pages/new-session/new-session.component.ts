import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder , Validators } from '@angular/forms';
import { timer, Subscription } from 'rxjs';

import { InventoryService } from '../../shared/services/inventory.service';

import { InventoryItem } from '../../models/inventory-item.model';
import { Session } from '../../models/session.model';
import { SessionService } from 'src/app/shared/services/session.service';

interface Client {
    name: string;
    information: string;
}

@Component({
    selector: 'app-new-session',
    templateUrl: './new-session.component.html',
    styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent implements OnInit, OnDestroy {
    inventory: InventoryItem[] = [];
    formGroup!: FormGroup;
    filteredClients: Client[] = [];
    categories: string[] = [];

    displayModal = false;
    displayModal2 = false;

    timer = '0:00:00';
    sessionElapsedTime = '0:00:00';
    timerSubscription: Subscription | undefined;
    selectedClient: Client | undefined;
    selectedClientData: any;
    materialUsed: { _id: string; description: string; quantity: number; price: number }[] = [];


    clients: Client[] = [
        { name: 'Allan Foppa', information: 'Alergia a stress' },
        { name: 'Diego Skieresz', information: 'Alergia a zinco' },
        { name: 'Alvaro Maia', information: 'Hepatite' },
        { name: 'Allana Soares', information: 'Diabetes' },
    ];

    constructor(
        private inventoryService: InventoryService,
        private formBuilder: FormBuilder,
        private sessionService: SessionService
    ) {
        // Inicialize o FormGroup usando o FormBuilder
        this.formGroup = this.formBuilder.group({
            // Defina os campos do formulário
            description: '',
            quantity: '',
            price: ''
        });
    }

    ngOnInit(): void {
        // Crie um novo FormGroup com os campos necessários
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required]),
            information: new FormControl(''),
            continuation: new FormControl(false),
            inventory: new FormArray([]),
            sessionElapsedTime: new FormControl('')
        });

        // Busque os dados do inventário do backend
        this.fetchInventoryFromBackend();

        // Verifique se todas as propriedades necessárias estão presentes nos objetos do inventário
        this.inventory.forEach((item) => {
            if (!item.hasOwnProperty('description') || !item.hasOwnProperty('price')) {
                console.error('Objeto do inventário não possui as propriedades necessárias:', item);
            }
        });
    }

    ngOnDestroy(): void {
        this.stopTimer();
    }

    private fetchInventoryFromBackend(): void {
        // Obtenha os dados do inventário do serviço de inventário
        this.inventoryService.getInventory().subscribe((data: InventoryItem[]) => {
            console.log('Data received from the backend:', data);
            this.inventory = data;
            console.log('Inventory items:', this.inventory);
            // Crie uma matriz de categorias única com base nos itens do inventário
            this.categories = Array.from(new Set(this.inventory.map(item => item.category))).filter(category => category !== undefined) as string[];
        });
    }

    filterClient(event: any) {
        const query = event.query;
        // Filtrar os clientes com base na consulta de pesquisa
        this.filteredClients = this.clients.filter(client =>
            client.name.toLowerCase().startsWith(query.toLowerCase())
        );
    }

    selectClient(event: any) {
        if (event) {
            // Remover a classe 'toggle-user-complement-info' de todos os elementos 'user-complement-info'
            this.getUserInfoEl().forEach((el) => {
                el.classList.remove('toggle-user-complement-info');
            });

            // Definir o valor do campo 'information' com base no cliente selecionado
            this.formGroup.patchValue({
                'information': event.information
            });

            this.selectedClient = event;
        }
    }

    unselectClient() {
        // Adicionar a classe 'toggle-user-complement-info' a todos os elementos 'user-complement-info'
        this.getUserInfoEl().forEach((el) => {
            el.classList.add('toggle-user-complement-info');
        });

        // Resetar os valores do FormGroup para vazio
        this.formGroup.patchValue({
            name: '',
            information: '',
            continuation: false
        });
    }

    getUserInfoEl(): HTMLElement[] {
        // Obter todos os elementos com a classe 'user-complement-info'
        return Array.from(document.getElementsByClassName('user-complement-info') as HTMLCollectionOf<HTMLElement>);
    }

    addMaterial(id: string, value2: any, material: string) {
        const inventoryArray = this.formGroup.get('inventory') as FormArray<any>;

        // Encontrar o índice do item no array de inventário
        const itemIndex = inventoryArray.controls.findIndex((control) => {
            return control.value._id === id;
        });

        // Obter a quantidade máxima permitida para o item com base no ID
        const maxQuantity = this.getMaxQuantity(id);

        if (itemIndex !== -1) {
            // Se o item já existe no inventário, atualizar a quantidade
            const item = inventoryArray.at(itemIndex);
            const updatedQuantity = Math.min(maxQuantity, value2);
            item.patchValue({ quantity: updatedQuantity });
            console.log(`Current quantity of ${material}: ${updatedQuantity}`);
        } else {
            // Se o item não existe no inventário, adicionar um novo controle ao FormArray
            const control = new FormGroup({
                _id: new FormControl(id),
                quantity: new FormControl(Math.min(maxQuantity, value2))
            });
            inventoryArray.push(control);
            console.log(`Current quantity of ${material}: ${control.value.quantity}`);
        }
    }

    getMaxQuantity(id: string): number {
        const items = (this.formGroup.get('inventory') as FormArray<any>).controls;
        let totalQuantity = 0;
    
        // Calcular a quantidade total para o item com base no ID
        for (const item of items) {
            if (item.value._id === id) {
                totalQuantity += item.value.quantity;
            }
        }
    
        // Obter o item selecionado com base no ID e retornar a quantidade máxima permitida
        const selectedItem = this.inventory.find((item) => item._id === id);
        return selectedItem?.quantity ?? 0;
    }
    
    
    
    

    startSession() {
        const selectedClient = this.formGroup.value.name;
        const inventoryCopy = JSON.parse(JSON.stringify(this.formGroup.value.inventory));

        // Iniciar o timer
        this.startTimer();

        // Abrir o Modal com os dados do cliente e inventário
        this.openModal(selectedClient, inventoryCopy);
    }

    openModal(selectedClient: Client | undefined, inventoryCopy: any) {
        this.selectedClient = selectedClient;

        // Adicionar description e price aos itens do inventário
        const modifiedInventory = inventoryCopy.map((item: any) => {
            const selectedItem = this.inventory.find((inventoryItem) => inventoryItem._id === item._id);
            if (selectedItem) {
                const { description, price } = selectedItem;
                return { ...item, description, price };
            }
            return item;
        });

        // Definir os dados do cliente selecionado e inventário modificado
        this.selectedClientData = {
            client: this.formGroup.get('name')?.value,
            inventory: modifiedInventory
        };

        // Iniciar o timer
        this.startTimer();

        // Exibir o Modal
        this.displayModal = true;
    }

    startTimer() {
        // Verificar se já existe uma inscrição ativa e cancelá-la
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }

        // Criar uma nova inscrição para atualizar o timer a cada segundo
        this.timerSubscription = timer(0, 1000).subscribe((seconds) => {
            const displaySeconds = seconds % 60;
            const displayMinutes = Math.floor(seconds / 60) % 60;
            const displayHours = Math.floor(seconds / 3600);

            // Formatar a contagem do timer
            this.timer = `${displayHours}:${displayMinutes
                .toString()
                .padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;

            // Atualizar o valor da duração da sessão no FormGroup
            this.sessionElapsedTime = this.timer;
            this.formGroup.patchValue({ sessionElapsedTime: this.sessionElapsedTime });
        });
    }

    showModal2() {
        // Parar o timer
        this.stopTimer();

        // Obter os dados da sessão com base no cliente selecionado e inventário utilizado
        const sessionData: Session = {
            client: this.selectedClientData?.client || '',
            session_date: new Date().toISOString(),
            duration: this.sessionElapsedTime,
            supplyUsed: this.materialUsed
        };

        console.log('Dados da sessão:', sessionData);
        console.log('selectedClientData?.inventory:', this.selectedClientData?.inventory);

        // WIP Exibir o loader ou indicador de carregamento aqui

        this.createSession();

        // Abrir o Modal 2
        this.openModal2();
    }

    openModal2() {
        // Parar o timer
        this.stopTimer();

        // Obter os dados da sessão com base no cliente selecionado e inventário utilizado
        const sessionData: Session = {
            client: this.selectedClientData?.client || '',
            session_date: new Date().toISOString(),
            duration: this.sessionElapsedTime,
            supplyUsed: this.materialUsed
        };

        console.log('Dados da sessão:', sessionData);
        console.log('selectedClientData?.inventory:', this.selectedClientData?.inventory);

        // Exibir o loader ou indicador de carregamento aqui

        // Atualizar os dados do inventário com base nos materiais utilizados
        this.selectedClientData = {
            client: this.selectedClientData?.client || '',
            inventory: this.materialUsed
        };

        // Exibir o Modal 2
        this.displayModal2 = true;
    }


    finalizarSessao() {
        // Obter os valores do FormGroup
        const { description, quantity, price } = this.formGroup.value;

        // Criar um objeto com os valores do item
        const item = {
            description: description,
            quantity: quantity,
            price: price
        };

        // Atribuir o objeto item à propriedade selectedClientData
        this.selectedClientData = {
            inventory: [item] // Se você tiver mais de um item, adicione-os a um array
        };

        // Exibir a tabela com os dados do item
        this.displayModal2 = true;
    }


    stopTimer() {
        // Verificar se há uma inscrição ativa e cancelá-la
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = undefined;
        }
    }

    createSession(): void {
        const sessionData = {
            // Preencha os dados da sessão com base nos valores do formulário
            client: this.selectedClientData.client.toString(),
            session_date: new Date().toISOString(),
            tattoo: "ND",
            value: "0",
            tattooArtist: 'ND',
            duration: this.sessionElapsedTime.toString(),
            totalCost: '',
            supplyUsed: this.materialUsed.toString()
        };
        
        this.sessionService.createSession(sessionData).subscribe(
            (response) => {
            console.log('Nova sessão criada:', response);
            // Realize as ações necessárias após a criação da sessão
            },
            (error) => {
            console.error('Erro ao criar nova sessão:', error);
            // Trate o erro de acordo com as necessidades da sua aplicação
            }
        );
    }
        
}
