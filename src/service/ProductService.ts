// src/services/ProductService.ts
import axios, { type AxiosResponse } from 'axios';

// Interface pour définir la structure d'un produit
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
}

// Interface pour la réponse de pagination
export interface PaginatedResponse {
  data: Product[];
  current_page: number;
  last_page: number;
  total: number;
}

class ProductService {
  private baseUrl = 'http://localhost:8000/api/products';

  async getAllProducts(page = 1): Promise<PaginatedResponse> {
    try {
      const response: AxiosResponse<PaginatedResponse> = await axios.get(
        `${this.baseUrl}?page=${page}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getProductById(id: number | string): Promise<Product> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du produit', error);
      throw error;
    }
  }

  async createProduct(productData: Product): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await axios.post(
        this.baseUrl,
        productData
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await axios.put(
        `${this.baseUrl}/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Erreur de réponse:', error.response.data);
        console.error('Statut:', error.response.status);
      } else if (error.request) {
        console.error('Pas de réponse reçue:', error.request);
      } else {
        console.error('Erreur de configuration:', error.message);
      }
    } else {
      console.error('Erreur inattendue:', error);
    }
  }
}

export const productService = new ProductService();
