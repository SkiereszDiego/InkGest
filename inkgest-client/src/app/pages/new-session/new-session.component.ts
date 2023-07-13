import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    materialUsed: any;


    clients: Client[] = [
        { name: 'Allan Foppa', information: 'Alergia a stress' },
        { name: 'Diego Skieresz', information: 'Alergia a zinco' },
        { name: 'Alvaro Maia', information: 'Hepatite' },
        { name: 'Allana Soares', information: 'Diabetes' },
    ];

    constructor(
        private inventoryService: InventoryService,
        private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private http: HttpClient
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
            this.inventory = data.map(item => ({
                ...item
            }));;
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
        const inventoryPatch = JSON.parse(JSON.stringify(this.formGroup.value.inventory));
        // Abrir o Modal com os dados do cliente e inventário
        this.openModal(selectedClient, inventoryPatch);
    }

    openModal(selectedClient: Client | undefined, inventoryPatch: any) {
        this.selectedClient = selectedClient;

        // Adicionar description e price aos itens do inventário
        const inventorySession = inventoryPatch.map((item: any) => {
            const selectedItem = this.inventory.find((inventoryItem) => inventoryItem._id === item._id);
            if (selectedItem) {
                const { description, price } = selectedItem;
                return { ...item, description, price };
            }
            return item;
        });

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
        // Obter os dados da sessão com base no cliente selecionado e inventário utilizado
        const sessionData: Session = {
            client: this.selectedClientData?.client || '',
            session_date: new Date(),
            duration: this.sessionElapsedTime,
            supplyUsed: this.materialUsed
        };

        console.log('Dados da sessão:', sessionData);
        console.log('selectedClientData?.inventory:', this.selectedClientData?.inventory);

        // WIP Exibir o loader ou indicador de carregamento aqui

        // this.createSession();

        // Abrir o Modal 2
        this.openModal2();
    }

    openModal2() {
        // Obter os dados da sessão com base no cliente selecionado e inventário utilizado
        const sessionData: Session = {
            client: this.selectedClientData?.client || '',
            session_date: new Date(),
            duration: this.sessionElapsedTime,
            supplyUsed: this.materialUsed
        };

        console.log('Dados da sessão:', sessionData);
        console.log('selectedClientData?.inventory:', this.selectedClientData?.inventory);

        // Exibir o loader ou indicador de carregamento aqui

        // Exibir o Modal 2
        this.displayModal2 = true;
        this.displayModal = false;
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
            session_date: new Date(),
            tattoo: "ND",
            value: "0",
            tattooArtist: 'ND',
            duration: this.sessionElapsedTime.toString(),
            totalCost: '',
            supplyUsed: ''
        };
        
        this.sessionService.saveSession(sessionData).subscribe(
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

    finishSession(): void {
        this.stopTimer();
        this.updateClientData()
        this.showModal2();
    }

    
    closeSession() {
        console.log('INVENTORY Close Session:', this.inventory);
        
        console.log('client data INVENTORY Close Session:', this.selectedClientData['inventory']);

        this.inventory.forEach((inventoryItem: any) => {
            let itemUsed = this.selectedClientData['inventory'].find((usedItem: { _id: any; }) => {
                return usedItem._id == inventoryItem._id;
            });

            if (itemUsed) {
                console.log('Item Used:', itemUsed);
                inventoryItem.quantity = Math.abs(inventoryItem.quantity - itemUsed.quantity);
    
                console.log('Updated inventory session item:', inventoryItem);
    
                // Validate the request payload before sending it to the server
                // Add any necessary validations or checks based on your requirements
    
                // Check if the quantity is a positive number
                if (inventoryItem.quantity < 0) {
                    console.error('Invalid quantity:', inventoryItem.quantity);
                    return; // Skip this item and move to the next one
                }

                const payload = {
                    _id: inventoryItem._id,
                    quantity: inventoryItem.quantity
                }
    
                console.log('Sending request payload to update inventory quantities:', inventoryItem);
    
                this.inventoryService.updateItemQuantities([payload])
                    .pipe(
                        catchError((error) => {
                            console.error('Error updating inventory quantities:', error);
                            return throwError('Error updating inventory quantities');
                        })
                    )
                    .subscribe(
                        (response) => {
                            console.log('Inventory quantities updated successfully:', response);
                            this.displayModal2 = false; // Close the second dialog after the quantities are updated
                        },
                        (error) => {
                            console.error('Error updating inventory quantities:', error);
                        }
                    );
            }
        });
    }
    

        // const inventoryPatch = JSON.parse(JSON.stringify(this.formGroup.value.inventory));
        // console.error('Valor na modal-=-=-', inventoryPatch)
        // // Perform the PATCH request to update the inventory items' quantities
        // this.inventoryService.updateItemQuantities(inventoryPatch)
        //     .pipe(
        //         catchError((error) => {
        //             console.error('Error updating inventory quantities:', error);
        //             return throwError('Error updating inventory quantities');
        //         })
        //     )
        //     .subscribe(
        //         (response) => {
        //             console.log('Inventory quantities updated successfully:', response);
        //             this.displayModal2 = false; // Close the second dialog after the quantities are updated
        //         },
        //         (error) => {
        //             console.error('Error updating inventory quantities:', error);
        //         }
        //     );
    // }


    updateClientData(): void {
        const inventoryPatch = JSON.parse(JSON.stringify(this.formGroup.value.inventory));

        // Adicionar description e price aos itens do inventário
        const inventorySession = inventoryPatch.map((item: any) => {
            const selectedItem = this.inventory.find((inventoryItem) => inventoryItem._id === item._id);
            if (selectedItem) {
                const { description, price } = selectedItem;
                return { ...item, description, price };
            }
            return item;
        });

        this.selectedClientData = {}
        this.selectedClientData['client'] = this.formGroup.get('name')?.value;
        this.selectedClientData['inventory'] = inventorySession; 
    }
        
}
