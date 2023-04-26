<template>
  <n-config-provider :theme="theme === 'light' ? null : darkTheme">
    <n-message-provider>
      <nuxt-layout>
        <nuxt-page />
      </nuxt-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
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
