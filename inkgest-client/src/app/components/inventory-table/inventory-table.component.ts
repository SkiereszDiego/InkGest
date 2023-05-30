import { Component, Input } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';

interface Product {
  categorias: string;
  subcategorias: string;
  material: string;
  dataCompra: string;
  validade: string;
  alertas: string;
  quantidades: number;
}

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent {
  @Input() editMode: boolean = false;
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProductsFromBackend().then((data: Product[]) => {
      this.products = data;
    });
  }

  isLowStock(quantity: number): boolean {
    return quantity < 5;
  }

  isNearExpiration(expirationDate: string): boolean {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const daysDifference = (expiration.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return daysDifference <= 7;
  }

  private fetchProductsFromBackend(): Promise<Product[]> {
    // Simulating an asynchronous call to the ProductService to get product data
    return this.productService.getProducts().then((data) => {
      const mappedData: Product[] = data.map((item) => ({
        categorias: item.category,
        subcategorias: item.subcategory,
        material: item.description,
        dataCompra: item.purchase_date,
        validade: item.expiry_date,
        alertas: '',
        quantidades: item.quantity
      }));
      return mappedData;
    });
  }

  incrementQuantity(product: Product): void {
    product.quantidades++;
  }

  decrementQuantity(product: Product): void {
    if (product.quantidades > 0) {
      product.quantidades--;
    }
  }
}
