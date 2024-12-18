<!-- src/views/About.vue -->
<template>
    <div class="about">
        <h2>{{ $t('menu.about') }}</h2>
        <p>This is Batcher, an app to manage your batches of candied almonds and cookies.</p>
        <p><a href="https://almendras.co/" target="_blank">More Information (almendras.co/)</a></p>
    </div>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style scoped>
.about {
    padding: 20px;
}
</style>
