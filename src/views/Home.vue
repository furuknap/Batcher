<!-- src/views/Home.vue -->
<template>
    <div class="home container">
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h2>{{ $t('createBatch') }}</h2>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="createBatch">
                            <div class="mb-3">
                                <label for="product" class="form-label">{{ $t('selectProduct') }}</label>
                                <select id="product" class="form-select" v-model="selectedProduct" required>
                                    <option disabled value="">{{ $t('selectProduct') }}</option>
                                    <option v-for="product in products" :key="product.id" :value="product">
                                        {{ product.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="comments" class="form-label">{{ $t('batchComments') }}</label>
                                <input type="text" id="comments" class="form-control" v-model="comments" />
                            </div>
                            <button type="submit" class="btn btn-primary">{{ $t('createBatch') }}</button>
                        </form>
                    </div>
                </div>

                <div v-if="lastCreatedBatch" class="card mt-4">
                    <div class="card-body">
                        <h3 class="mb-0">Batch Number: <strong>{{ lastCreatedBatch }}</strong></h3>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3 class="mb-0">{{ $t('lastBatches') }}</h3>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li v-for="batch in recentBatches" :key="batch.number" class="list-group-item d-flex justify-content-between align-items-center">
                                {{ batch.productName }} - #{{ batch.number }}
                                <span v-if="isSellByNear(batch)" class="badge bg-danger rounded-pill">!</span>
                            </li>
                        </ul>
                        <p v-if="recentBatches.length === 0" class="text-muted">No recent batches</p>
                    </div>
                </div>

                <!-- In-App Alerts -->
                <div v-if="alerts.length" class="card bg-danger text-white">
                    <div class="card-header">
                        <h3 class="mb-0">Alerts</h3>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li v-for="alert in alerts" :key="alert.number" class="list-group-item bg-danger text-white border-light">
                                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                                Batch #{{ alert.number }} of {{ alert.productName }} is one day away from sell-by date.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../store/productStore'
import { useBatchStore } from '../store/batchStore'

export default {
    name: 'Home',
    setup() {
        const productStore = useProductStore()
        const batchStore = useBatchStore()

        const selectedProduct = ref('')
        const comments = ref('')
        const lastCreatedBatch = ref(null)
        const alerts = ref([])

        const createBatch = () => {
            if (!selectedProduct.value) return

            const creationDate = new Date()
            const sellByDate = new Date(creationDate)
            sellByDate.setDate(creationDate.getDate() + selectedProduct.value.sellBy)

            const expirationDate = new Date(creationDate)
            expirationDate.setDate(creationDate.getDate() + selectedProduct.value.expiration)

            const newBatch = {
                productId: selectedProduct.value.id,
                productName: selectedProduct.value.name,
                creationDate: creationDate.toISOString(),
                sellByDate: sellByDate.toISOString(),
                expirationDate: expirationDate.toISOString(),
                comments: comments.value
            }

            const batchNumber = batchStore.addBatch(newBatch)
            lastCreatedBatch.value = batchNumber

            // Reset form
            selectedProduct.value = ''
            comments.value = ''

            checkAlerts()
        }

        const recentBatches = computed(() => {
            return batchStore.batches.slice(-3).reverse()
        })

        const products = computed(() => productStore.products)

        const isSellByNear = (batch) => {
            const today = new Date()
            const sellBy = new Date(batch.sellByDate)
            const difference = sellBy - today
            return difference <= (24 * 60 * 60 * 1000) && difference > 0
        }

        const checkAlerts = () => {
            const today = new Date()
            alerts.value = batchStore.batches.filter(batch => {
                const sellBy = new Date(batch.sellByDate)
                const difference = sellBy - today
                return difference <= (24 * 60 * 60 * 1000) && difference > 0
            })
        }

        onMounted(() => {
            checkAlerts()
        })

        return {
            selectedProduct,
            comments,
            createBatch,
            lastCreatedBatch,
            recentBatches,
            products,
            isSellByNear,
            alerts
        }
    }
}
</script>

<style scoped>
/* Most styling is now handled by Bootstrap classes and global CSS variables */
.home {
    padding: 1.5rem 0;
}

.card {
    margin-bottom: 1.5rem;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.list-group-item {
    background-color: var(--card-bg);
    color: var(--text-color);
    border-color: var(--border-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.badge {
    transition: background-color 0.3s ease;
}

/* Dark mode specific overrides */
:global(.dark-theme) .list-group-item {
    background-color: var(--card-bg);
    color: var(--text-color);
}

:global(.dark-theme) .bg-danger {
    background-color: #842029 !important;
}

:global(.dark-theme) .text-muted {
    color: var(--text-muted) !important;
}
</style>
