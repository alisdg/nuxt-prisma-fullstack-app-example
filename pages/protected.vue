<template>
  <div>
    <div>I'm protected! Session data: {{ data }}</div>
    <button class="rounded-xl shadow-xl p-2 m-2" @click="signOut({callbackUrl: '/'})">
      sign out
    </button>
  </div>
</template>

<script setup lang="ts">
import {useAuth} from "#imports";

definePageMeta({ auth: true })

const { data, signOut } = useAuth()
</script>
