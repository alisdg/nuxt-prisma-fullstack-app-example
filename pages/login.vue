<template>
  <div>
    <button @click="signIn('credentials', { username: 'asd', password: 'asd' })">Username and Password</button>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

const { signIn } = useAuth()
</script>
