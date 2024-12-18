// src/utils/dataService.js

// Placeholder for data service. Initially uses localStorage.

export const dataService = {
  // Products
  getProducts() {
    const data = localStorage.getItem('products')
    return data ? JSON.parse(data) : []
  },
  saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products))
  },

  // Batches
  getBatches() {
    const data = localStorage.getItem('batches')
    return data ? JSON.parse(data) : { batches: [], lastBatchNumber: 0 }
  },
  saveBatches(batchesData) {
    localStorage.setItem('batches', JSON.stringify(batchesData))
  }
}
