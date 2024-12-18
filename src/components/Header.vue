<!-- src/components/Header.vue -->
<template>
    <header class="header">
        <div class="header-content">
            <h1><router-link to="/">{{ $t('appName') }}</router-link></h1>
            <div class="header-buttons">
                <button @click="toggleMenu" class="hamburger">
                    ☰
                </button>
                <button @click="toggleLanguage" class="lang-toggle">
                    {{ currentLanguage === 'en' ? $t('language.spanish') : $t('language.english') }}
                </button>
            </div>
        </div>
        <nav class="nav-menu" v-if="showMenu">
            <ul>
                <li><router-link to="/manage-products">{{ $t('menu.manageProducts') }}</router-link></li>
                <li><router-link to="/manage-batches">{{ $t('menu.manageBatches') }}</router-link></li>
                <li><router-link to="/data-management">Data Management</router-link></li>
                <li><router-link to="/about">{{ $t('menu.about') }}</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
    name: 'Header',
    setup() {
        const { locale } = useI18n()
        const currentLanguage = ref(locale.value)
        const showMenu = ref(false)

        const toggleLanguage = () => {
            locale.value = locale.value === 'en' ? 'es' : 'en'
            currentLanguage.value = locale.value
        }

        const toggleMenu = () => {
            showMenu.value = !showMenu.value
        }

        return {
            toggleLanguage,
            currentLanguage,
            showMenu,
            toggleMenu
        }
    }
}
</script>

<style scoped>
.header {
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.header-buttons {
    display: flex;
    align-items: center;
}

.hamburger {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
}

.lang-toggle {
    margin-left: 10px;
    padding: 5px 10px;
    cursor: pointer;
}

.nav-menu {
    background-color: #e0e0e0;
    padding: 10px;
}

.nav-menu ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
}

@media (min-width: 601px) {
    .nav-menu ul {
        flex-direction: row;
    }
}
</style>
