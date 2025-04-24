<!-- src/components/Header.vue -->
<template>
    <header class="header">
        <div class="header-content">
            <h1><router-link to="/">{{ $t('appName') }}</router-link></h1>
            <div class="header-buttons">
                <button @click="toggleMenu" class="hamburger" aria-label="Toggle menu">
                    <i class="bi bi-list"></i>
                </button>
                <button @click="toggleTheme" class="theme-toggle" :aria-label="$t('theme.toggle')">
                    <i :class="isDarkTheme ? 'bi bi-sun' : 'bi bi-moon'" :title="isDarkTheme ? $t('theme.light') : $t('theme.dark')"></i>
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
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
    name: 'Header',
    setup() {
        const { locale } = useI18n()
        const currentLanguage = ref(locale.value)
        const showMenu = ref(false)
        const isDarkTheme = ref(false)

        // Initialize theme from localStorage
        onMounted(() => {
            // Check if theme preference exists in localStorage
            const savedTheme = localStorage.getItem('theme')
            if (savedTheme === 'dark') {
                isDarkTheme.value = true
                document.documentElement.classList.add('dark-theme')
            } else {
                isDarkTheme.value = false
                document.documentElement.classList.remove('dark-theme')
            }
        })

        const toggleLanguage = () => {
            locale.value = locale.value === 'en' ? 'es' : 'en'
            currentLanguage.value = locale.value
        }

        const toggleMenu = () => {
            showMenu.value = !showMenu.value
        }

        const toggleTheme = () => {
            isDarkTheme.value = !isDarkTheme.value
            
            if (isDarkTheme.value) {
                document.documentElement.classList.add('dark-theme')
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark-theme')
                localStorage.setItem('theme', 'light')
            }
        }

        return {
            toggleLanguage,
            currentLanguage,
            showMenu,
            toggleMenu,
            isDarkTheme,
            toggleTheme
        }
    }
}
</script>

<style scoped>
.header {
    display: flex;
    flex-direction: column;
    background-color: var(--header-bg);
    box-shadow: 0 2px 4px var(--shadow-color);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.header-content h1 {
    margin: 0;
    font-size: 1.5rem;
}

.header-content a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.header-content a:hover {
    color: var(--primary-color);
}

.header-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.hamburger {
    font-size: 1.5rem;
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    transition: color 0.3s ease, background-color 0.3s ease;
}

.hamburger:hover {
    background-color: var(--bg-secondary);
    border-radius: 4px;
}

.theme-toggle {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 1.25rem;
    transition: color 0.3s ease, background-color 0.3s ease;
}

.theme-toggle:hover {
    background-color: var(--bg-secondary);
    border-radius: 4px;
}

.lang-toggle {
    margin-left: 0.5rem;
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    background-color: var(--button-bg);
    color: var(--button-text);
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.lang-toggle:hover {
    background-color: var(--button-hover);
}

.nav-menu {
    background-color: var(--nav-bg);
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease;
}

.nav-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.nav-menu a {
    text-decoration: none;
    color: var(--text-color);
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
    display: block;
}

.nav-menu a:hover {
    background-color: var(--bg-secondary);
    color: var(--primary-color);
}

@media (min-width: 768px) {
    .nav-menu ul {
        flex-direction: row;
        justify-content: center;
    }
    
    .hamburger {
        display: none;
    }
    
    .nav-menu {
        display: block !important;
    }
}
</style>
