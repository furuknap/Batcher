<!-- src/views/Home.vue -->
<template>
    <div class="home">
        <h2>{{ $t('createBatch') }}</h2>
        <form @submit.prevent="createBatch">
            <div>
                <label for="product">{{ $t('selectProduct') }}</label>
                <select v-model="selectedProduct" required>
                    <option disabled value="">{{ $t('selectProduct') }}</option>
                    <option v-for="product in products" :key="product.id" :value="product">
                        {{ product.name }}
                    </option>
                </select>
            </div>
            <div>
                <label for="comments">{{ $t('batchComments') }}</label>
                <input type="text" v-model="comments" />
            </div>
            <button type="submit">{{ $t('createBatch') }}</button>
        </form>

        <div v-if="lastCreatedBatch" class="last-batch">
            <h3>Batch Number: <strong>{{ lastCreatedBatch }}</strong></h3>
        </div>

        <div class="recent-batches">
            <h3>{{ $t('lastBatches') }}</h3>
            <ul>
                <li v-for="batch in recentBatches" :key="batch.number">
                    {{ batch.productName }} - #{{ batch.number }}
                    <span v-if="isSellByNear(batch)" class="alert">!</span>
                </li>
            </ul>
        </div>

        <!-- In-App Alerts -->
        <div v-if="alerts.length" class="alerts">
            <h3>Alerts</h3>
            <ul>
                <li v-for="alert in alerts" :key="alert.number">
                    Batch #{{ alert.number }} of {{ alert.productName }} is one day away from sell-by date.
                </li>
            </ul>
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
.home {
    padding: 20px;
}

form div {
    margin-bottom: 10px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
}

.last-batch {
    margin-top: 20px;
    font-size: 18px;
}

.recent-batches ul {
    list-style: none;
    padding: 0;
}

.alert {
    color: red;
    font-weight: bold;
    margin-left: 10px;
}

.alerts {
    margin-top: 20px;
    background-color: #ffe5e5;
    padding: 10px;
    border: 1px solid red;
}
</style>
