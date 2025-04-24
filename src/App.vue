<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import { useProductStore } from './store/productStore'
import { useBatchStore } from './store/batchStore'

export default {
  name: 'App',
  components: {
    Header
  },
  setup() {
    const productStore = useProductStore()
    const batchStore = useBatchStore()

    productStore.loadFromLocal()
    console.log('Loaded Products:', productStore.products) // Debug
    batchStore.loadFromLocal()
    console.log('Loaded Batches:', batchStore.batches) // Debug
    batchStore.scheduleNotificationsForAll()
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: var(--bs-body-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Main content container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  flex: 1;
}

/* Form styling */
form {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem var(--shadow-color);
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

form div {
  margin-bottom: 1rem;
}

form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}

form input, form select, form textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--input-border);
  border-radius: 0.25rem;
  background-color: var(--input-bg);
  color: var(--text-color);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

form input:focus, form select:focus, form textarea:focus {
  border-color: var(--input-focus);
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  outline: none;
}

form button {
  background-color: var(--button-bg);
  color: var(--button-text);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: var(--button-hover);
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: var(--card-bg);
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.25rem var(--shadow-color);
  transition: background-color 0.3s ease;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
}

th {
  background-color: var(--bg-secondary);
  font-weight: 600;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: var(--bg-secondary);
}

/* Card styling */
.card {
  background-color: var(--card-bg);
  border-radius: 0.375rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0.125rem 0.25rem var(--shadow-color);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.card-header {
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.card-body {
  padding: 0.5rem 0;
}

/* Alert styling */
.alert {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid var(--alert-border);
  border-radius: 0.375rem;
  background-color: var(--alert-bg);
  color: var(--danger-color);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-menu ul {
    flex-direction: column;
  }

  .filters {
    flex-direction: column;
  }

  .filters div {
    width: 100%;
  }

  table, th, td {
    font-size: 0.875rem;
  }

  th, td {
    padding: 0.5rem;
  }
}
</style>
