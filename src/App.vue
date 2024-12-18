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
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (max-width: 600px) {
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

  .batches-table th,
  .batches-table td {
    font-size: 12px;
    padding: 6px;
  }
}
</style>
