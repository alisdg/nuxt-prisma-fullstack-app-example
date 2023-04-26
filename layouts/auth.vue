<template>
  <div class="h-screen flex flex-col align-middle justify-center">
    <div class="font-bold text-center text-4xl my-5">SsOoNnGg
      <n-button circle text @click="toggleTheme" class="mx-2">
        <template #icon>
          <n-icon>
            <mdi-white-balance-sunny v-if="theme === 'dark'"/>
            <mdi-moon-waning-crescent v-else/>
          </n-icon>
        </template>
      </n-button>
    </div>
    <div class="h-fit mx-auto rounded shadow p-4 bg-white dark:bg-black auth-wrapper">
      <nuxt-page />
    </div>


  </div>
</template>

<script setup>
import MdiWhiteBalanceSunny from '~icons/mdi/white-balance-sunny'
import MdiMoonWaningCrescent from '~icons/mdi/moon-waning-crescent'
 const theme = inject('theme')
 const toggleTheme = inject('toggleTheme')
</script>

<style>
  .auth-wrapper{
    width: 100% !important;
    max-width: 400px;
  }
</style>
