<!-- src/views/ManageBatches.vue -->
<template>
    <div class="manage-batches">
        <h2>{{ $t('menu.manageBatches') }}</h2>

        <div class="filters">
            <div>
                <label for="filterProduct">{{ $t('filter') }}: {{ $t('selectProduct') }}</label>
                <select v-model="filterProduct">
                    <option value="">{{ $t('all') }}</option>
                    <option v-for="product in products" :key="product.id" :value="product.name">
                        {{ product.name }}
                    </option>
                </select>
            </div>
            <div>
                <label for="filterStatus">{{ $t('filter') }}: Status</label>
                <select v-model="filterStatus">
                    <option value="">{{ $t('all') }}</option>
                    <option value="active">Active</option>
                    <option value="nearSellBy">Near Sell-By</option>
                    <option value="expired">Expired</option>
                </select>
            </div>
            <div>
                <label for="search">{{ $t('search') }}</label>
                <input type="text" v-model="searchQuery" placeholder="Search comments..." />
            </div>
        </div>

        <table class="batches-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{{ $t('productName') }}</th>
                    <th>{{ $t('creationDate') }}</th>
                    <th>{{ $t('sellByDate') }}</th>
                    <th>{{ $t('expirationDate') }}</th>
                    <th>{{ $t('comments') }}</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="batch in filteredBatches" :key="batch.number">
                    <td>{{ batch.number }}</td>
                    <td>{{ batch.productName }}</td>
                    <td>{{ formatDate(batch.creationDate) }}</td>
                    <td>{{ formatDate(batch.sellByDate) }}</td>
                    <td>{{ formatDate(batch.expirationDate) }}</td>
                    <td>{{ batch.comments }}</td>
                    <td>
                        <span v-if="isExpired(batch)" class="status expired">Expired</span>
                        <span v-else-if="isNearSellBy(batch)" class="status near-sell-by">Near Sell-By</span>
                        <span v-else class="status active">Active</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Toggle to Show Expired Batches -->
        <div class="toggle-expired">
            <input type="checkbox" v-model="showExpired" />
            <label>Show Expired Batches</label>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useBatchStore } from '../store/batchStore'
import { useProductStore } from '../store/productStore'

export default {
    name: 'ManageBatches',
    setup() {
        const batchStore = useBatchStore()
        const productStore = useProductStore()

        const filterProduct = ref('')
        const filterStatus = ref('')
        const searchQuery = ref('')
        const showExpired = ref(false)

        const products = computed(() => productStore.products)

        const formatDate = (dateStr) => {
            const date = new Date(dateStr)
            return date.toLocaleDateString()
        }

        const isExpired = (batch) => {
            const today = new Date()
            const expiration = new Date(batch.expirationDate)
            return today > expiration
        }

        const isNearSellBy = (batch) => {
            const today = new Date()
            const sellBy = new Date(batch.sellByDate)
            const difference = sellBy - today
            return difference <= (24 * 60 * 60 * 1000) && difference > 0
        }

        const filteredBatches = computed(() => {
            return batchStore.batches.filter(batch => {
                // Filter by product
                if (filterProduct.value && batch.productName !== filterProduct.value) {
                    return false
                }

                // Filter by status
                if (filterStatus.value === 'active' && isExpired(batch)) {
                    return false
                }
                if (filterStatus.value === 'nearSellBy' && !isNearSellBy(batch)) {
                    return false
                }
                if (filterStatus.value === 'expired' && !isExpired(batch)) {
                    return false
                }

                // Filter by search query
                if (searchQuery.value && !batch.comments.toLowerCase().includes(searchQuery.value.toLowerCase())) {
                    return false
                }

                // Handle expired batches visibility
                if (!showExpired.value && isExpired(batch)) {
                    return false
                }

                return true
            })
        })

        return {
            filterProduct,
            filterStatus,
            searchQuery,
            showExpired,
            products,
            filteredBatches,
            formatDate,
            isExpired,
            isNearSellBy
        }
    }
}
</script>

<style scoped>
.manage-batches {
    padding: 20px;
}

.filters {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.batches-table {
    width: 100%;
    border-collapse: collapse;
}

.batches-table th,
.batches-table td {
    border: 1px solid #ddd;
    padding: 8px;
}

.batches-table th {
    background-color: #f2f2f2;
}

.status {
    padding: 4px 8px;
    border-radius: 4px;
    color: white;
}

.expired {
    background-color: red;
}

.near-sell-by {
    background-color: orange;
}

.active {
    background-color: green;
}

.toggle-expired {
    margin-top: 20px;
}
</style>
