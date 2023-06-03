import { Injectable } from '@angular/core';
    
@Injectable()
export class ProductService {
    getProductsData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                category: 'Agulhas',
                subcategory: 'RL',
                description: 'Cartucho de agulhas para traçado',
                price: 15,
                purchase_date: '2023-02-01',
                quantity: 3,
                expiry_date: '2023-05-01'
            },
            {
                id: '1001',
                code: 'nvklal433',
                category: 'Agulhas',
                subcategory: 'RS',
                description: 'Cartucho de agulhas para preenchimento',
                price: 15,
                purchase_date: '2023-01-01',
                quantity: 10,
                expiry_date: '2023-06-01'
            },
        ];
    }


    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    }

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    }

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }

};