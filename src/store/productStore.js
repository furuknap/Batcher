// src/store/productStore.js
import { defineStore } from 'pinia'
import { dataService } from '../utils/dataService'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: []
  }),
  actions: {
    addProduct(product) {
      this.products.push(product)
      this.saveToLocal()
      console.log('Product Added:', product) // Debug
    },
    updateProduct(updatedProduct) {
      const index = this.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        this.products[index] = updatedProduct
        this.saveToLocal()
        console.log('Product Updated:', updatedProduct) // Debug
      }
    },
    loadFromLocal() {
      this.products = dataService.getProducts()
      console.log('Products Loaded:', this.products) // Debug
    },
    saveToLocal() {
      dataService.saveProducts(this.products)
      console.log('Products Saved:', this.products) // Debug
    }
  }
})
