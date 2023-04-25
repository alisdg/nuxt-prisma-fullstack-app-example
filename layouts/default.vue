<template>
  <n-config-provider :theme="theme === 'light' ? null : darkTheme">
    <n-layout has-sider class="h-screen">
      <n-layout-sider content-style="padding: 24px;" class="bg-red-400">
        Handian Bridge
      </n-layout-sider>
      <div class="h-full w-full flex flex-col">
        <app-header/>
        <main class="flex flex-grow overflow-auto dark:bg-gray-700 bg-gray-200">
          <n-message-provider>
            <nuxt-page/>
          </n-message-provider>
        </main>
        <footer class="p-5 text-center">Footer</footer>
      </div>
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import {darkTheme} from 'naive-ui'

const theme = ref('light')
const toggleTheme = () => {
  if (theme.value === 'light') {
    theme.value = 'dark'
    document.documentElement.classList.add('dark')
  } else {
    theme.value = 'light'
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', theme.value)
}
const initTheme = () => {
  const storageTheme = localStorage.getItem('theme')
  if (storageTheme && storageTheme === 'dark') {
    theme.value = 'light'
  } else {
    theme.value = 'dark'
  }
  toggleTheme()
}
onMounted(() => {
  initTheme()
})
provide('theme', theme)
provide('toggleTheme', toggleTheme)

</script>

<style scoped>

</style>
