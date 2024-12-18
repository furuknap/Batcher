// src/store/batchStore.js
import { defineStore } from 'pinia'
import { dataService } from '../utils/dataService'
import { sendNotification, requestNotificationPermission } from '../utils/notifications'

export const useBatchStore = defineStore('batch', {
  state: () => ({
    batches: [],
    lastBatchNumber: 0
  }),
  actions: {
    addBatch(batch) { // <-- Removed async keyword
      this.lastBatchNumber += 1
      batch.number = this.lastBatchNumber
      this.batches.push(batch)
      this.saveToLocal()
      this.scheduleNotification(batch) // <-- Removed await
      return batch.number
    },
    loadFromLocal() {
      const data = dataService.getBatches()
      this.batches = data.batches || []
      this.lastBatchNumber = data.lastBatchNumber || 0
    },
    saveToLocal() {
      dataService.saveBatches({
        batches: this.batches,
        lastBatchNumber: this.lastBatchNumber
      })
    },
    async scheduleNotificationsForAll() {
      const permission = await requestNotificationPermission()
      if (!permission) return

      const now = new Date()

      this.batches.forEach(batch => {
        const sellByDate = new Date(batch.sellByDate)
        const timeUntilSellByReminder = sellByDate.getTime() - now.getTime() - (24 * 60 * 60 * 1000)

        if (timeUntilSellByReminder > 0) {
          setTimeout(() => {
            sendNotification('Sell-By Reminder', {
              body: `Batch #${batch.number} of ${batch.productName} is one day away from sell-by date.`,
              icon: '/path-to-your-icon.png'
            })
          }, timeUntilSellByReminder)
        }
      })
    },
    scheduleNotification(batch) {
      const permission = requestNotificationPermission()
      if (!permission) return

      const sellByDate = new Date(batch.sellByDate)
      const now = new Date()
      const timeUntilSellByReminder = sellByDate.getTime() - now.getTime() - (24 * 60 * 60 * 1000)

      if (timeUntilSellByReminder > 0) {
        setTimeout(() => {
          sendNotification('Sell-By Reminder', {
            body: `Batch #${batch.number} of ${batch.productName} is one day away from sell-by date.`,
            icon: '/path-to-your-icon.png'
          })
        }, timeUntilSellByReminder)
      }
    }
  }
})
