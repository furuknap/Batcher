<!-- src/views/ManageProducts.vue -->
<template>
  <div class="manage-products">
    <h2>{{ $t('menu.manageProducts') }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">{{ $t('productName') }}</label>
        <input type="text" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="sellBy">{{ $t('sellByDays') }}</label>
        <input type="number" v-model.number="sellBy" min="1" required />
      </div>
      <div class="form-group">
        <label for="expiration">{{ $t('expirationDays') }}</label>
        <input type="number" v-model.number="expiration" min="1" required />
      </div>
      <div class="form-group">
        <label for="comments">{{ $t('comments') }}</label>
        <input type="text" v-model="comments" />
      </div>
      <button type="submit">{{ $t('save') }}</button>
    </form>

    <h3>{{ $t('menu.manageProducts') }}</h3>
    <ul>
      <li v-for="product in products" :key="product.id">
        <strong>{{ product.name }}</strong> - 
        {{ $t('sellByDays') }}: {{ product.sellBy }} | 
        {{ $t('expirationDays') }}: {{ product.expiration }} 
        <button @click="editProduct(product)">{{ $t('editProduct') }}</button>
      </li>
    </ul>

    <!-- Edit Modal -->
    <div v-if="editing" class="modal">
      <div class="modal-content">
        <h3>{{ $t('editProduct') }}</h3>
        <form @submit.prevent="updateProduct">
          <div class="form-group">
            <label for="editName">{{ $t('productName') }}</label>
            <input type="text" v-model="editData.name" required />
          </div>
          <div class="form-group">
            <label for="editSellBy">{{ $t('sellByDays') }}</label>
            <input type="number" v-model.number="editData.sellBy" min="1" required />
          </div>
          <div class="form-group">
            <label for="editExpiration">{{ $t('expirationDays') }}</label>
            <input type="number" v-model.number="editData.expiration" min="1" required />
          </div>
          <div class="form-group">
            <label for="editComments">{{ $t('comments') }}</label>
            <input type="text" v-model="editData.comments" />
          </div>
          <button type="submit">{{ $t('save') }}</button>
          <button type="button" @click="cancelEdit">{{ $t('cancel') }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useProductStore } from '../store/productStore'

export default {
  name: 'ManageProducts',
  setup() {
    const productStore = useProductStore()

    // Reactive form fields
    const name = ref('')
    const sellBy = ref(7)
    const expiration = ref(7)
    const comments = ref('')

    // Editing state
    const editing = ref(false)
    const editData = ref({})

    // Success and error messages
    const successMessage = ref('')
    const errorMessage = ref('')

    // Submit form to add a new product
    const submitForm = () => {
      console.log('Submit Form Called') // Debug
      if (!name.value.trim()) {
        errorMessage.value = 'Product name is required.'
        return
      }

      const newProduct = {
        id: Date.now(), // Consider using UUID for uniqueness
        name: name.value.trim(),
        sellBy: sellBy.value,
        expiration: expiration.value,
        comments: comments.value.trim()
      }

      console.log('Adding Product:', newProduct) // Debug
      productStore.addProduct(newProduct)
      console.log('Current Products:', productStore.products) // Debug

      // Reset form fields
      name.value = ''
      sellBy.value = 7
      expiration.value = 7
      comments.value = ''

      // Show success message
      successMessage.value = 'Product added successfully!'
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }

    // Edit an existing product
    const editProduct = (product) => {
      console.log('Edit Product:', product) // Debug
      editing.value = true
      editData.value = { ...product }
    }

    // Update the edited product
    const updateProduct = () => {
      console.log('Update Product Called') // Debug
      if (!editData.value.name.trim()) {
        errorMessage.value = 'Product name is required.'
        return
      }

      productStore.updateProduct({
        ...editData.value,
        name: editData.value.name.trim(),
        comments: editData.value.comments.trim()
      })
      console.log('Updated Products:', productStore.products) // Debug
      editing.value = false

      // Show success message
      successMessage.value = 'Product updated successfully!'
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }

    // Cancel editing
    const cancelEdit = () => {
      console.log('Cancel Edit Called') // Debug
      editing.value = false
      errorMessage.value = ''
    }

    // Computed property for products (ensures reactivity)
    const products = computed(() => productStore.products)

    return {
      name,
      sellBy,
      expiration,
      comments,
      submitForm,
      products,
      editing,
      editData,
      editProduct,
      updateProduct,
      cancelEdit,
      successMessage,
      errorMessage
    }
  }
}
</script>

<style scoped>
.manage-products {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
}

button[type="button"] {
  background-color: #f44336;
}
manageProducts
ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
