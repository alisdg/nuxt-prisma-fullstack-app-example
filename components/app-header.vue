<template>
  <header class="flex justify-between p-5">
    <span class="font-bold text-xl">SsOoNnGg</span>
      <n-space>
        <n-button text circle :type="theme === 'light' ? 'info' : 'warning'" @click="toggleTheme">
          <template #icon>
            <n-icon>
              <mdi-white-balance-sunny v-if="theme === 'dark'"/>
              <mdi-moon-waning-crescent v-else/>
            </n-icon>
          </template>
        </n-button>
        <n-button text circle type="tertiary" @click="signOut({callbackUrl: '/'})">
          <template #icon>
            <n-icon>
              <mdi-logout />
            </n-icon>
          </template>
        </n-button>
      </n-space>

  </header>
</template>

<script setup>
import MdiWhiteBalanceSunny from '~icons/mdi/white-balance-sunny'
import MdiMoonWaningCrescent from '~icons/mdi/moon-waning-crescent'
import MdiLogout from '~icons/mdi/logout'

const theme = inject('theme')
const toggleTheme = inject('toggleTheme')
const { data, signOut } = useAuth()
</script>

<style scoped>

</style>
