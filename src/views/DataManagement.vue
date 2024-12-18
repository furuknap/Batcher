<!-- src/views/DataManagement.vue -->
<template>
    <div class="data-management">
        <h2>Data Management</h2>

        <div class="export-section">
            <h3>Export Data</h3>
            <button @click="exportData('products')">{{ $t('export') }} Products</button>
            <button @click="exportData('currentBatches')">{{ $t('export') }} Current Batches</button>
            <button @click="exportData('allBatches')">{{ $t('export') }} All Batches</button>
        </div>

        <div class="import-section">
            <h3>Import Data</h3>
            <input type="file" @change="handleFileUpload" accept=".json" />
            <div v-if="importSummary">
                <h4>{{ $t('importSummary') }}</h4>
                <p>{{ importSummary }}</p>
            </div>
            <div v-if="fileContent">
                <button @click="importData(true)">Overwrite Existing Data</button>
                <button @click="importData(false)">Merge Data</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useProductStore } from '../store/productStore'
import { useBatchStore } from '../store/batchStore'

export default {
    name: 'DataManagement',
    setup() {
        const productStore = useProductStore()
        const batchStore = useBatchStore()

        const importSummary = ref('')
        const fileContent = ref(null)

        const exportData = (type) => {
            let data = {}
            if (type === 'products') {
                data = { products: productStore.products }
            } else if (type === 'currentBatches') {
                const currentBatches = batchStore.batches.filter(batch => {
                    const expirationDate = new Date(batch.expirationDate)
                    const today = new Date()
                    return expirationDate >= today
                })
                data = { batches: currentBatches }
            } else if (type === 'allBatches') {
                data = { batches: batchStore.batches, lastBatchNumber: batchStore.lastBatchNumber }
            }

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${type}-data-${Date.now()}.json`
            link.click()
            URL.revokeObjectURL(url)
        }

        const handleFileUpload = (event) => {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    try {
                        const json = JSON.parse(e.target.result)
                        fileContent.value = json
                        importSummary.value = ''
                    } catch (error) {
                        importSummary.value = 'Invalid JSON file.'
                    }
                }
                reader.readAsText(file)
            }
        }

        const importData = (overwrite) => {
            if (!fileContent.value) return

            let summary = ''

            if (fileContent.value.products) {
                if (overwrite) {
                    productStore.products = fileContent.value.products
                } else {
                    const existingIds = productStore.products.map(p => p.id)
                    const newProducts = fileContent.value.products.filter(p => !existingIds.includes(p.id))
                    productStore.products.push(...newProducts)
                }
                summary += `Imported ${fileContent.value.products.length} products.\n`
            }

            if (fileContent.value.batches) {
                if (overwrite) {
                    batchStore.batches = fileContent.value.batches
                    batchStore.lastBatchNumber = fileContent.value.lastBatchNumber || batchStore.lastBatchNumber
                } else {
                    const existingBatchNumbers = batchStore.batches.map(b => b.number)
                    const newBatches = fileContent.value.batches.filter(b => !existingBatchNumbers.includes(b.number))
                    batchStore.batches.push(...newBatches)
                    batchStore.lastBatchNumber = Math.max(batchStore.lastBatchNumber, ...newBatches.map(b => b.number))
                }
                summary += `Imported ${fileContent.value.batches.length} batches.\n`
            }

            productStore.saveToLocal()
            batchStore.saveToLocal()

            importSummary.value = summary
            fileContent.value = null
        }

        return {
            exportData,
            handleFileUpload,
            importData,
            importSummary,
            fileContent
        }
    }
}
</script>

<style scoped>
.data-management {
    padding: 20px;
}

.export-section,
.import-section {
    margin-bottom: 30px;
}

button {
    margin-right: 10px;
    margin-top: 10px;
    padding: 10px 15px;
    cursor: pointer;
}
</style>
