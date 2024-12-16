import { defineStore } from 'pinia'
import { type Product } from '../service/ProductService'

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  getters: {
    totalItems(): number {
      return this.items.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice(): number {
      return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
  actions: {
    addToCart(product: Product) {
      const existingItem = this.items.find(item => item.id === product.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId: number) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--
        } else {
          this.items.splice(index, 1)
        }
      }
    },
    clearCart() {
      this.items = []
    }
  },
  persist: {
    storage: localStorage,
    paths: ['items']
  }
})
