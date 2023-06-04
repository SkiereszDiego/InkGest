import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  email: string;
  celular: string;
  price: number;
  category: string;
  orders: Order[];
}

interface Order {
  id: string;
  customer: string;
  date: string;
  tatuagem: string; 
  tatuador: string;
  numeroSessoes: number; 
  dataFinal: string; 
  valor: number; 
  custoTotal: number;
  status: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  products: Product[] = [
    {
      name: 'Mary Curie',
      email: 'mary@gmail.com', // Add example email
      celular: '123456789', // Add example celular
      price: 0,
      category: 'Active',
      orders: [
        {
          id: 'Thomas',
          customer: 'Thomas@gmail.com',
          date: '2023-05-10',
          tatuagem: 'Tatuagem 1',
          tatuador: 'Tatuador 1',
          numeroSessoes: 2,
          dataFinal: '2023-05-15',
          valor: 100,
          custoTotal: 200,
          status: ''
        },
        {
          id: 'Ada',
          customer: 'Ada@gmail.com',
          date: '2023-05-09',
          tatuagem: 'Tatuagem 2',
          tatuador: 'Tatuador 2',
          numeroSessoes: 1,
          dataFinal: '2023-05-12',
          valor: 50,
          custoTotal: 50,
          status: ''
        }
      ]
    },
    {
      name: 'Lorena',
      email: 'lorena@gmail.com', // Add example email
      celular: '987654321', // Add example celular
      price: 149.99,
      category: 'Lorena@gmail.com',
      orders: [
        {
          id: 'João',
          customer: 'Joao@gmail.com',
          date: '2023-05-08',
          tatuagem: 'Tatuagem 3',
          tatuador: 'Tatuador 3',
          numeroSessoes: 3,
          dataFinal: '2023-05-20',
          valor: 150,
          custoTotal: 450,
          status: 'Shipped'
        }
      ]
    },
    {
      name: 'Bruno',
      email: 'bruno@gmail.com', // Add example email
      celular: '111222333', // Add example celular
      price: 199.99,
      category: 'Category 3',
      orders: []
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
