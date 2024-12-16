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
  products: any;
  data: Product[];
  current_page: number;
  last_page: number;
  total: number;
}

class ProductService {
  private baseUrl = 'http://localhost:8000/api/products';

  // Récupérer tous les produits
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

  // Créer un nouveau produit
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

  // Mettre à jour un produit
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

  // Supprimer un produit
  async deleteProduct(id: number): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Gestion centralisée des erreurs
  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      // Gestion des erreurs Axios
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'erreur
        console.error('Erreur de réponse:', error.response.data);
        console.error('Statut:', error.response.status);
      } else if (error.request) {
        // La requête a été faite mais pas de réponse reçue
        console.error('Pas de réponse reçue:', error.request);
      } else {
        // Quelque chose s\'est mal passé lors de la configuration de la requête
        console.error('Erreur de configuration:', error.message);
      }
    } else {
      // Gestion des erreurs non Axios
      console.error('Erreur inattendue:', error);
    }
  }
}

// Exporter une instance singleton
export const productService = new ProductService();
